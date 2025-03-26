'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepperProps {
    currentStep: number;
    steps: {
        number: number;
        title: string;
        description: string;
    }[];
    setCurrentStep: (step: number) => void;
    children: React.ReactNode;
    onNext: () => void;
    onPrevious: () => void;
    isSubmitting?: boolean;
}

export default function Stepper({
    currentStep,
    steps,
    setCurrentStep,
    children,
    onNext,
    onPrevious,
    isSubmitting = false
}: StepperProps) {
    return (
        <div className="space-y-6">
            <div className="w-full flex gap-8">
                {/* Left side vertical stepper */}
                <div className="w-1/3 space-y-1">
                    {steps.map((step) => {
                        const isActive = step.number === currentStep;
                        const isCompleted = step.number < currentStep;
                        const isPending = step.number > currentStep;

                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: step.number * 0.1,
                                    duration: 0.3
                                }}
                            >
                                <button
                                    onClick={() => setCurrentStep(step.number)}
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
                                                <span className="text-sm font-medium">{step.number}</span>
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

                                {step.number < steps.length && (
                                    <div className="h-6 ml-7 border-l-2 border-gray-200"></div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right side content area */}
                <div className="w-2/3 bg-gray-50 rounded-lg p-6">
                    {children}
                </div>
            </div>

            {/* Navigation buttons - moved outside the flex container */}
            <div className="flex justify-between pt-6 border-t">
                <Button
                    variant="outline"
                    onClick={onPrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="h-4 w-4" /> Previous
                </Button>

                {currentStep === steps.length ? (
                    <Button
                        onClick={onNext}
                        disabled={isSubmitting}
                        className="flex items-center gap-2"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'} <Save className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={onNext}
                        className="flex items-center gap-2"
                    >
                        Next <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
} 