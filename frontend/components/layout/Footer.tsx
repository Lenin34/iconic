import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-default mt-auto">
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="font-display font-bold text-lg tracking-tight text-white inline-block">
              Iconic<span className="text-accent">.</span>
            </Link>
            <p className="font-display text-sm leading-[1.7] text-text-secondary max-w-sm">
              Sneakers originales con envío a todo México. Nike, Adidas, Jordan, New Balance y más.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary">
              Categorías
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sneakers/nike" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  Nike
                </Link>
              </li>
              <li>
                <Link href="/sneakers/adidas" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  Adidas
                </Link>
              </li>
              <li>
                <Link href="/sneakers/jordan" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  Jordan
                </Link>
              </li>
              <li>
                <Link href="/sneakers" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  Ver todo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="font-mono text-[10px] text-text-secondary">
                CDMX, México
              </li>
              <li>
                <a href="mailto:hola@iconic.com.mx" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  hola@iconic.com.mx
                </a>
              </li>
              <li>
                <a href="https://instagram.com/iconic.mx" target="_blank" rel="noopener" className="font-display text-sm text-text-secondary hover:text-white transition-colors">
                  @iconic.mx
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-text-tertiary">
            © 2024 Iconic. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[10px] text-text-tertiary">
            19.4326° N, 99.1332° W
          </p>
        </div>
      </div>
    </footer>
  );
}
