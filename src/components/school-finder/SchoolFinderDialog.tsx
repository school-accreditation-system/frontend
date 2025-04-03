'use client';

import { closeDialog, resetDialog } from '@/app/slicers/DialogSlice';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SchoolSearchStep } from './steps/SchoolSearchStep';
import { VerifyOtpStep } from './steps/VerifyOtpStep';
import { School } from './types';

type Step = 'search' | 'verify';

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
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog.isOpen);
  const isClosingRef = useRef(false);

  // Check if we already have a selected school in localStorage
  useEffect(() => {
    const checkExistingSchool = () => {
      try {
        if (typeof window === 'undefined') return;
        
        const schoolId = localStorage.getItem('selectedSchoolId');
        const schoolEmail = localStorage.getItem('selectedSchoolEmail');
        
        if (schoolId && schoolEmail && schoolId !== 'undefined' && schoolId !== 'null') {
          // We have a school already selected, close the dialog
          dispatch(closeDialog());
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        // Continue showing the dialog if we can't access localStorage
      }
    };
    
    checkExistingSchool();
  }, [dispatch]);

  const handleClose = () => {
    dispatch(resetDialog());

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
      if (onSchoolSelect) {
        onSchoolSelect(pendingSchool);
      }
    } else {
      // If we're verifying a newly registered school
      if (onSchoolSelect) {
        onSchoolSelect(school);
      }
    }
    handleClose();
  };

  // Prevent closing dialog during verification by clicking outside
  const handleInteractOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClosingRef.current) return;
    
    isClosingRef.current = true;
    
    // Allow closing only during search step
    if (step !== 'search') {
      e.preventDefault();
      return false;
    }
    
    dispatch(closeDialog());
    
    setTimeout(() => {
      isClosingRef.current = false;
    }, 100);
  };

  return (
    <Dialog open={dialog} onOpenChange={() => dispatch(closeDialog())} >
      <DialogContent
        className="sm:max-w-[625px] max-h-[85vh] sm:max-h-[90vh] overflow-y-hidden p-4 sm:p-6"
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
                onClick={handleClose}
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