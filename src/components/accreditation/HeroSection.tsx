"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary py-16 sm:py-24 cursor-default">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-around items-center gap-6">
        {/* Left side - Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white">
            School Accreditation Portal
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Find all your educational accreditation services in one place.
            Register your school, apply for accreditation, and verify approved
            schools easily.
          </p>

          <div className="flex items-center gap-6 max-w-lg">
            <Link
              href="/accredited-schools"
              className="border w-full text-base text-primary font-medium bg-white px-4 h-9 flex items-center justify-center rounded-md hover:bg-primary hover:text-white"
            >
              view accredited schools
            </Link>
            <Link
              href="/login"
              className="border w-full text-base text-primary font-medium bg-white px-4 h-9 flex items-center justify-center rounded-md hover:bg-primary hover:text-white"
            >
              Staff Login
            </Link>
          </div>

          <div className="flex items-center px-2 py-1 bg-white rounded-lg shadow-md max-w-lg">
            <Search className="text-primary w-5 h-5" />
            <Input
              type="search"
              placeholder="Quick search enter school name, location, etc. to search"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 capitalize shadow-none"
            />
            <Button size="sm">Search</Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-64 h-64 relative">
          <Image
            src="/nesa-logo.png"
            alt="NESA Accreditation"
            layout="fill"
            objectFit="contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
