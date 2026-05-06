'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { easing } from '@/lib/motion';
import Link from 'next/link';

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  badge?: 'NEW' | 'HOT' | 'DROP';
  image?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const controls = useAnimationControls();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    controls.start({
      scale: [1, 0.92, 1],
      transition: { duration: 0.28, ease: easing.spring, times: [0, 0.3, 1] },
    });
    // Aquí iría la lógica de agregar al carrito
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: easing.outExpo }}
      whileHover={{ y: -4 }}
      className="group bg-bg-elevated rounded-[14px] border border-border-default transition-[border-color] duration-[280ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-border-hover"
    >
      <Link href={`/sneakers/p/${product.slug}`} className="block">
        {/* Imagen area */}
        <div className="relative bg-bg-image rounded-[10px] m-3 overflow-hidden aspect-square">
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="font-mono text-[9px] tracking-[2px] uppercase px-2 py-1 rounded-full bg-[rgba(236,72,153,0.12)] border border-[rgba(236,72,153,0.25)] text-accent">
                {product.badge}
              </span>
            </div>
          )}
          
          {/* Placeholder de imagen */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-[1.04] transition-transform duration-[350ms] ease-[cubic-bezier(0.19,1,0.22,1)]">
                <span className="font-display font-bold text-2xl text-accent/30">{product.brand[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pb-4 space-y-2">
          {/* Marca */}
          <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary mb-1">
            {product.brand}
          </p>
          
          {/* Nombre */}
          <h3 className="font-display font-medium text-sm tracking-[-0.3px] text-white/90 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          
          {/* Fila inferior: precio + botón */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-display font-bold text-base text-accent group-hover:text-accent-light transition-colors duration-150">
              ${product.price.toLocaleString()}
            </span>
            
            <motion.button
              animate={controls}
              onClick={handleAddToCart}
              className="w-8 h-8 rounded-full bg-accent grid place-items-center text-white hover:bg-accent-hover hover:scale-110 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5v14"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
