---
title: "Detector y contador de objetos en tiempo real"
description: "Aplicación de escritorio que detecta, sigue y cuenta personas, vehículos y otros 78 tipos de objetos en video o desde la cámara, con YOLO11."
date: "2026-09-27"
role: "Desarrollo completo"
stack: ["Python", "YOLO11", "Ultralytics", "OpenCV", "ByteTrack", "Tkinter"]
image: "/proyectos/detector-objetos.webp"
featured: true
---

## El reto

Contar cuántas personas pasan por una calle, cuántos coches entran a un estacionamiento o cuántos corredores cruzan un punto de un maratón es un trabajo tedioso y propenso a errores si se hace a mano. Quería una herramienta que lo hiciera sola, en tiempo real, y que **no contara dos veces el mismo objeto** cuando se queda varios segundos en pantalla.

## La solución

Una aplicación de escritorio en Python que combina detección y seguimiento de objetos:

- **Detección con YOLO11** (Ultralytics): reconoce las **80 clases** del conjunto COCO, como personas, coches, motos, camiones, bicicletas y animales.
- **Seguimiento con ByteTrack:** cada objeto recibe un **ID** y se cuenta **una sola vez**, aunque aparezca en muchos cuadros seguidos.
- **Dos conteos a la vez:** objetos *en cuadro* en este momento y objetos *únicos* acumulados, desglosados por clase.
- **Fuentes:** cámara web o archivos de video.
- **Ajustes en vivo:** modelo (*n* rápido, *s* equilibrado, *m* preciso), resolución de análisis para objetos lejanos, umbral de confianza y filtro por clases.
- **Resultados:** capturas de pantalla, **grabación en MP4** del video anotado (H.264 con ffmpeg si está disponible) y **exportación a CSV** de los conteos.
- **Interfaz fluida:** la detección corre en un hilo aparte y se comunica con la interfaz Tkinter mediante una cola, así la ventana nunca se congela.

![Detección en el maratón de Londres: 18 objetos en cuadro, cada uno con su ID de seguimiento](/proyectos/detector-objetos-maraton.webp)

![Filtro por clases en un estacionamiento: solo personas, bicicletas y coches](/proyectos/detector-objetos-estacionamiento.webp)

## Resultado

Una herramienta que cuenta objetos de forma fiable en video real, con un rendimiento de unos 17 FPS con el modelo rápido (*n*) y 9 FPS con el equilibrado (*s*), y que permite guardar tanto el video anotado como los datos para analizarlos después.
