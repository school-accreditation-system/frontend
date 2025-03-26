"use client";
import React from "react";

const FormSteps = ({ currentStep }) => {
  const steps = [
    { id: "search", name: "School Selection" },
    { id: "identification", name: "School Identification" },
    { id: "assessment", name: "Self Assessment" },
    { id: "summary", name: "Summary" },
    { id: "professional-combination", name: "Apply Professional Combination" }
  ];

  return (
    <div className="py-4 px-4 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white"
                    : steps.indexOf(steps.find(s => s.id === currentStep)) > index
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {steps.indexOf(steps.find(s => s.id === currentStep)) > index ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs mt-2 text-gray-600 font-medium">{step.name}</div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  steps.indexOf(steps.find(s => s.id === currentStep)) > index
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormSteps;