---
title: "Tandea — online savings circles"
description: "Rotating group savings platform (tandas) with online payments, turn draws and automatic payouts to the member whose turn it is."
role: "Full stack development"
---

## The challenge

*Tandas* (rotating savings circles) are a very common way to save in Mexico, but they're organized by hand: someone has to chase contributions, keep track in notebooks or group chats, and trust that the money reaches whoever's turn it is. I wanted to digitize the whole cycle without losing the group's trust dynamic.

## The solution

A complete platform, organized as a monorepo with a REST API and a Flutter app:

- **Savings circle lifecycle:** an admin defines the amount, frequency and number of seats; users join and, once it's full, **turns are drawn** and the circle becomes active.
- **Online payments with Conekta:** card, **OXXO** or **SPEI** through a hosted checkout, confirmed via *webhook*.
- **Automatic payouts:** once a period is fully collected, the amount is sent to the member in turn via **SPEI (STP)**, with a switchable provider (simulated, STP or Conekta).
- **Accounts and security:** JWT, **Google** sign-in, `helmet` and rate limiting on authentication.
- **Tax breakdown** of every contribution (contribution, fee and VAT), in-app notifications and email through Brevo.

![Tandea's "How it works" screen](/proyectos/tandea-como-funciona.webp)

## Architecture

| Piece | Technology |
| --- | --- |
| API | Node.js · Express · Sequelize · PostgreSQL |
| Client | Flutter (web and mobile) |
| Files | Supabase Storage |
| Deployment | Cloudflare Pages (web, live) · Supabase (DB and files) · Railway (API) |

## Outcome

A product with a complete domain model (users, circles, members, payments and payouts, each with its own states), real integration with Mexican payment gateways and a documented deployment workflow.
