'use client';

import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, ClipboardList, FileCheck, Building } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { landOwnershipSchema } from '../types/schema';
import { useState } from 'react';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
    strategicPlan: string;
    annualActionPlan: string;
    annualBudgetPlan: string;
    registrationDocuments: string;
    landOwnership: string;
}

interface LandOwnershipFormProps {
    formData: any;
    updateFormData: (data: any) => void;
    errors: string[];
    currentStep: number;
    isSubmitting: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    totalSteps: number;
}

export const LandOwnershipForm: React.FC<LandOwnershipFormProps> = ({
    formData: parentFormData,
    updateFormData,
    errors,
    currentStep,
    isSubmitting,
    onPrevious,
    onNext,
    onSubmit,
    totalSteps
}) => {
    const form = useForm<z.infer<typeof landOwnershipSchema>>({
        resolver: zodResolver(landOwnershipSchema),
        defaultValues: {
            strategicPlan: parentFormData.strategicPlan || undefined,
            annualActionPlan: parentFormData.annualActionPlan || undefined,
            annualBudgetPlan: parentFormData.annualBudgetPlan || undefined,
            registrationDocuments: parentFormData.registrationDocuments || undefined,
            landOwnership: parentFormData.landOwnership || undefined,
        },
        mode: "onChange",
    });

    // Watch all form fields for real-time updates
    const formData = form.watch();

    // Add state for selected criteria
    const [selectedCriteria, setSelectedCriteria] = useState<string>('planning');

    // Add state for current indicator
    const [currentIndicator, setCurrentIndicator] = useState<number>(0);

    const onSubmitForm = (data: FormData) => {
        onSubmit(data);
    };

    // Helper function to get the current field name based on criteria and indicator
    const getCurrentIndicatorFieldName = () => {
        if (selectedCriteria === 'planning') {
            switch (currentIndicator) {
                case 0: return 'strategicPlan';
                case 1: return 'annualActionPlan';
                case 2: return 'annualBudgetPlan';
                default: return 'strategicPlan';
            }
        } else if (selectedCriteria === 'registration') {
            return 'registrationDocuments';
        } else if (selectedCriteria === 'landOwnership') {
            return 'landOwnership';
        }
        return '';
    };

    // Helper to get indicator count for a criteria
    const getIndicatorCountForCriteria = (criteria = selectedCriteria) => {
        if (criteria === 'planning') return 3;
        if (criteria === 'registration') return 1;
        if (criteria === 'landOwnership') return 1;
        return 0;
    };

    // Helper to check if we're on the last criteria group
    const isLastCriteriaGroup = () => {
        const criteriaGroups = ['planning', 'registration', 'landOwnership'];
        return criteriaGroups.indexOf(selectedCriteria) === criteriaGroups.length - 1;
    };

    // Helper to get the next criteria group
    const getNextCriteriaGroup = () => {
        const criteriaGroups = ['planning', 'registration', 'landOwnership'];
        const currentIndex = criteriaGroups.indexOf(selectedCriteria);
        return criteriaGroups[currentIndex + 1] || criteriaGroups[0];
    };

    // Helper to get indicator title
    const getCurrentIndicatorTitle = () => {
        if (selectedCriteria === 'planning') {
            switch (currentIndicator) {
                case 0: return 'Strategic Plan';
                case 1: return 'Annual Action Plan';
                case 2: return 'Annual Budget Plan';
                default: return '';
            }
        } else if (selectedCriteria === 'registration') {
            return 'Registration Documents';
        } else if (selectedCriteria === 'landOwnership') {
            return 'Land Ownership';
        }
        return '';
    };

    // Modified renderIndicators to show only current indicator with form integration
    const renderIndicators = () => {
        switch (selectedCriteria) {
            case 'planning':
                return (
                    <Card className={`p-6 ${form.formState.errors.strategicPlan || form.formState.errors.annualActionPlan || form.formState.errors.annualBudgetPlan ? 'border border-red-400' : ''}`}>
                        <h3 className="text-lg font-semibold mb-4">
                            {currentIndicator + 1}. {getCurrentIndicatorTitle()}
                        </h3>
                        {currentIndicator === 0 && (
                            <FormField
                                control={form.control}
                                name="strategicPlan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-3"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no_plan" id="no_plan" />
                                                    <Label htmlFor="no_plan">The school has No Strategic Plan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="basic_plan" id="basic_plan" />
                                                    <Label htmlFor="basic_plan">The Strategic plan is available with no vision and mission</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="with_vision" id="with_vision" />
                                                    <Label htmlFor="with_vision">The strategic plan includes clear vision and mission</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="with_structure" id="with_structure" />
                                                    <Label htmlFor="with_structure">The available strategic plan includes clear vision, mission, and organizational structure</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="complete_plan" id="complete_plan" />
                                                    <Label htmlFor="complete_plan">The school has a strategic plan that includes clear vision, mission, organizational structure, and implementation plan</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        {currentIndicator === 1 && (
                            <FormField
                                control={form.control}
                                name="annualActionPlan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-3"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no_action_plan" id="no_action_plan" />
                                                    <Label htmlFor="no_action_plan">There is no school's annual action plan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="has_action_plan" id="has_action_plan" />
                                                    <Label htmlFor="has_action_plan">The school has an action plan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="complete_action_plan" id="complete_action_plan" />
                                                    <Label htmlFor="complete_action_plan">The school has an annual action plan with reasonable teaching and learning activities</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        {currentIndicator === 2 && (
                            <FormField
                                control={form.control}
                                name="annualBudgetPlan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="space-y-3"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no_budget_plan" id="no_budget_plan" />
                                                    <Label htmlFor="no_budget_plan">There is no the school Annual budget Plan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="has_budget_plan" id="has_budget_plan" />
                                                    <Label htmlFor="has_budget_plan">The school has an Annual budget plan</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="complete_budget_plan" id="complete_budget_plan" />
                                                    <Label htmlFor="complete_budget_plan">The school has an Annual budget Plan with focus on teaching and learning</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                    </Card>

                );
            case 'registration':
                return (
                    <Card className={`p-6 ${form.formState.errors.registrationDocuments ? 'border-red-200' : ''} ${form.formState.errors.registrationDocuments ? 'border-red-200' : ''}`}>
                        <h3 className="text-lg font-semibold mb-4">1. Registration Document</h3>
                        <FormField
                            control={form.control}
                            name="registrationDocuments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no_registration" id="no_registration" />
                                                <Label htmlFor="no_registration">The school has no registration certificate in RGB or RDB</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="has_registration" id="has_registration" />
                                                <Label htmlFor="has_registration">The school has registration certificate in RGB/ RDB</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </Card>
                );
            case 'landOwnership':
                return (
                    <Card className={`p-6 ${form.formState.errors.landOwnership ? 'border-red-200' : ''}`}>
                        <h3 className="text-lg font-semibold mb-4">1. Land Ownership</h3>
                        <FormField
                            control={form.control}
                            name="landOwnership"
                            render={({ field }) => (
                                <FormItem>
                                    <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no_contract" id="no_contract" />
                                                <Label htmlFor="no_contract">The school owner has no rent contract or land title</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="rented_facilities" id="rented_facilities" />
                                                <Label htmlFor="rented_facilities">The school is operating in the facilities which are rented and the contract terms are not clear</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="rented_clear_terms" id="rented_clear_terms" />
                                                <Label htmlFor="rented_clear_terms">The school is operating in the facilities which are rented and the contract terms are clear</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="owned_land" id="owned_land" />
                                                <Label htmlFor="owned_land">The school owner has land title</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </Card>
                );
            default:
                return null;
        }
    };

    // Now define your navigation functions using the helpers
    const handleNextButtonClick = async () => {
        // Get the field name for the current indicator
        const currentFieldName = getCurrentIndicatorFieldName();

        // Validate the current field
        const isValid = await form.trigger(currentFieldName);

        if (isValid) {
            // Current field is valid, decide where to go next
            if (currentIndicator === getIndicatorCountForCriteria() - 1) {
                // We've completed all indicators in this criteria
                if (isLastCriteriaGroup()) {
                    // This is the last criteria group, submit the form
                    const allValid = await form.trigger();
                    if (allValid) {
                        // Update parent form data and go to next step
                        updateFormData(form.getValues());
                        onNext();
                    }
                } else {
                    // Move to the next criteria group
                    setSelectedCriteria(getNextCriteriaGroup());
                    setCurrentIndicator(0);
                }
            } else {
                // Move to the next indicator within the current criteria
                setCurrentIndicator(prev => prev + 1);
            }
        } else {
            // Show error notification or highlight the field
        }
    };

    const hasPreviousCriteria = (currentCriteriaIndex: number) => {
        return currentCriteriaIndex > 0;
    };

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6 mb-2">
                    <div className="grid grid-cols-3 gap-6 mb-2">
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                            <div
                                className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'planning' ? 'ring-2 ring-primary' : ''} ${form.formState.errors.strategicPlan || form.formState.errors.annualActionPlan || form.formState.errors.annualBudgetPlan ? 'ring-2 ring-red-400' : ''}`}
                                onClick={() => {
                                    setSelectedCriteria('planning');
                                    setCurrentIndicator(0);
                                }}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 min-w-[32px] rounded-full
                                    ${selectedCriteria === 'planning' ? 'bg-primary text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold ${form.formState.errors.strategicPlan || form.formState.errors.annualActionPlan || form.formState.errors.annualBudgetPlan ? 'bg-red-400 text-white' : ''}`}
                                >
                                    <ClipboardList className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-medium">Planning</h2>
                                    <p className="text-sm text-gray-500">
                                        {currentIndicator + 1} of 3 indicators
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 ${selectedCriteria === 'registration' ? 'ring-2 ring-primary' : ''} ${form.formState.errors.registrationDocuments ? 'ring-2 ring-red-400' : ''}`}
                                onClick={() => setSelectedCriteria('registration')}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 min-w-[32px] rounded-full bg-blue-100 text-blue-600 font-semibold ${selectedCriteria === 'registration' ? 'bg-primary text-white' : ''} ${form.formState.errors.registrationDocuments ? 'bg-red-400 text-white' : ''}`}>
                                    <FileCheck className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-medium">Registration</h2>
                                    <p className="text-sm text-gray-500">1 indicator to complete</p>
                                </div>
                            </div>

                            <div
                                className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 ${selectedCriteria === 'landOwnership' ? 'ring-2 ring-primary' : ''} ${form.formState.errors.landOwnership ? 'ring-2 ring-red-400' : ''}`}
                                onClick={() => setSelectedCriteria('landOwnership')}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 min-w-[32px] rounded-full bg-blue-100 text-blue-600 font-semibold ${selectedCriteria === 'landOwnership' ? 'bg-primary text-white' : ''} ${form.formState.errors.landOwnership ? 'bg-red-400 text-white' : ''}`}>
                                    <Building className="h-4 w-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-medium">Land Ownership or Rent Contract</h2>
                                    <p className="text-sm text-gray-500">1 indicator to complete</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 col-span-2">
                            {renderIndicators()}
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (hasPreviousCriteria(currentIndicator)) {
                                    // Go to previous criteria
                                    setCurrentIndicator(currentIndicator - 1);
                                } else {
                                    // If no previous criteria, go to previous step
                                    onPrevious();
                                }
                            }}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            {hasPreviousCriteria(currentIndicator)
                                ? "Previous"
                                : "Previous"
                            }
                        </Button>

                        <Button
                            type="button"
                            onClick={handleNextButtonClick}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            {isLastCriteriaGroup() && currentIndicator === getIndicatorCountForCriteria() - 1
                                ? 'Next Step'
                                : 'Next'} <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

