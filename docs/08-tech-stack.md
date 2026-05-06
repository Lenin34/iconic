# 08 — Stack Técnico

> Replicamos el stack de `Github/landa` exactamente. La identidad visual es nuestra (Obsidian Chrome), la base técnica es la misma.

## ⚠️ Aviso crítico

**Next.js 16 tiene cambios disruptivos respecto a versiones anteriores.** APIs, convenciones y estructura de archivos pueden diferir de la documentación pública o tu memoria. Antes de escribir código:

```bash
# Leer la documentación dentro del proyecto
ls frontend/node_modules/next/dist/docs/
```

(Esta es la convención de Landa — ver `frontend/AGENTS.md`.)

## Frontend — Next.js 16 + React 19

```json
{
  "dependencies": {
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "framer-motion": "^12.38.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

### Decisiones clave

- **App Router** (no Pages Router). Estructura `app/` con `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`.
- **Server Components por defecto**. `'use client'` solo cuando hay interactividad (hooks, eventos, Framer Motion).
- **TypeScript estricto** (`strict: true` en `tsconfig.json`).
- **next/image** para todas las imágenes de producto.
- **next/font/google** para cargar Space Grotesk + Space Mono + Courier Prime sin FOIT.
- **Metadata API** para SEO (no `<Head>`).

## Tailwind CSS v4

Tailwind v4 cambia paradigma: **no más `tailwind.config.js` como fuente principal**. Los tokens se declaran en CSS con `@theme inline`.

`app/globals.css`:

```css
@import "tailwindcss";

:root {
  --bg-base: #0A0A0A;
  --bg-section: #0F0F0F;
  --bg-elevated: #161616;
  --accent: #EC4899;
  --accent-hover: #DB2777;
  /* ... resto de tokens en docs/10-design-tokens.md */
}

@theme inline {
  --color-bg-base: var(--bg-base);
  --color-bg-elevated: var(--bg-elevated);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --font-display: var(--font-space-grotesk);
  --font-mono: var(--font-space-mono);
  --font-receipt: var(--font-courier-prime);
}
```

Esto habilita utilities como `bg-bg-elevated`, `text-accent`, `font-display` directamente.

## Framer Motion 12

Reemplaza completamente el `IntersectionObserver` manual. Patrones clave:

### Entrada por scroll (`whileInView`)

```tsx
'use client';
import { motion } from 'framer-motion';

<motion.article
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.4, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
>
  {/* product card */}
</motion.article>
```

### Hover de card

```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
>
```

### Stagger de hijos

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {products.map(p => <motion.article key={p.id} variants={item}>...</motion.article>)}
</motion.div>
```

### Page transitions

Con App Router se usa `template.tsx` (no `layout.tsx`) para que se remonte en cada navegación:

```tsx
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## Backend — Laravel (igual que Landa)

```
backend/
├── app/Http/Controllers/Api/
│   ├── ProductController.php
│   ├── CategoryController.php
│   ├── CartController.php
│   └── OrderController.php
├── app/Models/
│   ├── Product.php
│   ├── Category.php
│   ├── Order.php
│   └── ...
├── routes/api.php
├── database/migrations/
├── compose.yaml          # Docker
└── ...
```

### Endpoints sugeridos (REST)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/products?status=published&category=nike` | Lista de productos |
| `GET` | `/api/products/{slug}` | Detalle de producto |
| `GET` | `/api/categories` | Categorías |
| `POST` | `/api/cart` | Crear/actualizar carrito (con `cart_token`) |
| `GET` | `/api/cart/{token}` | Obtener carrito |
| `POST` | `/api/orders` | Crear orden |
| `GET` | `/api/orders/{id}` | Detalle orden |

### Cliente API en frontend (estilo Landa)

`frontend/lib/api.ts`:

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  currency: 'MXN';
  images: string[];
  sizes: { value: string; in_stock: boolean }[];
  category: { id: number; slug: string; name: string };
  badge: 'NEW' | 'HOT' | 'DROP' | null;
  status: 'published' | 'draft';
}

export async function fetchProducts(params?: { category?: string }): Promise<Product[]> {
  const qs = new URLSearchParams({ status: 'published', ...(params || {}) });
  const res = await fetch(`${API_BASE_URL}/products?${qs}`, {
    next: { revalidate: 60 }, // ISR de 60s
  });
  if (!res.ok) return [];
  const { data } = await res.json();
  return data;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}
```

> **Diferencia con Landa**: Landa usa `cache: 'no-store'`. Para e-commerce queremos **ISR de 60s** en catálogo y producto (mejor LCP, sigue siendo fresco). Solo el carrito y checkout usan `cache: 'no-store'`.

## Estado del cliente (carrito, favoritos)

- **Carrito**: persistido vía API + cookie `cart_token` (httpOnly). Estado UI con **React Context** + `useReducer`. Sin Zustand/Redux salvo que escale.
- **Favoritos**: si el usuario no está logueado, `localStorage`. Si lo está, API.

## SweetAlert2 — Tema custom

```bash
npm i sweetalert2
```

```ts
// frontend/lib/swal.ts
import Swal from 'sweetalert2';

export const iconicSwal = Swal.mixin({
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

Estilos en `globals.css`:

```css
.iconic-swal-popup { border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; }
.iconic-swal-title { font-family: var(--font-space-grotesk); font-weight: 700; }
.iconic-swal-confirm { font-family: var(--font-space-mono); letter-spacing: 2px; text-transform: uppercase; font-size: 11px; }
```

## Performance — Métricas objetivo

| Métrica | Objetivo | Cómo lograrlo |
|---|---|---|
| LCP | `< 2.5s` | `next/image` con `priority` en hero, ISR en catálogo |
| CLS | `< 0.1` | `next/image` reserva el espacio automáticamente |
| INP | `< 200ms` | Server Components donde sea posible, lazy de Framer Motion |
| Bundle inicial | `< 200KB` | Server Components evitan enviar React de árboles estáticos |

## Comandos de desarrollo

```bash
# Frontend
cd frontend
npm install
npm run dev        # Next.js en :3000

# Backend
cd backend
composer install
php artisan migrate --seed
php artisan serve  # Laravel en :8000  (o docker compose up)
```

Variables de entorno (`frontend/.env.local`):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
