'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ErrorAlertProps {
  error: string | null;
  className?: string;
}

export const ErrorAlert = ({
  error,
  className = 'bg-red-50 border-red-200'
}: ErrorAlertProps) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-700">{error}</AlertDescription>
    </Alert>
  );
}; 