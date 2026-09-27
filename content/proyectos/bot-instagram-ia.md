---
title: "Bot de Instagram con IA"
description: "Asistente que responde mensajes directos y comentarios de Instagram con un modelo de lenguaje y una personalidad configurable."
date: "2026-09-26"
role: "Desarrollo completo"
stack: ["Python", "Flask", "Instagram Graph API", "Webhooks", "LLM"]
featured: false
---

## El reto

Responder mensajes y comentarios en Instagram consume mucho tiempo, pero un bot que conteste a todo sin control puede ser peor que no contestar. Buscaba automatizar sin perder el toque humano.

## La solución

- **Webhooks de Meta** recibidos con Flask y verificados con **firma HMAC**.
- **Respuestas con un modelo de lenguaje** y una **personalidad** definida en un archivo de texto editable.
- **Memoria corta por conversación** para mantener el contexto de los últimos mensajes.
- **Deduplicación de eventos**, porque Meta reintenta los webhooks.
- **Pausa automática:** si el dueño de la cuenta escribe a mano en un chat, el bot se calla en esa conversación durante un tiempo configurable.
- Respuesta a comentarios **opcional**, activable por configuración.

## Resultado

Un asistente ligero que atiende la bandeja de entrada de forma natural y cede el control a la persona cuando hace falta.
