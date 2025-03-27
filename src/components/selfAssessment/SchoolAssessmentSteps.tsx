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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-bold">School Self Assessment</h1>
                    <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {ASSESSMENT_STEPS.length}
                    </span>
                </div>
                <div className="space-y-6">
                    <div className="w-full flex gap-8">
                        {/* Left side vertical stepper */}
                        <div className="w-1/3 space-y-1">
                            {ASSESSMENT_STEPS.map((step) => {
                                const isActive = step.id === currentStep;
                                const isCompleted = step.id < currentStep;
                                const isPending = step.id > currentStep;

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: step.number * 0.1,
                                            duration: 0.3
                                        }}
                                    >
                                        <button
                                            onClick={() => setCurrentStep(step.id)}
                                            disabled={isPending}
                                            className={`flex items-center w-full p-3 rounded-md mb-2 transition-all ${isActive
                                                ? 'bg-primary/10 border-l-4 border-primary'
                                                : isCompleted
                                                    ? 'hover:bg-gray-100 cursor-pointer'
                                                    : 'opacity-60 cursor-not-allowed'
                                                }`}
                                        >
                                            <div className="flex-shrink-0 mr-3">
                                                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isActive
                                                    ? 'border-primary bg-primary text-white'
                                                    : isCompleted
                                                        ? 'border-green-500 bg-green-500 text-white'
                                                        : 'border-gray-300 text-gray-400'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <Check size={16} className="text-white" />
                                                    ) : (
                                                        <span className="text-sm font-medium">{step.id + 1}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-grow text-left">
                                                <h3 className={`text-sm font-medium ${isActive
                                                    ? 'text-primary'
                                                    : isCompleted
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                    }`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-xs text-gray-500">{step.description}</p>
                                            </div>
                                        </button>

                                        {step.id < ASSESSMENT_STEPS.length && (
                                            <div className="h-6 ml-7 border-l-2 border-gray-200"></div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right side content area */}
                        <div className="w-2/3 bg-gray-50 rounded-lg p-6">
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
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-6 border-t">
                        <Button
                            variant="outline"
                            onClick={goToPreviousStep}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>

                        {currentStep === ASSESSMENT_STEPS.length ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'} <Save className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => goToNextStep()}
                                className="flex items-center gap-2"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
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