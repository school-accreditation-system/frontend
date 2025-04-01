"use client";
import React from "react";

/**
 * A reusable multi-step form progress component
 * @param {Object} props
 * @param {number} props.currentStep - Zero-based index of the current step
 * @param {Array} props.steps - Array of step objects with id and title
 * @param {Function} props.onStepClick - Optional callback when a step is clicked
 * @param {boolean} props.allowNavigation - Whether to allow clicking on steps to navigate (default: false)
 */
const FormSteps = ({ 
  currentStep, 
  steps = [
    { id: "search", title: "School Selection" },
    // { id: "identification", title: "School Identification" },
    // { id: "assessment", title: "Self Assessment" },
    // { id: "summary", title: "Summary" },
    { id: "combination", title: "Choose Combination" },
  ],
  onStepClick,
  allowNavigation = false
}) => {
  // Ensure currentStep is a number
  const activeStep = typeof currentStep === 'number' ? currentStep : steps.findIndex(s => s.id === currentStep);
  
  const handleStepClick = (index) => {
    if (allowNavigation && onStepClick && index <= activeStep + 1) {
      onStepClick(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header with step counter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {steps[activeStep]?.title || "Multi-Step Form"}
        </h2>
        <span className="text-sm text-gray-500">
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            width: `${((activeStep + 1) / steps.length) * 100}%`,
          }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(index)}
            className={`flex flex-col items-center transition-colors ${
              !allowNavigation || index > activeStep + 1 ? 'cursor-default' : 'cursor-pointer'
            }`}
            disabled={!allowNavigation || index > activeStep + 1}
            type="button"
          >
            {/* Step circle */}
            <span
              className={`
                w-8 h-8 flex items-center justify-center rounded-full mb-2
                ${
                  index < activeStep
                    ? "bg-primary text-white" // Completed step
                    : index === activeStep
                    ? "border-2 border-blue-500 text-primary" // Current step
                    : "border border-gray-300 text-gray-400" // Future step
                }
              `}
            >
              {index < activeStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            
            {/* Step title */}
            <span className={`text-xs text-center ${
              index <= activeStep ? "text-primary font-medium" : "text-gray-500"
            }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormSteps;