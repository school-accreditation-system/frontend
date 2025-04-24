import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentInfoFormValues, studentInfoSchema } from "../types/schema";

export interface UseStudentInfoFormProps {
  formData: any;
  updateFormData: (stepId: string, data: any) => void;
  formErrors: Record<string, string[]>;
}

export const useStudentInfoForm = ({ formData, updateFormData, formErrors }: UseStudentInfoFormProps) => {
  const stepErrors = formErrors['student-info'] || [];
  
  const form = useForm<StudentInfoFormValues>({
    resolver: zodResolver(studentInfoSchema),
    defaultValues: {
      numBoys: formData.numBoys || "",
      numGirls: formData.numGirls || "",
      numStudentsWithSEN: formData.numStudentsWithSEN || ""
    },
    mode: "onChange"
  });

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.reset({
        numBoys: formData.numBoys || "",
        numGirls: formData.numGirls || "",
        numStudentsWithSEN: formData.numStudentsWithSEN || ""
      }, { keepValues: true });
    }
  }, [formData, form]);

  // Separate effect for validation to avoid loops
  useEffect(() => {
    if (stepErrors.length > 0) {
      const timer = setTimeout(() => {
        form.trigger();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [stepErrors, form]);

  const onFieldChange = useCallback((name: keyof StudentInfoFormValues, value: any) => {
    // Create data update
    const updatedData = { [name]: value } as Partial<StudentInfoFormValues>;
    form.setValue(name, value, { shouldValidate: true });

    // Update data in context
    updateFormData('student-info', updatedData);
  }, [form, updateFormData]);

  // Check if a field has validation errors
  const hasFieldError = useCallback((fieldName: keyof StudentInfoFormValues) => {
    return (
      form.formState.errors[fieldName] || 
      stepErrors.some(e => e.toLowerCase().includes(fieldName.toLowerCase()))
    );
  }, [form.formState.errors, stepErrors]);

  return {
    form,
    onFieldChange,
    hasFieldError,
    stepErrors
  };
}; 