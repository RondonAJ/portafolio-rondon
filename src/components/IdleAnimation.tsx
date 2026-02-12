'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export function IdleAnimation() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glow orb 1 - Cyan */}
      <motion.div
        className="absolute top-20 right-1/4 w-72 h-72 bg-cyan/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow orb 2 - Deep Blue */}
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-deep-blue-lighter/30 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Floating lines */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-1 h-64 bg-gradient-to-b from-cyan/40 to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating line 2 */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-1 h-48 bg-gradient-to-b from-cyan/30 to-transparent"
        animate={{
          opacity: [0.1, 0.4, 0.1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
}
