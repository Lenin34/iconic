import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Datos de productos con imágenes de Unsplash
const products: Record<string, {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  badge?: string;
}> = {
  'nike-air-max-90-black': {
    id: 1,
    slug: 'nike-air-max-90-black',
    name: 'Air Max 90 Black',
    brand: 'NIKE',
    price: 2499,
    description: 'El Air Max 90 presenta una combinación de cuero y malla para un estilo clásico con soporte duradero. La unidad Air Max visible en el talón proporciona amortiguación icónica.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Black', 'White'],
    badge: 'NEW',
  },
  'adidas-samba-og-white': {
    id: 2,
    slug: 'adidas-samba-og-white',
    name: 'Samba OG White',
    brand: 'ADIDAS',
    price: 1899,
    description: 'El Samba OG mantiene su diseño clásico de los años 50 con cuero premium y suela de goma. Perfecto para el día a día con estilo atemporal.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    colors: ['White', 'Black'],
    badge: 'HOT',
  },
  'jordan-1-mid-chicago': {
    id: 3,
    slug: 'jordan-1-mid-chicago',
    name: 'Jordan 1 Mid Chicago',
    brand: 'JORDAN',
    price: 3299,
    description: 'El Jordan 1 Mid Chicago presenta la icónica paleta de colores con cuero premium. Diseño que definió una generación de sneakers.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Chicago'],
  },
  'new-balance-550-grey': {
    id: 4,
    slug: 'new-balance-550-grey',
    name: '550 Grey',
    brand: 'NEW BALANCE',
    price: 2199,
    description: 'El 550 combina el estilo retro de los 80 con tecnología moderna. Suela de goma y cuero premium para máximo confort.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Grey', 'White'],
    badge: 'DROP',
  },
  'nike-dunk-low-panda': {
    id: 5,
    slug: 'nike-dunk-low-panda',
    name: 'Dunk Low Panda',
    brand: 'NIKE',
    price: 2799,
    description: 'El Dunk Low Panda presenta la combinación icónica blanco/negro. Diseño basketball que conquistó las calles.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Black/White'],
  },
  'adidas-campus-burgundy': {
    id: 6,
    slug: 'adidas-campus-burgundy',
    name: 'Campus Burgundy',
    brand: 'ADIDAS',
    price: 1699,
    description: 'El Campus 80s mantiene su estilo clásico con cuero premium y suela de goma. Colores vibrantes para destacar.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    colors: ['Burgundy', 'White'],
  },
  'jordan-4-military-black': {
    id: 7,
    slug: 'jordan-4-military-black',
    name: 'Jordan 4 Military Black',
    brand: 'JORDAN',
    price: 4599,
    description: 'El Jordan 4 Military Black presenta diseño monocromático con detalles técnicos. Una de las siluetas más codiciadas.',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Black'],
    badge: 'NEW',
  },
  'nike-air-force-1-white': {
    id: 8,
    slug: 'nike-air-force-1-white',
    name: 'Air Force 1 White',
    brand: 'NIKE',
    price: 2299,
    description: 'El Air Force 1 White es el sneaker más icónico de Nike. Diseño atemporal que nunca pasa de moda.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['White'],
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.values(products).map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: PageProps) {
  const product = products[params.slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-secondary">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-text-tertiary">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/sneakers" className="hover:text-white transition-colors">Sneakers</Link>
          <span>/</span>
          <span className="text-text-secondary">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Imagen */}
          <div className="relative aspect-square bg-bg-image rounded-[14px] overflow-hidden">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full bg-[rgba(236,72,153,0.12)] border border-[rgba(236,72,153,0.25)] text-accent">
                  {product.badge}
                </span>
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Detalles */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="font-mono text-[10px] tracking-[3px] uppercase text-text-tertiary mb-2">
                {product.brand}
              </p>
              <h1 className="font-display font-bold text-[clamp(28px,4vw,42px)] tracking-[-1px] leading-[1.05] text-white">
                {product.name}
              </h1>
            </div>

            <p className="font-display text-base leading-[1.7] text-text-secondary">
              {product.description}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl text-accent">
                ${product.price.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-text-tertiary">MXN</span>
            </div>

            {/* Tallas */}
            <div>
              <p className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary mb-3">
                Tallas disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 rounded-lg border border-border-default text-text-secondary hover:border-accent hover:text-accent transition-all font-mono text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <p className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary mb-3">
                Colores
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span key={color} className="font-display text-sm text-text-secondary">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-accent text-white py-4 rounded-full font-mono uppercase tracking-[2px] text-[11px] hover:bg-accent-hover transition-colors">
                Agregar al carrito
              </button>
              <button className="w-14 h-14 rounded-full border border-border-default text-text-tertiary hover:border-accent hover:text-accent transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
