# 09 — SEO con Next.js 16

> Migración Instagram → Web. El SEO **no es opcional**, es la razón principal de la migración junto con el funnel propio.
> Next.js 16 trae la **Metadata API** moderna que reemplaza al viejo `<Head>`.

## Contexto del negocio

**Iconic** vende sneakers en Instagram. Al migrar a web busca:

1. Aparecer en búsquedas como `nike air max cdmx`, `sneakers originales mexico`.
2. URLs compartibles con OpenGraph premium (WhatsApp, Stories, link en bio).
3. Indexación rápida y robusta en Google.

## Arquitectura SEO con Next.js 16

### URLs limpias y semánticas

| Página | Ruta App Router | URL pública |
|---|---|---|
| Home | `app/page.tsx` | `/` |
| Catálogo | `app/sneakers/page.tsx` | `/sneakers` |
| Categoría | `app/sneakers/[category]/page.tsx` | `/sneakers/nike` |
| Producto | `app/sneakers/p/[slug]/page.tsx` | `/sneakers/p/nike-air-max-90-black` |
| Búsqueda | `app/buscar/page.tsx` | `/buscar?q=air+max` |
| Carrito | `app/carrito/page.tsx` | `/carrito` (noindex) |
| Checkout | `app/checkout/page.tsx` | `/checkout` (noindex) |
| Order | `app/order/[id]/page.tsx` | `/order/{id}` (noindex) |

**Reglas**:
- Slugs en kebab-case, sin acentos.
- Server Components por defecto → contenido en HTML inicial → crawler-friendly.

### Estrategia de cacheo

| Tipo de página | Estrategia | Implementación |
|---|---|---|
| Home, catálogo | ISR 60s | `fetch(url, { next: { revalidate: 60 }})` |
| Producto | ISR 60s + `generateStaticParams` | Pre-render top 100 productos |
| Carrito, checkout | SSR dinámico | `fetch(url, { cache: 'no-store' })` |

## Metadata API — Static y Dinámica

### Metadata estática (layout y páginas fijas)

`app/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://iconic.com.mx'),
  title: {
    default: 'Iconic — Sneakers originales en CDMX',
    template: '%s — Iconic',
  },
  description: 'Sneakers originales con envío a todo México. Nike, Adidas, Jordan, New Balance y más.',
  applicationName: 'Iconic',
  themeColor: '#0A0A0A',
  openGraph: {
    type: 'website',
    siteName: 'Iconic',
    locale: 'es_MX',
    url: 'https://iconic.com.mx',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@iconic_mx',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};
```

### Metadata dinámica (página de producto)

`app/sneakers/p/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { fetchProductBySlug } from '@/lib/api';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };

  const title = `${product.name} — ${product.brand}`;
  const description = `${product.name} en ${product.brand}. $${product.price} MXN. Envío a todo México. Sneakers originales.`;

  return {
    title,
    description,
    alternates: { canonical: `/sneakers/p/${product.slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/sneakers/p/${product.slug}`,
      images: product.images.map(url => ({ url, width: 1200, height: 1200, alt: product.name })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images.slice(0, 1),
    },
  };
}

export async function generateStaticParams() {
  // Pre-renderizar top productos en build time
  const products = await fetchTopProducts(100);
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  // ...
}
```

### Páginas privadas — `noindex`

```tsx
// app/carrito/page.tsx
export const metadata = {
  title: 'Carrito',
  robots: { index: false, follow: false },
};
```

## Structured Data (JSON-LD)

### Producto — server component

```tsx
// app/sneakers/p/[slug]/page.tsx
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      url: `https://iconic.com.mx/sneakers/p/${product.slug}`,
      priceCurrency: 'MXN',
      price: product.price,
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* UI */}
    </>
  );
}
```

### Organization — en `app/layout.tsx`

```tsx
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Iconic',
  url: 'https://iconic.com.mx',
  logo: 'https://iconic.com.mx/logo.png',
  sameAs: [
    'https://www.instagram.com/iconic.mx',
    'https://www.facebook.com/iconic.mx',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressCountry: 'MX',
  },
};

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
```

### BreadcrumbList — componente reutilizable

```tsx
export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `https://iconic.com.mx${it.url}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary">
        {items.map((it, i) => (
          <span key={it.url}>
            {i > 0 && ' / '}
            <a href={it.url}>{it.name}</a>
          </span>
        ))}
      </nav>
    </>
  );
}
```

## HTML semántico

- `<header>` para navbar.
- `<main>` para contenido principal.
- `<nav>` para menú y breadcrumbs.
- `<article>` para cada card de producto.
- `<section>` para bloques temáticos.
- `<h1>` único por página.

## Sitemap dinámico

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { fetchAllProducts, fetchAllCategories } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchAllProducts();
  const categories = await fetchAllCategories();

  return [
    { url: 'https://iconic.com.mx', lastModified: new Date(), priority: 1 },
    { url: 'https://iconic.com.mx/sneakers', lastModified: new Date(), priority: 0.9 },
    ...categories.map(c => ({
      url: `https://iconic.com.mx/sneakers/${c.slug}`,
      lastModified: new Date(c.updated_at),
      priority: 0.8,
    })),
    ...products.map(p => ({
      url: `https://iconic.com.mx/sneakers/p/${p.slug}`,
      lastModified: new Date(p.updated_at),
      priority: 0.7,
    })),
  ];
}
```

## Robots

`app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/carrito', '/checkout', '/order/', '/api/'] },
    ],
    sitemap: 'https://iconic.com.mx/sitemap.xml',
  };
}
```

## Imágenes optimizadas con `next/image`

```tsx
import Image from 'next/image';

<Image
  src={product.images[0]}
  alt={`${product.brand} ${product.name}`}
  width={800}
  height={800}
  priority={isLCP}                // true solo para imagen del hero / above-the-fold
  fetchPriority={isLCP ? 'high' : 'auto'}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-contain"
/>
```

`next/image` automáticamente:
- Genera WebP/AVIF.
- Responsive con `srcset`.
- Lazy loading (excepto `priority`).
- Reserva el espacio (CLS = 0).

## Core Web Vitals — objetivos

| Métrica | Objetivo |
|---|---|
| LCP | `< 2.5s` |
| CLS | `< 0.1` |
| INP | `< 200ms` |
| FCP | `< 1.8s` |

## Migración desde Instagram

1. **Link en bio** apunta a `iconic.com.mx`.
2. **Stories con link sticker** a productos específicos.
3. **DMs** con link directo en lugar de fotos.
4. **Importar catálogo de IG** como base inicial en Laravel.
5. **Reviews/testimonios de DMs** → sección con `Review` schema.

## Checklist final

- [ ] Cada página tiene `metadata` (estática o vía `generateMetadata`).
- [ ] Canonical correcto en cada página.
- [ ] OpenGraph + Twitter Cards en todas.
- [ ] JSON-LD `Product` en cada producto.
- [ ] JSON-LD `Organization` en home.
- [ ] `BreadcrumbList` en categorías y producto.
- [ ] `app/sitemap.ts` y `app/robots.ts`.
- [ ] HTTPS obligatorio.
- [ ] HTML semántico con `h1` único.
- [ ] `next/image` con `priority` solo en LCP.
- [ ] `generateStaticParams` para top productos.
- [ ] Google Search Console + Bing Webmaster.
- [ ] GA4 con eventos e-commerce (`view_item`, `add_to_cart`, `purchase`).
