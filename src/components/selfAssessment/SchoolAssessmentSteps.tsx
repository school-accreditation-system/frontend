'use client';
import { useGetAreas } from '@/hooks/useStandard';
import { Standard } from '@/types/Standard';
import { saveFormData } from '@/utils/storage';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import React, { useEffect, useState, ReactNode } from 'react';
import { FormProvider, useFormContext } from './context/index';
import ApplicantInformation from './steps/ApplicantInformation';
import { LandOwnershipForm } from './steps/LandOwnershipForm';
import { ProvisionalResults } from './steps/ProvisionalResults';
import { TypeOfRequestForm } from './steps/TypeofRequestForm';

interface Step {
    id: number;
    title: string;
    description: string;
    component?: React.ComponentType<any>;
    areaId?: string;
}

const SchoolAssessmentForm = () => {
    const {
        currentStep,
        setCurrentStep,
        formData,
        formErrors,
        isSubmitting,
        stepsWithErrors,
        updateFormData,
        goToNextStep,
        goToPreviousStep,
        handleSubmit,
        setAssessmentStepsArray
    } = useFormContext();
    const { data: areas, isLoading: areasLoading } = useGetAreas();
    const [assessmentSteps, setStepsArray] = useState<Step[]>([
        {
            id: 0,
            title: "Type of Request",
            description: "Select the type of request you want to make",
            component: TypeOfRequestForm
        },
        {
            id: 1,
            title: "Provisional results",
            description: "Review provisional results",
            component: ProvisionalResults
        }
    ]);

    useEffect(() => {
        if (areas && areas.length > 0) {
            const newSteps: Step[] = [
                {
                    id: 0,
                    title: "Type of Request",
                    description: "Select the type of request you want to make",
                    component: TypeOfRequestForm
                },
                ...areas.map((area: Standard, index: number) => ({
                    id: index + 1,
                    title: area.name,
                    description: `Complete assessment for ${area.name}`,
                    component: LandOwnershipForm,
                    areaId: area.id
                })),
                {
                    id: areas.length + 1,
                    title: "Applicant Information",
                    description: "Complete your information and submit the application",
                    component: ApplicantInformation
                }
            ];

            setStepsArray(newSteps);
            setAssessmentStepsArray(newSteps);
        }
    }, [areas, setAssessmentStepsArray]);

    const currentStepData = assessmentSteps[currentStep] || assessmentSteps[0];
    const CurrentStepComponent = currentStepData.component;

    if (areasLoading) {
        return <div className="flex justify-center items-center min-h-[400px]">Loading assessment steps...</div>;
    }

    return (
        <div className="container mx-auto md:px-4 max-w-8xl pb-20">
            <div className="bg-white/50 rounded-xs md:p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-bold">Accreditation Application</h1>
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {assessmentSteps.length}
                    </span>
                </div>
                <div className="space-y-6">
                    <div className="w-full flex flex-col gap-2">
                        {/* Left side vertical stepper */}
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStep + 1) / assessmentSteps.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            {assessmentSteps.map((step, index) => {
                                const hasError = stepsWithErrors.includes(step.id);

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(index)}
                                        className={`${index <= currentStep ? 'text-primary font-medium' : ''}
                                        ${hasError ? 'text-red-500' : ''}flex flex-col items-center transition-colors relative`}
                                        disabled={index > currentStep + 1}
                                    >
                                        <span className={`w-7 h-7 text-sm flex items-center justify-center rounded-full mb-1 ${hasError
                                            ? 'bg-red-100 border-2 border-red-500 text-red-500'
                                            : index < currentStep
                                                ? 'bg-primary text-white'
                                                : index === currentStep
                                                    ? 'border-2 border-primary text-primary'
                                                    : 'border border-muted-foreground'
                                            }`}>
                                            {hasError ? (
                                                <AlertCircle size={12} />
                                            ) : index < currentStep ? (
                                                <Check size={14} />
                                            ) : (
                                                index + 1
                                            )}
                                        </span>
                                        <span className="hidden sm:block text-sm">{step.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right side content area */}
                        <div className="w-full bg-gray-50 rounded-lg p-6">
                            {CurrentStepComponent ? (
                                <motion.div
                                    key={currentStepData.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CurrentStepComponent
                                        formData={formData[currentStepData.id] || {}}
                                        updateFormData={(data) => updateFormData(currentStepData.id, data)}
                                        errors={formErrors[currentStepData.id] || []}
                                        currentStep={currentStep}
                                        isSubmitting={isSubmitting}
                                        onPrevious={goToPreviousStep}
                                        onNext={currentStepData.component === LandOwnershipForm
                                            ? () => {
                                                const currentFormData = formData[currentStepData.id] || {};
                                                saveFormData(currentStepData.id, currentFormData);
                                                return new Promise(resolve => {
                                                    setTimeout(() => {
                                                        setCurrentStep(prev => prev + 1);
                                                        resolve(true);
                                                    }, 10);
                                                });
                                            }
                                            : goToNextStep}
                                        totalSteps={assessmentSteps.length}
                                        areaId={currentStepData.areaId}
                                    />
                                </motion.div>
                            ) : (
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p>No component available for this step.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SchoolAssessmentStepsProps {
    children?: ReactNode;
}

export default function SchoolAssessmentSteps({ children }: SchoolAssessmentStepsProps) {
    return (
        <FormProvider>
            <SchoolAssessmentForm>{children}</SchoolAssessmentForm>
        </FormProvider>
    );
}