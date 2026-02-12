'use client';

import { motion, HTMLMotionProps, easeOut } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import React from 'react';

interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  duration?: number;
  direction?: 'vertical' | 'horizontal';
}

export function AnimatedContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  duration = 0.6,
  direction = 'vertical',
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Si el usuario prefiere menos movimiento, renderizar sin animaciones
  if (shouldReduceMotion) {
    const { variants, initial, whileInView, viewport, transition, ...divProps } = props;
    return <div {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  duration?: number;
}

export function AnimatedItem({
  children,
  duration = 0.6,
  ...props
}: AnimatedItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const { variants, initial, whileInView, viewport, transition, ...divProps } = props;
    return <div {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: easeOut,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
