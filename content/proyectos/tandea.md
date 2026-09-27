---
title: "Tandea — tandas de ahorro en línea"
description: "Plataforma de ahorro grupal rotativo (tandas) con cobros en línea, sorteo de turnos y pago automático al participante en turno."
date: "2026-09-02"
role: "Desarrollo full stack"
stack: ["Node.js", "Express", "PostgreSQL", "Sequelize", "Flutter", "Conekta", "SPEI (STP)", "Supabase"]
featured: true
---

## El reto

Las tandas (o cundinas) son una forma muy común de ahorro en México, pero se organizan a mano: hay que perseguir aportes, llevar cuentas en libretas o chats y confiar en que el dinero llegue a quien le toca. Quería digitalizar todo el ciclo sin perder la dinámica de confianza del grupo.

## La solución

Una plataforma completa, organizada como monorepo con API REST y aplicación Flutter:

- **Ciclo de vida de la tanda:** un administrador define el monto, la frecuencia y los lugares; los usuarios se unen y, al completarse, se **sortean los turnos** y la tanda se activa.
- **Cobros en línea con Conekta:** tarjeta, **OXXO** o **SPEI** mediante checkout hospedado, con confirmación por *webhook*.
- **Dispersión automática:** al recaudarse el periodo completo, el monto se envía al participante en turno por **SPEI (STP)**, con proveedor conmutable (simulado, STP o Conekta).
- **Cuentas y seguridad:** JWT, inicio de sesión con **Google**, `helmet` y limitación de peticiones en autenticación.
- **Desglose fiscal** de cada aporte (aporte, comisión e IVA), notificaciones en la app y correo con Brevo.

## Arquitectura

| Pieza | Tecnología |
| --- | --- |
| API | Node.js · Express · Sequelize · PostgreSQL |
| Cliente | Flutter (web y móvil) |
| Archivos | Supabase Storage |
| Despliegue previsto | Railway (API) · Supabase (BD) · Cloudflare Pages (web) |

## Resultado

Un producto con modelo de dominio completo (usuarios, tandas, participantes, pagos y dispersiones con sus estados), integración real con pasarelas de pago mexicanas y un flujo de despliegue documentado.
