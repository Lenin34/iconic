# 03 — Tipografía

Tres fuentes con **roles estrictamente separados, nunca intercambiables**. Todas se cargan desde Google Fonts.

## Space Grotesk — La voz editorial

Para títulos, nombres de producto, precios y descripciones. Es la fuente "humana" del sitio.

| Uso | Peso | Tamaño | Letter-spacing | Line-height |
|---|---|---|---|---|
| Titulares hero | 700 | `clamp(32px, 5vw, 52px)` | `-1.5px` | `1.05` |
| Nombres de producto | 500 | `14px` | `-0.3px` | — |
| Precios | 700 | `16px` | — | — |
| Cuerpo / descripciones | 400 | `14px` | — | `1.7` |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

## Space Mono — La voz técnica/identidad

Para badges, labels, marcas, IDs, timestamps y metadata. Es lo que da el aire de "ficha técnica de tienda física".

| Uso | Peso | Tamaño | Letter-spacing | Caso |
|---|---|---|---|---|
| Badges (NEW, HOT, DROP) | 400 | `9-10px` | `2.5-3px` | UPPERCASE |
| Labels de sección | 400 | `9px` | `3px` | UPPERCASE |
| Marcas de producto (NIKE, ADIDAS) | 400 | `9px` | `2px` | UPPERCASE |
| IDs de producto, timestamps | 400 | `11px` | — | — |
| Footer, coordenadas, metadata | 400 | `10px` | — | — |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## Courier Prime — Para recibos y confirmaciones

**Solo aparece en páginas de orden/confirmación de compra.** Simula un ticket físico de zapatería.

| Uso | Tamaño | Line-height |
|---|---|---|
| Ticket de compra | `13px` | `2` |

```html
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap" rel="stylesheet">
```

## Reglas estrictas

1. **Nunca mezclar Space Grotesk con Space Mono en la misma frase** salvo que sea por diseño explícito (ej. precio + label).
2. **Courier Prime jamás aparece en el catálogo o landing**, solo en `/order/{id}` y emails de confirmación.
3. **El letter-spacing en mayúsculas es obligatorio**. Texto en mayúsculas sin tracking se ve amateur.
4. **Cargar las 3 fuentes con `display=swap`** para no bloquear el render.
5. **Preconnect a Google Fonts** en el `<head>` para reducir latencia.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## Tokens CSS

```css
:root {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
  --font-receipt: 'Courier Prime', ui-monospace, monospace;
}
```
