'use client';
import { useState } from 'react';
import Stepper from '@/components/selfAssessment/Stepper';
import { TypeOfRequestForm } from './steps/TypeOfRequestForm';
import { LandOwnershipForm } from './steps/LandOwnershipForm';
import { SchoolInfrastructureForm } from './steps/SchoolInfrastructureForm';
import { TeachingResourcesForm } from './steps/TeachingResourcesForm';
import { ProvisionalResults } from './steps/ProvisionalResults';

export default function SelfAssessment() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        { number: 1, title: 'Type of Request', description: 'Select your request type' },
        { number: 2, title: 'Land Ownership & Legal Docs', description: 'Choose required information' },
        { number: 3, title: 'School Infrastructure', description: 'Provide infrastructure details' },
        { number: 4, title: 'Teaching Resources', description: 'List available teaching resources' },
        { number: 5, title: 'Provisional Results', description: 'Review and submit' }
    ];

    const goToNextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleTypeOfRequestSubmit = (data: any) => {
        console.log('Form data:', data);
        goToNextStep();
    };

    const handleLandOwnershipSubmit = (data: any) => {
        console.log('Form data:', data);
        goToNextStep();
    };

    const handleInfrastructureSubmit = (data: any) => {
        console.log('Form data:', data);
        goToNextStep();
    };

    const handleResourcesSubmit = (data: any) => {
        console.log('Form data:', data);
        goToNextStep();
    };

    const handleFinalSubmit = (data: any) => {
        console.log('Form data:', data);
        setIsSubmitting(true);
    };

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-xl font-bold">School Self Assessment</h1>
                        <span className="text-sm text-muted-foreground">
                            Step {currentStep} of {steps.length}
                        </span>
                    </div>

                    <Stepper
                        currentStep={currentStep}
                        steps={steps}
                        setCurrentStep={setCurrentStep}
                        onNext={goToNextStep}
                        onPrevious={goToPreviousStep}
                        isSubmitting={isSubmitting}
                    >
                        {currentStep === 1 && (
                            <TypeOfRequestForm onSubmit={handleTypeOfRequestSubmit} />
                        )}
                        {currentStep === 2 && (
                            <LandOwnershipForm onSubmit={handleLandOwnershipSubmit} />
                        )}
                        {currentStep === 3 && (
                            <SchoolInfrastructureForm onSubmit={handleInfrastructureSubmit} />
                        )}
                        {currentStep === 4 && (
                            <TeachingResourcesForm onSubmit={handleResourcesSubmit} />
                        )}
                        {currentStep === 5 && (
                            <ProvisionalResults onSubmit={handleFinalSubmit} />
                        )}
                    </Stepper>
                </div>
            </div>
        </main>
    );
}