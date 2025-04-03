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

interface LocationSelectFieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  label: string;
  placeholder: string;
  isLoading: boolean;
  isDisabled: boolean;
  options: { id: string; locationName: string }[] | undefined;
  emptyMessage: string;
  loadingMessage?: string;
  onValueChange: (value: string) => void;
}

export const LocationSelectField = ({
  form,
  fieldId,
  label,
  placeholder,
  isLoading,
  isDisabled,
  options,
  emptyMessage,
  loadingMessage = "Loading...",
  onValueChange
}: LocationSelectFieldProps) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={fieldId}>{label}</Label>
      <Select
        onValueChange={(value) => {
          onValueChange(value, form.getValues(fieldId));
        }}
        value={form.watch(fieldId)}
        disabled={isLoading || isDisabled}
      >
        <SelectTrigger 
          id={fieldId}
          className={`w-full ${form.formState.errors[fieldId] ? 'border-red-500' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-muted-foreground">{loadingMessage}</span>
            </div>
          ) : (
            <SelectValue placeholder={isLoading ? loadingMessage : (isDisabled ? emptyMessage : placeholder)} />
          )}
        </SelectTrigger>
        <SelectContent>
          {isDisabled ? (
            <div className="p-2 text-sm text-muted-foreground">{emptyMessage}</div>
          ) : isLoading ? (
            <div className="p-2 text-center text-sm text-muted-foreground">{loadingMessage}</div>
          ) : options?.length ? (
            options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.locationName}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-center text-sm text-muted-foreground">No {label.toLowerCase()} found</div>
          )}
        </SelectContent>
      </Select>
      {form.formState.errors[fieldId] && (
        <p className="text-sm text-red-500">{form.formState.errors[fieldId]?.message?.toString()}</p>
      )}
    </div>
  );
}; 