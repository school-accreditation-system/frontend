'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 py-3 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © Copyright NESA 2025 All rights reserved
          </div>

          {/* Social Media */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-3">Follow us on</span>
            <div className="flex space-x-3">
              <Link href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Twitter size={16} />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Instagram size={16} />
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Facebook size={16} />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <Linkedin size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 