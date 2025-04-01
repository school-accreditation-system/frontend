'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StaffSignupForm } from '@/components/auth/StaffSignupForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Blue background with steps - Full width on mobile, half on larger screens */}
      <div className="w-full lg:w-1/2 bg-primary py-10 lg:py-0 order-2 lg:order-1">
        <div className="h-full flex flex-col justify-center items-center px-4 lg:px-8 py-8 lg:py-12 text-white">
          <div className="max-w-md w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Join NESA as a Staff Member</h2>
            
            <div className="hidden lg:block lg:ml-10 xl:ml-20">
              {/* Using the same style as AuthSteps */}
              <div className="flex mb-12 relative">
                <div className="absolute top-12 left-6 w-0.5 h-full bg-white/20 -z-10"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="cursor-pointer"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold"
                        style={{
                          boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        1
                      </div>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Create Your Account</h3>
                    <p className="text-white/80 mt-1">
                      Fill in your personal and professional details to register for a staff account
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex mb-12 relative">
                <div className="absolute top-12 left-6 w-0.5 h-full bg-white/20 -z-10"></div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="cursor-pointer"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold"
                        style={{
                          boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        2
                      </div>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Verification</h3>
                    <p className="text-white/80 mt-1">
                      Your information will be verified by HR and department administrators
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex mb-12 relative">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="cursor-pointer"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold"
                        style={{
                          boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        3
                      </div>
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Access Granted</h3>
                    <p className="text-white/80 mt-1">
                      Once approved, you'll receive access to the system based on your department and role
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile horizontal steps */}
            <div className="lg:hidden">
              <div className="flex justify-between mb-10 relative max-w-sm mx-auto">
                {/* Horizontal connecting line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20 -z-10"></div>
                
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="cursor-pointer mb-3"
                    >
                      <div 
                        className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-semibold"
                        style={{
                          boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {stepNumber}
                      </div>
                    </motion.div>
                    <h3 className="font-semibold text-white text-sm text-center">
                      {stepNumber === 1 ? "Create Account" : 
                       stepNumber === 2 ? "Verification" : "Access Granted"}
                    </h3>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-white/90 text-center">
                  Fill in your personal and professional details to register for a staff account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration form - Full width on mobile, half on larger screens */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-8 bg-gray-50 order-1 lg:order-2">
        <div className="w-full max-w-2xl">
          <StaffSignupForm />
        </div>
      </div>
    </main>
  );
} 