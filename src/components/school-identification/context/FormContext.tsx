"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ZodError, ZodObject, ZodSchema } from "zod";
import { toast } from "@/components/ui/use-toast";
import { SchoolIdentificationFormValues } from "../types/schema";
import { IDENTIFICATION_STEPS } from "../constants";
import { useSearchParams, useRouter } from "next/navigation";

type FormContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Partial<SchoolIdentificationFormValues>;
  formErrors: Record<string, string[]>;
  isSubmitting: boolean;
  stepsWithErrors: string[];
  updateFormData: (
    stepId: string,
    data: Partial<SchoolIdentificationFormValues>
  ) => void;
  validateStep: (stepId: string, schema?: ZodSchema) => Promise<boolean>;
  goToNextStep: () => Promise<void>;
  goToPreviousStep: () => void;
  handleSubmit: () => Promise<void>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<
    Partial<SchoolIdentificationFormValues>
  >({});
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepsWithErrors, setStepsWithErrors] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const schoolId = searchParams.get("schoolId");
  const returnTo = searchParams.get("returnTo") || "/";

  // a function that updates the form data
  const updateFormData = (
    stepId: string,
    data: Partial<SchoolIdentificationFormValues>
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    if (formErrors[stepId]) {
      const newErrors = { ...formErrors };
      delete newErrors[stepId];
      setFormErrors(newErrors);
      setStepsWithErrors((prev) => prev.filter((id) => id !== stepId));
    }
  };

  // a function that validates the step data against the schema
  const validateStep = async (
    stepId: string,
    schema?: any
  ): Promise<boolean> => {
    if (!schema) return true;
    try {
      // Create a data object with current form values for validation
      const stepData: Record<string, unknown> = {};

      // Get all fields from the schema (using type assertion to access Zod internals)
      const schemaFields = Object.keys(schema.shape || {});

      // Copy values from formData to validation object
      schemaFields.forEach((field) => {
        stepData[field] = formData[field as keyof typeof formData];
      });

      // Validate data against schema
      await schema.parseAsync(stepData);

      // If validation passes, clear any errors for this step
      if (formErrors[stepId]) {
        const newErrors = { ...formErrors };
        delete newErrors[stepId];
        setFormErrors(newErrors);
        setStepsWithErrors((prev) => prev.filter((id) => id !== stepId));
      }

      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        // Store error messages for this step
        const newErrors = { ...formErrors };
        newErrors[stepId] = error.errors.map((err) => err.message);
        setFormErrors(newErrors);

        // Add this step to the list of steps with errors
        if (!stepsWithErrors.includes(stepId)) {
          setStepsWithErrors((prev) => [...prev, stepId]);
        }
      }
      return false;
    }
  };

  const goToNextStep = async () => {
    const currentStepData = IDENTIFICATION_STEPS[currentStep];
    const validationSchema =
      "validationSchema" in currentStepData
        ? currentStepData.validationSchema
        : undefined;

    const isValid = await validateStep(currentStepData.id, validationSchema);

    if (isValid && currentStep < IDENTIFICATION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (stepsWithErrors.length > 0) {
      toast({
        title: "Cannot Submit Form",
        description: "Please fill all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // checking if all steps are valid before submitting
    let allValid = true;
    for (const step of IDENTIFICATION_STEPS.slice(0, -1)) {
      // Check if step has validationSchema property
      const validationSchema =
        "validationSchema" in step ? step.validationSchema : undefined;
      if (!(await validateStep(step.id, validationSchema))) {
        allValid = false;
      }
    }

    if (!allValid) {
      toast({
        title: "Cannot Submit Form",
        description: "Please fill all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: Replace with actual API call using tanstack query
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted with data:", formData);

      toast({
        title: "Success",
        description: "School information submitted successfully!",
        variant: "default",
      });

      localStorage.setItem("schoolIdentification", JSON.stringify(formData));

      router.push(`${returnTo}?schoolId=${schoolId}&formCompleted=true`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    formErrors,
    isSubmitting,
    stepsWithErrors,
    updateFormData,
    validateStep,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
