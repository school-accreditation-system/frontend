'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormInputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  hasFieldError?: (fieldName: string) => boolean;
  onFieldChange?: (name: string, value: string) => void;
}

export const FormInputField = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  required = false,
  className = "",
  hasFieldError,
  onFieldChange
}: FormInputFieldProps) => {
  const hasError = hasFieldError ? hasFieldError(name) : form.formState.errors[name];

  return (
    <div className={className}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Input 
                type={type}
                placeholder={placeholder} 
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  if (onFieldChange) {
                    onFieldChange(name, e.target.value);
                  }
                }} 
                className={hasError ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 