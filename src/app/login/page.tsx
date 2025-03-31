'use client';

import { useState } from 'react';
import { AuthSteps } from '@/components/auth/AuthSteps';
import { AuthForm } from '@/components/auth/AuthForm';
import { StaffLoginForm } from '@/components/auth/StaffLoginForm';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Login() {
  const [authType, setAuthType] = useState<'school' | 'staff'>('staff');

  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Blue background with steps - Full width on mobile, half on larger screens */}
      <div className="w-full lg:w-1/2 bg-primary py-10 lg:py-0 order-2 lg:order-1">
        <AuthSteps type={authType} />
      </div>

      {/* Authentication form - Full width on mobile, half on larger screens */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-8 bg-gray-50 order-1 lg:order-2">
        <div className="w-full max-w-md">
          {/* Authentication type selector */}
          <div className="mb-8 flex gap-3 p-1 bg-gray-100 rounded-lg">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthType('staff')}
              className={cn(
                "flex-1 py-3 px-4 rounded-md font-medium transition-all cursor-pointer text-center",
                authType === 'staff'
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200/80"
              )}
            >
              Staff Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthType('school')}
              className={cn(
                "flex-1 py-3 px-4 rounded-md font-medium transition-all cursor-pointer text-center",
                authType === 'school'
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200/80"
              )}
            >
              School Verification
            </motion.button>
          </div>
          
          {authType === 'staff' ? (
            <StaffLoginForm />
          ) : (
            <AuthForm type={authType} />
          )}
        </div>
        
        {/* Footer note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Don't have an account? <Link href="/signup" className="text-primary hover:underline">Create an account</Link></p>
        </div>
      </div>
    </main>
  );
}