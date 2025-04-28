'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorPopoverProps {
  message: string;
  onContactSupport: () => void;
}

const ErrorPopover = ({ message, onContactSupport }: ErrorPopoverProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="animate-pulse fixed bottom-4 right-4 z-50 w-full max-w-xs lg:max-w-md p-4 bg-red-100 border border-red-300 rounded-lg shadow-lg">
        <div className="flex items-start">
          <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full mr-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <span className="text-red-700 font-semibold">{message}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Button
            variant="outline"
            onClick={onContactSupport}
            className="text-red-700 border-red-700"
          >
            Contact Site Administrator for Support
          </Button>
          {/* <Button
            variant="link"
            onClick={handleClose}
            className="text-red-700 hover:underline"
          >
            Close
          </Button> */}
        </div>
      </div>
    )
  );
};

export default ErrorPopover;