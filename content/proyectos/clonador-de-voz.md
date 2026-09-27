---
title: "Clonador de voz local"
description: "Clonación de voz y texto a voz 100 % local con interfaz web: 10 segundos de muestra bastan para leer cualquier texto con esa voz."
date: "2026-09-11"
role: "Desarrollo completo"
stack: ["Python", "llama.cpp", "Qwen3-TTS", "HTML/CSS/JS", "ffmpeg"]
image: "/proyectos/clonador-de-voz.png"
featured: true
---

## El reto

Las herramientas de clonación de voz suelen requerir subir audio a servidores de terceros, crear cuentas o pagar por uso. Quería algo **privado**, que funcionara sin conexión y en cualquier ordenador, con o sin tarjeta gráfica.

## La solución

Una aplicación con interfaz web que ejecuta el modelo **Qwen3-TTS 1.7B** (formato GGUF) con **llama.cpp**, todo en la máquina del usuario:

- **Clonación por muestra:** grabar desde el navegador o subir un archivo de unos 10 segundos.
- **10 idiomas**, entre ellos español, inglés, francés y japonés.
- **CPU y GPU:** detecta la GPU dedicada y la prioriza, con opción de elegir el modo en cada generación.
- **Biblioteca de voces** reutilizables e **historial** de todo lo generado.
- **Textos largos:** se dividen por frases, se sintetizan y se unen automáticamente.
- **Progreso en vivo** con barra, bloque actual y registro de llama.cpp.

## Resultado

Una herramienta que genera audio en segundos sin que nada salga del ordenador, con documentación paso a paso para instalarla y una sección de uso responsable.
