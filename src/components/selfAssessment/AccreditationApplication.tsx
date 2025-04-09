'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormProvider, useFormContext } from './context/index'
import { TypeOfRequestForm } from '@/components/selfAssessment/steps/TypeofRequestForm';
import { LandOwnershipForm } from '@/components/selfAssessment/steps/LandOwnershipForm';
import { SchoolInfrastructureForm } from '@/components/selfAssessment/steps/SchoolInfrastructureForm';
import { TeachingResourcesForm } from '@/components/selfAssessment/steps/TeachingResourcesForm';
import { ProvisionalResults } from '@/components/selfAssessment/steps/ProvisionalResults';
import { ASSESSMENT_STEPS } from './constanst';


interface SchoolAssessmentFormProps {
    children: React.ReactNode;
}

const SchoolAssessmentForm = ({ children }: SchoolAssessmentFormProps) => {
    const {
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
    } = useFormContext();

    const currentStepData = ASSESSMENT_STEPS[currentStep];
    const CurrentStepComponent = currentStepData.component;


    return (
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-xl font-bold">School Self Assessment</h1>
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {ASSESSMENT_STEPS.length}
                    </span>
                </div>
                <div className="space-y-6">
                    <div className="w-full flex flex-col gap-2">
                        {/* Left side vertical stepper */}
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStep + 1) / ASSESSMENT_STEPS.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            {ASSESSMENT_STEPS.map((step, index) => {
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
                            <motion.div
                                key={currentStepData.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CurrentStepComponent
                                    formData={formData}
                                    updateFormData={(data) => updateFormData(currentStepData.id, data)}
                                    errors={formErrors[currentStepData.id] || []}
                                    currentStep={currentStep}
                                    isSubmitting={isSubmitting}
                                    onPrevious={goToPreviousStep}
                                    onNext={goToNextStep}
                                    onSubmit={handleSubmit}
                                    totalSteps={ASSESSMENT_STEPS.length}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface SchoolAssessmentStepsProps {
    children: React.ReactNode;
}

export default function SchoolAssessmentSteps({ children }: SchoolAssessmentStepsProps) {
    return (
        <FormProvider>
            <SchoolAssessmentForm>{children}</SchoolAssessmentForm>
        </FormProvider>
    );
}