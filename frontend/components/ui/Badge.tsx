'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  children: React.ReactNode;
  pulse?: boolean;
}

export function Badge({ variant = 'default', className, children, pulse = false, ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300',
    success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300',
    warning: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-300',
    danger: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300',
    purple: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300',
  };

  const badge = (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border shadow-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-2 h-2 rounded-full bg-current mr-2"
        />
      )}
      {children}
    </span>
  );

  return pulse ? (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {badge}
    </motion.span>
  ) : (
    badge
  );
}
