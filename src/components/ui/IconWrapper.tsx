'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mx-auto mb-6 transition-all",
      className
    )}>
      {children}
    </div>
  );
}; 