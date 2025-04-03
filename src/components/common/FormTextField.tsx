'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';

interface FormTextFieldProps {
  form: UseFormReturn<any>;
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  required?: boolean;
}

export const FormTextField = ({
  form,
  id,
  label,
  placeholder,
  type = 'text',
  className = '',
  required = false
}: FormTextFieldProps) => {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        {...form.register(id)}
        placeholder={placeholder}
        className={`w-full ${form.formState.errors[id] ? 'border-red-500' : ''}`}
      />
      {form.formState.errors[id] && (
        <p className="text-sm text-red-500">{form.formState.errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
}; 