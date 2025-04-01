'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Eye, EyeOff, Home, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { staffLoginSchema, StaffLoginValues } from './types/schema';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const StaffLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Staff login form
  const form = useForm<StaffLoginValues>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: { 
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  // Handle staff login submission
  const handleLoginSubmit = async (data: StaffLoginValues) => {
    setIsLoading(true);
    setFormError(null);
    
    try {
      // FIXME: Remove this delay when API is implemented
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API call to authenticate staff
      console.log('Login data:', data);
      
      // FIXME: Redirect to staff dashboard on successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // FIXME: Handle login error here
      setFormError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Card className="w-full">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            NESA Staff Login
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your email..."
                          className="pl-10 h-12"
                          type="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          className="pl-10 pr-12 h-12"
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <button 
                        type="button" 
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form-level errors */}
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center gap-4">
                <Button
                type="submit"
                  className="w-1/2 h-12 bg-gray-100 hover:cursor-pointer text-gray-600 p-4 rounded-lg"
                  onClick={() => router.push('/')}
                  variant="outline"
                >
                  <Home className="h-5 w-5 ml-2" />
                  <span>Home</span>
                </Button>
              <Button
                type="submit"
                className="w-1/2 h-12 hover:cursor-pointer"
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </motion.div>
    </Card>
  );
}; 