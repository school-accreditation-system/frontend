'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { SchoolRegistrationFormData } from '@/components/school-finder/types';

const schoolRegistrationSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  address: z.string().min(5, 'Please enter a valid address'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  contactPersonName: z.string().min(2, 'Contact person name is required'),
  contactPersonEmail: z.string().email('Please enter a valid email address'),
});

export const SchoolRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm<SchoolRegistrationFormData>({
    resolver: zodResolver(schoolRegistrationSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      phone: '',
      contactPersonName: '',
      contactPersonEmail: '',
    },
  });

  const onSubmit = async (data: SchoolRegistrationFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store the registration data temporarily
      localStorage.setItem('pendingSchoolRegistration', JSON.stringify(data));
      
      // Redirect to verification page
      router.push('/verify-school');
    } catch (err) {
      setError('Failed to register school. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">School Name</Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Enter school name"
            className={form.formState.errors.name ? 'border-red-500' : ''}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">School Address</Label>
          <Input
            id="address"
            {...form.register('address')}
            placeholder="Enter school address"
            className={form.formState.errors.address ? 'border-red-500' : ''}
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">School Email</Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder="Enter school email"
            className={form.formState.errors.email ? 'border-red-500' : ''}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">School Phone</Label>
          <Input
            id="phone"
            {...form.register('phone')}
            placeholder="Enter school phone number"
            className={form.formState.errors.phone ? 'border-red-500' : ''}
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPersonName">Contact Person Name</Label>
          <Input
            id="contactPersonName"
            {...form.register('contactPersonName')}
            placeholder="Enter contact person name"
            className={form.formState.errors.contactPersonName ? 'border-red-500' : ''}
          />
          {form.formState.errors.contactPersonName && (
            <p className="text-sm text-red-500">{form.formState.errors.contactPersonName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPersonEmail">Contact Person Email</Label>
          <Input
            id="contactPersonEmail"
            type="email"
            {...form.register('contactPersonEmail')}
            placeholder="Enter contact person email"
            className={form.formState.errors.contactPersonEmail ? 'border-red-500' : ''}
          />
          {form.formState.errors.contactPersonEmail && (
            <p className="text-sm text-red-500">{form.formState.errors.contactPersonEmail.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full hover:cursor-pointer bg-primary hover:bg-primary/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Registering...'
        ) : (
          <>
            Register School
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}; 