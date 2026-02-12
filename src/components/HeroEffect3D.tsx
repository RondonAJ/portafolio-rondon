'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function HeroEffect3D() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG backdrop with 3D effect */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ filter: 'url(#glow-filter)' }}
      >
        <defs>
          {/* Gradients para simular luz y profundidad */}
          <radialGradient id="deep-glow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#64FFDA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A192F" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="side-glow" cx="80%" cy="50%">
            <stop offset="0%" stopColor="#112240" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#0A192F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A192F" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="depth-layer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#64FFDA" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#112240" stopOpacity="0.2" />
          </linearGradient>

          {/* Filtros de blur para profundidad */}
          <filter id="blur-light">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <filter id="blur-medium">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
          <filter id="blur-heavy">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          </filter>
          <filter id="glow-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Capa de fondo - más desenfocada (más lejana) */}
        <motion.g
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <circle
            cx="500"
            cy="300"
            r="400"
            fill="url(#deep-glow)"
            filter="url(#blur-heavy)"
          />
        </motion.g>

        {/* Capa media - paralaje lento */}
        <motion.g
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ellipse
            cx="200"
            cy="400"
            rx="300"
            ry="250"
            fill="url(#side-glow)"
            filter="url(#blur-medium)"
          />
        </motion.g>

        {/* Capa frontal - menos desenfoque (más cercana) */}
        <motion.g
          animate={{
            y: [0, 35, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <circle
            cx="850"
            cy="600"
            r="350"
            fill="url(#deep-glow)"
            filter="url(#blur-light)"
          />
        </motion.g>

        {/* Líneas de profundidad - simulan perspectiva */}
        <motion.g
          animate={{
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          strokeLinecap="round"
        >
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="1000"
            stroke="url(#depth-layer)"
            strokeWidth="3"
            filter="url(#blur-light)"
          />
          <line
            x1="300"
            y1="0"
            x2="400"
            y2="1000"
            stroke="url(#depth-layer)"
            strokeWidth="2"
            filter="url(#blur-medium)"
            opacity="0.6"
          />
          <line
            x1="700"
            y1="0"
            x2="600"
            y2="1000"
            stroke="url(#depth-layer)"
            strokeWidth="2"
            filter="url(#blur-medium)"
            opacity="0.6"
          />
        </motion.g>

        {/* Capa de efecto luminoso central */}
        <motion.g
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <circle
            cx="500"
            cy="500"
            r="250"
            fill="none"
            stroke="#64FFDA"
            strokeWidth="3"
            filter="url(#blur-light)"
          />
        </motion.g>

        {/* Rectángulos de perspectiva */}
        <motion.g
          animate={{
            opacity: [0.1, 0.25, 0.1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          <rect
            x="350"
            y="200"
            width="300"
            height="600"
            fill="none"
            stroke="#64FFDA"
            strokeWidth="1"
            opacity="0.3"
            filter="url(#blur-light)"
          />
        </motion.g>
      </svg>

      {/* Overlay gradient - simula atmósfera */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-deep-blue/20 to-deep-blue/40 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Efecto de vignette sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-deep-blue/30 pointer-events-none" />
    </div>
  );
}
