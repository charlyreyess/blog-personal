---
title: "Cómo desplegué este blog gratis con GitHub, Vercel y Supabase"
description: "El stack que uso para publicar webs sin pagar hosting: código en GitHub, despliegue automático en Vercel y base de datos en Supabase."
date: "2026-09-27"
tags: ["Despliegue", "Vercel", "Supabase"]
---

Este blog no me cuesta nada al mes. Está hecho con **Next.js**, el código vive en **GitHub**, se publica solo en **Vercel** y la newsletter guarda los emails en **Supabase**. Te cuento cómo encajan las piezas.

## El reparto de responsabilidades

| Servicio | Para qué lo uso |
| --- | --- |
| GitHub | Guardar y versionar el código |
| Vercel | Compilar y publicar la web en cada `git push` |
| Supabase | Base de datos PostgreSQL (suscriptores de la newsletter) |

## 1. Subir el código a GitHub

```bash
git init
git add .
git commit -m "primer commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

## 2. Importar el repositorio en Vercel

En Vercel eliges **Add New → Project**, seleccionas el repositorio y listo: detecta que es Next.js y configura el build. A partir de ahí, **cada `git push` a `main` redespliega la web** automáticamente, y cada rama obtiene su propia URL de previsualización.

## 3. Conectar Supabase

Del panel de Supabase necesitas la URL del proyecto y la *anon key*. Van en variables de entorno, nunca en el código:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

En el repo solo subo un `.env.example` con los nombres vacíos, y `.env*` está en el `.gitignore`.

> La *service role key* se salta todos los permisos. Nunca debe llevar el prefijo `NEXT_PUBLIC_` ni llegar al navegador.

## 4. Seguridad: Row Level Security

La *anon key* es pública, así que quien protege los datos es **RLS**. En la tabla de suscriptores solo permito *insertar*; nadie puede leer la lista con la clave pública.

## 5. Dominio propio (opcional)

En **Settings → Domains** de Vercel añades tu dominio, configuras los DNS que te indica y el HTTPS viene incluido.

## Límites del plan gratuito

- **Vercel Hobby:** 100 GB de tráfico al mes y solo para uso personal.
- **Supabase Free:** 500 MB de base de datos; el proyecto se pausa tras 7 días sin actividad.

Para un blog, un portfolio o una landing sobra. Para procesos 24/7 o cargas pesadas, mejor buscar otra opción.
