import { ZodSchema } from 'zod';
import { SchoolIdentificationFormValues } from './schema';

// Define the step type
export type Step = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<{
    formData: Partial<SchoolIdentificationFormValues>;
    updateFormData: (data: Partial<SchoolIdentificationFormValues>) => void;
    errors?: string[];
  }>;
  validationSchema?: ZodSchema;
}; 