# 07 — Glassmorphism (uso quirúrgico)

> El glassmorphism **no es un estilo del sitio**, es una herramienta funcional.
> Se aplica únicamente en **3 lugares específicos**.

## 1. Navbar en scroll

```css
.navbar {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
```

**Justificación**: el contenido pasa por debajo del navbar; el blur mantiene legibilidad sin opacar el contenido.

## 2. Modal de quick view del producto

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
}
.modal-card {
  background: rgba(22, 22, 22, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.10);
}
```

**Justificación**: el modal flota sobre el catálogo; el blur crea contexto sin desconectar visualmente del fondo.

## 3. Toast de "agregado al carrito"

```css
.toast-cart {
  position: fixed;
  top: 24px; right: 24px;
  background: rgba(22, 22, 22, 0.90);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-left: 3px solid var(--accent);
  transform: translateX(100%);
  transition: transform 300ms var(--ease-out-expo);
}
.toast-cart.is-visible { transform: translateX(0); }
```

**Justificación**: confirma una acción sin bloquear, el blur permite ver el catálogo detrás.

## ❌ Dónde NO usar glassmorphism

- **Cards de producto** — debilita el contraste y la sensación de "objeto físico".
- **Botones** — todos los botones son sólidos, sin excepciones.
- **Hero** — la profundidad del hero viene de capas de texto y círculos de borde, no de blur.
- **Footer** — fondo plano `#0A0A0A`.
- **Filtros de pills** — son sólidos con bordes.

## Fallback para navegadores sin soporte

```css
@supports not (backdrop-filter: blur(20px)) {
  .navbar { background: rgba(10, 10, 10, 0.97); }
  .modal-card { background: rgba(22, 22, 22, 0.99); }
  .toast-cart { background: rgba(22, 22, 22, 0.97); }
}
```
