---
title: "AsisteSalas — computer lab access control"
description: "Desktop application that manages sign-in for students, teachers and administrators on university computer lab machines."
role: "Maintenance, redesign and new features"
---

## The challenge

The university's computer labs needed to know who uses each machine, for how long and under which rules. The existing system worked, but it had a dated interface, slow database access and uncovered cases such as power outages.

## The solution

I modernized and extended the application that runs on every lab machine:

- **Redesigned sign-in screen** for students, teachers and administrators, with a clock and a "split panel" layout.
- **Timed sessions** and on-screen notices that don't cover the sign-in area.
- **Emergency access** for administrators that works even when the database is unavailable.
- Handling of **shutdowns and power outages**, plus messages sent remotely from the administration system.
- **Optimized MySQL access** and fixes for concurrency bugs in the Swing interface.
- Windows integration through **JNA**.

## Design process

Before choosing the final screen, I explored 15 sign-in screen proposals and tested them at the lab machines' real resolutions (1366×768 and 1280×1024).

![AsisteSalas sign-in screen prototypes](/proyectos/asistesalas-prototipos.webp)

## Outcome

Version 2.0 with an automatic Windows installer and complete documentation: user manual, installation manual, project management and test report. It works together with [AdminSalas](/en/proyectos/adminsalas).
