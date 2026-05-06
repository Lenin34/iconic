# 05 — Animaciones (Framer Motion 12)

> El corazón de la propuesta. Mismas reglas de movimiento que documentábamos antes — ahora implementadas con Framer Motion como en Landa.

## Reglas de oro

1. **Tailwind utilities + CSS transitions** para hovers simples (más performante).
2. **Framer Motion** para animaciones por scroll, stagger, page transitions y gestos complejos.
3. **Ninguna animación supera 400ms** (excepto loops como shimmer).
4. **Ninguna animación usa `ease-in` como curva única**.
5. **Las animaciones confirman intención**, no entretienen.

## Curvas de easing

`frontend/lib/motion.ts`:

```ts
export const easing = {
  outExpo:    [0.19, 1, 0.22, 1],
  outQuart:   [0.25, 1, 0.5, 1],
  inOutSoft:  [0.4, 0, 0.2, 1],
  spring:     [0.34, 1.56, 0.64, 1],
} as const;
```

| Curva | Cuándo usar |
|---|---|
| `outExpo` | Entradas dramáticas, hover de imagen, page transitions |
| `outQuart` | Hovers sutiles, movimientos de UI estándar |
| `inOutSoft` | Toggles, cambios de estado bidireccionales |
| `spring` | Confirmaciones (click de carrito, cursor) |

## Hover en Product Cards

Hovers básicos vía Tailwind + transitions (sin Framer):

```tsx
<article className="
  group bg-bg-elevated border border-border-default rounded-[14px]
  transition-[transform,border-color] duration-[280ms] ease-[cubic-bezier(0.25,1,0.5,1)]
  hover:-translate-y-1 hover:border-border-hover
">
  <div className="overflow-hidden rounded-[10px] bg-bg-image">
    <img className="transition-transform duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]" />
  </div>
  <p className="text-accent transition-colors duration-150 group-hover:text-accent-light">
    $2,499
  </p>
</article>
```

| Elemento | Cambio | Duración | Curva |
|---|---|---|---|
| Card raíz | `translateY(-4px)` | `280ms` | `outQuart` |
| Borde | `0.08` → `0.16` | `280ms` | `outQuart` |
| Imagen | `scale(1.04)` | `350ms` | `outExpo` |
| Precio | `accent` → `accent-light` | `150ms` | — |

## Hover en botones CTA

**Sin scale**, solo background shift + glow con pseudo-elemento:

```tsx
<button className="
  relative bg-accent text-white px-6 py-3 rounded-full font-mono uppercase tracking-[2px] text-[11px]
  transition-colors duration-[180ms]
  hover:bg-accent-hover
  before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-accent
  before:opacity-0 before:scale-100 before:-z-10
  before:transition-all before:duration-[220ms] before:ease-[cubic-bezier(0.19,1,0.22,1)]
  hover:before:opacity-15 hover:before:scale-150
">
  Comprar
</button>
```

## Entrada por scroll — `whileInView` (patrón Landa)

```tsx
'use client';
import { motion } from 'framer-motion';
import { easing } from '@/lib/motion';

export default function ProductCard({ product, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: easing.outExpo }}
      className="..."
    >
      {/* ... */}
    </motion.article>
  );
}
```

## Stagger de hijos con variants

```tsx
'use client';
import { motion } from 'framer-motion';
import { easing } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easing.outExpo },
  },
};

export function ProductGrid({ products }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {products.map(p => (
        <motion.article key={p.id} variants={item}>
          {/* ... */}
        </motion.article>
      ))}
    </motion.div>
  );
}
```

## Entrada por elemento

| Elemento | Estado inicial | Estado final | Duración | Curva |
|---|---|---|---|---|
| Títulos | `opacity: 0; y: 24` | `opacity: 1; y: 0` | `500ms` | `outExpo` |
| Cards | `opacity: 0; y: 16` + stagger `60ms` | `opacity: 1; y: 0` | `400ms` | `outExpo` |
| Badges/labels | `opacity: 0; x: -8` | `opacity: 1; x: 0` | `300ms` | `outExpo` |

## Page transitions con `template.tsx`

`frontend/app/template.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { easing } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easing.outExpo }}
    >
      {children}
    </motion.div>
  );
}
```

> A diferencia de `layout.tsx`, `template.tsx` se **remonta** en cada navegación, lo que dispara la animación de entrada.

## Navbar scroll behavior

```tsx
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0.06, 0.10]);
  const progressWidth = useTransform(scrollY, (v) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return v > 400 ? `${(v / max) * 100}%` : '0%';
  });

  return (
    <motion.nav
      style={{ '--border-op': borderOpacity } as any}
      className="sticky top-0 z-[100] h-16 backdrop-blur-[20px] backdrop-saturate-[180%] bg-[rgba(10,10,10,0.85)]"
    >
      {/* ... */}
      <motion.div
        style={{ width: progressWidth }}
        className="absolute bottom-0 left-0 h-[2px] bg-accent"
      />
    </motion.nav>
  );
}
```

## Marquee / Ticker — CSS puro (más eficiente que Framer aquí)

```tsx
<div className="overflow-hidden">
  <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
    <span>NUEVO DROP · NIKE AIR MAX · NUEVO DROP · NIKE AIR MAX ·</span>
    <span aria-hidden>NUEVO DROP · NIKE AIR MAX · NUEVO DROP · NIKE AIR MAX ·</span>
  </div>
</div>
```

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

## Cursor personalizado (opcional)

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const scale = useMotionValue(1);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const enter = () => scale.set(4);
    const leave = () => scale.set(1);
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y, scale]);

  return (
    <motion.div
      style={{ x: springX, y: springY, scale }}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 [@media(pointer:coarse)]:hidden"
    />
  );
}
```

## Reduced motion

Framer Motion respeta automáticamente `prefers-reduced-motion`. También:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
