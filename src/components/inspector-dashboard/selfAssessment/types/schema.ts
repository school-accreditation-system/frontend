import { z } from "zod";

export type FormContextType = {
  currentStep: number;
  formData: Record<string, any>;
  formErrors: Record<string, any>;
  isSubmitting: boolean;
  stepsWithErrors: number[];
  updateFormData: (step: number, data: any) => void;
  validateStep: (step: number) => Promise<boolean>;
  goToNextStep: () => Promise<boolean>;
  goToPreviousStep: () => void;
  handleSubmit: () => void;
  assessmentSteps: number;
  setAssessmentSteps: (steps: number) => void;
};

// Schema for TypeOfRequestForm
export const typeOfRequestSchema = z.object({
  selectedCombination: z
    .string({
      required_error: "Please select a combination",
    })
    .min(1, "Please select a combination"),
});

// Base schema for LandOwnershipForm
export const landOwnershipSchema = z.record(z.string().optional());

// Function to create dynamic schema based on indicator IDs
export const createDynamicLandOwnershipSchema = (indicatorIds: string[]) => {
  const shape: Record<string, z.ZodType<any, any>> = {};

  indicatorIds.forEach((id) => {
    shape[id] = z.string();
    const docFieldName = `${id}_document`;
    shape[docFieldName] = z.any().optional(); // For file uploads
  });

  return z.object(shape);
};
