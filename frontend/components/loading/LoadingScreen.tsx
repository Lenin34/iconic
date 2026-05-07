'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simular carga inicial (3 segundos)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[200] bg-bg-base flex items-center justify-center"
        >
          {/* Y2K Decorative Bubbles */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/20 blur-[60px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-accent-cyan/20 blur-[50px] pointer-events-none animate-pulse delay-100" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent-yellow/15 blur-[40px] pointer-events-none animate-pulse delay-200" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-64 h-64 lg:w-80 lg:h-80"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative w-full h-full"
            >
              {/* CD-style background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-accent-cyan/20 to-accent-yellow/10 blur-sm" />
              <div className="absolute inset-4 rounded-full bg-bg-base/90 backdrop-blur-sm border-2 border-accent/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/iconic_logo_3d.png"
                  alt="Iconic Logo"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              {/* CD shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Y2K decorative dots */}
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-accent animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-accent-cyan animate-pulse delay-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
