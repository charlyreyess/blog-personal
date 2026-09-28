# Blog personal — Next.js + Vercel + Supabase

**Web:** https://blog-personal-snowy.vercel.app · Cada `git push` a `main` se publica automáticamente en Vercel.

Blog personal hecho con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS v4**. Los artículos son archivos Markdown y la newsletter guarda los emails en **Supabase**. Se despliega gratis en **Vercel** siguiendo la guía de [notfound404.es](https://www.notfound404.es/es/blog/desplegar-web-gratis).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # rellena las variables (opcional para ver la web)
npm run dev                  # http://localhost:3000
```

## Personalizar

- **Tus datos** (nombre, bio, redes, habilidades): `src/lib/site.ts`
- **Artículos**: añade un `.md` en `content/posts/` con este encabezado:

```md
---
title: "Título del artículo"
description: "Resumen de una frase."
date: "2026-10-01"
tags: ["Etiqueta"]
draft: false
---
```

- **Biografía**: `content/biografia.md`. El texto va debajo de los `---`; la trayectoria (línea de tiempo) va en `timeline`, dentro del encabezado.
- **Proyectos**: copia `content/proyectos/_plantilla.md`, renómbralo (ej. `tienda-online.md`) y rellénalo. Las capturas van en `public/proyectos/`. Con `featured: true` el proyecto aparece en la portada.
- **Colores y tipografía**: variables en `src/app/globals.css`

## Despliegue gratis

1. **GitHub**
   ```bash
   git init
   git add .
   git commit -m "primer commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```
2. **Supabase**: crea un proyecto y ejecuta `supabase/schema.sql` en el *SQL Editor* (crea la tabla `subscribers` con RLS activado).
3. **Vercel**: *Add New → Project* → importa el repositorio. En *Environment Variables* añade:
   - `NEXT_PUBLIC_SITE_URL` (la URL final del sitio)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Cada `git push` a `main` redespliega automáticamente.
5. *(Opcional)* Dominio propio en **Settings → Domains**.

> Seguridad: la *service role key* de Supabase no se usa en este proyecto y nunca debe llevar el prefijo `NEXT_PUBLIC_`.

## Correos

Los correos (mensaje de contacto, aviso de nuevo suscriptor y newsletter) usan el diseño de `src/lib/email-template.ts`: cabecera de cielo, tarjeta blanca y azul `#0251fe`.

- **Newsletter:** copia el HTML de `emails/newsletter.html` en Resend → *Broadcasts* → *Create* (editor HTML) y cambia el título, el texto, el enlace y la imagen del artículo. Resend sustituye `{{{RESEND_UNSUBSCRIBE_URL}}}` por el enlace de baja.
- **Regenerar la plantilla** tras cambiar el diseño:
  ```bash
  NEXT_PUBLIC_SITE_URL=https://blog-personal-snowy.vercel.app npx tsx scripts/generar-correos.mts
  ```

## Idiomas (español / inglés)

- El español vive en la raíz (`/proyectos`) y el inglés con prefijo (`/en/proyectos`). El botón **ES / EN** de la cabecera lleva a la misma página en el otro idioma.
- **Textos de la interfaz:** `src/i18n/dictionaries.ts`. **Perfil** (titular, servicios, arquitectura, proceso): `src/lib/site.ts`.
- **Biografía en inglés:** `content/biografia.en.md`.
- **Proyecto en inglés:** crea `content/proyectos/en/<mismo-nombre>.md` con `title`, `description` y `role` en el encabezado y el texto traducido. Si no existe, se muestra la versión en español.
