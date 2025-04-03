'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useState } from 'react';
import type { FormContextType } from '../types/schema';
import { saveFormData, getFormData, clearFormData } from '@/utils/storage';
import { useToast } from '@/components/ui/use-toast';

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [formErrors, setFormErrors] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stepsWithErrors, setStepsWithErrors] = useState<number[]>([]);
    const [assessmentSteps, setAssessmentSteps] = useState<number>(0);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const schoolId = searchParams.get('schoolId');
    const returnTo = searchParams.get('returnTo') || '/';

    const updateFormData = (step: number, data: any) => {
        saveFormData(step, data);
        setFormData(prev => ({ ...prev, [step]: data }));

        if (stepsWithErrors.includes(step)) {
            setStepsWithErrors(prev => prev.filter(s => s !== step));
        }
    };

    const validateStep = async (step: number): Promise<boolean> => {
        // Check if formData exists for this step
        if (!formData[step]) {
            // Add to stepsWithErrors if not already there
            if (!stepsWithErrors.includes(step)) {
                setStepsWithErrors(prev => [...prev, step]);
            }
            return false;
        }

        return true;
    };

    const goToNextStep = async () => {
        const isValid = await validateStep(currentStep);

        if (isValid && currentStep < assessmentSteps) {
            setCurrentStep(prev => prev + 1);
            return true;
        }

        return false;
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Validate all steps
            const stepsToValidate = Array.from({ length: assessmentSteps + 1 }, (_, i) => i);
            const validationResults = await Promise.all(
                stepsToValidate.map(step => validateStep(step))
            );

            const isValid = validationResults.every(Boolean);

            if (!isValid) {
                throw new Error('Please complete all required fields');
            }

            // Get merged data instead of combining
            const finalData = getFormData().merged || {};

            console.log("Form data", finalData);

            // Here you would submit the data to your API
            // const response = await fetch('/api/submit-assessment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(finalData)
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to submit assessment');
            // }
            toast({
                title: "Assessment submitted successfully",
                description: "Thank you for submitting your assessment",
                status: "success"
            });

            clearFormData();
            router.push(`${returnTo}?schoolId=${schoolId}&formCompleted=true`);
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error - could set an error state here
        } finally {
            setIsSubmitting(false);
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
            handleSubmit,
            assessmentSteps,
            setAssessmentSteps
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
