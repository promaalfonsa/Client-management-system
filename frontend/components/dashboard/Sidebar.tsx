'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Laptop,
  Wrench,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
  { name: 'Clients', href: '/clients', icon: Users, color: 'from-purple-500 to-pink-500' },
  { name: 'Devices', href: '/devices', icon: Laptop, color: 'from-green-500 to-emerald-500' },
  { name: 'Technicians', href: '/technicians', icon: Wrench, color: 'from-orange-500 to-red-500' },
  { name: 'Invoices', href: '/invoices', icon: FileText, color: 'from-yellow-500 to-amber-500' },
  { name: 'SMS Updates', href: '/sms', icon: MessageSquare, color: 'from-indigo-500 to-violet-500' },
];

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen fixed left-0 top-0 z-50 shadow-2xl border-r border-gray-700"
        >
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-700/50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-blue-400 rounded-xl blur-md -z-10"
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TechService
                </h1>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Management Pro
                </p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3 space-y-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative flex items-center space-x-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group overflow-hidden',
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    )}
                  >
                    {/* Background gradient effect on hover */}
                    {!isActive && (
                      <motion.div
                        className={cn(
                          'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                          item.color
                        )}
                      />
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <motion.div
                      animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        'p-2 rounded-lg',
                        isActive && `bg-gradient-to-br ${item.color}`
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="font-medium text-sm">{item.name}</span>

                    {/* Sparkle effect on active */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: [0, 1, 0], rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute right-4"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-xs text-gray-500">© 2024 TechService Pro</p>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-600"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>System Active</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
