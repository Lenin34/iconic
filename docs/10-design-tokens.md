# 10 — Design Tokens (Tailwind v4 + CSS Variables)

> Tailwind v4 usa `@theme inline` directamente en CSS, **no** un `tailwind.config.js` con valores literales. Los CSS variables siguen siendo la fuente de verdad.

Copiar a `frontend/app/globals.css`:

```css
@import "tailwindcss";

/* ============================================
 * CSS Variables — fuente única de verdad
 * ============================================ */
:root {
  /* Fondos (jerarquía de profundidad) */
  --bg-base:       #0A0A0A;
  --bg-section:    #0F0F0F;
  --bg-elevated:   #161616;
  --bg-hover:      #1E1E1E;
  --bg-divider:    #2A2A2A;
  --bg-image:      #1F1F1F;

  /* Acento */
  --accent:         #EC4899;
  --accent-hover:   #DB2777;
  --accent-light:   #F9A8D4;
  --accent-soft:    rgba(236, 72, 153, 0.15);
  --accent-glow:    rgba(236, 72, 153, 0.08);
  --accent-border:  rgba(236, 72, 153, 0.30);

  /* Texto */
  --text-primary:   #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary:  rgba(255, 255, 255, 0.35);
  --text-disabled:  rgba(255, 255, 255, 0.12);

  /* Bordes */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(255, 255, 255, 0.14);
  --border-active:  rgba(236, 72, 153, 0.30);
  --border-subtle:  rgba(255, 255, 255, 0.06);

  /* Feedback */
  --feedback-success: #22C55E;
  --feedback-error:   #EF4444;
  --feedback-warning: #F59E0B;

  /* Easing */
  --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Layout */
  --container-max:    1280px;
  --container-pad:    clamp(1rem, 4vw, 3rem);
  --navbar-h-desktop: 64px;
  --navbar-h-mobile:  56px;

  /* Backdrop */
  --backdrop-blur-nav:   blur(20px) saturate(180%);
  --backdrop-blur-modal: blur(24px);
  --backdrop-blur-toast: blur(16px);
}

/* ============================================
 * @theme inline — expone tokens a Tailwind v4
 * ============================================ */
@theme inline {
  /* Colors → utilities como bg-bg-base, text-accent, border-border-default */
  --color-bg-base:       var(--bg-base);
  --color-bg-section:    var(--bg-section);
  --color-bg-elevated:   var(--bg-elevated);
  --color-bg-hover:      var(--bg-hover);
  --color-bg-divider:    var(--bg-divider);
  --color-bg-image:      var(--bg-image);

  --color-accent:        var(--accent);
  --color-accent-hover:  var(--accent-hover);
  --color-accent-light:  var(--accent-light);

  --color-text-primary:   var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary:  var(--text-tertiary);
  --color-text-disabled:  var(--text-disabled);

  --color-border-default: var(--border-default);
  --color-border-hover:   var(--border-hover);
  --color-border-active:  var(--border-active);
  --color-border-subtle:  var(--border-subtle);

  --color-success: var(--feedback-success);
  --color-error:   var(--feedback-error);
  --color-warning: var(--feedback-warning);

  /* Fonts (variables las inyecta next/font en <html>) */
  --font-display: var(--font-space-grotesk);
  --font-mono:    var(--font-space-mono);
  --font-receipt: var(--font-courier-prime);

  /* Radius */
  --radius-sm:   8px;
  --radius-md:   10px;
  --radius-lg:   14px;
  --radius-xl:   20px;
  --radius-pill: 100px;
}

/* ============================================
 * Base
 * ============================================ */
body {
  background: var(--bg-base);
  color: var(--text-secondary);
  font-family: var(--font-display), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ============================================
 * Reduced motion
 * ============================================ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Uso en componentes

### Tailwind utilities directas

```tsx
<article className="bg-bg-elevated border border-border-default rounded-[14px] p-4 transition hover:border-border-hover hover:-translate-y-1">
  <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary">NIKE</p>
  <h3 className="font-display text-sm font-medium text-white/90">Air Max 90</h3>
  <p className="font-display font-bold text-base text-accent">$2,499</p>
</article>
```

### Variables crudas cuando Tailwind no alcanza

```tsx
<div style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }}>
  ...
</div>
```

### En Framer Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.4,
    ease: [0.19, 1, 0.22, 1], // --ease-out-expo
  }}
/>
```

> Las curvas de easing en Framer Motion se pasan como array `[x1, y1, x2, y2]`, equivalente a `cubic-bezier()`.

## Constantes JS para reutilizar (opcional)

`frontend/lib/motion.ts`:

```ts
export const easing = {
  outExpo:    [0.19, 1, 0.22, 1],
  outQuart:   [0.25, 1, 0.5, 1],
  inOutSoft:  [0.4, 0, 0.2, 1],
  spring:     [0.34, 1.56, 0.64, 1],
} as const;

export const duration = {
  fast:   0.15,
  base:   0.2,
  medium: 0.3,
  slow:   0.4,
  slower: 0.5,
} as const;
```
