---
title: "Cómo construí un detector y contador de objetos con YOLO11"
description: "Detección, seguimiento y conteo de personas y vehículos en tiempo real con Python, YOLO11, ByteTrack y una interfaz en Tkinter."
date: "2026-09-27"
tags: ["Python", "Visión por computadora", "IA"]
---

Contar objetos en un video parece sencillo: detectas, sumas y listo. El problema aparece en el segundo cuadro. Si un coche se queda parado diez segundos a 30 FPS, un detector ingenuo lo cuenta **300 veces**. En este artículo explico cómo resolví eso en mi [detector y contador de objetos](/proyectos/detector-objetos).

![La aplicación analizando una calle de Bangkok](/proyectos/detector-objetos.webp)

## Las piezas

| Pieza | Para qué |
| --- | --- |
| **YOLO11** (Ultralytics) | Detectar objetos en cada cuadro (80 clases COCO) |
| **ByteTrack** | Seguir cada objeto entre cuadros y darle un ID |
| **OpenCV** | Leer la cámara o el video y dibujar sobre los cuadros |
| **Tkinter** | La interfaz de escritorio |

```bash
pip install ultralytics opencv-python pillow lap
```

## 1. Detectar y seguir en una sola llamada

Ultralytics permite detectar y seguir a la vez con `track()`. El parámetro `persist=True` hace que el seguimiento continúe entre cuadros, que es justo lo que da a cada objeto un ID estable:

```python
res = modelo.track(frame, persist=True, conf=self.conf,
                   classes=self.clases, imgsz=self.imgsz, verbose=False)[0]
```

- `conf` descarta las detecciones con poca confianza.
- `classes` filtra, por ejemplo, solo personas y coches.
- `imgsz` sube la resolución de análisis para detectar objetos lejanos, a costa de velocidad.

## 2. Contar una sola vez cada objeto

La clave está en separar dos conteos:

- **En cuadro:** cuántos objetos hay *ahora mismo*. Se recalcula en cada cuadro.
- **Únicos:** cuántos objetos *distintos* han pasado. Se guarda un conjunto de IDs por clase y un ID repetido no suma.

```python
en_cuadro = Counter()
for c, i in zip(clases, ids):
    nombre = res.names[c]
    en_cuadro[nombre] += 1
    if i is not None:
        vistos[nombre].add(i)   # un set: el mismo ID no se cuenta dos veces
```

Un detalle importante: un objeto recién aparecido puede no tener ID todavía. Para que el total nunca sea menor que lo que se ve en pantalla, tomo el máximo de ambos:

```python
totales = {k: max(len(vistos.get(k, ())), en_cuadro.get(k, 0))
           for k in set(vistos) | set(en_cuadro)}
```

![Maratón de Londres: cada corredor tiene su propio ID de seguimiento](/proyectos/detector-objetos-maraton.webp)

## 3. Que la interfaz no se congele

YOLO tarda decenas de milisegundos por cuadro. Si se ejecuta en el mismo hilo que Tkinter, la ventana deja de responder. La solución es un **hilo de detección** que envía los resultados por una **cola**; la interfaz la revisa periódicamente y solo pinta lo último que llegó.

## 4. Guardar los resultados

- **Capturas** del cuadro anotado.
- **Grabación en MP4:** si ffmpeg está instalado, se codifica en H.264 enviándole los cuadros en crudo por `stdin`; si no, se usa el códec `mp4v` de OpenCV.
- **CSV** con una fila por clase: `clase, en_cuadro, total_unicos`.

## Qué modelo elegir

| Modelo | Velocidad | Precisión | Cuándo usarlo |
| --- | --- | --- | --- |
| `yolo11n` | Muy rápido | Buena | Cámara en vivo o equipos sin GPU |
| `yolo11s` | Rápido | Mejor | El equilibrio para la mayoría de videos |
| `yolo11m` | Más lento | Alta | Escenas con muchos objetos pequeños |

En mis pruebas obtuve unos **17 FPS con `yolo11n`** y **9 FPS con `yolo11s`**: suficiente para analizar video grabado y para usar la cámara en vivo con el modelo *n*.

## Ideas para seguir

- Contar solo los objetos que **cruzan una línea**, para medir entradas y salidas.
- Mapas de calor de por dónde se mueve la gente.
- Una versión web que procese el video en el servidor.

Si tienes un caso de uso en mente, [escríbeme](/contacto).
