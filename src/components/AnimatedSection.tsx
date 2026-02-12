'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import React from 'react';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function AnimatedSection({
  children,
  delay = 0,
  duration = 0.6,
  ...props
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Si el usuario prefiere menos movimiento, renderizar sin animaciones
  if (shouldReduceMotion) {
    return <section {...props}>{children}</section>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, amount: 0.3 }}
      {...(props as any)}
    >
      {children}
    </motion.section>
  );
}

// Versión para divs si se necesita
export function AnimatedDiv({
  children,
  delay = 0,
  duration = 0.6,
  ...props
}: Omit<AnimatedSectionProps, 'className'> & {
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, amount: 0.3 }}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
