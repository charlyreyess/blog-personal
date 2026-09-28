---
title: "word-mcp — Microsoft Word automation"
description: "MCP server that lets an AI assistant control Word 365 live: create, edit and format documents."
role: "End-to-end development"
---

## The challenge

Generating Word documents with AI usually means exporting files and reviewing them afterwards. I wanted the assistant to work **directly in Word**, with the changes visible in real time.

## The solution

An **MCP** server that controls the **Word 365** desktop app through **COM** (pywin32):

- Changes appear **live** in the Word window.
- Tools to write text and apply colors, alignment and formatting.
- Proper thread handling: COM isn't *thread-safe*, so one Word instance is created per server thread.

## Outcome

A natural way to write and format documents with AI assistance, without leaving Word.
