# 06 — Micro-interacciones

## Filtros de categoría (pills)

### Pill activo

| Propiedad | Valor |
|---|---|
| Background | `rgba(236,72,153,0.12)` |
| Border-color | `rgba(236,72,153,0.35)` |
| Color | `#EC4899` |

### Comportamiento del grid al filtrar

- **Cards no seleccionadas**: `opacity: 0.3`, `filter: blur(1px) scale(0.98)`, transición `300ms`.
- **Cards seleccionadas**: entran con stagger de `60ms` (ver `05-animations.md`).

## Campo de búsqueda

### Estado por defecto

- Visible pero con `width: 0`, `opacity: 0`.

### Al hacer click en el ícono de búsqueda del navbar

- `width`: `0` → `200px`
- `opacity`: `0` → `1`
- Duración: `300ms`, curva `--ease-out-expo`
- El ícono de lupa hace `transform: rotate(90deg)`, convirtiéndose visualmente en una **X de cierre**.

## Botón de agregar al carrito

### Al click

- Botón: `transform: scale(0.92)` en `80ms` y rebota a `scale(1)` en `200ms` con `--ease-spring`.
- Aparece **toast de confirmación** (ver glassmorphism).
- El **contador del carrito** en el navbar hace el mismo efecto de scale.

```css
@keyframes cart-pop {
  0%   { transform: scale(1); }
  30%  { transform: scale(0.92); }
  100% { transform: scale(1); }
}
.btn-add.is-clicked { animation: cart-pop 280ms var(--ease-spring); }
```

## Lazy loading de imágenes de producto

### Antes de cargar — Shimmer

- Gradiente de `#161616` a `#1E1E1E` que se mueve de izquierda a derecha.
- `@keyframes`, `1.5s linear infinite`.

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.img-skeleton {
  background: linear-gradient(90deg, #161616, #1E1E1E, #161616);
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}
```

### Al cargar

- `opacity: 0` → `opacity: 1` en `300ms ease`.

## Toast de "agregado al carrito"

| Propiedad | Valor |
|---|---|
| Posición | Arriba a la derecha |
| Backdrop | `blur(16px)` |
| Fondo | `rgba(22,22,22,0.90)` |
| Borde izquierdo | `3px solid #EC4899` |
| Entrada | `translateX(100%)` → `translateX(0)`, `300ms`, `--ease-out-expo` |
| Auto-cierre | `3s` |

## Quick view modal

- Click en card abre modal con detalle de producto.
- Overlay: `rgba(0,0,0,0.7)`.
- Card del modal: `backdrop-filter: blur(24px)`, fondo `rgba(22,22,22,0.95)`, borde `rgba(255,255,255,0.10)`.

## Selector de talla

- Botones cuadrados de `40x40px`.
- Default: borde `rgba(255,255,255,0.08)`, texto `rgba(255,255,255,0.65)`.
- Hover: borde `rgba(255,255,255,0.20)`.
- Activo: borde `rgba(236,72,153,0.35)`, fondo `rgba(236,72,153,0.08)`, texto `#EC4899`.
- Sin stock: `opacity: 0.3`, `cursor: not-allowed`, línea diagonal con pseudo-elemento.

## Stepper de cantidad

- `[ - ] cantidad [ + ]` — botones circulares de `28px`.
- Click en `+`/`-`: número hace `translateY(-4px)` → `translateY(0)` con fade, `200ms`.

## Estados de feedback

| Estado | Color | Tipo |
|---|---|---|
| Éxito | `#22C55E` | Check ícono + Space Mono label |
| Error | `#EF4444` | Cross ícono + Space Mono label |
| Advertencia | `#F59E0B` | Triangle ícono |
| Info | `rgba(255,255,255,0.65)` | Solo texto |

**Nunca usar verde, rojo o amarillo en otros contextos** — están reservados para feedback de sistema.
