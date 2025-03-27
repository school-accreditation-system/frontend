'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, CheckCircle, RefreshCw, Timer, AlertTriangle, LockKeyhole } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { School, VerifyOtpStepProps } from '../types';
import { schoolsData } from '@/constants/schoolsData';

export const VerifyOtpStep: React.FC<VerifyOtpStepProps> = ({ 
  email,
  onVerify,
  onBack
}) => {
  const [otpCode, setOtpCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Countdown for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (otpCode.length < 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    // TODO: Implement the API call to verify the OTP (call backend here)
    setTimeout(() => {
      // FIXME: Remove this once the API call is implemented
      if (otpCode === '123456') {
        setIsSuccess(true);
          
          // FIXME: Remove this once the API call is implemented
          // Wait a moment to show success state before proceeding
        setTimeout(() => {
          // FIXME: Remove this once the API call is implemented
          const existingSchool = schoolsData.find(s => s.email === email);
          
          const verifiedSchool: School = existingSchool || {
            id: Date.now(), // In a real app, this would come from the backend
            name: "Newly Registered School",
            address: "New School Address, Kigali",
            email: email,
            phone: "+250788123456",
            schoolIdentification: false,
            selfAssessment: false,
          };
          
          onVerify(verifiedSchool);
        }, 1000);
      } else {
        setError('Invalid verification code. Please check and try again.');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResendCode = () => {
    // In a real implementation, this would be an API call to resend OTP
    setTimeLeft(120);
    setCanResend(false);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      console.log("OTP resent to", email);
    }, 1000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {!isSuccess ? (
        <>
          <div className="w-full rounded-lg border px-4 py-4 bg-blue-50 border-blue-100 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-blue-800 mb-1">Verification Code Sent</h4>
                <p className="text-sm text-blue-700">
                  We've sent a 6-digit verification code to <span className="font-medium block mt-1">{email}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-4 sm:space-y-5">
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-gray-500 mb-4">
                <Timer className="h-4 w-4" />
                <p className="text-sm font-medium">
                  Code expires in <span className="text-gray-700">{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-5 flex flex-col items-center">
                <div className="bg-primary/10 p-2.5 sm:p-3 rounded-full mb-3">
                  <LockKeyhole className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                
                <Input
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6));
                    setError('');
                  }}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="text-center text-lg sm:text-xl tracking-wider py-4 sm:py-6 font-mono max-w-[180px] sm:max-w-[200px]"
                  autoFocus
                />
                
                <CardDescription className="mt-2 text-center text-xs sm:text-sm">
                  Enter the 6-digit verification code
                </CardDescription>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-4 sm:pb-5 pt-0">
                {canResend ? (
                  <Button 
                    variant="ghost" 
                    onClick={handleResendCode}
                    className="text-xs gap-1 hover:cursor-pointer hover:bg-primary/80"
                    size="sm"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Resend Verification Code
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the code? You can resend in {formatTime(timeLeft)}
                  </p>
                )}
              </CardFooter>
            </Card>
            
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                <AlertDescription className="text-xs sm:text-sm text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            
            {/* FIXME: Remove this once the API call is implemented */}
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-2.5 sm:p-3 text-xs text-muted-foreground">
                <p className="font-medium mb-1">For demo purposes:</p>
                <p>Use code <span className="font-mono font-bold">123456</span> to simulate a successful verification.</p>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <Button 
                type="button"
                variant="ghost" 
                onClick={onBack}
                className=" hover:cursor-pointer hover:bg-gray-600 gap-1 text-xs sm:text-sm"
                size="sm"
                disabled={isVerifying}
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Back
              </Button>
              <Button 
                onClick={handleVerify}
                disabled={isVerifying || otpCode.length < 6}
                className="gap-1 text-xs sm:text-sm hover:cursor-pointer hover:bg-primary/80"
                size="sm"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
                {!isVerifying && <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
          <div className="bg-green-100 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-green-800">Verification Successful</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your school has been verified successfully. 
            You will now be redirected to continue with your request.
          </p>
        </div>
      )}
    </div>
  );
}; 