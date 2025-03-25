'use client';

import { useForm } from 'react-hook-form';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LandOwnershipFormProps {
    onSubmit: (data: FormData) => void;
}

interface FormData {
    strategicPlan: string;
    annualActionPlan: string;
    annualBudgetPlan: string;
    registrationDocuments: string;
    landOwnership: string;
}

interface ScoreConfig {
    maxScore: number;
    values: Record<string, number>;
}

const scoreConfigs: Record<keyof FormData, ScoreConfig> = {
    strategicPlan: {
        maxScore: 4,
        values: {
            no_plan: 0,
            basic_plan: 1,
            with_vision: 2,
            with_structure: 3,
            complete_plan: 4
        }
    },
    annualActionPlan: {
        maxScore: 2,
        values: {
            no_action_plan: 0,
            has_action_plan: 1,
            complete_action_plan: 2
        }
    },
    annualBudgetPlan: {
        maxScore: 2,
        values: {
            no_budget_plan: 0,
            has_budget_plan: 1,
            complete_budget_plan: 2
        }
    },
    registrationDocuments: {
        maxScore: 2,
        values: {
            no_registration: 0,
            has_registration: 2
        }
    },
    landOwnership: {
        maxScore: 2,
        values: {
            no_contract: 0,
            rented_facilities: 0.5,
            rented_clear_terms: 1,
            owned_land: 2
        }
    }
};

export function LandOwnershipForm({ onSubmit }: LandOwnershipFormProps) {
    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid }
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            strategicPlan: '',
            annualActionPlan: '',
            annualBudgetPlan: '',
            registrationDocuments: '',
            landOwnership: '',
        }
    });

    // Watch all form fields for real-time updates
    const formData = watch();

    // Calculate score for each section and show it next to the section title
    const calculateSectionScore = (field: keyof FormData) => {
        const value = formData[field];
        const config = scoreConfigs[field];
        const score = value ? config.values[value] || 0 : 0;
        const percentage = Math.round((score / config.maxScore) * 100);

        return {
            score,
            maxScore: config.maxScore,
            percentage,
            isComplete: value !== ''
        };
    };

    // Calculate total score
    const calculateOverallScore = () => {
        let totalScore = 0;
        let totalMaxScore = 0;

        Object.keys(scoreConfigs).forEach((field) => {
            const { score, maxScore } = calculateSectionScore(field as keyof FormData);
            totalScore += score;
            totalMaxScore += maxScore;
        });

        return {
            percentage: Math.round((totalScore / totalMaxScore) * 100),
            completedSections: Object.keys(formData).filter(field => formData[field as keyof FormData] !== '').length,
            totalSections: Object.keys(formData).length
        };
    };

    // Modified section header component
    const SectionHeader = ({ field, label }: { field: keyof FormData, label: string }) => {
        const { percentage, isComplete } = calculateSectionScore(field);
        return (
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Label className="text-lg font-medium">{label}</Label>
                    {isComplete && (
                        <span className={`text-sm font-medium ${percentage >= 70 ? 'text-green-600' : 'text-orange-600'
                            }`}>
                            ({percentage}%)
                        </span>
                    )}
                </div>
                {errors[field] && (
                    <span className="text-sm text-red-500">Required</span>
                )}
            </div>
        );
    };

    // Overall score display
    const ScoreDisplay = () => {
        const { percentage, completedSections, totalSections } = calculateOverallScore();
        return (
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-blue-900">
                            Documentation & Planning Score
                        </h3>
                        <p className="text-sm text-blue-700">
                            {completedSections} of {totalSections} sections completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-blue-600">
                            {percentage}%
                        </div>
                        <CheckCircle2
                            className={`w-6 h-6 ${percentage >= 70 ? 'text-green-500' : 'text-gray-400'
                                }`}
                        />
                    </div>
                </div>
            </Card>
        );
    };

    const onSubmitForm = (data: FormData) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <ScoreDisplay />

            {/* Strategic Plan */}
            <Card className={`p-6 ${errors.strategicPlan ? 'border-red-200' : ''}`}>
                <div className="space-y-4">
                    <SectionHeader field="strategicPlan" label="Strategic Plan" />
                    <RadioGroup
                        value={formData.strategicPlan}
                        onValueChange={(value: string) => setValue('strategicPlan', value)}
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
                </div>
            </Card>

            {/* Annual Action Plan */}
            <Card className={`p-6 ${errors.annualActionPlan ? 'border-red-200' : ''}`}>
                <div className="space-y-4">
                    <SectionHeader field="annualActionPlan" label="Annual Action Plan" />
                    <RadioGroup
                        value={formData.annualActionPlan}
                        onValueChange={(value: string) => setValue('annualActionPlan', value)}
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
                </div>
            </Card>

            {/* Annual Budget Plan */}
            <Card className={`p-6 ${errors.annualBudgetPlan ? 'border-red-200' : ''}`}>
                <div className="space-y-4">
                    <SectionHeader field="annualBudgetPlan" label="Annual Budget Plan" />
                    <RadioGroup
                        value={formData.annualBudgetPlan}
                        onValueChange={(value: string) => setValue('annualBudgetPlan', value)}
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
                </div>
            </Card>

            {/* Registration Documents */}
            <Card className={`p-6 ${errors.registrationDocuments ? 'border-red-200' : ''}`}>
                <div className="space-y-4">
                    <SectionHeader field="registrationDocuments" label="Registration Documents" />
                    <RadioGroup
                        value={formData.registrationDocuments}
                        onValueChange={(value: string) => setValue('registrationDocuments', value)}
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
                </div>
            </Card>

            {/* Land Ownership */}
            <Card className={`p-6 ${errors.landOwnership ? 'border-red-200' : ''}`}>
                <div className="space-y-4">
                    <SectionHeader field="landOwnership" label="Land Ownership" />
                    <RadioGroup
                        value={formData.landOwnership}
                        onValueChange={(value: string) => setValue('landOwnership', value)}
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
                </div>
            </Card>

            {/* Form Status */}
            <div className="flex items-center justify-between pt-6">
                <div className="text-sm text-gray-500">
                    {Object.keys(errors).length > 0 && (
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>
                                {Object.keys(errors).length} section(s) need attention
                            </span>
                        </div>
                    )}
                </div>
                <Button
                    type="submit"
                    className={`px-6 ${isValid ? 'bg-blue-600' : 'bg-gray-400'}`}
                    disabled={!isValid}
                >
                    Submit Assessment
                </Button>
            </div>
        </form>
    );
} 