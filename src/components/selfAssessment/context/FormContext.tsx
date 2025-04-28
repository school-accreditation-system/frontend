/* eslint-disable max-nested-callbacks */
'use client'

import { useToast } from '@/components/ui/use-toast';
import { clearFormData, saveFormData } from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import type { FormContextType } from '../types/schema';
import { useSchool } from '@/components/auth/SchoolContext.tsx';
import { useSubmitAccreditation } from '@/hooks/useSelfAssessment';

const FormContext = createContext<FormContextType | undefined>(undefined);

interface Step {
    id: number;
    title: string;
    description: string;
    component?: React.ComponentType<any>;
    areaId?: string;
}

export function FormProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [formErrors, setFormErrors] = useState<Record<string, any>>({});
    const [stepsWithErrors, setStepsWithErrors] = useState<number[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [assessmentSteps, setAssessmentSteps] = useState<number>(0);
    const { mutate, isPending } = useSubmitAccreditation()
    const { toast } = useToast();
    const router = useRouter();

    const setAssessmentStepsArray = useCallback((newSteps: Step[]) => {
        setSteps(newSteps);
        setAssessmentSteps(newSteps.length > 0 ? newSteps.length - 1 : 0);
    }, []);
    const { school } = useSchool();

    const updateFormData = useCallback((step: number, data: any) => {
        saveFormData(step, data);
        setFormData(prev => ({ ...prev, [step]: data }));

        if (stepsWithErrors.includes(step)) {
            setStepsWithErrors(prev => prev.filter(s => s !== step));
        }
    }, [stepsWithErrors]);

    const validateStep = useCallback(async (step: number): Promise<boolean> => {
        if (!formData[step]) {
            if (!stepsWithErrors.includes(step)) {
                setStepsWithErrors(prev => [...prev, step]);
            }
            return false;
        }

        if (stepsWithErrors.includes(step)) {
            setStepsWithErrors(prev => prev.filter(s => s !== step));
        }
        return true;
    }, [formData, stepsWithErrors]);

    const goToNextStep = useCallback(async () => {
        const isValid = await validateStep(currentStep);

        if (isValid && currentStep < assessmentSteps) {
            setCurrentStep(prev => prev + 1);
            return true;
        }

        return false;
    }, [currentStep, assessmentSteps, validateStep]);

    const goToPreviousStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    }, []);

    const getDynamicOptionIds = useCallback(() => {
        const dynamicOptionIds: string[] = [];
        steps.forEach(step => {
            if (step.areaId) {
                const stepData = formData[step.id];
                if (stepData && typeof stepData === 'object') {
                    Object.entries(stepData).forEach(([key, value]) => {
                        if (!key.endsWith('_document') && value) {
                            dynamicOptionIds.push(value as string);
                        }
                    });
                }
            }
        });
        return dynamicOptionIds;
    }, [steps, formData]);

    const handleSubmit = useCallback(async (applicantData: any) => {
        try {
            const dynamicOptions = getDynamicOptionIds();
            const typeOfRequestData = formData[0] || {};

            const dataToSubmit = {
                applicant: applicantData,
                options: dynamicOptions,
                selectedCombination: typeOfRequestData.selectedCombination,
                schoolId: school?.id,
            };

            console.log("Data to submit:", dataToSubmit);

            // Call the mutate function
            await mutate(dataToSubmit, {
                onSuccess: (data) => {
                    toast({
                        title: "Assessment submitted successfully",
                        description: "Thank you for submitting your assessment. The inspection team will review your application and get back to you.",
                        status: "success"
                    });

                    clearFormData();
                    router.push(`/?success=true`);
                },
                onError: (error) => {
                    console.error("Error during submission:", error);
                    toast({
                        title: "Submission Failed",
                        description: error.response.data.message || "Could not submit the assessment. Please try again.",
                        status: "error"
                    });
                }
            });
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast({
                title: "Submission Failed",
                description: error.message || "Could not submit the assessment. Please try again.",
                status: "error"
            });
        }
    }, [steps, formData, toast, router, getDynamicOptionIds, mutate]); // Ensure mutate is included in dependencies

    return (
        <FormContext.Provider value={{
            currentStep,
            setCurrentStep,
            formData,
            formErrors,
            isSubmitting: isPending,
            stepsWithErrors,
            updateFormData,
            validateStep,
            goToNextStep,
            goToPreviousStep,
            handleSubmit,
            assessmentSteps,
            setAssessmentSteps,
            steps,
            setAssessmentStepsArray
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
