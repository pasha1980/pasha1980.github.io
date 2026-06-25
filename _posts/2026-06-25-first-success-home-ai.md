---
layout: post
title: "First Success"
date: 2026-06-25
tags:
  - home-ai-lab
---

[Last time](../2026/05/getting-started-with-home-ai/) I set up a home lab for gaming, AI hosting, and network storage. The gaming part works fine. The AI part did not. Here is how I got it working.

## problem research

I needed a model that calls tools. Not one that hallucinates about npm projects in empty directories. I tried rewriting Ollama prompt templates and building a proxy to translate OpenAI tool calling into Anthropic format. Neither worked.

I ran `htop` and `nvtop` to check system load. The GPU showed zero usage.

I checked Ollama's GPU compatibility list and opened issues on their GitHub. Ollama does not support the gfx1201 cores in my Radeon RX 9070. A [PR exists](https://github.com/ollama/ollama/pull/10676), still in draft. Ollama falls back to CPU, loads a small model, and the output turns into guesswork.

## solution

I switched to llama.cpp with Vulkan support. Ollama does not offer a Vulkan backend, so I needed a different framework. llama.cpp is the obvious choice.

Building it takes more than one command:

```shell
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_VULKAN=ON
cmake --build build -j$(nproc)
```

I start the server with:

```shell
llama-server \
  --port 8888 \
  --host 0.0.0.0 \
  --alias 'qwen3.6-35b' \
  --ctx-size 64000 \
  -hf unsloth/Qwen3.6-35B-A3B-GGUF:UD-Q3_K_XL \
  --jinja \
  -ngl 30
```

Qwen 3.6 uses a mixture-of-experts architecture: 35B total parameters, 3B active per token. The `--ngl 30` flag offloads all 30 layers to my 16GB VRAM. `nvtop` shows GPU utilization. The model calls tools correctly, uses a 64K context window, and runs Jinja templates. I used this setup to draft this post.

## but there is one (not) tiny problem

I pointed `claude` at `localhost:8888` and it worked. Then I opened `nvtop` in a second terminal and the system crashed with a kernel panic.

I ran `nvtop` again. No crash. Ran it a third time. Same result. When `nvtop` runs, the system stays stable. When it does not, `llama.cpp` crashes the kernel. I suspect GPU memory management: when llama.cpp tries to map the remaining parameters to system RAM, something in the AMD driver panics. `nvtop` apparently changes the memory schedule enough to avoid the crash.

I created a user `systemd` service to keep `nvtop` running:

```service
[Unit]
Description=Keep nvtop running to prevent GPU panic
StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
ExecStart=/usr/bin/nvtop -d 2 -lCP
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
```

Installed at `~/.config/systemd/user/nvtop.service`:

```shell
systemctl --user daemon-reload
systemctl --user enable nvtop
systemctl --user start nvtop
```

The system stays up. It is not a real fix. I plan to dig into the nvtop source and the AMD GPU kernel driver to understand the memory path that triggers the panic. That is the next post.
