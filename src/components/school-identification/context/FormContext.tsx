"use client";

import { useToast } from "@/components/ui/use-toast";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ZodError, ZodSchema } from "zod";
import { IDENTIFICATION_STEPS } from "../constants";
import { SchoolIdentificationFormValues } from "../types/schema";
import { useSaveSchoolIdentification, useUpdateSchoolIdentification, useGetSchoolIdentification } from "@/hooks/useSchoolIdentification";
import { useParams } from "next/navigation";
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
  const schoolId = localStorage.getItem("schoolId");
  const [formData, setFormData] = useState<
    Partial<SchoolIdentificationFormValues>
  >({});
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [stepsWithErrors, setStepsWithErrors] = useState<string[]>([]);
  const { mutate: saveSchoolIdentification, isPending: isSaving } =
    useSaveSchoolIdentification(schoolId as string);
  const { mutate: updateSchoolIdentification, isPending: isUpdating } =
    useUpdateSchoolIdentification(schoolId as string);
  const { data: schoolIdentification, isLoading } = useGetSchoolIdentification(
    schoolId as string
  );

  useEffect(() => {
    if (!isLoading && schoolIdentification) {
      setIsEditing(true);
      setFormData(schoolIdentification);
    }
  }, [isLoading, schoolIdentification]);

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

  const validateStep = async (
    stepId: string,
    schema?: any
  ): Promise<boolean> => {
    if (!schema) return true;
    try {
      const stepData: Record<string, unknown> = {};

      const schemaFields = Object.keys(schema.shape || {});

      schemaFields.forEach((field) => {
        stepData[field] = formData[field as keyof typeof formData];
      });

      await schema.parseAsync(stepData);

      if (formErrors[stepId]) {
        const newErrors = { ...formErrors };
        delete newErrors[stepId];
        setFormErrors(newErrors);
        setStepsWithErrors((prev) => prev.filter((id) => id !== stepId));
      }

      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = { ...formErrors };
        newErrors[stepId] = error.errors.map((err) => err.message);
        setFormErrors(newErrors);

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
        status: "error",
      });
      return;
    }
    let allValid = true;
    for (const step of IDENTIFICATION_STEPS.slice(0, -1)) {
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
        status: "error",
      });
      return;
    }

    try {
      if (isEditing) {
        updateSchoolIdentification(formData, {
          onSuccess: (data) => {
            toast({
              title: "Success", 
              description: data.message,
              status: "success",
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `${error.response.data.message} Try again`,
              status: "error",
            });
          },
        });
      } else {
        saveSchoolIdentification(formData, {
          onSuccess: (data) => {
            toast({
              title: "Success",
              description: data.message,
              status: "success",
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `${error.response.data.message} Try again`,
              status: "error",
            });
          },
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    }
  };

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    formErrors,
    isSubmitting: isSaving || isUpdating,
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
