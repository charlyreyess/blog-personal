---
title: "eclipse-mcp — Java analysis for AI"
description: "MCP server that exposes Eclipse's Java analysis engine (JDT LS) as tools for AI assistants such as Claude."
role: "End-to-end development"
---

## The challenge

AI assistants edit Java code without knowing whether it compiles or where each class is used. I wanted to give them the same tools an IDE uses, without having to open Eclipse.

## The solution

An **MCP (Model Context Protocol)** server that talks to the **Eclipse JDT Language Server** over LSP and provides these tools:

- **Compilation diagnostics** and project builds.
- **Go to definition** and **find references**.
- **Rename** symbols across the whole project.
- **Code completion** and **formatting**.
- Applying text and *workspace* edits.

It includes a PowerShell script that downloads and installs JDT LS automatically.

## Outcome

The AI can check that a change compiles and navigate a real Java project before proposing modifications. I use it to maintain [AdminSalas](/en/proyectos/adminsalas) and [AsisteSalas](/en/proyectos/asistesalas).
