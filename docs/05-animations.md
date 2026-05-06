# 05 — Animaciones

> El corazón de la propuesta.

## Reglas de oro

1. **CSS puro primero**, JavaScript solo cuando CSS no alcanza.
2. **Ninguna animación supera 400ms** (excepto el shimmer de loading que es loop).
3. **Ninguna animación usa `ease-in` como curva única**.
4. **Las animaciones confirman intención**, no entretienen.

## Curvas de easing personalizadas

Definir en `:root`:

```css
:root {
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

| Curva | Cuándo usar |
|---|---|
| `--ease-out-expo` | Entradas dramáticas, hovers de imagen, transiciones de página |
| `--ease-out-quart` | Hovers sutiles, movimientos de UI estándar |
| `--ease-in-out-soft` | Toggles, cambios de estado bidireccionales |
| `--ease-spring` | Confirmaciones (click de carrito, cursor expansion) |

## Hover en Product Cards

| Elemento | Cambio | Duración | Curva |
|---|---|---|---|
| Card raíz | `translateY(-4px)` | `280ms` | `--ease-out-quart` |
| Borde | `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.16)` | `280ms` | `--ease-out-quart` |
| Imagen producto | `scale(1.04)` | `350ms` | `--ease-out-expo` |
| Precio | `#EC4899` → `#F9A8D4` | `150ms` | — |
| Botón `+` | `scale(1.1)` + fondo `#DB2777` | `200ms` | — |

**Implementación**: un solo `transition` en el elemento raíz de la card y transiciones específicas en los hijos.

## Hover en botones CTA

- **Sin scale**. Background shift: `#EC4899` → `#DB2777` en `180ms`.
- **Resplandor difuso**: pseudo-elemento `::after` con mismo color, `opacity: 0` → `opacity: 0.15` y `transform: scale(1.5)`. Sin `box-shadow` pesado.

```css
.btn-cta {
  position: relative;
  background: var(--accent);
  transition: background 180ms var(--ease-out-quart);
}
.btn-cta::after {
  content: '';
  position: absolute; inset: 0;
  background: var(--accent);
  border-radius: inherit;
  opacity: 0;
  transform: scale(1);
  transition: opacity 220ms, transform 220ms var(--ease-out-expo);
  z-index: -1;
}
.btn-cta:hover { background: var(--accent-hover); }
.btn-cta:hover::after { opacity: 0.15; transform: scale(1.5); }
```

## Page load — Entrada de elementos

Usar `IntersectionObserver` para detectar cuándo cada sección entra al viewport.

| Elemento | Estado inicial | Estado final | Duración | Curva |
|---|---|---|---|---|
| Títulos | `opacity: 0; translateY(24px)` | `opacity: 1; translateY(0)` | `500ms` | `--ease-out-expo` |
| Cards | `opacity: 0; translateY(16px)` + stagger `60ms` | `opacity: 1; translateY(0)` | `400ms` | `--ease-out-expo` |
| Badges/labels | `opacity: 0; translateX(-8px)` | `opacity: 1; translateX(0)` | `300ms` | `--ease-out-expo` |

- Clase activadora: `.is-visible`
- Threshold del observer: `0.15` del viewport
- `transition-delay` se maneja con `data-delay="60"` multiplicado por índice en JS

## Navbar scroll behavior

Implementar con `requestAnimationFrame` o `scroll` event con throttle:

- Al scroll: `backdrop-filter` se activa con `transition: 300ms`.
- En `scrollY > 400`: aparece indicador de progreso de lectura de `2px`, fondo `#EC4899`, animado con `width`.

## Marquee / Ticker

- CSS puro con `@keyframes` y `transform: translateX(-50%)`.
- Contenido **duplicado en HTML** para loop seamless.
- Velocidad: `30s linear infinite`.
- Al hover del container: `animation-play-state: paused`.

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-track { animation: marquee 30s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
```

## Transición entre páginas (Fetch API)

| Fase | Animación | Duración |
|---|---|---|
| Salida del actual | `opacity: 0; translateY(-8px)` | `200ms` |
| Entrada del nuevo | `opacity: 0; translateY(8px)` → `opacity: 1; translateY(0)` | `300ms` |

- El **navbar no participa**, solo el área `<main>`.
- Si el backend es Symfony/Twig: endpoint que retorna **solo el fragmento** del `<main>`, no el layout completo.

## Cursor personalizado (opcional pero recomendado)

| Propiedad | Valor |
|---|---|
| Posición | `fixed` |
| Pointer events | `none` |
| Z-index | `9999` |
| Default | Círculo `8px`, fondo `#EC4899`, `border-radius: 50%`, `mix-blend-mode: difference` |
| Hover sobre card/botón | `scale(4)` con `transition: transform 250ms var(--ease-spring)` |

- Posición seguida con `mousemove` y **lerp suave** en `requestAnimationFrame` para que el cursor vaya ligeramente detrás del puntero.
- **Ocultar en mobile/touch devices** vía `@media (pointer: coarse)`.

## Reduced motion

Respetar siempre:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
