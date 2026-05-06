# 03 — Tipografía

Tres fuentes con **roles estrictamente separados, nunca intercambiables**. Cargadas vía `next/font/google` (igual que Landa).

## Carga con `next/font/google`

`frontend/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-secondary">
        {children}
      </body>
    </html>
  );
}
```

Esto inyecta `--font-space-grotesk`, `--font-space-mono` y `--font-courier-prime` como variables CSS, que ya están mapeadas a `--font-display`, `--font-mono` y `--font-receipt` en `@theme inline` (ver `10-design-tokens.md`).

## Space Grotesk — La voz editorial

Para títulos, nombres de producto, precios y descripciones.

| Uso | Peso | Tamaño | Letter-spacing | Line-height |
|---|---|---|---|---|
| Titulares hero | 700 | `clamp(32px, 5vw, 52px)` | `-1.5px` | `1.05` |
| Nombres de producto | 500 | `14px` | `-0.3px` | — |
| Precios | 700 | `16px` | — | — |
| Cuerpo / descripciones | 400 | `14px` | — | `1.7` |

```tsx
<h1 className="font-display font-bold text-[clamp(32px,5vw,52px)] tracking-[-1.5px] leading-[1.05]">
  Sneakers que importan.
</h1>

<h3 className="font-display font-medium text-sm tracking-[-0.3px] text-white/90">
  Air Max 90 Black
</h3>

<p className="font-display font-bold text-base text-accent">$2,499</p>
```

## Space Mono — La voz técnica/identidad

Para badges, labels, marcas, IDs, timestamps y metadata.

| Uso | Peso | Tamaño | Letter-spacing | Caso |
|---|---|---|---|---|
| Badges (NEW, HOT, DROP) | 400 | `9-10px` | `2.5-3px` | UPPERCASE |
| Labels de sección | 400 | `9px` | `3px` | UPPERCASE |
| Marcas de producto | 400 | `9px` | `2px` | UPPERCASE |
| IDs, timestamps | 400 | `11px` | — | — |
| Footer, metadata | 400 | `10px` | — | — |

```tsx
<span className="font-mono text-[9px] tracking-[2.5px] uppercase text-accent">
  NEW
</span>

<p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary">
  NIKE
</p>
```

## Courier Prime — Recibos y confirmaciones

**Solo aparece en `/order/{id}` y emails de confirmación.** Simula un ticket físico de zapatería.

| Uso | Tamaño | Line-height |
|---|---|---|
| Ticket de compra | `13px` | `2` |

```tsx
<div className="font-receipt text-[13px] leading-[2] text-text-secondary">
  ICONIC                      CDMX
  --------------------------------
  ORDER #2891                 2024
  ...
</div>
```

## Reglas estrictas

1. **Nunca mezclar Space Grotesk y Space Mono en la misma frase** salvo que sea por diseño explícito (ej. precio + label).
2. **Courier Prime jamás aparece en catálogo o landing**.
3. **Letter-spacing en mayúsculas es obligatorio**. Texto UPPERCASE sin tracking se ve amateur.
4. **`display: 'swap'`** en todos los `next/font/google` para no bloquear el render.
5. `next/font` ya hace **self-hosting + preload automático**. No hace falta `<link preconnect>` a Google Fonts.

## Utilities Tailwind disponibles tras configurar `@theme inline`

```
font-display  → Space Grotesk
font-mono     → Space Mono
font-receipt  → Courier Prime
```
