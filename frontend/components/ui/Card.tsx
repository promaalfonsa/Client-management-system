'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  animate?: boolean;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, animate = true, onClick, hover = true }: CardProps) {
  if (animate) {
    return (
      <motion.div
        className={cn(
          'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 relative overflow-hidden',
          hover && 'hover:shadow-2xl hover:border-blue-200/50 cursor-pointer',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={hover ? { y: -4, scale: 1.01 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        onClick={onClick}
      >
        {/* Gradient overlay on hover */}
        {hover && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        )}
        
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
  
  return (
    <div
      className={cn(
        'bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6',
        hover && 'hover:shadow-2xl hover:border-blue-200/50 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className={cn('mb-4', className)}
    >
      {children}
    </motion.div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}
