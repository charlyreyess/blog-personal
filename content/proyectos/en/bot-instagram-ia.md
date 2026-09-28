---
title: "AI Instagram bot"
description: "Assistant that replies to Instagram direct messages and comments using a language model with a configurable personality."
role: "End-to-end development"
---

## The challenge

Answering Instagram messages and comments takes a lot of time, but a bot that replies to everything without control can be worse than not replying at all. I wanted to automate it without losing the human touch.

## The solution

- **Meta webhooks** received with Flask and verified with an **HMAC signature**.
- **Replies from a language model** with a **personality** defined in an editable text file.
- **Short per-conversation memory** to keep the context of the latest messages.
- **Event deduplication**, because Meta retries webhooks.
- **Automatic pause:** if the account owner writes manually in a chat, the bot stays quiet in that conversation for a configurable time.
- **Optional** replies to comments, enabled through configuration.

## Outcome

A lightweight assistant that handles the inbox naturally and hands control back to a person when needed.
