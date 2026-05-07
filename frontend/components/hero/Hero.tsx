'use client';

import { motion } from 'framer-motion';
import { easing } from '@/lib/motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-bg-section">
      {/* Y2K Decorative Bubbles */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-accent/20 blur-[60px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-accent-cyan/20 blur-[50px] pointer-events-none animate-pulse delay-100" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-accent-yellow/15 blur-[40px] pointer-events-none animate-pulse delay-200" />
      
      {/* Y2K Star decorations */}
      <div className="absolute top-32 left-20 text-accent/30 text-4xl pointer-events-none">✦</div>
      <div className="absolute bottom-32 right-32 text-accent-cyan/30 text-3xl pointer-events-none">✧</div>
      <div className="absolute top-1/3 right-10 text-accent-yellow/25 text-2xl pointer-events-none">★</div>

      {/* Círculos decorativos (estilo Landa) - Y2K version */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] border-2 border-accent/10 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] border-2 border-accent-cyan/8 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] h-full min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 w-full items-center">
          {/* Texto izquierda */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing.outExpo }}
            className="space-y-6 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: easing.outExpo }}
              className="font-mono text-[9px] tracking-[3px] uppercase text-text-tertiary"
            >
              CDMX — Where culture lives
            </motion.div>
            
            <h1 className="font-display font-bold text-[clamp(32px,5vw,52px)] tracking-[-1.5px] leading-[1.05] text-white">
              Más que sneakers.<br />
              <span className="text-accent">Legado.</span>
            </h1>
            
            <p className="font-display text-sm leading-[1.7] text-text-secondary max-w-md">
              La experiencia de una sneaker boutique exclusiva en CDMX. Curación meticulosa, drops que definen momentos, y la comunidad que entiende el valor.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/sneakers"
                className="
                  relative bg-accent text-white px-6 py-3 rounded-full font-mono uppercase tracking-[2px] text-[11px]
                  border-2 border-accent
                  transition-all duration-[180ms] hover:bg-accent-hover hover:scale-105
                  before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-accent
                  before:opacity-0 before:scale-100 before:-z-10
                  before:transition-all before:duration-[220ms] before:ease-[cubic-bezier(0.19,1,0.22,1)]
                  hover:before:opacity-20 hover:before:scale-150
                "
              >
                Explorar drops
              </Link>
              <Link
                href="/sneakers/nike"
                className="px-6 py-3 rounded-full font-mono uppercase tracking-[2px] text-[11px] border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-all duration-200 hover:scale-105"
              >
                Nike
              </Link>
            </div>
          </motion.div>

          {/* Área visual con el logo 3D - Responsive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: easing.outExpo }}
            className="relative h-[40vh] lg:h-[60vh] min-h-[300px] lg:min-h-[400px] perspective-[1000px] order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-bg-image rounded-[20px] lg:rounded-[14px] border-2 border-accent/20 overflow-hidden">
              {/* Y2K Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent-cyan/10 to-accent-yellow/5" />
              
              {/* Brillo dinámico de fondo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/15 blur-[100px] pointer-events-none" />
              
              <div className="relative w-full h-full p-6 lg:p-12 flex items-center justify-center">
                <Image
                  src="/images/iconic_logo_3d.png"
                  alt="Iconic Redesign 3D"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(255,107,157,0.3)]"
                  priority
                />
              </div>

              {/* Tag de edición limitada - Y2K Style */}
              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-2 bg-bg-base/80 backdrop-blur-sm px-3 py-2 rounded-full border border-accent/30">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="font-mono text-[9px] lg:text-[10px] tracking-[2px] uppercase text-accent">
                  Collection 2026
                </p>
              </div>

              {/* Y2K decorative elements */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                <div className="w-2 h-2 rounded-full bg-accent-yellow" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
