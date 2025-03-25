/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Globe, LogIn, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../public/nesa-logo.png";

const Header = () => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {" "}
      {/* Navigation Bar - Sticky */}
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          bg-secondary shadow-md
        `}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-20 bg-white rounded-md p-1 overflow-hidden shadow-sm">
              <Image
                src={logo}
                alt="NESA Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white rounded-full p-1.5 transition-all duration-200 hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signup"
              className="flex items-center text-white px-4 py-2 rounded-md border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm font-medium"
            >
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Link>

            <Link
              href="/login"
              className="flex items-center text-white px-4 py-2 rounded-md border border-white/30 hover:cursor-pointer hover:border-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Link>

            <div className="flex items-center text-white px-4 py-2 rounded-md border border-transparent hover:cursor-pointer hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              English
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-secondary py-3 px-4 shadow-md animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                href="/signup"
                className="flex items-center text-white px-4 py-2.5 rounded-md border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Link>

              <Link
                href="/login"
                className="flex items-center text-white px-4 py-2.5 rounded-md border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>

              <div className="flex items-center text-white px-4 py-2.5 rounded-md border border-transparent hover:border-white/50 hover:bg-white/10 transition-all duration-200 text-sm cursor-pointer">
                <Globe className="h-4 w-4 mr-2" />
                English
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Empty space to compensate for fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default Header;
