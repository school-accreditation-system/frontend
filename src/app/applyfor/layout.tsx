'use client';

import { NavBar } from '@/components/navigation/NavBar';
import { ReactNode } from 'react';
import { RequireSchool } from '@/components/selfAssessment/RequireSchool';

export default function ApplyForLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <RequireSchool>
        <main className="flex-grow pt-4">
          <div className="container mx-auto px-4 py-4">
            {children}
          </div>
        </main>
      </RequireSchool>
    </div>
  );
}