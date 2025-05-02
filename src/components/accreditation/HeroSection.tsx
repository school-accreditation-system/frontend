"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary py-16 sm:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* Left side - Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            School Accreditation Portal
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Find all your educational accreditation services in one place. Register your school, apply for accreditation, and verify approved schools easily.
          </p>

          <div className="flex flex-row  gap-4 mb-6 max-w-md mx-auto md:mx-0">
            <Link href="/accredited-schools" className="w-full">
              <Button variant="outline" className="1/2 bg-transparent border border-white text-white hover:cursor-pointer hover:bg-primary hover: cursor pointer font-medium">
                View Approved schools
              </Button>
            </Link>
            <Link href="/accredited-schools" className="w-full">
              <Button variant="outline" className="w-full bg-transparent border border-white text-white hover:cursor-pointer hover:bg-primary hover: cursor pointer font-medium">
                Staff Login
              </Button>
            </Link>
          </div>

          <div className="flex items-center p-1 bg-white rounded-lg shadow-md max-w-md mx-auto md:mx-0">
            <div className="p-2 text-primary">
              <Search size={20} />
            </div>
            <Input
              type="search"
              placeholder="Qucik search enter school name, location, etc. to search"
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button size="sm" className="bg-primary hover:bg-secondary text-white">
              Search
            </Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 hidden md:block relative h-80">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 bg-primary rounded-full opacity-20 animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              <Image
                src="/nesa-logo.png"
                alt="NESA Accreditation"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
