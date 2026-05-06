# 01 — Concepto Central

## Propuesta 01: Obsidian Chrome

### La idea

El sitio debe sentirse como **entrar a una tienda física de sneakers de alto nivel en CDMX a las 11pm**. Oscuro, preciso, con detalles que brillan en el momento justo.

No es un e-commerce genérico con dark mode: es una **identidad visual construida desde el negro hacia afuera**.

### Reglas no negociables

- El **rosa no decora, interrumpe**. Aparece exactamente donde el usuario necesita mirar (CTAs, precios, badges activos, estados seleccionados).
- La **profundidad** se construye con jerarquía de negros, no con sombras pesadas.
- Las **animaciones nunca superan 400ms** y nunca usan `ease-in` como curva única.
- El **glassmorphism es quirúrgico**: solo en 3 lugares (navbar en scroll, modal de quick view, toast del carrito).

## Contexto del negocio

**Iconic** es una tienda de sneakers que actualmente vende en Instagram y migra a web para:

1. **Mejorar ventas** con un funnel de conversión propio (carrito, checkout, tracking).
2. **Aparecer en búsquedas orgánicas** (SEO crítico — ver `09-seo.md`).
3. **Reducir dependencia** del algoritmo de Instagram.
4. **Construir marca propia** más allá del feed de IG.

### Implicaciones para el diseño

- El catálogo debe ser **tan visual o más** que un feed de Instagram.
- Los productos deben tener **URLs limpias y compartibles** (`/sneakers/nike-air-max-90-black`).
- Cada producto necesita **OpenGraph + Twitter Cards** para que se vea premium al compartirse en redes/WhatsApp.
- La **velocidad de carga** es parte del producto (LCP < 2.5s, CLS < 0.1).

## Tono de voz visual

| Elemento | Sensación buscada |
|---|---|
| Movimiento | Suave, intencional, nunca rebote infantil excepto en confirmaciones puntuales |
| Color | Restrictivo, casi monocromo, con interrupciones rosa |
| Tipografía | Editorial + técnica, nunca decorativa |
| Espacio | Generoso, respira, no satura |
| Hover states | Confirman intención, nunca exageran |
