'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { easing } from '@/lib/motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easing.outExpo }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          />

          {/* Menu Panel - CD Player Style */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: easing.outExpo }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-bg-section z-[100] md:hidden overflow-hidden"
          >
            {/* CD Player Header */}
            <div className="relative p-6 border-b border-border-default">
              {/* Close Button - X Style */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {/* CD Disc Animation */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-cyan relative flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-bg-section border-2 border-white/30" />
                  {/* CD Shine Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                </motion.div>
              </div>

              <h2 className="font-display font-bold text-white text-center text-lg tracking-tight">
                Menú
              </h2>
            </div>

            {/* Navigation Links - Bubble Style */}
            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">
              <Link
                href="/sneakers"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent-cyan/30 bg-accent-cyan/10 hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent-cyan transition-colors">
                    Sneakers
                  </span>
                  <span className="text-accent-cyan text-2xl">→</span>
                </div>
              </Link>

              <Link
                href="/sneakers/nike"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent/30 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent transition-colors">
                    Nike
                  </span>
                  <span className="text-accent text-2xl">→</span>
                </div>
              </Link>

              <Link
                href="/sneakers/adidas"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent-yellow/30 bg-accent-yellow/10 hover:bg-accent-yellow/20 hover:border-accent-yellow transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent-yellow transition-colors">
                    Adidas
                  </span>
                  <span className="text-accent-yellow text-2xl">→</span>
                </div>
              </Link>

              <Link
                href="/sneakers/jordan"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent/30 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent transition-colors">
                    Jordan
                  </span>
                  <span className="text-accent text-2xl">→</span>
                </div>
              </Link>

              <Link
                href="/sneakers/new-balance"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent-cyan/30 bg-accent-cyan/10 hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent-cyan transition-colors">
                    New Balance
                  </span>
                  <span className="text-accent-cyan text-2xl">→</span>
                </div>
              </Link>

              <Link
                href="/ropa"
                onClick={onClose}
                className="block w-full p-4 rounded-2xl border-2 border-accent-yellow/30 bg-accent-yellow/10 hover:bg-accent-yellow/20 hover:border-accent-yellow transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-white group-hover:text-accent-yellow transition-colors">
                    Ropa
                  </span>
                  <span className="text-accent-yellow text-2xl">→</span>
                </div>
              </Link>
            </div>

            {/* Footer - Y2K Decorative */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-default bg-bg-elevated">
              <div className="flex justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse delay-100" />
                <div className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse delay-200" />
              </div>
              <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary text-center">
                Collection 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
