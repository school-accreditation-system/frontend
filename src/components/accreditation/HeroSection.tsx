'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, User, LogIn, Menu } from 'lucide-react';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-gradient-to-br from-primary to-secondary py-0 pb-24 relative overflow-hidden">
      {/* Navigation Bar - Sticky */}
      <div 
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-secondary shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40 bg-white rounded-sm p-1 overflow-hidden shadow-sm">
              <Image 
                src="/nesa-logo.png"
                alt="NESA Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white rounded-full p-1 transition-all duration-200 hover:border hover:border-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={22} />
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/signup" className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
            
            <Link href="/login" className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Link>
            
            <div className="flex items-center text-white px-3 py-1.5 rounded-sm border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              English
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary py-2 px-4 shadow-md">
            <div className="flex flex-col space-y-2">
              <Link href="/signup" className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
              
              <Link href="/login" className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>
              
              <div className="flex items-center text-white px-3 py-2 rounded-sm border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm cursor-pointer">
                <Globe className="h-4 w-4 mr-2" />
                English
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty space to compensate for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4">
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">School Accreditation Portal</h1>
          
          {/* Pure White Search Box */}
          <div className="relative mt-10 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                placeholder="Search for services or requests" 
                className="w-full rounded-md p-6 pl-12 text-gray-800 placeholder:text-gray-400 bg-white border-0 shadow-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-0"
                style={{ backgroundColor: 'white' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 