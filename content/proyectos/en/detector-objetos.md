---
title: "Real-time object detector and counter"
description: "Desktop app that detects, tracks and counts people, vehicles and 78 other kinds of objects in video or from a camera, using YOLO11."
role: "End-to-end development"
---

## The challenge

Counting how many people walk down a street, how many cars enter a parking lot or how many runners pass a point in a marathon is tedious and error-prone by hand. I wanted a tool that does it on its own, in real time, and that **never counts the same object twice** when it stays on screen for several seconds.

## The solution

A Python desktop application that combines object detection and tracking:

- **Detection with YOLO11** (Ultralytics): recognizes the **80 classes** of the COCO dataset, such as people, cars, motorcycles, trucks, bicycles and animals.
- **Tracking with ByteTrack:** every object gets an **ID** and is counted **only once**, even if it appears in many consecutive frames.
- **Two counts at once:** objects *in frame* right now and *unique* objects accumulated, broken down by class.
- **Sources:** webcam or video files.
- **Live settings:** model (*n* fast, *s* balanced, *m* accurate), analysis resolution for distant objects, confidence threshold and class filter.
- **Outputs:** screenshots, **MP4 recording** of the annotated video (H.264 with ffmpeg when available) and **CSV export** of the counts.
- **Smooth interface:** detection runs on a separate thread and talks to the Tkinter UI through a queue, so the window never freezes.

![London Marathon detection: 18 objects in frame, each with its own tracking ID](/proyectos/detector-objetos-maraton.webp)

![Class filter in a parking lot: only people, bicycles and cars](/proyectos/detector-objetos-estacionamiento.webp)

## Outcome

A tool that reliably counts objects in real-world video, running at about 17 FPS with the fast model (*n*) and 9 FPS with the balanced one (*s*), and that saves both the annotated video and the data for later analysis.
