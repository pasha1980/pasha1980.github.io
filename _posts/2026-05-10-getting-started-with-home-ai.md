---
layout: post
title: "Getting started with Home AI"
date: 2026-05-10
tags:
  - home-ai-lab
---

For a long time I wanted to have a powerful PC to play every new game I want to. That's a common situation, I think, for most of us. And when you grow up, you get money so you can afford it. Cool.

But that would not be an interesting story, if I just downloaded Steam on it and click on "Play". That's way more interesting!

### hardware

I'm not a PC builder, I'm a software developer, so I won't go into GPU details. It's AMD Radeon 9070. That's it.

That's pretty much enough for almost all common games. But not for AI. Unfortunately.

If you go to HuggingFace and try to search for AI models that I could run with Radeon 9070, it shows you only 7B (maybe 9B) models in Q4 quantization. That's sad, because I paid a lot for that GPU. I wish someone would tell me to check it before I spend money on it...

### os

Let's say it together loud. CachyOS! Yes, I followed that Reddit hype and installed it. I know, I know, there's plenty of alternatives, and I promise, I'll try them all. But I wanted just something that I can install and make it run. Fast, smooth and with latest software (I use Arch, btw, rolling releases is not an issue when you get used to suffer).

Why not Windows? Actually, I tried it. The combination of Windows compatibility for games and WSL's powers for Linux-related things (such as self-hosting or running AI models) sounds like a real-world solution and a very pragmatic approach. But in reality it failed — many times. The first time I tried to install Win11, it refused to work with my hardware. After fighting it for a while, I realized that everything just works really poorly. Task Manager stops responding after a few clicks, certain games don't run properly, and mirroring the network for WSL also works really badly. Rather than spending time learning Windows from the beginning like I did with Linux, it sounded more reasonable to switch back.

### first ai try

That's the part when things become interesting. 

That started from TikTok videos, where every "AI enthusiast" loudly tells you "you can use Claude Code with Ollama... for free!". Sounds great. Especially in the current market situation when token prices go up.

And it's pretty straightforward. You need to download Ollama (one-line command on their main page), download Claude Code (the same), and run

```sh
ollama launch claude
```

Wow! I can select open-source models for free! Even Gemma 4 is available! Fantastic!

And... it's not. It simply doesn't start and fails.

You may think that I simply need to choose another AI model. My setup is not prepared for this class of model. And you're absolutely right!

The issue is — simpler models can't use Claude Code tooling. A simple prompt like `list the files from directory` ends up in long hallucinations about an npm project in an empty directory.

### debugging

So let's see what's going wrong. First of all, we need to see what `ollama launch claude` actually does.

Despite many other things, like downloading a model, running a server and so on, it simply

- set "ANTHROPIC_BASE_URL" to localhost:8080 (or whatever port they like)
- set "ANTHROPIC_API_KEY" to 'ollama' (just mock)
- run `claude`

That's it. That's not the feature of Ollama, that's just a wrapper of Claude Code runner.

But the problem still exists:
- Big models won't run
- Even running models can't use Claude Code tooling

You should know that there are several tooling protocols that exist. Both — just JSON formatted in their own way. Nothing special.

So it means, I need to choose specific models, right?

After trying for so long and searching for the exact tool on the Ollama website, I didn't manage to find one that both runs well and calls tooling.

I'm screwed

### am I failed

Kinda. But that's not the end. To keep this from getting really long and boring — there will be a new part with the success story.
