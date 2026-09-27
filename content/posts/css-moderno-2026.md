---
title: "5 características de CSS moderno que ya uso a diario"
description: "Container queries, :has(), clamp(), color-mix() y view transitions: menos JavaScript y componentes más robustos."
date: "2026-09-24"
tags: ["CSS", "Diseño"]
---

CSS ha cambiado muchísimo. Estas son las cinco características que más han simplificado mi código.

## 1. Container queries

El componente se adapta al espacio de su contenedor, no al de la ventana:

```css
.card-wrapper { container-type: inline-size; }

@container (min-width: 32rem) {
  .card { grid-template-columns: 10rem 1fr; }
}
```

## 2. El selector `:has()`

Un "selector padre" que por fin existe:

```css
.field:has(input:invalid) { border-color: crimson; }
```

## 3. Tipografía fluida con `clamp()`

```css
h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
```

## 4. `color-mix()` para variantes de color

```css
.button:hover { background: color-mix(in oklch, var(--accent), black 15%); }
```

## 5. View Transitions

Animaciones entre páginas con una línea de CSS en navegaciones del mismo origen:

```css
@view-transition { navigation: auto; }
```

Y recuerda respetar siempre `prefers-reduced-motion`.
