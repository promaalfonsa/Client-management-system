'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Laptop,
  Wrench,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Devices', href: '/devices', icon: Laptop },
  { name: 'Technicians', href: '/technicians', icon: Wrench },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'SMS Updates', href: '/sms', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2"
        >
          <Wrench className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">TechService</h1>
            <p className="text-xs text-gray-400">Client Management</p>
          </div>
        </motion.div>
      </div>

      <nav className="mt-6 px-3">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          © 2024 TechService Pro
        </p>
      </div>
    </div>
  );
}
