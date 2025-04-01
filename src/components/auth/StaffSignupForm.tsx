'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Eye, EyeOff, Lock, Mail, User, Phone, Building, Home } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { staffSignupSchema, StaffSignupValues } from './types/schema';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const StaffSignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Staff signup form
  const form = useForm<StaffSignupValues>({
    resolver: zodResolver(staffSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      // department: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange'
  });

  // Handle staff signup submission
  const handleSignupSubmit = async (data: StaffSignupValues) => {
    setIsLoading(true);
    setFormError(null);
    
    try {
      // FIXME: Remove this delay when API is implemented
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API call to register staff
      console.log('Signup data:', data);
      
      // FIXME: Redirect to verification page or login page
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setFormError('Registration failed. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
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
        <CardHeader className="pb-2">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Staff Registration
          </CardTitle>
          <CardDescription>
            Create your NESA staff account to access the system
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignupSubmit)} className="space-y-5">
              {/* Name fields - displayed in a grid on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        First Name
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            className="pl-10 h-12"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name Field */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Last Name
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            className="pl-10 h-12"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                          placeholder="Enter your work email"
                          className="pl-10 h-12"
                          type="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormDescription className="text-xs text-gray-500">
                      Please use your official NESA email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Number
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          className="pl-10 h-12"
                          type="tel"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*TODO: Uncomment this when API is implemented */}
              {/* <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Department
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-12 pl-10">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <Building className="h-5 w-5" />
                            </div>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {DEPARTMENTS.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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
                          placeholder="Create a strong password"
                          className="pl-10 pr-12 h-12"
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormDescription className="text-xs text-gray-500">
                      Must include uppercase, lowercase, and number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="h-5 w-5" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          className="pl-10 pr-12 h-12"
                          type={showConfirmPassword ? "text" : "password"}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
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

              {/* Submit Button */}
              <div className="flex justify-center gap-4">
                <Button
                type="submit"
                  className="w-1/2 h-12 bg-gray-100 hover:cursor-pointer text-gray-600 hover:bg-gray-500 hover:text-white p-4 rounded-lg"
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
              </div>
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </motion.div>
    </Card>
  );
}; 