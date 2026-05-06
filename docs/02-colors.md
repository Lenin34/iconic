# 02 — Sistema de Colores

## Filosofía

La paleta se construye **desde el negro hacia afuera**. La jerarquía de profundidad existe únicamente en grises oscuros; el rosa es la única interrupción cromática y se reserva para señalizar acciones y valor (precio, CTA, estados activos).

## Fondos — Jerarquía de profundidad

| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#0A0A0A` | Fondo base absoluto, el más profundo |
| `--bg-section` | `#0F0F0F` | Fondo de secciones principales |
| `--bg-elevated` | `#161616` | Cards, nav, componentes elevados |
| `--bg-hover` | `#1E1E1E` | Hover state de cards, inputs activos |
| `--bg-divider` | `#2A2A2A` | Bordes sutiles, dividers |

## Acento primario — El color que vende

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#EC4899` | Rosa principal, CTAs, precios, badges activos |
| `--accent-hover` | `#DB2777` | Hover de botones, estado pressed |
| `--accent-soft` | `rgba(236, 72, 153, 0.15)` | Backgrounds de badges, chips seleccionados |
| `--accent-glow` | `rgba(236, 72, 153, 0.08)` | Glow difuso detrás de elementos hero |
| `--accent-light` | `#F9A8D4` | Hover de precios (rosa más claro) |

## Texto

| Token | Valor | Uso |
|---|---|---|
| `--text-primary` | `#FFFFFF` | Títulos principales, precios |
| `--text-secondary` | `rgba(255,255,255,0.65)` | Texto secundario, nombres de producto |
| `--text-tertiary` | `rgba(255,255,255,0.35)` | Labels, metadata, texto terciario |
| `--text-disabled` | `rgba(255,255,255,0.12)` | Placeholders, deshabilitado |

## Bordes

| Token | Valor | Uso |
|---|---|---|
| `--border-default` | `rgba(255,255,255,0.08)` | Borde estándar de cards |
| `--border-hover` | `rgba(255,255,255,0.14)` | Borde en hover |
| `--border-active` | `rgba(236,72,153,0.30)` | Borde de elementos activos/seleccionados |

## Reglas de aplicación

1. **Nunca usar negro puro `#000`**. El base es `#0A0A0A`.
2. **Nunca usar blanco puro como fondo**. El blanco es exclusivo del texto principal.
3. **El rosa nunca se usa para texto largo**, solo para precios, CTAs, números y elementos de acción.
4. **Los grises no decoran**, construyen jerarquía. Si dos elementos consecutivos pueden tener el mismo gris, deben tenerlo.
5. **Sin gradientes** salvo el shimmer de loading (de `#161616` a `#1E1E1E`).
