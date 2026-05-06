# 04 — Layout y Estructura

## Sistema de Grid

| Propiedad | Valor |
|---|---|
| Container máximo | `1280px` |
| Alineación | Centrado |
| Padding lateral | `clamp(1rem, 4vw, 3rem)` |
| Grid base | CSS Grid con `gap: 12px` estándar |
| Grid hero | `gap: 16px` |

**Regla**: no usar las columnas fijas de Bootstrap para el layout general. Sí usar el sistema de 12 columnas de Bootstrap **dentro** de secciones específicas cuando convenga.

## Navbar

| Propiedad | Valor |
|---|---|
| Posición | `sticky; top: 0; z-index: 100` |
| Fondo | `rgba(10, 10, 10, 0.85)` |
| Backdrop | `backdrop-filter: blur(20px) saturate(180%)` |
| Borde inferior | `0.5px solid rgba(255,255,255,0.06)` |
| Altura desktop | `64px` |
| Altura mobile | `56px` |
| Logo | Space Grotesk 700, con el punto final en `#EC4899` |

### Comportamiento de scroll

- En `scrollY > 80px`: el borde inferior pasa a `rgba(255,255,255,0.10)` con `transition: 300ms`.
- En `scrollY > 400px`: aparece **indicador de progreso de lectura** de `2px` de altura, fondo `#EC4899`, animado con `width` CSS.

## Hero Section

| Propiedad | Valor |
|---|---|
| Altura | `min-height: calc(100vh - 64px)` |
| Layout | Asimétrico |
| Texto izquierda | 55% |
| Área visual derecha | 45% |

### Elementos decorativos del hero

Dos círculos posicionados en absoluto arriba a la derecha, **sin overflow visible**:

- Círculo grande: `600px`, `border: 1px solid rgba(255,255,255,0.03)`
- Círculo medio: `400px`, `border: 1px solid rgba(255,255,255,0.02)`

**Reglas**:
- Sin imágenes de fondo.
- Sin gradientes en el hero.
- La profundidad viene del **posicionamiento de capas de texto** y los círculos de borde.

## Product Grid

| Breakpoint | Columnas | Gap |
|---|---|---|
| Desktop (≥1024px) | `repeat(4, 1fr)` | `12px` |
| Tablet (≥640px) | `repeat(3, 1fr)` | `12px` |
| Mobile (<640px) | `repeat(2, 1fr)` | `12px` |

Cada card:
- `border-radius: 14px`
- `background: #161616`
- `border: 0.5px solid rgba(255,255,255,0.08)`

## Product Card — Anatomía exacta

### Área de imagen

| Propiedad | Valor |
|---|---|
| Fondo | `#1F1F1F` |
| Border-radius | `10px` |
| Altura desktop | `200px` |
| Object-fit | `contain` (centrado) |
| Padding | `1rem` |

### Badge (NEW / HOT / DROP)

| Propiedad | Valor |
|---|---|
| Posición | `absolute; top: 12px; right: 12px` |
| Tipografía | Space Mono `9px` |
| Fondo | `rgba(236,72,153,0.12)` |
| Borde | `1px solid rgba(236,72,153,0.25)` |
| Border-radius | `100px` |
| Padding | `3px 8px` |

### Body de la card

| Propiedad | Valor |
|---|---|
| Padding | `0 1rem 1rem` |

**Marca**: Space Mono, `9px`, letter-spacing `2px`, color `rgba(255,255,255,0.35)`, `margin-bottom: 4px`.

**Nombre**: Space Grotesk 500, `14px`, color `rgba(255,255,255,0.9)`.

### Fila inferior

- **Izquierda**: precio — Space Grotesk 700, `16px`, color `#EC4899`.
- **Derecha**: botón agregar — círculo de `32px`, fondo `#EC4899`, ícono `+`.

## Anatomía visual

```
┌──────────────────────────────┐
│                              │
│   ┌──────────────────┐       │
│   │                  │ [NEW] │ ← badge absoluto
│   │   imagen 200px   │       │
│   │                  │       │
│   └──────────────────┘       │
│                              │
│   NIKE                       │ ← Space Mono 9px
│   Air Max 90 Black           │ ← Space Grotesk 14px
│                              │
│   $2,499         ( + )       │ ← precio + botón circular
└──────────────────────────────┘
```
