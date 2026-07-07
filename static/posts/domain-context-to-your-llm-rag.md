---
title: "Domain Context to your LLM? RAG!"
published_at: 2026-07-07T14:00:00.000Z
snippet: "Let's load some context into a tiny LLM and make the answers actually good."
---

<img alt="A tiny LLM running locally, now with a CV in its pocket" height="720" src="../blog-images/rag.webp" width="1280"/>

# Domain Context to your LLM? RAG!

A while back I wrote about [running SmolLM2 as a local service with FastAPI](/blog/smollm-as-a-service). Small model, blocking and streaming generation, boring in the best way. [The code is on GitHub](https://github.com/Rebstorm/llm-fastapi) if you want to follow along. That project didn't stop existing just because I stopped writing about it, it's still the API I poke at whenever I want to try something new without pulling in a distributed inference cluster.

This time I did two things to it. I swapped the model for [Qwen2.5-1.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct), smaller, newer, and better at following instructions than SmolLM2 ever was. And then, let's augment it using RAG. I gave it something to actually be right about: my own CV. Model swaps are a one-line diff and not worth an entire post. RAG is the interesting part.

## What RAG actually is

A 1.5B parameter model knows a lot about the world in general and nothing about my last two jobs, because that information was never in its training data and never will be. You can't fix that by asking nicely. You *can* fix it by handing the model the relevant paragraph right before it answers.

That's RAG, short for retrieval-augmented generation, in its entirety: retrieve the bit of text that's actually relevant to the question, then stuff it into the prompt as context before generation happens. No fine-tuning, no retraining, no vector-math PhD required. The model still does the writing, it just gets to read the source material first, like a student allowed to bring one page of notes into the exam.

The "retrieve the relevant bit" part is where a vector database comes in. Store your documents as embeddings (chunks of text turned into vectors that represent meaning rather than exact words), then given a question, embed that too, and pull out whichever stored chunks sit closest to it in vector space. Closest usually means "about the same topic," which is exactly what you want.

## How I built it

The plan: drop a PDF of my CV on disk, chunk it, embed the chunks, put them in a vector store, and on generation, optionally retrieve the top few chunks and hand them to the model as context.

### Extracting and chunking the CV

Nothing fancy here: pull text out of the PDF, then slice it into overlapping windows so a fact that straddles a chunk boundary doesn't get orphaned.

```python
def extract_text_from_pdf(pdf_path: str) -> str:
    reader = PdfReader(pdf_path)
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def chunk_text(text: str, chunk_size: int = 800, overlap: int = 100) -> List[str]:
    words = text.split()
    chunks = []
    step = chunk_size - overlap
    for start in range(0, len(words), step):
        chunk = " ".join(words[start : start + chunk_size])
        if chunk:
            chunks.append(chunk)
        if start + chunk_size >= len(words):
            break
    return chunks
```

No langchain, no llamaindex. It's a CV, not a corpus. A word-based sliding window is all the "chunking strategy" this needed.

### Storing embeddings in Chroma

[Chroma](https://www.trychroma.com/) is a vector database: a datastore built specifically for storing embeddings and finding the ones closest to a given query, instead of matching rows exactly like a normal database does. Under the hood it's doing nearest-neighbor search over vectors, but from the outside it just looks like "give me a piece of text, get back the most similar things I've stored."

The version I'm using runs embedded. No server to stand up, just a directory on disk, which fits a project whose entire deployment story is "one Docker container."

```python
class CVRagService:
    def __init__(self, persist_dir: str, embedding_model_name: str = "all-MiniLM-L6-v2") -> None:
        self.client = chromadb.PersistentClient(path=persist_dir)
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name=embedding_model_name
        )
        self.collection = self.client.get_or_create_collection(
            name=COLLECTION_NAME, embedding_function=self.embedding_fn
        )
```

Small aside: I originally named the collection `"cv"`. Chroma rejects collection names under 3 characters and told me so, immediately, on startup. Fair enough. I renamed it to `"cv-documents"` and moved on. Small victories.

Re-embedding the same unchanged CV on every restart is a waste of a perfectly good half-second, so indexing is gated on a content hash stored in the collection's own metadata:

```python
def index_cv(self, cv_path: str, force: bool = False) -> bool:
    current_hash = file_hash(cv_path)
    if not force and self.collection.count() > 0:
        if self._stored_source_hash() == current_hash:
            print(f"CV index up to date (hash={current_hash[:8]}...), skipping.")
            return False

    text = extract_text_from_pdf(cv_path)
    chunks = chunk_text(text)

    self.client.delete_collection(COLLECTION_NAME)
    self.collection = self.client.create_collection(
        name=COLLECTION_NAME,
        embedding_function=self.embedding_fn,
        metadata={"source_hash": current_hash, "source_path": cv_path},
    )
    self.collection.add(
        ids=[f"chunk-{i}" for i in range(len(chunks))],
        documents=chunks,
    )
    return True
```

Change the CV, the hash changes, it re-indexes. Leave it alone, it skips straight to serving. This runs once, in the FastAPI lifespan, right after the model loads.

### Retrieval and injecting context

Querying is the payoff for all of the above: hand Chroma a question, get back the chunks whose meaning is closest to it.

```python
def query(self, query_text: str, top_k: int = 3) -> List[str]:
    if self.collection.count() == 0:
        return []
    results = self.collection.query(query_texts=[query_text], n_results=top_k)
    documents = results.get("documents") or [[]]
    return list(documents[0])
```

The `/generate` endpoint got a `use_rag` flag. When it's on, the retrieved chunks get joined and passed down as a `context` argument that the prompt formatter tucks into the system message:

```python
if use_rag:
    chunks = rag.query(query, top_k=top_k)
    context = "\n\n".join(chunks) if chunks else None

result = llm.generate(query, max_new_tokens=max_new_tokens, context=context)
```

I deliberately kept `context` as a plain per-call argument instead of mutating the shared system prompt through the existing `/config` endpoint. The model instance is one global object serving every request. Stuffing retrieved context into shared mutable state would mean two concurrent requests could stomp on each other's context mid-flight. Passing it straight through the call stack sidesteps that entirely.

Ask it something generic and it answers like a generic model. Ask it where I currently work with `use_rag=true` and it actually knows, because for that one request it got to read the relevant paragraph first.

## The stack

- **[Qwen2.5-1.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct)**: the model doing the generating, via `transformers` + `torch`, same as before.
- **[Chroma](https://www.trychroma.com/)**: embedded, persistent vector store. No server process, just a directory.
- **[sentence-transformers](https://www.sbert.net/)**, `all-MiniLM-L6-v2`: turns text into embeddings, small enough to not notice it's there.
- **[pypdf](https://pypdf.readthedocs.io/)**: pulls raw text out of the CV PDF. That's the entire job it has.
- **FastAPI**: unchanged, just one new query param on an endpoint that already existed.

## Context, and why it matters

The service went from "confidently generic" to "correct about domain specific things," which for a side project is a real upgrade. It's still one container, still boots in seconds, still doesn't need a GPU cluster or a hosted vector database subscription. The whole RAG layer is maybe 80 lines of code and a SQLite file on disk.

More generally: this is the cheapest way to make a small model useful for anything you actually know about (your notes, your docs, your CV) without touching the model itself. Swap the PDF, the answers change. No retraining, no fine-tuning job, no GPU bill for that part. Just a hash check and an embedding lookup standing between a generic model and a slightly-less-generic one.

That's all for today. Thanks for reading! ❤️

Signing out!

Paul
