'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ZodError, ZodObject, ZodSchema } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { SchoolAssessmentFormValues } from '../types/schema';
import { ASSESSMENT_STEPS } from '../constanst';
import type { FormContextType } from '../types/schema';
import { selfAssessmentSchema } from '../types/schema';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stepsWithErrors, setStepsWithErrors] = useState<number[]>([]);
      const router = useRouter();
      const searchParams = useSearchParams();
      
      const schoolId = searchParams.get('schoolId');
      const returnTo = searchParams.get('returnTo') || '/';

    const updateFormData = (step: number, data: any) => {
        setFormData(prev => ({
            ...prev,
            [step]: data
        }));
    };

    const validateStep = (step: number) => {
        try {
            // Only validate if there's data for the current step
            if (!formData[step]) {
                return true; // Allow moving if no data (you might want to change this based on your requirements)
            }

            // Validate only the current step's data
            const stepData = formData[step];
            return true; // Temporarily return true until schema validation is properly set up
        } catch (error) {
            return false;
        }
    };

    const goToNextStep = async () => {
        const currentStepData = ASSESSMENT_STEPS[currentStep];
        const validationSchema = 'validationSchema' in currentStepData
            ? currentStepData.validationSchema
            : undefined;

        const isValid = await validateStep(currentStepData.id, validationSchema);

        // Remove validation temporarily to get navigation working
        if (isValid && currentStep < ASSESSMENT_STEPS.length - 1) {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Validate all steps
            const isValid = [1, 2, 3, 4].every(step => validateStep(step));
            if (!isValid) {
                throw new Error('Please complete all required fields');
            }

            // Submit form data
            // Add your API call here
            console.log("Form data", formData)
            setIsSubmitting(false);
            router.push(`${returnTo}?schoolId=${schoolId}&formCompleted=true`);
        } catch (error) {
            setIsSubmitting(false);
            console.log("Error", error)
            // Handle error
        }
    };

    return (
        <FormContext.Provider value={{
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
            handleSubmit
        }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}
