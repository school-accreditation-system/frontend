"use client";

import { motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Save,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDENTIFICATION_STEPS } from "./constants";
import { FormProvider, useFormContext } from "./context/index";
import { useState, useEffect } from "react";

const SchoolIdentificationForm = () => {
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
  } = useFormContext();
  
  // For tracking validation errors in view
  const [incompleteFieldsVisible, setIncompleteFieldsVisible] = useState<boolean>(true);
  
  const currentStepData = IDENTIFICATION_STEPS[currentStep];
  const CurrentStepComponent = currentStepData.component;
  
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

  return (
    <div className="container mx-auto px-4 max-w-8xl pb-20">
      <div className="bg-white/50 rounded-xs p-6">
        {/* Progress bar and steps indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">School Identification</h2>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {IDENTIFICATION_STEPS.length}
            </span>
          </div>

          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  ((currentStep + 1) / IDENTIFICATION_STEPS.length) * 100
                }%`,
              }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {IDENTIFICATION_STEPS.map((step, index) => {
              const hasError = stepsWithErrors.includes(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`
                  ${index <= currentStep ? "text-primary font-medium" : ""} 
                  ${hasError ? "text-red-500" : ""}
                  flex flex-col items-center transition-colors relative
                `}
                  disabled={index > currentStep + 1}
                >
                  <span
                    className={`
                  w-6 h-6 flex items-center justify-center rounded-full mb-1 
                  ${
                    hasError
                      ? "bg-red-100 border-2 border-red-500 text-red-500"
                      : index < currentStep
                      ? "bg-primary text-white"
                      : index === currentStep
                      ? "border-2 border-primary text-primary"
                      : "border border-muted-foreground"
                  }
                `}
                  >
                    {hasError ? (
                      <AlertCircle size={12} />
                    ) : index < currentStep ? (
                      <Check size={14} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="hidden sm:block">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">{currentStepData.title}</h3>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        {/* Error summary */}
        {stepsWithErrors.length > 0 && (
          <div className="m-4 p-3 bg-red-50 border border-red-100 rounded-md">
            <p className="text-sm text-red-600 font-medium mb-1">
              Please fix errors in the following sections:
            </p>
            <div className="flex flex-wrap gap-2">
              {stepsWithErrors.map((stepId) => {
                const step = IDENTIFICATION_STEPS.find((s) => s.id === stepId);
                return (
                  <Button
                    key={stepId}
                    onClick={() =>
                      setCurrentStep(
                        IDENTIFICATION_STEPS.findIndex((s) => s.id === stepId)
                      )
                    }
                    className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full hover:bg-red-00 hover:cursor-pointer"
                  >
                    <AlertCircle size={12} className="mr-1" />
                    {step?.title}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Current step form */}
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

        {/* Error notification that appears when incomplete fields are not visible */}
        {!incompleteFieldsVisible && stepsWithErrors.length > 0 && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
            <div className="bg-red-50 text-red-800 px-4 py-2 rounded-full shadow-lg border border-red-200 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Scroll up to see incomplete fields</span>
            </div>
          </div>
        )}

        {/* Sticky navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-20 px-30 bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-lg">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
          >
            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> Previous
          </Button>

          <div className="flex items-center">
            {/* Show indicator of current step */}
            <span className="text-sm text-gray-500 mr-3">
              {currentStepData.title} - {currentStep + 1}/{IDENTIFICATION_STEPS.length}
            </span>
          </div>

          {currentStep === IDENTIFICATION_STEPS.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || stepsWithErrors.length > 0}
              className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
            >
              {isSubmitting ? "Processing..." : "Submit"} <Save className="h-3.5 w-3.5 md:h-4 md:w-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={goToNextStep} 
              className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
            >
              Next <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides the context
export const SchoolIdentificationSteps = () => {
  return (
    <FormProvider>
      <SchoolIdentificationForm />
    </FormProvider>
  );
};
