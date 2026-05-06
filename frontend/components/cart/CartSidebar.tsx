'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easing } from '@/lib/motion';

interface CartItem {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Trigger button en navbar (se integra en Navbar component) */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-text-tertiary hover:text-white transition-colors relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[9px] font-mono flex items-center justify-center text-white">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easing.outExpo }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: easing.outExpo }}
              className="fixed top-0 right-0 z-[151] h-full w-full max-w-md bg-bg-elevated border-l border-border-default flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-default">
                <h2 className="font-display font-bold text-xl text-white">
                  Carrito ({cartItems.length})
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-tertiary hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-bg-image rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                        <path d="M3 6h18"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                    </div>
                    <p className="font-display text-text-tertiary mb-1">Tu carrito está vacío</p>
                    <p className="font-mono text-xs text-text-disabled">Agrega sneakers para comenzar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-20 h-20 bg-bg-image rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary mb-1">
                            {item.brand}
                          </p>
                          <h4 className="font-display text-sm text-white truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-xs text-text-tertiary">Talla {item.size}</span>
                            <span className="text-text-disabled">•</span>
                            <span className="font-display font-bold text-accent text-sm">
                              ${item.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button className="text-text-tertiary hover:text-error transition-colors self-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-border-default space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-text-secondary">Subtotal</span>
                    <span className="font-display font-bold text-xl text-white">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <button className="w-full bg-accent text-white py-4 rounded-full font-mono uppercase tracking-[2px] text-[11px] hover:bg-accent-hover transition-colors">
                    Proceder al checkout
                  </button>
                  <p className="font-mono text-[10px] text-text-tertiary text-center">
                    Envío gratis en pedidos mayores a $2,500
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
