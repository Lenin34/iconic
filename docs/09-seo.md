# 09 — SEO para Iconic

> Migración Instagram → Web. El SEO **no es opcional**, es la razón principal de la migración junto con el funnel propio.

## Contexto del negocio

**Iconic** vende sneakers en Instagram. Al migrar a web, busca:

1. Aparecer en búsquedas como `nike air max cdmx`, `sneakers originales mexico`, `tienda sneakers online`.
2. Que cada producto tenga URL compartible (WhatsApp, Stories, links en bio).
3. Que las cards de producto se vean premium al compartirse (OpenGraph + Twitter Cards).
4. Indexación rápida y robusta en Google.

## Arquitectura SEO-friendly

### URLs limpias y semánticas

| Página | URL |
|---|---|
| Home | `/` |
| Catálogo | `/sneakers` |
| Categoría | `/sneakers/nike` o `/sneakers/categoria/running` |
| Producto | `/sneakers/nike-air-max-90-black` (slug único) |
| Búsqueda | `/buscar?q=air+max` |
| Carrito | `/carrito` (noindex) |
| Checkout | `/checkout` (noindex) |
| Order | `/order/{id}` (noindex) |

**Reglas**:
- Slugs en minúsculas, kebab-case, sin acentos ni caracteres especiales.
- IDs internos no aparecen en la URL pública (excepto orders).
- Canonical en cada página: `<link rel="canonical" href="https://iconic.com.mx/sneakers/nike-air-max-90-black">`.

### Render del lado del servidor (SSR) para contenido crítico

- **Home, catálogo, categoría y producto** se renderizan **completos en el primer paint**.
- Las transiciones AJAX (Fetch) son **mejora progresiva**, no requisito.
- Si el usuario llega a `/sneakers/nike-air-max-90-black` con JS deshabilitado o desde un crawler: el contenido completo está en el HTML.

## Meta tags por página

### Template base

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }} — Iconic</title>
  <meta name="description" content="{{ description }}">
  <link rel="canonical" href="{{ canonical }}">

  <!-- OpenGraph -->
  <meta property="og:type" content="{{ ogType }}">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:image" content="{{ ogImage }}">
  <meta property="og:url" content="{{ canonical }}">
  <meta property="og:site_name" content="Iconic">
  <meta property="og:locale" content="es_MX">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ title }}">
  <meta name="twitter:description" content="{{ description }}">
  <meta name="twitter:image" content="{{ ogImage }}">

  <!-- Theme -->
  <meta name="theme-color" content="#0A0A0A">
</head>
```

### Página de producto — datos específicos

```html
<title>Nike Air Max 90 Black — Iconic</title>
<meta name="description" content="Nike Air Max 90 en negro. Sneakers originales con envío a todo México. Tallas 25-30 MX. $2,499 MXN.">
<meta property="og:type" content="product">
<meta property="product:price:amount" content="2499">
<meta property="product:price:currency" content="MXN">
<meta property="product:availability" content="in stock">
```

## Structured Data (JSON-LD)

### Producto

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Nike Air Max 90 Black",
  "image": [
    "https://iconic.com.mx/img/products/nike-air-max-90-black-1.webp",
    "https://iconic.com.mx/img/products/nike-air-max-90-black-2.webp"
  ],
  "description": "Sneakers Nike Air Max 90 en negro, originales con caja.",
  "sku": "NK-AM90-BLK",
  "brand": { "@type": "Brand", "name": "Nike" },
  "offers": {
    "@type": "Offer",
    "url": "https://iconic.com.mx/sneakers/nike-air-max-90-black",
    "priceCurrency": "MXN",
    "price": "2499",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47"
  }
}
</script>
```

### Organization (en home)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Iconic",
  "url": "https://iconic.com.mx",
  "logo": "https://iconic.com.mx/img/logo.png",
  "sameAs": [
    "https://www.instagram.com/iconic.mx",
    "https://www.facebook.com/iconic.mx"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ciudad de México",
    "addressCountry": "MX"
  }
}
</script>
```

### BreadcrumbList (en categorías y producto)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://iconic.com.mx/" },
    { "@type": "ListItem", "position": 2, "name": "Sneakers", "item": "https://iconic.com.mx/sneakers" },
    { "@type": "ListItem", "position": 3, "name": "Nike", "item": "https://iconic.com.mx/sneakers/nike" }
  ]
}
</script>
```

## HTML semántico

- `<header>` para navbar.
- `<main>` para contenido principal.
- `<nav>` para menú principal y breadcrumbs.
- `<article>` para cada card de producto.
- `<section>` para bloques temáticos del home.
- `<footer>` para footer.
- `<h1>` único por página (en producto, es el nombre del producto; en home, el slogan/promesa).
- Jerarquía estricta: `h1` → `h2` → `h3`, sin saltos.

## Performance — Core Web Vitals

| Métrica | Objetivo | Cómo lograrlo |
|---|---|---|
| **LCP** | `< 2.5s` | Imagen hero con `fetchpriority="high"`, fuentes con `preload`, CSS crítico inline |
| **CLS** | `< 0.1` | Reservar espacio de imágenes con `width`/`height`, evitar inyección tardía de banners |
| **INP** | `< 200ms` | Throttle/debounce en scroll, no bloquear el main thread |
| **FCP** | `< 1.8s` | HTML pequeño, CSS crítico inline (~14KB) |

### Optimización de imágenes

- Formato: **WebP** (con fallback JPG para iOS antiguos).
- `srcset` responsivo:

```html
<img
  src="/img/products/nike-am90-400.webp"
  srcset="/img/products/nike-am90-400.webp 400w,
          /img/products/nike-am90-800.webp 800w,
          /img/products/nike-am90-1200.webp 1200w"
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  alt="Nike Air Max 90 negro"
  loading="lazy"
  width="400" height="400">
```

- Imagen del **hero/LCP** sin `loading="lazy"`, con `fetchpriority="high"`.

## Sitemap y robots.txt

### `/sitemap.xml`

Generado dinámicamente con todas las URLs públicas:
- Home
- Catálogo
- Cada categoría
- Cada producto
- Páginas estáticas (sobre, contacto, FAQ)

### `/robots.txt`

```
User-agent: *
Allow: /
Disallow: /carrito
Disallow: /checkout
Disallow: /order/
Disallow: /api/

Sitemap: https://iconic.com.mx/sitemap.xml
```

## Migración desde Instagram

### Aprovechar el tráfico de IG

1. **Link en bio** apunta a `iconic.com.mx` (no a un linktree).
2. **Stories con stickers de link** a productos específicos.
3. **DMs con link directo** al producto en lugar de fotos.

### Aprovechar el contenido existente

- **Importar el catálogo de IG** como base inicial de productos.
- **Usar las mejores fotos de IG** (con permiso/credit si son de creators) en el detalle del producto.
- **Reviews/testimonios de DMs** convertirlos en sección "Lo que dicen nuestros clientes" con `Review` schema.

## Checklist final

- [ ] Cada página tiene `<title>` único y descriptivo.
- [ ] Cada página tiene `<meta description>` única (150–160 caracteres).
- [ ] Canonical en todas las páginas.
- [ ] OpenGraph y Twitter Cards en todas las páginas.
- [ ] JSON-LD `Product` en cada producto.
- [ ] JSON-LD `Organization` en home.
- [ ] `BreadcrumbList` en categorías y producto.
- [ ] Sitemap.xml dinámico.
- [ ] robots.txt configurado.
- [ ] HTTPS obligatorio.
- [ ] HTML semántico con `h1` único.
- [ ] Imágenes con `alt` descriptivo (no "img1.jpg").
- [ ] Lazy loading correcto (excepto LCP).
- [ ] WebP con fallback.
- [ ] Core Web Vitals dentro de objetivo.
- [ ] Google Search Console + Bing Webmaster registrados.
- [ ] Google Analytics 4 con eventos de e-commerce (`view_item`, `add_to_cart`, `purchase`).
