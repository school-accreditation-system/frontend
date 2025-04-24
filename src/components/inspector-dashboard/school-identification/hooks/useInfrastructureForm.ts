import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfrastructureFormValues, infrastructureSchema } from "../types/schema";

export interface UseInfrastructureFormProps {
  formData: any;
  updateFormData: (stepId: string, data: any) => void;
  formErrors: Record<string, string[]>;
}

export const useInfrastructureForm = ({ formData, updateFormData, formErrors }: UseInfrastructureFormProps) => {
  const stepErrors = formErrors['infrastructure'] || [];
  
  const form = useForm<InfrastructureFormValues>({
    resolver: zodResolver(infrastructureSchema),
    defaultValues: {
      numClassrooms: formData.numClassrooms || "",
      numLatrines: formData.numLatrines || "",
      numKitchens: formData.numKitchens || "",
      numDiningHalls: formData.numDiningHalls || "",
      numLibraries: formData.numLibraries || "",
      numSmartClassrooms: formData.numSmartClassrooms || "",
      numComputerLabs: formData.numComputerLabs || "",
      numAdminOffices: formData.numAdminOffices || "",
      numMultipurposeHalls: formData.numMultipurposeHalls || "",
      numAcademicStaffRooms: formData.numAcademicStaffRooms || ""
    },
    mode: "onChange"
  });

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.reset({
        numClassrooms: formData.numClassrooms || "",
        numLatrines: formData.numLatrines || "",
        numKitchens: formData.numKitchens || "",
        numDiningHalls: formData.numDiningHalls || "",
        numLibraries: formData.numLibraries || "",
        numSmartClassrooms: formData.numSmartClassrooms || "",
        numComputerLabs: formData.numComputerLabs || "",
        numAdminOffices: formData.numAdminOffices || "",
        numMultipurposeHalls: formData.numMultipurposeHalls || "",
        numAcademicStaffRooms: formData.numAcademicStaffRooms || ""
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

  const onFieldChange = useCallback((name: keyof InfrastructureFormValues, value: any) => {
    // Create data update
    const updatedData = { [name]: value } as Partial<InfrastructureFormValues>;
    form.setValue(name, value, { shouldValidate: true });

    // Update data in context
    updateFormData('infrastructure', updatedData);
  }, [form, updateFormData]);

  // Check if a field has validation errors
  const hasFieldError = useCallback((fieldName: keyof InfrastructureFormValues) => {
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