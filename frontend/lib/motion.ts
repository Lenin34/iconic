// Curvas de easing y duraciones para Framer Motion
// Replicando la suavidad de Landa

export const easing = {
  outExpo:    [0.19, 1, 0.22, 1] as const,
  outQuart:   [0.25, 1, 0.5, 1] as const,
  inOutSoft:  [0.4, 0, 0.2, 1] as const,
  spring:     [0.34, 1.56, 0.64, 1] as const,
};

export const duration = {
  fast:   0.15,
  base:   0.2,
  medium: 0.3,
  slow:   0.4,
  slower: 0.5,
};

// Variants para stagger de hijos
export const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easing.outExpo },
  },
};
