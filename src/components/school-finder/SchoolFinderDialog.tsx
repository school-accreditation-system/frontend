'use client';

import React, { useState } from 'react';
import { School } from './types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SchoolSearchStep } from './steps/SchoolSearchStep';
import { VerifyOtpStep } from './steps/VerifyOtpStep';

type Step = 'search' | 'verify';

interface SchoolFinderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSchoolSelect: (school: School) => void;
  title?: string;
  description?: string;
}

export const SchoolFinderDialog = ({
  isOpen,
  onOpenChange,
  onSchoolSelect,
  title = "Find Your School",
  description = "Search for your school to continue with your request."
}) => {
  const [step, setStep] = useState<Step>('search');
  const [verificationEmail, setVerificationEmail] = useState<string>('');
  const [pendingSchool, setPendingSchool] = useState<School | null>(null);
  
  const handleClose = () => {
    onOpenChange(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setStep('search');
      setVerificationEmail('');
      setPendingSchool(null);
    }, 300);
  };
  
  const handleBack = () => {
    setStep('search');
  };
  
  const handleStartVerification = (email: string, school: School | null) => {
    setVerificationEmail(email);
    setPendingSchool(school);
    setStep('verify');
  };
  
  const handleVerification = (school: School) => {
    // If we're verifying an existing school that was selected
    if (pendingSchool) {
      onSchoolSelect(pendingSchool);
    } else {
      // If we're verifying a newly registered school
      onSchoolSelect(school);
    }
    handleClose();
  };

  // Prevent closing dialog during verification by clicking outside
  const handleInteractOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (step !== 'search') {
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[625px] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        onInteractOutside={handleInteractOutside}
      >
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {step === 'search' && title}
            {step === 'verify' && "Verify School Email"}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            {step === 'search' && description}
            {step === 'verify' && `Enter the verification code sent to ${verificationEmail}`}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 sm:mt-6">
          {step === 'search' && (
            <SchoolSearchStep 
              onSchoolSelect={onSchoolSelect}
              onStartVerification={handleStartVerification}
              closeDialog={handleClose}
            />
          )}

          {step === 'verify' && (
            <VerifyOtpStep 
              email={verificationEmail}
              onVerify={handleVerification}
              onBack={handleBack}
            />
          )}
        </div>

        {step === 'search' && (
          <DialogFooter className="mt-4 sm:mt-6">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:cursor-pointer hover:bg-red-700 sm:w-auto text-xs sm:text-sm"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}; 