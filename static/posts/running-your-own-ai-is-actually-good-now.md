---
title: "Running Your Own AI Is Actually Good Now"
published_at: 2026-05-10T12:00:00.000Z
snippet: "Open WebUI and Qwen changed what local AI actually feels like to use."
---

<img alt="Happy Local AI machine" height="782" src="../blog-images/local-ai.webp" width="1563" />

# Running Your Own AI Is Actually Good Now

I've been running a local AI setup on my homelab for a while, and I'll be honest — for the longest time it felt like a fun experiment more than anything actually useful. The models were slow, the interfaces were janky, and half the time I'd just go back to whatever cloud service I was using anyway.

That changed recently. And the culprit is two things: **Open WebUI** and **Qwen**.

## The Setup

If you're not familiar, [Open WebUI](https://openwebui.com/) is a self-hosted chat interface that connects to [Ollama](https://ollama.com/) — which handles the actual model management on your machine. Think of it as your own private ChatGPT, running entirely on hardware you own, with no data leaving your network 😌.

Qwen is Alibaba's open model family. The 2.5 series specifically has been getting a lot of attention, and after running it for a few weeks I get why.

My server is nothing special — a repurposed laptop running Ubuntu Server with a modest GPU. I'm pulling somewhere around 8-18 tokens per second depending on which Qwen variant I have loaded. That's fast enough to feel snappy in conversation. It's not instant like hitting a cloud API, but it doesn't feel like watching paint dry either.

## Why Open WebUI Specifically

I've tried a few frontends for Ollama. Most of them are fine. Open WebUI is better than fine.

The interface is clean, it supports multiple models through one unified view, it has conversation history that actually works, and — this is the one that got me — it has a system prompt editor per conversation. That last part sounds like a small thing but it means you can set up different "modes" without doing anything clever. One conversation is your coding assistant, another is configured for more free-form brainstorming. No friction.

It also has a model switcher mid-conversation. So when you start with a smaller, faster model for quick questions and then realize you want to think harder about something, you just switch — the conversation context carries over. That's a genuinely nice UX detail.

## Qwen Is Doing a Lot of Heavy Lifting

Here's the part that surprised me. I expected local models to feel noticeably dumber than what I was used to from hosted services. Qwen 2.5 doesn't. For most of what I actually need day-to-day — drafting, explaining things, debugging, rubber-ducking ideas — it keeps up.

The smaller variants (`1.5b`, `3b`) are fast and handle simple stuff well. The `7b` model is where it starts feeling genuinely capable, and on my hardware it's still usable — just slower. If you have a beefier GPU, you're going to be very happy with it.

One thing I've noticed: Qwen handles mixed-language input pretty gracefully, which matters to me since I work across English and German regularly. It's not perfect, but it's impressively not bad.

## The Part Where I Admit This Is Just Nice

There's something that's hard to articulate about running AI that you actually own. I find myself using it more freely, for weirder and more half-baked stuff, precisely because there's no account tied to it, no queries being logged somewhere, no terms of service I'm passively violating every time I paste in client code.

It's a small thing, but it changes how you interact with it.

Also — and I say this as someone who spends way too much time on infra — the setup is genuinely not that painful anymore. Ollama handles model downloads with one command. Open WebUI runs in Docker. You can have the whole thing up in an afternoon and the main thing you'll spend time on is deciding which model to pull first.

## Should You Bother?

If you already run a homelab: yes, absolutely. The barrier to entry is low and the payoff is real.

If you don't have a homelab but have a reasonably modern machine with a decent GPU sitting around: also probably yes. Ollama runs on Linux, Mac, and Windows. You don't need a server.

If you're on CPU only: it's usable, just slower. The 1.5b model is workable. Anything bigger starts to test your patience.

---

That's all from me today. Go pull a model and see what your hardware can do 🤙

Signing out! Paul
