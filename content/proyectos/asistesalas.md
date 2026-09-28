---
title: "AsisteSalas — control de acceso en salas de cómputo"
description: "Aplicación de escritorio que controla el inicio de sesión de alumnos, docentes y administradores en los equipos de las salas de cómputo universitarias."
date: "2026-09-20"
role: "Mantenimiento, rediseño y nuevas funciones"
client: "Universidad del Mar"
stack: ["Java", "Swing", "MySQL", "JNA"]
image: "/proyectos/asistesalas.webp"
imageFit: "contain"
imageBg: "#efefef"
featured: true
order: 99
---

## El reto

Las salas de cómputo de la universidad necesitaban saber quién usa cada equipo, durante cuánto tiempo y bajo qué reglas. El sistema existente funcionaba, pero tenía una interfaz anticuada, accesos lentos a la base de datos y casos no cubiertos, como los cortes de energía.

## La solución

Modernicé y amplié la aplicación que corre en cada equipo de la sala:

- **Pantalla de acceso rediseñada** para alumnos, docentes y administradores, con reloj y un diseño de "panel dividido".
- **Sesiones con cronómetro** y avisos en pantalla que no tapan la zona de acceso.
- **Acceso de emergencia** para el administrador que funciona aunque la base de datos no esté disponible.
- Manejo de **apagado y cortes de energía**, y mensajes enviados de forma remota desde el sistema de administración.
- **Optimización del acceso a MySQL** y corrección de errores de concurrencia en la interfaz Swing.
- Integración con Windows mediante **JNA**.

## Proceso de diseño

Antes de elegir la pantalla final, exploré 15 propuestas de pantalla de acceso y las probé en las resoluciones reales de los equipos de la sala (1366×768 y 1280×1024).

![Prototipos de la pantalla de acceso de AsisteSalas](/proyectos/asistesalas-prototipos.webp)

## Resultado

Una versión 2.0 con instalador automático para Windows y documentación completa: manual de usuario, manual de instalación, gestión del proyecto y reporte de pruebas. Trabaja junto con [AdminSalas](/proyectos/adminsalas).
