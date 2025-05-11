"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, User, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "../../../public/nesa-logo.png";
import Image from "next/image";

export const NavBar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    // { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    // { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="bg-gradient-to-br from-primary to-secondary shadow-lg sticky top-0 z-20">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and site name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              src={logo}
              alt="NESA Logo"
              className="object-contain"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              priority
            />
          </div>
          <span className="font-semibold text-white hidden sm:inline-block group-hover:text-blue-100 transition-colors duration-200">
            School Accreditation
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white hover:text-blue-200 transition-all duration-300 ease-in-out p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-blue-600 bg-white shadow-sm"
                        : "text-white hover:bg-white/10"
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
        <button className="hidden md:flex items-center gap-2 justify-center text-white capitalize font-medium hover:bg-white/10 px-4 py-2 rounded-md hover:cursor-pointer">
          <LogOut size={20} /> logout
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-primary z-20"
        >
          <div className="p-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-white text-blue-600 font-medium"
                        : "text-white hover:bg-white/10"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <button
              className="flex items-center gap-2 px-4 py-3 text-white hover:bg-white/10 rounded-md w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
