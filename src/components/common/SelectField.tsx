'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  form: UseFormReturn<any>;
  id: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export const SelectField = ({
  form,
  id,
  label,
  placeholder,
  options,
  onValueChange,
  disabled = false,
  required = false
}: SelectFieldProps) => {
  const handleValueChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    } else {
      form.setValue(id, value, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        onValueChange={handleValueChange}
        defaultValue={form.getValues(id)}
        disabled={disabled}
      >
        <SelectTrigger 
          id={id}
          className={`w-full ${form.formState.errors[id] ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {form.formState.errors[id] && (
        <p className="text-sm text-red-500">{form.formState.errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
}; 