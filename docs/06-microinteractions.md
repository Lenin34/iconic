# 06 — Micro-interacciones

> Implementadas con React + Framer Motion + Tailwind v4. Patrones inspirados en Landa.

## Filtros de categoría (pills)

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function CategoryFilters({ categories, products }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? products.filter(p => p.category.slug === active) : products;

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActive(isActive ? null : cat.slug)}
              className={`
                px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[2px] border transition-all duration-200
                ${isActive
                  ? 'bg-[rgba(236,72,153,0.12)] border-[rgba(236,72,153,0.35)] text-accent'
                  : 'border-border-default text-text-secondary hover:border-border-hover'}
              `}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={active || 'all'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8"
        >
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
```

## Campo de búsqueda expandible

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function SearchToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence>
        {open && (
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            type="search"
            placeholder="Buscar..."
            className="bg-bg-elevated border border-border-default rounded-full px-4 py-2 text-sm text-white outline-none focus:border-border-active"
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(o => !o)}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-9 h-9 grid place-items-center text-text-secondary hover:text-white"
      >
        {open ? '×' : '🔍'}
      </motion.button>
    </div>
  );
}
```

## Botón de agregar al carrito

```tsx
'use client';
import { motion, useAnimationControls } from 'framer-motion';
import { easing } from '@/lib/motion';

export function AddToCartButton({ productId }: { productId: number }) {
  const controls = useAnimationControls();
  const counterControls = useAnimationControls();

  const handleClick = async () => {
    controls.start({
      scale: [1, 0.92, 1],
      transition: { duration: 0.28, ease: easing.spring, times: [0, 0.3, 1] },
    });
    counterControls.start({
      scale: [1, 0.92, 1],
      transition: { duration: 0.28, ease: easing.spring, times: [0, 0.3, 1] },
    });
    // POST /api/cart ...
    showToast('Agregado al carrito');
  };

  return (
    <motion.button
      animate={controls}
      onClick={handleClick}
      className="w-8 h-8 rounded-full bg-accent grid place-items-center text-white hover:bg-accent-hover transition-colors"
    >
      +
    </motion.button>
  );
}
```

## Lazy loading de imágenes — `next/image` + shimmer

`next/image` ya hace lazy loading automáticamente. Para el shimmer mientras carga, usamos `placeholder="blur"` o un skeleton custom:

```tsx
import Image from 'next/image';

<Image
  src={product.images[0]}
  alt={product.name}
  width={400}
  height={400}
  className="object-contain transition-opacity duration-300"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // shimmer SVG
/>
```

Skeleton shimmer manual (cuando no usamos `placeholder="blur"`):

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

## Toast de "agregado al carrito"

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand'; // o React Context si prefieres

const useToast = create<{ message: string | null; show: (m: string) => void }>((set) => ({
  message: null,
  show: (message) => {
    set({ message });
    setTimeout(() => set({ message: null }), 3000);
  },
}));

export function Toast() {
  const message = useToast(s => s.message);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="
            fixed top-6 right-6 z-[2000] backdrop-blur-[16px]
            bg-[rgba(22,22,22,0.90)] border-l-[3px] border-accent
            px-5 py-4 rounded-lg text-white text-sm
          "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Quick view modal

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';

export function QuickViewModal({ product, onClose }) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/70"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="
              fixed inset-0 z-[1001] m-auto max-w-3xl h-fit
              backdrop-blur-[24px] bg-[rgba(22,22,22,0.95)]
              border border-[rgba(255,255,255,0.10)] rounded-[14px] p-8
            "
          >
            {/* contenido producto */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

## Selector de talla

```tsx
{sizes.map(({ value, in_stock }) => (
  <button
    key={value}
    disabled={!in_stock}
    onClick={() => setSize(value)}
    className={`
      w-10 h-10 border rounded font-mono text-xs transition-all
      ${size === value
        ? 'border-[rgba(236,72,153,0.35)] bg-[rgba(236,72,153,0.08)] text-accent'
        : 'border-border-default text-text-secondary hover:border-border-hover'}
      ${!in_stock ? 'opacity-30 cursor-not-allowed line-through' : ''}
    `}
  >
    {value}
  </button>
))}
```

## Stepper de cantidad

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';

<div className="flex items-center gap-3">
  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full border border-border-default">−</button>
  <AnimatePresence mode="wait">
    <motion.span
      key={qty}
      initial={{ y: -4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 4, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="font-mono text-sm w-6 text-center"
    >
      {qty}
    </motion.span>
  </AnimatePresence>
  <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 rounded-full border border-border-default">+</button>
</div>
```

## Estados de feedback

| Estado | Color token | Uso |
|---|---|---|
| Éxito | `text-success` | Confirmaciones |
| Error | `text-error` | Validaciones, fallos de API |
| Advertencia | `text-warning` | Stock bajo |
| Info | `text-text-secondary` | Solo texto |

**Estos colores están reservados para feedback de sistema. No usarlos en otros contextos.**
