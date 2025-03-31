'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, User, LogOut, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const NavBar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="bg-gradient-to-br from-primary to-secondary shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-white text-blue-600 p-1.5 rounded-md font-bold text-xl shadow-sm group-hover:shadow-md transition-all duration-300">
              NESA
            </span>
            <span className="font-semibold text-white hidden sm:inline-block group-hover:text-blue-100 transition-colors duration-200">
              School Management
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="sm:hidden text-white hover:text-blue-200 transition-colors p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden sm:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all duration-200
                    ${isActive
                      ? 'text-blue-600 bg-white shadow-sm'
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200 relative group">
              <User size={20} />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Profile
              </span>
            </button>
            <button className="p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200 relative group">
              <LogOut size={20} />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Log Out
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="sm:hidden bg-indigo-800 shadow-inner"
        >
          <div className="container mx-auto px-4 py-2 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors
                    ${isActive
                      ? 'bg-white text-blue-600 font-medium'
                      : 'text-white hover:bg-white/10'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-indigo-700 my-2 pt-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-md w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};