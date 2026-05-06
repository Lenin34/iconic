'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  
  // Transformaciones basadas en scroll
  const borderOpacity = useTransform(scrollY, [0, 80], [0.06, 0.10]);
  const progressWidth = useTransform(scrollY, (value) => {
    if (typeof window === 'undefined') return '0%';
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return value > 400 ? `${(value / max) * 100}%` : '0%';
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      style={{ '--border-opacity': mounted ? borderOpacity : 0.06 } as React.CSSProperties}
      className="sticky top-0 z-[100] h-16 backdrop-blur-[20px] backdrop-saturate-[180%] bg-[rgba(10,10,10,0.85)] border-b border-[rgba(255,255,255,var(--border-opacity))]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-lg tracking-tight text-white">
          Iconic<span className="text-accent">.</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/sneakers" className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary hover:text-white transition-colors">
            Sneakers
          </Link>
          <Link href="/sneakers/nike" className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary hover:text-white transition-colors">
            Nike
          </Link>
          <Link href="/sneakers/adidas" className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary hover:text-white transition-colors">
            Adidas
          </Link>
          <Link href="/sneakers/jordan" className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary hover:text-white transition-colors">
            Jordan
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-text-tertiary hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </button>
          <button className="text-text-tertiary hover:text-white transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[9px] font-mono flex items-center justify-center text-white">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      {mounted && (
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
        />
      )}
    </motion.nav>
  );
}
