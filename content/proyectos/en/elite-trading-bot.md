---
title: "Elite Trading Bot"
description: "Automated trading bot with a Grid strategy on Binance, built with hexagonal architecture and an API-driven control panel."
role: "Architecture design and development"
---

## The challenge

Build a bot that can trade in real time without mixing the strategy logic with the details of the exchange or the database, so it can be tested and its parts replaced without fear.

## The solution

- **Hexagonal architecture:** the domain (Grid strategy, risk management and entities) doesn't depend on anything external; use cases orchestrate, and adapters connect to Binance, PostgreSQL and Redis.
- **Real-time worker** that listens to the price *websocket* and evaluates the strategy on every *tick*.
- **REST API with FastAPI** to start, stop and check the bot's status from a dashboard.
- **Async persistence** with SQLAlchemy and migrations with Alembic.
- **Testnet by default:** it's tested against Binance's Spot Testnet, with no real money.
- Deployment with **Docker Compose** and automated tests with pytest.

## Outcome

A solid, extensible foundation for automated trading, where the strategy can be tested in isolation and going to production is just a configuration change.
