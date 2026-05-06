'use client';

import { motion } from 'framer-motion';
import { easing } from '@/lib/motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-bg-section">
      {/* Círculos decorativos (estilo Landa) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-[rgba(255,255,255,0.03)] rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-[rgba(255,255,255,0.02)] rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] h-full min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 w-full items-center">
          {/* Texto izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: easing.outExpo }}
              className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary"
            >
              CDMX — Desde 2024
            </motion.div>
            
            <h1 className="font-display font-bold text-[clamp(32px,5vw,52px)] tracking-[-1.5px] leading-[1.05] text-white">
              Sneakers que<br />
              <span className="text-accent">importan.</span>
            </h1>
            
            <p className="font-display text-sm leading-[1.7] text-text-secondary max-w-md">
              Entra a una tienda física de sneakers de alto nivel en CDMX a las 11pm. 
              Oscuro, preciso, con detalles que brillan en el momento justo.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Link
                href="/sneakers"
                className="
                  relative bg-accent text-white px-6 py-3 rounded-full font-mono uppercase tracking-[2px] text-[11px]
                  transition-colors duration-[180ms] hover:bg-accent-hover
                  before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-accent
                  before:opacity-0 before:scale-100 before:-z-10
                  before:transition-all before:duration-[220ms] before:ease-[cubic-bezier(0.19,1,0.22,1)]
                  hover:before:opacity-15 hover:before:scale-150
                "
              >
                Ver catálogo
              </Link>
              <Link
                href="/sneakers/nike"
                className="px-6 py-3 rounded-full font-mono uppercase tracking-[2px] text-[11px] border border-border-default text-text-tertiary hover:border-border-hover hover:text-white transition-all duration-200"
              >
                Nike
              </Link>
            </div>
          </motion.div>

          {/* Área visual derecha (simplificada sin imagen real por ahora) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing.outExpo }}
            className="hidden lg:block relative h-[60vh] min-h-[400px]"
          >
            <div className="absolute inset-0 bg-bg-image rounded-[14px] border border-border-default flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-display font-bold text-4xl text-accent">I.</span>
                </div>
                <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary">
                  Nueva colección
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
