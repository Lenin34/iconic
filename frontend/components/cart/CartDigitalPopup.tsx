'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
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

export default function CartDigitalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      slug: 'air-jordan-1-high-og-chicago',
      name: 'Air Jordan 1 High OG Chicago',
      brand: 'Nike',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80',
      size: 'US 9',
      quantity: 1
    }
  ]);
  const [mounted, setMounted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear el scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const removeItem = (id: number, size: string) => {
    setCartItems(items => items.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <>
      {/* Trigger - Ícono de carrito con contador digital clock */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-text-tertiary hover:text-accent transition-colors relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-bg-base border-2 border-accent rounded text-[9px] font-mono text-accent font-bold">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Digital Pop-Up - Rendered in Portal */}
      {mounted && createPortal(
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
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              />

              {/* Pop-Up Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: easing.outExpo 
                }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              >
                {/* Modal Window */}
                <div className="relative w-full max-w-[600px] max-h-[85vh] bg-bg-base border-2 border-accent rounded-lg overflow-hidden shadow-[0_0_60px_rgba(236,72,153,0.15)]">
                  
                  {/* Title Bar Y2K */}
                  <div className="h-8 bg-bg-elevated border-b border-accent/20 flex items-center justify-between px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <div className="w-3 h-3 rounded-full bg-border-default" />
                      <div className="w-3 h-3 rounded-full bg-border-default" />
                    </div>
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-text-tertiary">
                      CART.EXE
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-6 h-6 rounded bg-bg-hover flex items-center justify-center text-text-tertiary hover:text-accent transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </button>
                  </div>

                  {/* Header */}
                  <div className="p-4 border-b border-accent/10">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display font-bold text-xl text-text-primary">
                        Carrito ({cartItems.length})
                      </h2>
                    </div>
                  </div>

                  {/* Items Area */}
                  <div className="flex-1 overflow-y-auto p-4 max-h-[50vh]">
                    {cartItems.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                        <div className="w-16 h-16 bg-bg-image rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                            <path d="M3 6h18"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                          </svg>
                        </div>
                        <p className="font-display text-text-secondary mb-1">Tu carrito está vacío</p>
                        <p className="font-mono text-xs text-text-tertiary">Agrega sneakers para comenzar</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {cartItems.map((item) => (
                          <div 
                            key={`${item.id}-${item.size}`} 
                            className="flex gap-3 p-3 rounded bg-bg-elevated/50 border border-accent/15 hover:border-accent/30 transition-colors"
                          >
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
                              <h4 className="font-display text-sm text-text-primary truncate">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono text-xs text-text-tertiary">Talla {item.size}</span>
                                <span className="text-text-disabled">•</span>
                                <motion.span 
                                  className="font-display font-bold text-accent text-sm inline-block"
                                  whileHover={{ x: [-1, 1, -1], transition: { duration: 0.2, repeat: 2 } }}
                                >
                                  ${item.price.toLocaleString()}
                                </motion.span>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-text-tertiary hover:text-accent transition-colors self-start"
                            >
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
                    <div className="p-4 border-t border-accent/10 space-y-3 bg-bg-elevated/30">
                      <div className="flex justify-between items-center">
                        <span className="font-display text-text-secondary">Subtotal</span>
                        <span className="font-display font-bold text-xl text-text-primary">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                      <button 
                        className="w-full bg-bg-base text-accent py-3 rounded-lg font-mono uppercase tracking-[2px] text-[11px] hover:bg-accent hover:text-text-primary transition-all border-2 border-accent relative"
                        style={{ boxShadow: 'inset 0 0 0 1px #0A0A0A' }}
                      >
                        Proceder al checkout
                      </button>
                      <p className="font-mono text-[10px] text-text-tertiary text-center">
                        Envío gratis en pedidos mayores a $2,500
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      , document.body)}
    </>
  );
}
