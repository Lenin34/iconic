'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { easing } from '@/lib/motion';

export default function NewCollection() {
  return (
    <section className="relative py-24 overflow-hidden bg-bg-base border-y border-border-subtle">
      {/* Luces de ambiente sutiles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Tag superior */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full bg-accent-soft border border-accent-border inline-flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] tracking-[2px] uppercase text-accent font-bold">
              Exclusive Drop
            </span>
          </motion.div>

          {/* Título Principal */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing.outExpo }}
              className="font-display font-bold text-[clamp(40px,8vw,80px)] tracking-[-3px] leading-[0.9] text-white uppercase italic"
            >
              Nueva<br />
              <span className="text-accent">Colección</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-mono text-[11px] tracking-[4px] uppercase text-text-tertiary"
            >
              Y2K Aesthetic / Digital Craftsmanship
            </motion.p>
          </div>

          {/* Visual del Logo 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing.outExpo }}
            className="relative w-full max-w-[600px] aspect-square group"
          >
            {/* Brillo detrás de la imagen */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[80px] scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <Image
              src="/images/iconic_logo_3d.png"
              alt="Iconic 3D Logo"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </motion.div>

          {/* Botón de acción */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="
              px-12 py-4 bg-white text-black font-mono font-bold uppercase tracking-[4px] text-[12px]
              rounded-full transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105
              shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]
            "
          >
            Descubrir ahora
          </motion.button>
        </div>
      </div>
    </section>
  );
}
