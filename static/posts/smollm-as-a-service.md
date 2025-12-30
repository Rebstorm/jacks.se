---
title: "Running SmolLM as a local service with FastAPI"
published_at: 2026-01-01T18:00:00.000Z
snippet: "A tiny LLM, a simple API and a surprisingly nice developer experience."
---

<img alt="A tiny LLM running locally" height="748" src="../blog-images/smollm.webp" width="1280"/>

# Running SmolLM as a local service

I wanted to experiment with running a small language model locally without pulling in half the internet or setting up a distributed inference cluster. The goal was simple.

Load a small instruct model.  
Expose it over HTTP.  
Support both blocking responses and streaming.  
Keep it readable and hackable.

This is what I ended up with and I am honestly quite happy with it.

### [The code can be found here.](https://github.com/Rebstorm/SmolLM2-1.7B_FastApi)

## Why SmolLM

[SmolLM2](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct) at 1.7B parameters is a nice middle ground. It is small enough to run on consumer hardware (8Gb ish of RAM or VRAM) and still good enough to be useful for text generation, prompt experiments and internal tooling.

It also ships with a chat template which makes it easy to build a proper system and user prompt flow without inventing your own format.

## The LLM service

The heart of the setup is a simple service class that loads the model, formats prompts and handles both normal and streaming generation.

```python
def __init__(self, model_name: str = "HuggingFaceTB/SmolLM2-1.7B-Instruct") -> None:
self.device = "cuda" if torch.cuda.is_available() else "cpu"
self.set_default_system_prompt: str = "You are a helpful assistant."
self.max_new_tokens: int = 100
print(f"Loading model '{model_name}' to {self.device}...")
try:
    self.tokenizer: Any = AutoTokenizer.from_pretrained(model_name)
    self.model: Any = AutoModelForCausalLM.from_pretrained(model_name).to(
        self.device
    )
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)
```

The model loads once at startup and then lives for the lifetime of the application. That makes requests fast and avoids repeated GPU or CPU warmup.

Prompt formatting uses the model chat template so that system and user messages are handled correctly.

```python
def _format_prompt(self, prompt: str) -> Any:
    messages = []
    if self.set_default_system_prompt:
        messages.append(
            {"role": "system", "content": self.set_default_system_prompt}
        )
    messages.append({"role": "user", "content": prompt})
    return self.tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True
    )
```

### Blocking generation

For simple use cases you just want a response back. That is handled with a normal generate call.

```python
    def generate(self, prompt: str, max_new_tokens: Optional[int] = None) -> str:
    if max_new_tokens is None:
        max_new_tokens = self.max_new_tokens
    formatted_prompt = self._format_prompt(prompt)
    print(f"Generating response for prompt: {prompt}")
    inputs = self.tokenizer(formatted_prompt, return_tensors="pt").to(self.device)
    outputs = self.model.generate(**inputs, max_new_tokens=max_new_tokens)
    return str(
        self.tokenizer.decode(
            outputs[0][len(inputs[0]) :], skip_special_tokens=True
        )
    )
```

### Streaming generation

Streaming makes the system feel much more alive and usable in interactive settings. This uses the built in TextIteratorStreamer and a background thread to avoid blocking the event loop.

```python
def stream_generate(
        self, prompt: str, max_new_tokens: Optional[int] = None
) -> Generator[str, None, None]:
    if max_new_tokens is None:
        max_new_tokens = self.max_new_tokens
    formatted_prompt = self._format_prompt(prompt)
    print(f"Streaming response for prompt: {prompt}")
    inputs = self.tokenizer(formatted_prompt, return_tensors="pt").to(self.device)
    streamer = TextIteratorStreamer(
        self.tokenizer, skip_prompt=True, skip_special_tokens=True
    )
    generation_kwargs = dict(
        inputs, streamer=streamer, max_new_tokens=max_new_tokens
    )
    thread = threading.Thread(target=self.model.generate, kwargs=generation_kwargs)
    thread.start()
    for new_text in streamer:
        yield new_text
```


### FastAPI wrapper

On top of the service sits a very small FastAPI layer. It exposes a GET single endpoint for generation.

```python
@router.get("/generate")
async def generate(
        query: str = Query(..., description="The prompt for the model"),
        stream: bool = Query(False, description="Whether to stream the response"),
        max_new_tokens: Optional[int] = Query(
            None, description="Maximum new tokens to generate"
        ),
        llm: SmolLM = Depends(get_llm),
) -> Any:
    if llm is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    if stream:
        return StreamingResponse(
            llm.stream_generate(query, max_new_tokens=max_new_tokens),
            media_type="text/plain",
        )

    result = llm.generate(query, max_new_tokens=max_new_tokens)
    return {"prompt": query, "response": result}
```

## Application lifecycle

The model is loaded once when the app starts using FastAPI lifespan.

This keeps startup predictable and avoids weird race conditions around model loading.


```python
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    llm_instance = SmolLM()
    set_llm(llm_instance)
    yield
```

## What I like about this setup

It is boring in the best way possible. And should help a couple of engineers get started with LLMs quickly, at least as a proof of concept.

That is all for me for today, thanks for reading! ❤️

Signing out!

Paul
