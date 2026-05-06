# Iconic — Documentación de Diseño y Frontend

Documentación técnica y de diseño para el e-commerce **Iconic**, una tienda de sneakers que migra de Instagram a una experiencia web inspirada en `Github/landa`: precisa, suave, con animaciones quirúrgicas y SEO de primer nivel.

## Filosofía del proyecto

- **Stack replicado de Landa**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion. Backend Laravel sirviendo API REST.
- **Inspiración**: tecnología, suavidad y animaciones de `Github/landa`.
- **Identidad**: oscuro, preciso, con detalles que brillan en el momento justo (paleta Obsidian Chrome — la opuesta a la beige/serif de Landa, pero misma filosofía de movimiento).
- **SEO-first**: SSR/SSG con Next.js, Metadata API, JSON-LD por producto, OpenGraph dinámico.

## Estructura de la documentación

| Archivo | Contenido |
|---|---|
| [`01-concept.md`](./01-concept.md) | Concepto central, identidad visual y propuesta de valor |
| [`02-colors.md`](./02-colors.md) | Sistema completo de paleta y tokens de color |
| [`03-typography.md`](./03-typography.md) | Tipografías, jerarquías y reglas de uso |
| [`04-layout.md`](./04-layout.md) | Grid, navbar, hero, product grid y anatomía de cards |
| [`05-animations.md`](./05-animations.md) | Curvas de easing, hovers, scroll, transiciones de página |
| [`06-microinteractions.md`](./06-microinteractions.md) | Filtros, búsqueda, carrito, lazy loading, toasts |
| [`07-glassmorphism.md`](./07-glassmorphism.md) | Uso quirúrgico de glassmorphism (3 lugares específicos) |
| [`08-tech-stack.md`](./08-tech-stack.md) | Stack: Next.js 16 + Tailwind v4 + Framer Motion + Laravel |
| [`09-seo.md`](./09-seo.md) | SEO con Next.js Metadata API + JSON-LD |
| [`10-design-tokens.md`](./10-design-tokens.md) | Tokens en Tailwind v4 (`@theme inline`) + CSS variables |
| [`11-project-structure.md`](./11-project-structure.md) | Monorepo `frontend/` + `backend/` (estilo Landa) |

## Propuesta activa

**Propuesta 01 — Obsidian Chrome**
Sentirse como entrar a una tienda física de sneakers de alto nivel en CDMX a las 11pm. El rosa no decora, **interrumpe** — aparece exactamente donde el usuario necesita mirar.
