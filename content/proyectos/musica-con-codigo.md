---
title: "Música con código"
description: "Pista musical de 1:36 generada íntegramente con código en el navegador, con exportación a WAV."
date: "2026-09-15"
role: "Desarrollo y composición"
stack: ["JavaScript", "Tone.js", "Web Audio API"]
image: "/proyectos/musica-con-codigo.webp"
featured: false
---

## El reto

Explorar hasta dónde se puede llegar componiendo música **solo con código**, sin samples ni software de producción.

## La solución

Una página que sintetiza en tiempo real una pista completa con **Tone.js**:

- **Estructura musical completa:** intro, verso, *build*, coro, *breakdown*, coro final y outro.
- **Instrumentos sintetizados:** bombo (MembraneSynth), platillos (MetalSynth), caja y efectos (NoiseSynth), bajo, pads y melodía.
- **Filtros automatizados** que se abren y cierran para crear tensión y descanso.
- **Exportación a WAV** con renderizado *offline*.

## Resultado

Una demostración de síntesis y programación musical en el navegador que produce una pista descargable.
