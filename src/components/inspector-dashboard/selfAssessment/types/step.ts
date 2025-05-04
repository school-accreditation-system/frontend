import { ZodSchema } from "zod";

export type Step = {
    id: string;
    title: string;
    description: string;
    component: React.ComponentType<{
        formData: any;
        updateFormData: (data: any) => void;
        errors?: string[];
    }>;
    validationSchema?: ZodSchema;
}
