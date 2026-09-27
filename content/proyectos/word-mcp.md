---
title: "word-mcp — automatización de Microsoft Word"
description: "Servidor MCP que permite a un asistente de IA controlar Word 365 en vivo: crear, editar y dar formato a documentos."
date: "2026-09-11"
role: "Desarrollo completo"
stack: ["Python", "MCP", "COM (pywin32)", "Word 365"]
featured: false
---

## El reto

Generar documentos de Word con IA suele implicar exportar archivos y revisarlos después. Quería que el asistente trabajara **directamente sobre Word**, viendo los cambios en tiempo real.

## La solución

Un servidor **MCP** que controla la aplicación de escritorio **Word 365** mediante **COM** (pywin32):

- Los cambios se ven **en vivo** en la ventana de Word.
- Herramientas para escribir texto, aplicar colores, alineación y formato.
- Manejo correcto de hilos: COM no es *thread-safe*, así que se crea una instancia de Word por hilo del servidor.

## Resultado

Una forma natural de redactar y dar formato a documentos con ayuda de la IA, sin salir de Word.
