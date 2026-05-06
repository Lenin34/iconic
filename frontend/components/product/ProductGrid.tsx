'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { containerVariants } from '@/lib/motion';

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  badge?: 'NEW' | 'HOT' | 'DROP';
}

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <section className="py-16 bg-bg-base">
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)]">
        {/* Título de sección */}
        {title && (
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary mb-3"
            >
              Colección
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="font-display font-bold text-[clamp(28px,4vw,40px)] tracking-[-1px] leading-[1.05] text-white"
            >
              {title}
            </motion.h2>
          </div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
