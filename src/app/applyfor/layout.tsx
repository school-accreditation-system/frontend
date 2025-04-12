'use client';

import { NavBar } from '@/components/navigation/NavBar';
import { ReactNode } from 'react';

export default function ApplyForLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NavBar is now outside the main scroll area and stays fixed */}
      <NavBar />
      
      {/* Main content with proper top padding to prevent overlap with navbar */}
      <main className="flex-grow pt-4">
        <div className="container mx-auto px-4 py-4">
          {children}
        </div>
      </main>
    </div>
  );
}