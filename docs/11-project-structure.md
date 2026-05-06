# 11 — Estructura del Proyecto (Monorepo estilo Landa)

Replicamos exactamente la estructura de `Github/landa`: `frontend/` (Next.js) + `backend/` (Laravel) en la raíz del repo.

## Árbol de directorios

```
iconic/
├── docs/                          ← documentación (este directorio)
├── frontend/                      ← Next.js 16
│   ├── app/
│   │   ├── layout.tsx             ← root layout + fuentes + metadata global
│   │   ├── template.tsx           ← page transitions con Framer Motion
│   │   ├── page.tsx               ← home
│   │   ├── globals.css            ← :root + @theme inline (Tailwind v4)
│   │   ├── favicon.ico
│   │   ├── sitemap.ts             ← sitemap dinámico
│   │   ├── robots.ts
│   │   ├── sneakers/
│   │   │   ├── page.tsx           ← catálogo
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx       ← /sneakers/nike
│   │   │   └── p/
│   │   │       └── [slug]/
│   │   │           └── page.tsx   ← detalle de producto
│   │   ├── buscar/page.tsx
│   │   ├── carrito/page.tsx       ← noindex
│   │   ├── checkout/page.tsx      ← noindex
│   │   └── order/[id]/page.tsx    ← noindex (Courier Prime aquí)
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── SearchToggle.tsx
│   │   │   └── CartButton.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── QuickViewModal.tsx
│   │   │   ├── SizeSelector.tsx
│   │   │   └── AddToCartButton.tsx
│   │   ├── hero/
│   │   │   └── Hero.tsx
│   │   ├── ui/
│   │   │   ├── Toast.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── CustomCursor.tsx
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   ├── api.ts                 ← cliente del API Laravel
│   │   ├── motion.ts              ← curvas de easing y duraciones
│   │   ├── swal.ts                ← SweetAlert2 themed
│   │   └── cart.ts                ← lógica de carrito (Context/Reducer)
│   ├── public/
│   │   ├── og/                    ← imágenes OpenGraph
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── AGENTS.md                  ← reglas de Next.js 16 (heredado de Landa)
│   └── README.md
│
├── backend/                       ← Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── ProductController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── CartController.php
│   │   │   └── OrderController.php
│   │   └── Models/
│   │       ├── Product.php
│   │       ├── Category.php
│   │       ├── Cart.php
│   │       └── Order.php
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── config/
│   ├── public/
│   ├── storage/
│   ├── artisan
│   ├── composer.json
│   ├── compose.yaml               ← Docker
│   └── README.md
│
├── README.md                      ← README raíz
└── .gitignore
```

## Convenciones de Landa que replicamos

1. **`frontend/AGENTS.md`** — recordatorio de que Next.js 16 tiene cambios disruptivos.
2. **`frontend/lib/api.ts`** — cliente fetch con tipos TypeScript estrictos.
3. **`frontend/app/globals.css`** — `@import "tailwindcss"` + `:root` + `@theme inline`.
4. **`frontend/app/layout.tsx`** — `next/font/google` con CSS variables.
5. **`backend/compose.yaml`** — Docker para desarrollo local.

## Setup inicial

```bash
# Desde la raíz iconic/
# 1. Frontend
cd frontend
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
npm i framer-motion sweetalert2

# 2. Backend
cd ../backend
composer create-project laravel/laravel .
php artisan install:api          # endpoints API
```

## Variables de entorno

`frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`backend/.env`:

```bash
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
DB_CONNECTION=mysql
DB_DATABASE=iconic
# ...
```

## Workflow de desarrollo

```bash
# Terminal 1 — backend
cd backend && php artisan serve

# Terminal 2 — frontend
cd frontend && npm run dev

# Terminal 3 — opcional: queues, mails
cd backend && php artisan queue:work
```

## Deploy

| Componente | Plataforma sugerida |
|---|---|
| Frontend | Vercel (zero-config con Next.js) |
| Backend | Railway / Fly.io / VPS con Docker |
| DB | PlanetScale / Railway PostgreSQL |
| Imágenes | Cloudflare R2 / S3 / ImageKit |
| CDN | Cloudflare delante de todo |
