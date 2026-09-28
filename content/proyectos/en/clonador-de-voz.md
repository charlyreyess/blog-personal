---
title: "Local voice cloner"
description: "100% local voice cloning and text-to-speech with a web interface: a 10-second sample is enough to read any text in that voice."
role: "End-to-end development"
---

## The challenge

Voice cloning tools usually require uploading audio to third-party servers, creating accounts or paying per use. I wanted something **private** that works offline on any computer, with or without a graphics card.

## The solution

An application with a web interface that runs the **Qwen3-TTS 1.7B** model (GGUF format) with **llama.cpp**, entirely on the user's machine:

- **Sample-based cloning:** record from the browser or upload a file of about 10 seconds.
- **10 languages**, including Spanish, English, French and Japanese.
- **CPU and GPU:** detects and prioritizes the dedicated GPU, with the option to choose the mode for each generation.
- **Reusable voice library** and a **history** of everything generated.
- **Long texts:** split into sentences, synthesized and joined automatically.
- **Live progress** with a progress bar, the current chunk and the llama.cpp log.

## Outcome

A tool that generates audio in seconds without anything leaving the computer, with step-by-step installation docs and a responsible-use section.
