# 08 — Stack Técnico

## Resumen

Frontend monolítico — inspirado en GitHub/Landa — sobre:

- **Bootstrap 5** (personalizado, override total de tokens)
- **Vanilla CSS** (variables CSS como única fuente de verdad)
- **JavaScript moderno** (vanilla, sin frameworks)
- **SweetAlert2** (con tema custom)
- **Fetch API** (para transiciones de página tipo SPA-lite)
- **IntersectionObserver** (para animaciones de entrada)

## Variables CSS globales

Todo el sistema de tokens vive en `:root` (ver `10-design-tokens.md`):

- Colores
- Curvas de easing
- Spacing (`--space-xs: 4px` … `--space-3xl: 4rem`)
- Tipografías
- Radii, sombras, durations

**Por qué importa**: los overrides de Bootstrap no entran en conflicto porque operas sobre tu propio sistema de tokens.

## Bootstrap 5 — Qué usar y qué ignorar

### ✅ Usar

- Sistema de **grid de 12 columnas** para layout interno de páginas.
- **Utilities de spacing** (`m-*`, `p-*`).
- **Sistema de breakpoints** (`sm`, `md`, `lg`, `xl`, `xxl`).
- **Modales** (completamente restyled con tus variables CSS).
- **Offcanvas** (carrito lateral).
- **Collapse** (acordeón de FAQ, filtros).

### ❌ Ignorar / Sobrescribir

- **Colores de Bootstrap** — sobrescribir todas las `--bs-*` con tu paleta.
- **Sombras** por defecto.
- **Border-radius** por defecto.
- **Botones sin personalizar** — todos los `.btn` deben pasar por tu sistema.

```css
:root {
  --bs-primary: var(--accent);
  --bs-body-bg: var(--bg-base);
  --bs-body-color: var(--text-secondary);
  --bs-border-color: var(--border-default);
  --bs-border-radius: 14px;
}
```

## SweetAlert2 — Tema custom

```js
const Swal = window.Swal.mixin({
  background: '#161616',
  color: 'rgba(255,255,255,0.85)',
  confirmButtonColor: '#EC4899',
  cancelButtonColor: '#2A2A2A',
  customClass: {
    popup: 'iconic-swal-popup',
    title: 'iconic-swal-title',
    confirmButton: 'iconic-swal-confirm',
  },
});
```

```css
.iconic-swal-popup {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  font-family: var(--font-display);
}
.iconic-swal-title { font-weight: 700; letter-spacing: -0.5px; }
.iconic-swal-confirm { font-family: var(--font-mono); letter-spacing: 2px; text-transform: uppercase; font-size: 11px; }
```

**Usos**:
- Confirmación de compra
- Eliminación del carrito
- Confirmación de remoción de favoritos
- Alertas críticas

## Fetch API — Transiciones tipo SPA

Las transiciones de página (catálogo → producto → carrito) usan Fetch para que las animaciones de entrada/salida funcionen.

### Patrón

```js
async function navigateTo(url) {
  // 1. Animar salida
  document.querySelector('main').classList.add('is-leaving');
  await wait(200);

  // 2. Pedir solo el fragmento
  const res = await fetch(url, { headers: { 'X-Fragment': 'main' } });
  const html = await res.text();

  // 3. Reemplazar y animar entrada
  document.querySelector('main').outerHTML = html;
  history.pushState({}, '', url);
  initAnimations();
}
```

### Backend (Symfony/Twig u otro)

- Endpoint detecta header `X-Fragment: main`.
- Si está presente: retorna **solo el bloque main**, sin layout.
- Si no: retorna la página completa con layout (importante para SEO y deep links).

## IntersectionObserver — Setup recomendado

**Un único observer** que observe todos los elementos con clase `.animate-in`.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0, 10);
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
```

```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms var(--ease-out-expo), transform 500ms var(--ease-out-expo);
}
.animate-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```html
<div class="card animate-in" data-delay="0">...</div>
<div class="card animate-in" data-delay="60">...</div>
<div class="card animate-in" data-delay="120">...</div>
```

## Performance — Métricas objetivo

| Métrica | Objetivo |
|---|---|
| LCP | `< 2.5s` |
| CLS | `< 0.1` |
| INP | `< 200ms` |
| Tamaño de página inicial | `< 200KB` (sin imágenes) |
| Imágenes de producto | WebP, `srcset` responsivo, `loading="lazy"` (excepto LCP) |

## Estructura de archivos sugerida

```
iconic/
├── docs/                    ← (este directorio)
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── tokens.css       ← variables :root
│   │   │   ├── base.css         ← reset + tipografía
│   │   │   ├── bootstrap-overrides.css
│   │   │   ├── components/
│   │   │   │   ├── navbar.css
│   │   │   │   ├── product-card.css
│   │   │   │   ├── hero.css
│   │   │   │   └── ...
│   │   │   └── main.css         ← imports
│   │   ├── js/
│   │   │   ├── observer.js
│   │   │   ├── navigation.js
│   │   │   ├── cart.js
│   │   │   ├── cursor.js
│   │   │   └── main.js
│   │   ├── img/
│   │   └── fonts/
│   └── pages/
│       ├── catalog.html
│       ├── product.html
│       └── ...
└── README.md
```
