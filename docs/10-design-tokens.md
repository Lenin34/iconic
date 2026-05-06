# 10 — Design Tokens (CSS listos para `:root`)

Copiar tal cual a `assets/css/tokens.css`. **Esta es la única fuente de verdad** del sistema.

```css
:root {
  /* ============================================
   * COLORES — Fondos (jerarquía de profundidad)
   * ============================================ */
  --bg-base:       #0A0A0A;
  --bg-section:    #0F0F0F;
  --bg-elevated:   #161616;
  --bg-hover:      #1E1E1E;
  --bg-divider:    #2A2A2A;
  --bg-image:      #1F1F1F;  /* fondo del área de imagen del producto */

  /* ============================================
   * COLORES — Acento (rosa)
   * ============================================ */
  --accent:         #EC4899;
  --accent-hover:   #DB2777;
  --accent-light:   #F9A8D4;
  --accent-soft:    rgba(236, 72, 153, 0.15);
  --accent-glow:    rgba(236, 72, 153, 0.08);
  --accent-border:  rgba(236, 72, 153, 0.30);

  /* ============================================
   * COLORES — Texto
   * ============================================ */
  --text-primary:   #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.65);
  --text-tertiary:  rgba(255, 255, 255, 0.35);
  --text-disabled:  rgba(255, 255, 255, 0.12);

  /* ============================================
   * COLORES — Bordes
   * ============================================ */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(255, 255, 255, 0.14);
  --border-active:  rgba(236, 72, 153, 0.30);
  --border-subtle:  rgba(255, 255, 255, 0.06);

  /* ============================================
   * COLORES — Feedback de sistema
   * ============================================ */
  --feedback-success: #22C55E;
  --feedback-error:   #EF4444;
  --feedback-warning: #F59E0B;

  /* ============================================
   * TIPOGRAFÍA
   * ============================================ */
  --font-display: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-mono:    'Space Mono', ui-monospace, 'SF Mono', Menlo, monospace;
  --font-receipt: 'Courier Prime', ui-monospace, monospace;

  /* ============================================
   * SPACING
   * ============================================ */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  12px;
  --space-lg:  16px;
  --space-xl:  24px;
  --space-2xl: 32px;
  --space-3xl: 4rem;     /* 64px */
  --space-4xl: 6rem;     /* 96px */

  /* ============================================
   * RADII
   * ============================================ */
  --radius-sm:   8px;
  --radius-md:   10px;   /* área de imagen */
  --radius-lg:   14px;   /* cards */
  --radius-xl:   20px;
  --radius-pill: 100px;
  --radius-full: 9999px;

  /* ============================================
   * EASING (curvas de animación)
   * ============================================ */
  --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-soft: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ============================================
   * DURATIONS
   * ============================================ */
  --duration-fast:   150ms;
  --duration-base:   200ms;
  --duration-medium: 300ms;
  --duration-slow:   400ms;
  --duration-slower: 500ms;

  /* ============================================
   * Z-INDEX
   * ============================================ */
  --z-base:    1;
  --z-sticky:  100;
  --z-overlay: 500;
  --z-modal:   1000;
  --z-toast:   2000;
  --z-cursor:  9999;

  /* ============================================
   * LAYOUT
   * ============================================ */
  --container-max:    1280px;
  --container-pad:    clamp(1rem, 4vw, 3rem);
  --navbar-h-desktop: 64px;
  --navbar-h-mobile:  56px;

  /* ============================================
   * BACKDROP / GLASSMORPHISM
   * ============================================ */
  --backdrop-blur-nav:   blur(20px) saturate(180%);
  --backdrop-blur-modal: blur(24px);
  --backdrop-blur-toast: blur(16px);

  /* ============================================
   * BOOTSTRAP OVERRIDES (--bs-*)
   * ============================================ */
  --bs-primary:       var(--accent);
  --bs-body-bg:       var(--bg-base);
  --bs-body-color:    var(--text-secondary);
  --bs-border-color:  var(--border-default);
  --bs-border-radius: var(--radius-lg);
  --bs-font-sans-serif: var(--font-display);
}

/* ============================================
 * Respeto a usuarios con motion reduction
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

## Cómo usarlos

```css
/* En componentes */
.product-card {
  background: var(--bg-elevated);
  border: 0.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: transform var(--duration-medium) var(--ease-out-quart),
              border-color var(--duration-medium) var(--ease-out-quart);
}
.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
}

.price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--accent);
}

.brand-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-tertiary);
}
```
