---
title: "Elite Trading Bot"
description: "Bot de trading automatizado con estrategia Grid sobre Binance, construido con arquitectura hexagonal y un panel de control por API."
date: "2026-09-01"
role: "Diseño de arquitectura y desarrollo"
stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker", "Binance API"]
image: "/proyectos/elite-trading-bot.webp"
featured: false
---

## El reto

Construir un bot capaz de operar en tiempo real sin mezclar la lógica de la estrategia con los detalles del exchange o de la base de datos, para poder probarlo y cambiar piezas sin miedo.

## La solución

- **Arquitectura hexagonal:** el dominio (estrategia Grid, gestión de riesgo y entidades) no depende de nada externo; los casos de uso orquestan y los adaptadores conectan con Binance, PostgreSQL y Redis.
- **Worker en tiempo real** que escucha el *websocket* de precios y evalúa la estrategia en cada *tick*.
- **API REST con FastAPI** para iniciar, detener y consultar el estado del bot desde un panel.
- **Persistencia asíncrona** con SQLAlchemy y migraciones con Alembic.
- **Modo testnet por defecto:** se prueba con el Spot Testnet de Binance, sin dinero real.
- Despliegue con **Docker Compose** y pruebas automatizadas con pytest.

## Resultado

Una base sólida y extensible para trading automatizado, donde la estrategia se puede probar de forma aislada y el paso a producción es un cambio de configuración.
