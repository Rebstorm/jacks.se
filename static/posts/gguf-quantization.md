---
title: "Quantization (Or: Why Your 7B Model Fits in 4GB)"
published_at: 2026-09-21T18:00:00.000Z
snippet: "14GB of weights on an 8GB GPU. Quantization is the polite way of telling the model to fit."
---

# Quantization (Or: Why Your 7B Model Fits in 4GB)

A few months ago I [wrote about running Qwen on a repurposed laptop](/blog/running-your-own-ai-is-actually-good-now) and pulling 8-18 tokens per second out of a GPU that has never once felt like it had anything to prove. There's a detail I skipped in that post, because it's the part that actually makes the whole thing work:

A 7 billion parameter model, stored at full precision, is about 14 gigabytes of weights. My GPU does not have 14 gigabytes. And yet, there's a 7B model in there, being a little genius at 8 tokens per second.

This post is about how. The math is genuinely simple, and once you see it, the whole "which model should I pull" question stops being a vibes-based decision.

## The embarrassing math

An LLM is, at its core, a huge pile of numbers. The weights. Each one is stored as a floating point value, and in the "full precision" world that usually means 16 bits (FP16 or BF16, same idea, different rounding philosophy, don't ask).

So the memory math is:

```
7B parameters × 2 bytes each = 14 GB of weights
```

That's before the KV cache, before activations, before the model remembers the last 40 messages in your conversation. 14GB is the *entry fee*.

Now here's the trick, and it's almost insulting in how simple it is. What if each weight only needed 8 bits instead of 16?

```
7B × 1 byte  = 7 GB   (8-bit)
7B × 0.5 bytes ≈ 3.5 GB  (4-bit)
```

Same model. Same 7 billion weights. Same brain. Just stored with fewer decimal places. A 7B model at 4-bit weights is a file of roughly 4.5GB, and that's why it fits on a laptop with a GPU I'd describe as "optimistic."

## What quantization actually is

The weights in a trained model are floats like `0.03127481`. The network really only needs to know that the number is "around 0.031." Quantization takes those 16-bit floats and rounds them down to 8-bit or 4-bit integers, along with a small scale factor per group of weights so the model knows where its own "zero" sits.

You are deliberately throwing away precision. Every single quantized weight is slightly wrong, by a tiny amount.

And here's the part that took me a while to accept: **the model barely notices.** A neural network has billions of parameters, and what computes your answer is the *pattern* across all of them, not any individual weight. One weight off by 0.0001 is noise that averages out. The network has enough redundant structure that small, consistent noise across its parameters gets absorbed rather than amplified.

It's lossy compression. Exactly like JPEG. You can't reconstruct the original file bit for bit, but at the right quality setting nobody can tell the difference, and the file is a quarter of the size. The "quality setting" is your quantization level, and like JPEG, there's a point where you can start to see the artifacts.

## The quality settings

If you've ever pulled a model from Ollama or downloaded a GGUF file, you've seen names like these:

- **F16 / BF16** - the full precision reference. 2 bytes per weight.
- **Q8_0** - 8-bit. About half the size of FP16, and for most models almost indistinguishable from it. The "I have a little extra VRAM and I'd like it back" option.
- **Q4_K_M** - 4-bit. Roughly a quarter of the size of FP16. The default. The sweet spot. What Ollama hands you when you say "give me the model."
- **Q5_K_M / Q6_K** - between 4 and 8. For when Q4 was fine but you had 2GB of VRAM to spare and a superiority complex.
- **Q3 and below** - below this, quality starts to show. Models get repetitive, instruction-following gets shakier, and the chat feels like you're talking to someone who just woke up from a nap they didn't choose. Only go here if your hardware literally has no other option.

The "K" in Q4_K_M is a detail worth knowing about but not memorizing. It refers to a block-based scheme where weights are grouped into blocks of 256, each block carrying its own scale and range information, which makes the 4-bit rounding a lot smarter than "just chop off the bottom bits." The S/M/L suffix (Q4_K_S, Q4_K_M) controls how aggressively the more important layers get bumped up to slightly higher precision. M means "medium mix," which in practice means "the one that works best most of the time." You do not need to derive this. You need to know Q4_K_M is the good default, and that's it.

## Which one do you pick

Honestly, most of the time: you don't pick, you just check that what got picked is sane.

- If the model fits at full precision, run it there. My [SmolLM2 FastAPI setup](/blog/smollm-as-a-service) is a 1.7B model loaded straight from HuggingFace in BF16, around 3.5GB of weights, and on 8GB of RAM it doesn't even break a sweat. Small model, full precision, zero quantization decisions to make.
- If it doesn't fit (which is your situation the moment you go 7B on consumer hardware), **Q8_0 if you have headroom, Q4_K_M otherwise.** Q4_K_M is the JPEG quality-85 of LLMs.
- Don't go below Q4 unless the hardware forces you, and if it does, go in with your eyes open: you're trading real quality to make the thing run at all.

And the one number that quietly matters more than any of this: the KV cache. Your weights might fit in 4.5GB, but a long conversation eats RAM on top of that, and a 7B model at Q4_K_M with a generous context window wants 6-8GB in practice. That's the gap between "the math says it fits" and "my laptop fans say otherwise."

## Two setups, two philosophies

It's fun to see where this lands on my own infrastructure, because I'm running both worlds at once. The homelab Ollama box is pure GGUF, Q4_K_M by default, and it's where I actually *live* - chatting with Qwen through Open WebUI, switching models mid-conversation, zero fuss. The FastAPI box is the experimental one: transformers, BF16, full precision, where I swap in [RAG and Chroma and random half-baked ideas](/blog/domain-context-to-your-llm-rag) and measure what breaks.

Neither setup is wrong. Full precision on a small model is the lazy, comfortable path. GGUF on a bigger model is the "I want the bigger brain and I'll pay in bits" path. Quantization is just the dial that lets you choose how much brain you want, in units of gigabytes.

## In a nutshell

Your 7B model doesn't fit in 4GB by magic. It fits because 16 bits of precision per weight is more precision than the network can use, and 4 bits of it is enough to keep being useful. Round the numbers, save a scale factor, and a 14GB brain becomes a 4.5GB one that still passes for your friend who reads a lot.

The next time you're staring at a model picker wondering why the 7B file is half the size of the 14B file from last month, you'll know: it's not a bug, it's not a scam, it's just fewer decimal places.

Go pull the Q4_K_M. You'll be surprised by what your hardware actually does.

---

That's all from me for today.

Signing out!

Paul
