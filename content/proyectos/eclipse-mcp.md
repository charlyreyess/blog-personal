---
title: "eclipse-mcp — análisis de Java para IA"
description: "Servidor MCP que expone el motor de análisis de Java de Eclipse (JDT LS) como herramientas para asistentes de IA como Claude."
date: "2026-09-11"
role: "Desarrollo completo"
stack: ["Python", "MCP", "Eclipse JDT LS", "LSP", "Java"]
featured: false
---

## El reto

Los asistentes de IA editan código Java sin saber si compila ni dónde se usa cada clase. Quería darles las mismas herramientas que usa un IDE, sin tener que abrir Eclipse.

## La solución

Un servidor **MCP (Model Context Protocol)** que habla con el **Eclipse JDT Language Server** mediante el protocolo LSP y ofrece estas herramientas:

- **Diagnósticos de compilación** y compilación del proyecto.
- **Ir a la definición** y **buscar referencias**.
- **Renombrar** símbolos en todo el proyecto.
- **Autocompletar** y **formatear** código.
- Aplicar ediciones de texto y de *workspace*.

Incluye un script de PowerShell que descarga e instala el JDT LS automáticamente.

## Resultado

La IA puede comprobar que un cambio compila y navegar un proyecto Java real antes de proponer modificaciones. Lo uso en el mantenimiento de [AdminSalas](/proyectos/adminsalas) y [AsisteSalas](/proyectos/asistesalas).
