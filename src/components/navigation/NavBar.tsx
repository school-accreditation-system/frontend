'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-primary text-white p-1.5 rounded font-bold text-xl">NESA</span>
            <span className="font-semibold text-gray-800 hidden sm:inline-block">
              School Management
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{link.label}</span>
                  {isActive && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}; 