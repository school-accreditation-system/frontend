'use client';
import { motion } from 'framer-motion';
import { Check, AlertCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { ASSESSMENT_STEPS } from './constanst';
import { FormProvider, useFormContext } from './context/index';
import { useGetAreas } from '@/hooks/useStandard';
import { TypeOfRequestForm } from './steps/TypeofRequestForm';
import { LandOwnershipForm } from './steps/LandOwnershipForm';
import { ProvisionalResults } from './steps/ProvisionalResults';
import { Standard } from '@/types/Standard';
import { Button } from '../ui/button';

// Define a type for Step
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
        handleSubmit
    } = useFormContext();
    
    // For tracking validation errors in view
    const [incompleteFieldsVisible, setIncompleteFieldsVisible] = useState<boolean>(true);
    
    // Fetch areas from the backend
    const { data: areas, isLoading: areasLoading } = useGetAreas();
    
    // State to hold the dynamically generated steps
    const [assessmentSteps, setAssessmentSteps] = useState<Step[]>([
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
                // Dynamically add steps for each area
                ...areas.map((area: Standard, index: number) => ({
                    id: index + 1,
                    title: area.name,
                    description: `Complete assessment for ${area.name}`,
                    component: LandOwnershipForm,
                    areaId: area.id
                })),
                {
                    id: areas.length + 1,
                    title: "Provisional results",
                    description: "Review provisional results",
                    component: ProvisionalResults
                }
            ];
            
            setAssessmentSteps(newSteps);
        }
    }, [areas]);
    
    // Check if there are validation errors in the current view
    useEffect(() => {
        const checkIfErrorsAreVisible = () => {
            // Get all error message elements
            const errorElements = document.querySelectorAll('[role="alert"]');
            if (errorElements.length === 0) {
                setIncompleteFieldsVisible(true);
                return;
            }

            // Check if any error is hidden behind the sticky navigation bar
            let allErrorsVisible = true;
            errorElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.bottom <= window.innerHeight - 70 // 70px is approx height of sticky bar
                );
                if (!isVisible) {
                    allErrorsVisible = false;
                }
            });
            
            setIncompleteFieldsVisible(allErrorsVisible);
        };

        // Add scroll event listener to check error visibility
        window.addEventListener('scroll', checkIfErrorsAreVisible);
        
        // Also check on initial render and when form errors change
        checkIfErrorsAreVisible();
        
        return () => {
            window.removeEventListener('scroll', checkIfErrorsAreVisible);
        };
    }, [formErrors]);
    
    const currentStepData = assessmentSteps[currentStep] || assessmentSteps[0];
    const CurrentStepComponent = currentStepData.component;
    
    // Determine button labels based on current step
    const isPreviousDisabled = currentStep === 0;
    const isLastStep = currentStep === assessmentSteps.length - 1;
    const nextButtonText = isLastStep ? 'Submit' : 'Next';
    const nextButtonIcon = isLastStep ? <ArrowRight className="ml-1 h-4 w-4" /> : <ChevronRight className="ml-1 h-4 w-4" />;
    
    if (areasLoading) {
        return <div className="flex justify-center items-center min-h-[400px]">Loading assessment steps...</div>;
    }

    return (
        <div className="container mx-auto px-4 max-w-8xl pb-20"> {/* Added bottom padding for sticky nav */}
            <div className="bg-white/50 rounded-xs p-6">
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
                                        formData={formData}
                                        updateFormData={(data) => updateFormData(currentStepData.id, data)}
                                        errors={formErrors[currentStepData.id] || []}
                                        currentStep={currentStep}
                                        isSubmitting={isSubmitting}
                                        onPrevious={goToPreviousStep}
                                        onNext={goToNextStep}
                                        onSubmit={handleSubmit}
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
            
            {/* Error notification that appears when incomplete fields are not visible */}
            {!incompleteFieldsVisible && Object.keys(formErrors).length > 0 && (
                <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                    <div className="bg-red-50 text-red-800 px-4 py-2 rounded-full shadow-lg border border-red-200 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Scroll up to see incomplete fields</span>
                    </div>
                </div>
            )}
            
            {/* Shared sticky navigation buttons */}
            <div className="fixed bottom-0 left-0 right-0 z-20 px-30 bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-lg">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isPreviousDisabled}
                    onClick={goToPreviousStep}
                    className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
                >
                    <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    Previous
                </Button>

                <div className="flex items-center">
                    {/* Show indicator of current step */}
                    <span className="text-sm text-gray-500 mr-3">
                        {currentStepData.title} - {currentStep + 1}/{assessmentSteps.length}
                    </span>
                </div>

                <Button
                    type="button"
                    onClick={isLastStep ? handleSubmit : goToNextStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
                >
                    {isSubmitting ? 'Processing...' : nextButtonText}
                    {!isSubmitting && nextButtonIcon}
                </Button>
            </div>
        </div>
    );
}

interface SchoolAssessmentStepsProps {
    children?: React.ReactNode;
}

export default function SchoolAssessmentSteps({ children }: SchoolAssessmentStepsProps) {
    return (
        <FormProvider>
            <SchoolAssessmentForm>{children}</SchoolAssessmentForm>
        </FormProvider>
    );
}