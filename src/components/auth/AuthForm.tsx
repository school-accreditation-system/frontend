import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { ArrowRight, Loader2, ArrowLeft, RefreshCw, Home } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

interface AuthFormProps {
  type: 'school' | 'staff';
}

// Schema for school search
const schoolSchema = z.object({
  schoolName: z.string().min(3, { message: "School name must be at least 3 characters" })
});

// Schema for staff email
const staffSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

// Schema for OTP verification
const otpSchema = z.object({
  otp: z.string()
    .min(6, { message: "Verification code must be 6 digits" })
    .max(6, { message: "Verification code must be 6 digits" })
    .regex(/^\d+$/, { message: "Verification code must contain only numbers" })
});

type SchoolFormValues = z.infer<typeof schoolSchema>;
type StaffFormValues = z.infer<typeof staffSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export const AuthForm = ({ type }: AuthFormProps) => {
  const [step, setStep] = useState<'initial' | 'otp'>('initial');
  const [searchTerm, setSearchTerm] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // School form
  const schoolForm = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: { schoolName: '' },
    mode: 'onChange'
  });

  // Staff form
  const staffForm = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: { email: '' },
    mode: 'onChange'
  });

  // OTP form
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
    mode: 'onChange'
  });

  // Reset forms when type changes
  useEffect(() => {
    if (type === 'school') {
      staffForm.reset();
    } else {
      schoolForm.reset();
    }
  }, [type, schoolForm, staffForm]);

  // Handle school form submission
  const handleSchoolSubmit = async (data: SchoolFormValues) => {
    setIsLoading(true);
    setSearchTerm(data.schoolName);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep('otp');
    startCountdown();
    setIsLoading(false);
  };

  // Handle staff form submission
  const handleStaffSubmit = async (data: StaffFormValues) => {
    setIsLoading(true);
    setSearchTerm(data.email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep('otp');
    startCountdown();
    setIsLoading(false);
  };

  // Start countdown for OTP resend
  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    startCountdown();
    // Implement resend logic here
  };

  const handleOtpSubmit = async (data: OtpFormValues) => {
    setIsLoading(true);

    // TODO: Implement OTP verification logic here and remove the console.log
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <motion.div 
        key={step} 
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="bg-white p-6 md:p-8 rounded-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {step === 'initial' ? 
              (type === 'school' ? 'Find Your School' : 'NESA Staff Login') : 
              'Enter Verification Code'
            }
          </h2>
          
          <Link href="/" className="text-gray-600 hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>

        {step === 'initial' ? (
          type === 'school' ? (
            // School form
            <form onSubmit={schoolForm.handleSubmit(handleSchoolSubmit)} className="space-y-5">
              <div>
                <label 
                  htmlFor="schoolName" 
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  School Name
                </label>
                
                <Input
                  id="schoolName"
                  type="text"
                  placeholder="Enter school name..."
                  className="w-full px-4 py-3 h-12 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                  {...schoolForm.register('schoolName')}
                  aria-invalid={!!schoolForm.formState.errors.schoolName}
                />
                
                {/* Error message */}
                {schoolForm.formState.errors.schoolName && (
                  <p className="mt-1 text-sm text-red-600">
                    {schoolForm.formState.errors.schoolName.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 h-12 bg-primary text-white rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                disabled={isLoading || !schoolForm.formState.isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            // Staff form
            <form onSubmit={staffForm.handleSubmit(handleStaffSubmit)} className="space-y-5">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email Address
                </label>
                
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 h-12 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                  {...staffForm.register('email')}
                  aria-invalid={!!staffForm.formState.errors.email}
                />
                
                {/* Error message */}
                {staffForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {staffForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 h-12 bg-primary text-white rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                disabled={isLoading || !staffForm.formState.isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>
          )
        ) : (
          <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-5">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1.5">
                Enter the verification code sent to:
              </label>
              <p className="text-sm font-medium text-primary mb-4">
                {type === 'school' ? 'Your school email address' : searchTerm}
              </p>
              
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 h-12 border text-center font-medium text-lg tracking-widest bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
                {...otpForm.register('otp')}
                aria-invalid={!!otpForm.formState.errors.otp}
              />
              
              {/* Error message */}
              {otpForm.formState.errors.otp && (
                <p className="mt-1 text-sm text-red-600">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 h-12 bg-primary text-white rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              disabled={isLoading || !otpForm.formState.isValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Code</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>

            <div className="pt-2 flex flex-col space-y-4">
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Resend code in {countdown} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm text-primary hover:text-primary/80 cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Resend verification code
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep('initial')}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to {type === 'school' ? 'school search' : 'email entry'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}; 