'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

interface ProvisionalResultsProps {
    overallScore: number;
    ranking: string;
    decision: string;
    accreditationYears: number;
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export function ProvisionalResults({
    overallScore ,
    ranking,
    decision,
    accreditationYears,
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    onSubmit,
    isSubmitting,
}: ProvisionalResultsProps) {
    return (
        <div className='space-y-6'>
            <div className="p-6 bg-white shadow-md rounded-md space-y-4 mb-2">
                <h2 className="text-xl font-semibold text-blue-900">Provisional Results</h2>
                <div className="text-lg">
                    <p>
                        <span className="font-medium">Overall Score:</span> {overallScore.toFixed(2)}%
                    </p>
                    <p>
                        <span className="font-medium">Provisional Ranking:</span> {ranking}
                    </p>
                    <p>
                        <span className="font-medium">Provisional Decision:</span> {decision}
                    </p>
                    <p>
                        <span className="font-medium">Provisional Accreditation Years:</span> {accreditationYears}
                    </p>
                </div>
            </div>
            <div className="flex justify-between pt-2 border-t">
                <Button
                    variant="outline"
                    onClick={onPrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 hover:cursor-pointer"
                >
                    <ChevronLeft className="h-4 w-4" /> Previous
                </Button>

                {currentStep === totalSteps - 1 ? (
                    <Button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 hover:cursor-pointer"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'} <Save className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button
                        onClick={onNext}
                        className="flex items-center gap-2 hover:cursor-pointer"
                    >
                        Next <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
} 