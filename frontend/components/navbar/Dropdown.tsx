'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Subcategory {
  name: string;
  href: string;
}

interface DropdownProps {
  label: string;
  subcategories: Subcategory[];
}

export default function Dropdown({ label, subcategories }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="font-mono text-[10px] tracking-[2px] uppercase text-text-tertiary hover:text-white transition-colors">
        {label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-bg-elevated border border-border-default rounded-lg overflow-hidden shadow-2xl z-[200]"
          >
            <div className="py-2">
              {subcategories.map((sub, index) => (
                <Link
                  key={index}
                  href={sub.href}
                  className="block px-4 py-2 font-mono text-[10px] text-text-tertiary hover:text-accent hover:bg-bg-hover transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
