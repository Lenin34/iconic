'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CartDigitalPopup from '@/components/cart/CartDigitalPopup';
import Dropdown from '@/components/navbar/Dropdown';
import MobileMenu from '@/components/navbar/MobileMenu';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  useEffect(() => {
    // Lock body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        style={{ '--border-opacity': mounted ? borderOpacity : 0.06 } as React.CSSProperties}
        className="sticky top-0 z-[100] h-16 backdrop-blur-[20px] backdrop-saturate-[180%] bg-[rgba(10,10,10,0.85)] border-b border-[rgba(255,255,255,var(--border-opacity))]"
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,3rem)] h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-10 h-10 flex items-center justify-center">
            <Image
              src="/images/iconic_logo_3d.png"
              alt="Iconic"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Dropdown 
              label="Sneakers" 
              subcategories={[
                { name: 'Todos', href: '/sneakers' },
                { name: 'Nike', href: '/sneakers/nike' },
                { name: 'Adidas', href: '/sneakers/adidas' },
                { name: 'Jordan', href: '/sneakers/jordan' },
                { name: 'New Balance', href: '/sneakers/new-balance' },
              ]}
            />
            <Dropdown 
              label="Nike" 
              subcategories={[
                { name: 'Air Jordan', href: '/sneakers/nike/jordan' },
                { name: 'Air Max', href: '/sneakers/nike/air-max' },
                { name: 'Dunk', href: '/sneakers/nike/dunk' },
                { name: 'Air Force 1', href: '/sneakers/nike/air-force-1' },
              ]}
            />
            <Dropdown 
              label="Adidas" 
              subcategories={[
                { name: 'Samba', href: '/sneakers/adidas/samba' },
                { name: 'Campus', href: '/sneakers/adidas/campus' },
                { name: 'Gazelle', href: '/sneakers/adidas/gazelle' },
                { name: 'Superstar', href: '/sneakers/adidas/superstar' },
              ]}
            />
            <Dropdown 
              label="Jordan" 
              subcategories={[
                { name: 'Jordan 1', href: '/sneakers/jordan/jordan-1' },
                { name: 'Jordan 4', href: '/sneakers/jordan/jordan-4' },
                { name: 'Jordan 11', href: '/sneakers/jordan/jordan-11' },
              ]}
            />
            <Dropdown 
              label="Ropa" 
              subcategories={[
                { name: 'Hoodies', href: '/ropa/hoodies' },
                { name: 'T-shirts', href: '/ropa/t-shirts' },
                { name: 'Gorras', href: '/ropa/gorras' },
                { name: 'Sudaderas', href: '/ropa/sudaderas' },
              ]}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-text-tertiary hover:text-white transition-colors" title="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            
            {/* Cart - Digital Pop-Up Overlay (CART.EXE) */}
            <CartDigitalPopup />

            {/* Mobile Menu Button - Y2K Style */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-200"
              title="Menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
