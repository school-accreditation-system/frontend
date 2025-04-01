'use client';

import { useForm } from 'react-hook-form';
import { CheckCircle2, ChevronDown, ChevronUp, BookOpen, Monitor, FlaskConical, Bath, Building2, ShieldCheck, ChevronRight, ChevronLeft, School, MonitorSmartphone, Hammer, Toilet, Shield } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { schoolInfrastructureSchema, schoolInfrastructureScoreConfigs } from '../types/schema';
import { z } from 'zod';
interface SchoolInfrastructureFormProps {
    formData: parentFormData;
    updateFormData: (data: any) => void;
    errors: string[];
    currentStep: number;
    isSubmitting: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    totalSteps: number;
}

interface FormData {
    classrooms: string;
    doorsAndWindows: string;
    capacity: string;
    electricity: string;
    smartClassroom: string;
    computerLabComputers: string;
    computerLabSize: string;
    workshops: string;
    toolsStore: string;
    library: string;
    workshopElectricity: string;
    staffToilets: string;
    learnerToilets: string;
    strategicPlan: string;
    annualActionPlan: string;
    annualBudgetPlan: string;
    registrationDocuments: string;
    landOwnership: string;
    staffRoom: string;
    adminBlock: string;
    internetConnectivity: string;
    adminFacilities: string;
    drinkingWater: string;
    handWashing: string;
    cookingSpace: string;
    playground: string;
    sportsFacilities: string;
    firstAid: string;
    ramps: string;
    fireSafety: string;
    wasteManagement: string;
    multiPurposeHall: string;
    fireExtinguisher: string;
    lightningArrestor: string;
    fencing: string;
    externalLighting: string;
}

export const SchoolInfrastructureForm: React.FC<SchoolInfrastructureFormProps> = ({
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

    const form = useForm<z.infer<typeof schoolInfrastructureSchema>>({
        resolver: zodResolver(schoolInfrastructureSchema),
        defaultValues: {
            classrooms: parentFormData.classrooms || undefined,
            doorsAndWindows: parentFormData.doorsAndWindows || undefined,
            capacity: parentFormData.capacity || undefined,
            electricity: parentFormData.electricity || undefined,
            smartClassroom: parentFormData.smartClassroom || undefined,
            computerLabComputers: parentFormData.computerLabComputers || undefined,
            computerLabSize: parentFormData.computerLabSize || undefined,
            workshops: parentFormData.workshops || undefined,
            toolsStore: parentFormData.toolsStore || undefined,
            library: parentFormData.library || undefined,
            workshopElectricity: parentFormData.workshopElectricity || undefined,
            staffToilets: parentFormData.staffToilets || undefined,
            learnerToilets: parentFormData.learnerToilets || undefined,
            strategicPlan: parentFormData.strategicPlan || undefined,
            annualActionPlan: parentFormData.annualActionPlan || undefined,
            annualBudgetPlan: parentFormData.annualBudgetPlan || undefined,
            registrationDocuments: parentFormData.registrationDocuments || undefined,
            landOwnership: parentFormData.landOwnership || undefined,
            staffRoom: parentFormData.staffRoom || undefined,
            adminBlock: parentFormData.adminBlock || undefined,
            internetConnectivity: parentFormData.internetConnectivity || undefined,
            adminFacilities: parentFormData.adminFacilities || undefined,
            drinkingWater: parentFormData.drinkingWater || undefined,
            handWashing: parentFormData.handWashing || undefined,
            cookingSpace: parentFormData.cookingSpace || undefined,
            playground: parentFormData.playground || undefined,
            sportsFacilities: parentFormData.sportsFacilities || undefined,
            firstAid: parentFormData.firstAid || undefined,
            ramps: parentFormData.ramps || undefined,
            fireSafety: parentFormData.fireSafety || undefined,
            wasteManagement: parentFormData.wasteManagement || undefined,
            multiPurposeHall: parentFormData.multiPurposeHall || undefined,
            fireExtinguisher: parentFormData.fireExtinguisher || undefined,
            lightningArrestor: parentFormData.lightningArrestor || undefined,
            fencing: parentFormData.fencing || undefined,
            externalLighting: parentFormData.externalLighting || undefined,
        },
        mode: 'onChange'
    });

    const formData = form.watch();

    // Add states for criteria and indicator navigation
    const [selectedCriteria, setSelectedCriteria] = useState<string>('classrooms');
    const [currentIndicator, setCurrentIndicator] = useState<number>(0);
    const [showSecondGroup, setShowSecondGroup] = useState(false);

    // Helper function to get the current field name based on criteria and indicator
    const getCurrentFieldName = () => {
        switch (selectedCriteria) {
            case 'classrooms':
                switch (currentIndicator) {
                    case 0: return 'classrooms';
                    case 1: return 'doorsAndWindows';
                    case 2: return 'capacity';
                    case 3: return 'electricity';
                }
                break;
            case 'smartClassroom':
                switch (currentIndicator) {
                    case 0: return 'smartClassroom';
                    case 1: return 'computerLabComputers';
                    case 2: return 'computerLabSize';
                }
                break;
            case 'workshops':
                switch (currentIndicator) {
                    case 0: return 'workshops';
                    case 1: return 'toolsStore';
                    case 2: return 'library';
                    case 3: return 'workshopElectricity';
                }
                break;
            case 'toilets':
                switch (currentIndicator) {
                    case 0: return 'staffToilets';
                    case 1: return 'learnerToilets';
                }
                break;
            case 'admin':
                switch (currentIndicator) {
                    case 0: return 'staffRoom';
                    case 1: return 'adminBlock';
                    case 2: return 'internetConnectivity';
                    case 3: return 'adminFacilities';
                }
                break;
            case 'welfare':
                switch (currentIndicator) {
                    case 0: return 'drinkingWater';
                    case 1: return 'handWashing';
                    case 2: return 'cookingSpace';
                    case 3: return 'playground';
                    case 4: return 'sportsFacilities';
                    case 5: return 'firstAid';
                    case 6: return 'ramps';
                    case 7: return 'fireSafety';
                    case 8: return 'wasteManagement';
                }
                break;
        }
        return null;
    };

    // Helper to get indicator count for a criteria
    const getIndicatorCountForCriteria = (criteria = selectedCriteria) => {
        switch (criteria) {
            case 'classrooms':
                return 4;
            case 'smartClassroom':
                return 3;
            case 'workshops':
                return 4;
            case 'toilets':
                return 2;
            case 'admin':
                return 4;
            case 'welfare':
                return 9;
            default:
                return 0;
        }
    };

    // Helper to check if we're on the last criteria group
    const isLastCriteriaGroup = () => {
        const criteriaGroups = ['classrooms', 'smartClassroom', 'workshops', 'toilets', 'admin', 'welfare'];
        return criteriaGroups.indexOf(selectedCriteria) === criteriaGroups.length - 1;
    };

    // Helper to get the next criteria group
    const getNextCriteriaGroup = () => {
        const criteriaGroups = ['classrooms', 'smartClassroom', 'workshops', 'toilets', 'admin', 'welfare'];
        const currentIndex = criteriaGroups.indexOf(selectedCriteria);
        return criteriaGroups[currentIndex + 1] || criteriaGroups[0];
    };

    // Helper function to get next criteria
    const getNextCriteria = (current: string): string | null => {
        switch (current) {
            case 'classrooms':
                return 'smartClassroom';
            case 'smartClassroom':
                return 'workshops';
            case 'workshops':
                return 'toilets';
            case 'toilets':
                return 'admin';
            case 'admin':
                return 'welfare';
            case 'welfare':
                return null;
            default:
                return 'classrooms';
        }
    };

    // Helper function to get previous criteria
    const getPreviousCriteria = (current: string): string | null => {
        switch (current) {
            case 'welfare':
                return 'admin';
            case 'admin':
                return 'toilets';
            case 'toilets':
                return 'workshops';
            case 'workshops':
                return 'smartClassroom';
            case 'smartClassroom':
                return 'classrooms';
            case 'classrooms':
                return null;
            default:
                return null;
        }
    };

    // Modified handleNextButtonClick function
    const handleNextButtonClick = async () => {
        const currentFieldName = getCurrentFieldName();

        if (!currentFieldName) {
            console.error('No field name found for current criteria and indicator');
            return;
        }

        const isValid = await form.trigger(currentFieldName, { shouldFocus: true });

        if (isValid) {
            if (currentIndicator === getIndicatorCountForCriteria() - 1) {
                if (isLastCriteriaGroup()) {
                    updateFormData(form.getValues());
                    onNext();
                } else {
                    setSelectedCriteria(getNextCriteriaGroup());
                    setCurrentIndicator(0);
                }
            } else {
                setCurrentIndicator(prev => prev + 1);
            }
        }
    };

    const hasPreviousCriteria = (currentCriteriaIndex: number) => {
        return currentCriteriaIndex > 0;
    };

    // Helper function to get the number of indicators for current criteria
    const getIndicatorCount = (criteria: string): number => {
        switch (criteria) {
            case 'classrooms':
                return 4; // classrooms, doors/windows, capacity, electricity
            case 'smartClassroom':
                return 3; // smart classroom, computers, lab size
            case 'workshops':
                return 4; // workshops, tools store, library, electricity
            case 'toilets':
                return 2; // staff toilets, learner toilets
            case 'admin':
                return 4; // staff room, admin block, internet, facilities
            case 'welfare':
                return 9; // all welfare indicators
            default:
                return 0;
        }
    };

    const handlePrevious = () => {
        if (currentIndicator > 0) {
            // Move to previous indicator within current criteria
            setCurrentIndicator(currentIndicator - 1);
        } else {
            // At first indicator, check if there's previous criteria
            const prevCriteria = getPreviousCriteria(selectedCriteria);
            if (prevCriteria) {
                setSelectedCriteria(prevCriteria);
                setCurrentIndicator(getIndicatorCount(prevCriteria) - 1);
            } else {
                // No more criteria, move to previous step
                onPrevious();
                setSelectedCriteria('classrooms');
                setCurrentIndicator(0);
            }
        }
    };

    const onSubmitForm = (data: FormData) => {
        onSubmit(data);
    };

    const renderIndicators = () => {
        switch (selectedCriteria) {
            case 'classrooms':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of At Least One Classroom By Each Level</h3>
                                <FormField
                                    control={form.control}
                                    name="classrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_classrooms" id="no_classrooms" />
                                                        <Label htmlFor="no_classrooms">The school has no classrooms for the applied level/trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_classrooms" id="some_classrooms" />
                                                        <Label htmlFor="some_classrooms">The school has 50% and above (not all) of classrooms for the applied level/trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_classrooms" id="all_classrooms" />
                                                        <Label htmlFor="all_classrooms">The school has all required classrooms for the applied level/trade/combinations</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Each Classroom Has 2 Doors and Sufficient Windows</h3>
                                <FormField
                                    control={form.control}
                                    name="doorsAndWindows"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_doors_windows" id="no_doors_windows" />
                                                        <Label htmlFor="no_doors_windows">No classroom available for the applied level/trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_doors_windows" id="few_doors_windows" />
                                                        <Label htmlFor="few_doors_windows">Approximately 1-25% classrooms have 2 doors and windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_doors_windows" id="some_doors_windows" />
                                                        <Label htmlFor="some_doors_windows">Approximately 26-50% classrooms have 2 doors and windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_doors_windows" id="most_doors_windows" />
                                                        <Label htmlFor="most_doors_windows">Approximately 51-75% classrooms have 2 doors and windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_doors_windows" id="all_doors_windows" />
                                                        <Label htmlFor="all_doors_windows">Approximately 76-100% classrooms have 2 doors and windows</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Each Classroom has Maximum Capacity of 46 Students</h3>
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_capacity" id="no_capacity" />
                                                        <Label htmlFor="no_capacity">All available classrooms do not have a maximum capacity of 46 students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_capacity" id="few_capacity" />
                                                        <Label htmlFor="few_capacity">Approximately 1-25% classrooms have a maximum capacity of 46 students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_capacity" id="some_capacity" />
                                                        <Label htmlFor="some_capacity">Approximately 26-50% classrooms have a maximum capacity of 46 students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_capacity" id="most_capacity" />
                                                        <Label htmlFor="most_capacity">Approximately 51-75% classrooms have a maximum capacity of 46 students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_capacity" id="all_capacity" />
                                                        <Label htmlFor="all_capacity">76-100% classrooms have a maximum capacity of 46 students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Electricity In All Classrooms</h3>
                                <FormField
                                    control={form.control}
                                    name="electricity"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_electricity" id="no_electricity" />
                                                        <Label htmlFor="no_electricity">No classroom has electricity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_electricity" id="few_electricity" />
                                                        <Label htmlFor="few_electricity">Approximately 1-25% of all classrooms have electricity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_electricity" id="some_electricity" />
                                                        <Label htmlFor="some_electricity">26-50% of all classrooms have electricity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_electricity" id="most_electricity" />
                                                        <Label htmlFor="most_electricity">51-75% of all classrooms have electricity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_electricity" id="all_electricity" />
                                                        <Label htmlFor="all_electricity">76-100% of all classrooms have electricity</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            case 'smartClassroom':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of At Least 1 Smart Classroom</h3>
                                <FormField
                                    control={form.control}
                                    name="smartClassroom"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_smart_classroom" id="no_smart_classroom" />
                                                        <Label htmlFor="no_smart_classroom">The school has No smart classroom available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_smart_classroom" id="few_smart_classroom" />
                                                        <Label htmlFor="few_smart_classroom">The school has a smart classroom with Approximately 1-25% of smart classrooms</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_smart_classroom" id="some_smart_classroom" />
                                                        <Label htmlFor="some_smart_classroom">The school has a smart classroom with Approximately 26-50% of smart classrooms</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_smart_classroom" id="most_smart_classroom" />
                                                        <Label htmlFor="most_smart_classroom">The school has a smart classroom with Approximately 51-75% of smart classrooms</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_smart_classroom" id="all_smart_classroom" />
                                                        <Label htmlFor="all_smart_classroom">The school has a smart classroom with Approximately 76-100% of smart classrooms</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability of Computer Laboratory with Sufficient Computers</h3>
                                <FormField
                                    control={form.control}
                                    name="computerLabComputers"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_computer_lab" id="no_computer_lab" />
                                                        <Label htmlFor="no_computer_lab">The school has No computer for students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_computers" id="few_computers" />
                                                        <Label htmlFor="few_computers">The school has a computer laboratory and approximately 1-25% of students have access</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_computers" id="some_computers" />
                                                        <Label htmlFor="some_computers">The school has a computer laboratory and approximately 26-50% of students have access</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_computers" id="most_computers" />
                                                        <Label htmlFor="most_computers">The school has a computer laboratory and approximately 51-75% of students have access</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_computers" id="all_computers" />
                                                        <Label htmlFor="all_computers">The school has a computer laboratory and approximately 76-100% of students have access</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of Computer Laboratory Having at least 90sqm</h3>
                                <FormField
                                    control={form.control}
                                    name="computerLabSize"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_lab_size" id="no_lab_size" />
                                                        <Label htmlFor="no_lab_size">The school has no computer laboratory</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_one_door" id="lab_size_one_door" />
                                                        <Label htmlFor="lab_size_one_door">The available computer laboratory has at least 90sqm, at least 1 door and window</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_two_doors" id="lab_size_two_doors" />
                                                        <Label htmlFor="lab_size_two_doors">The available computer laboratory has at least 90sqm, 2 doors and windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_two_doors_windows" id="lab_size_two_doors_windows" />
                                                        <Label htmlFor="lab_size_two_doors_windows">The available computer laboratory has at least 90sqm, 2 doors and windows with ventilation</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            case 'workshops':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability of Technical Workshops and/or Science Laboratories</h3>
                                <FormField
                                    control={form.control}
                                    name="workshops"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_workshops" id="no_workshops" />
                                                        <Label htmlFor="no_workshops">The school has no Workshop and/or science Laboratory for the requested trade</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_workshops" id="some_workshops" />
                                                        <Label htmlFor="some_workshops">The school has a Workshop and/or science Laboratory for the requested trade</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_workshops" id="most_workshops" />
                                                        <Label htmlFor="most_workshops">The school has a Workshop and/or science Laboratory for the requested trade with sufficient equipment</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_workshops" id="all_workshops" />
                                                        <Label htmlFor="all_workshops">The school has a Workshop and/or science Laboratory for the requested trade with all required equipment</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Store For Tools And Materials</h3>
                                <FormField
                                    control={form.control}
                                    name="toolsStore"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_tools_store" id="no_tools_store" />
                                                        <Label htmlFor="no_tools_store">There is no workshop or the workshop has no Store For Tools And Materials</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_tools_store" id="some_tools_store" />
                                                        <Label htmlFor="some_tools_store">The workshop has Store For Tools And Materials and Adequate Security</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_tools_store" id="most_tools_store" />
                                                        <Label htmlFor="most_tools_store">The workshop has Store For Tools And Materials and Adequate Security with proper organization</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_tools_store" id="all_tools_store" />
                                                        <Label htmlFor="all_tools_store">The workshop has Store For Tools And Materials and Adequate Security with proper organization and inventory management</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of A Library Of 7Mx10M Having 2 Doors And 4 Windows</h3>
                                <FormField
                                    control={form.control}
                                    name="library"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_library" id="no_library" />
                                                        <Label htmlFor="no_library">The school has no library</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="small_library" id="small_library" />
                                                        <Label htmlFor="small_library">The school has a library with a floor area of approximately 18sqm and having 2 doors and 4 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="medium_library" id="medium_library" />
                                                        <Label htmlFor="medium_library">The school has a library with a floor area of approximately 35sqm and having 2 doors and 4 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="large_library" id="large_library" />
                                                        <Label htmlFor="large_library">The school has a library with a floor area of approximately 50sqm and having 2 doors and 4 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_library" id="full_library" />
                                                        <Label htmlFor="full_library">The school has a library with a floor area of 70sqm or more and having 2 doors and 4 windows</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Electricity In the Workshop or Laboratory</h3>
                                <FormField
                                    control={form.control}
                                    name="workshopElectricity"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_workshop_electricity" id="no_workshop_electricity" />
                                                        <Label htmlFor="no_workshop_electricity">There is no electricity in the workshop or science laboratories</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="workshop_electricity" id="workshop_electricity" />
                                                        <Label htmlFor="workshop_electricity">There is electricity in the workshop or science laboratories</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            case 'toilets':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of Toilet For Staff For Each Gender</h3>
                                <FormField
                                    control={form.control}
                                    name="staffToilets"
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
                                                        <RadioGroupItem value="no_staff_toilets" id="no_staff_toilets" />
                                                        <Label htmlFor="no_staff_toilets">The school has no Toilets For Staff For Each Gender that can serve 15 staff of each gender</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="shared_staff_toilets" id="shared_staff_toilets" />
                                                        <Label htmlFor="shared_staff_toilets">The school has one toilet shared by both female and male staff or has 2 toilets for each gender</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_staff_toilets" id="sufficient_staff_toilets" />
                                                        <Label htmlFor="sufficient_staff_toilets">The school has sufficient Toilets for staff For Each Gender shared by 15 staff of each gender</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Toilet For Learners For Each Gender</h3>
                                <FormField
                                    control={form.control}
                                    name="learnerToilets"
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
                                                        <RadioGroupItem value="no_learner_toilets" id="no_learner_toilets" />
                                                        <Label htmlFor="no_learner_toilets">The school has no Toilet For Learners For Each Gender</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="shared_learner_toilets" id="shared_learner_toilets" />
                                                        <Label htmlFor="shared_learner_toilets">The school has Toilets that serve all learners regardless of gender</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_learner_toilets" id="some_learner_toilets" />
                                                        <Label htmlFor="some_learner_toilets">The school has Toilets For Learners For Each Gender shared by more than 30 learners</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_learner_toilets" id="sufficient_learner_toilets" />
                                                        <Label htmlFor="sufficient_learner_toilets">The school has Toilets For Learners For Each Gender shared by 30 for Girls and 40 for Boys</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            case 'admin':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability of At Least One Convenient Academic Staff Room</h3>
                                <FormField
                                    control={form.control}
                                    name="staffRoom"
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
                                                        <RadioGroupItem value="no_staff_room" id="no_staff_room" />
                                                        <Label htmlFor="no_staff_room">The school has no Academic Staff Room</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_staff_room" id="some_staff_room" />
                                                        <Label htmlFor="some_staff_room">The school has an Academic Staff Room that can serve up to 25% of the available staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_staff_room" id="half_staff_room" />
                                                        <Label htmlFor="half_staff_room">The school has an Academic Staff Room that can serve up to 50% of the available staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_staff_room" id="most_staff_room" />
                                                        <Label htmlFor="most_staff_room">The school has an Academic Staff Room that can serve up to 75% of the available staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_staff_room" id="all_staff_room" />
                                                        <Label htmlFor="all_staff_room">The school has an Academic Staff Room that serve 76%-100% of the available staff</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability of an Equipped Administration Block</h3>
                                <FormField
                                    control={form.control}
                                    name="adminBlock"
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
                                                        <RadioGroupItem value="no_admin_block" id="no_admin_block" />
                                                        <Label htmlFor="no_admin_block">The school has no administration block or offices for administration</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_admin_block" id="some_admin_block" />
                                                        <Label htmlFor="some_admin_block">The school has administrative block or offices that serve up to 25% of the staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_admin_block" id="half_admin_block" />
                                                        <Label htmlFor="half_admin_block">The school has administrative block or offices that serve up to 50% of the staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_admin_block" id="most_admin_block" />
                                                        <Label htmlFor="most_admin_block">The school has administrative block or offices that serve up to 75% of the staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_admin_block" id="all_admin_block" />
                                                        <Label htmlFor="all_admin_block">The school has administrative block or offices that all the staff on the school staff list</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of Internet Connectivity</h3>
                                <FormField
                                    control={form.control}
                                    name="internetConnectivity"
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
                                                        <RadioGroupItem value="no_internet" id="no_internet" />
                                                        <Label htmlFor="no_internet">There is no internet for both administrative staff and teaching staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="admin_internet" id="admin_internet" />
                                                        <Label htmlFor="admin_internet">There is internet for only the administrative staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_internet" id="full_internet" />
                                                        <Label htmlFor="full_internet">There is internet with sufficient coverage for both administrative and teaching staff</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Administrative Facilities Constructed With Authorised Materials</h3>
                                <FormField
                                    control={form.control}
                                    name="adminFacilities"
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
                                                        <RadioGroupItem value="no_admin_facilities" id="no_admin_facilities" />
                                                        <Label htmlFor="no_admin_facilities">The school has no administration block or offices for administration</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_admin_facilities" id="some_admin_facilities" />
                                                        <Label htmlFor="some_admin_facilities">The school has an administration block or offices for administration made of temporary materials</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_admin_facilities" id="full_admin_facilities" />
                                                        <Label htmlFor="full_admin_facilities">The school has an administration block or offices for administration made of authorised materials</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            case 'welfare':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of Drinking Water</h3>
                                <FormField
                                    control={form.control}
                                    name="drinkingWater"
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
                                                        <RadioGroupItem value="no_drinking_water" id="no_drinking_water" />
                                                        <Label htmlFor="no_drinking_water">The school has no drinking water</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_drinking_water" id="some_drinking_water" />
                                                        <Label htmlFor="some_drinking_water">The school has drinking water but not sufficient for all students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_drinking_water" id="sufficient_drinking_water" />
                                                        <Label htmlFor="sufficient_drinking_water">The school has sufficient drinking water for all students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Hand Washing Facilities</h3>
                                <FormField
                                    control={form.control}
                                    name="handWashing"
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
                                                        <RadioGroupItem value="no_hand_washing" id="no_hand_washing" />
                                                        <Label htmlFor="no_hand_washing">The school has no hand washing facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_hand_washing" id="some_hand_washing" />
                                                        <Label htmlFor="some_hand_washing">The school has hand washing facilities but not sufficient for all students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_hand_washing" id="sufficient_hand_washing" />
                                                        <Label htmlFor="sufficient_hand_washing">The school has sufficient hand washing facilities for all students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of Cooking Space</h3>
                                <FormField
                                    control={form.control}
                                    name="cookingSpace"
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
                                                        <RadioGroupItem value="no_cooking_space" id="no_cooking_space" />
                                                        <Label htmlFor="no_cooking_space">The school has no cooking space</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_cooking_space" id="some_cooking_space" />
                                                        <Label htmlFor="some_cooking_space">The school has cooking space but not sufficient for all needs</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_cooking_space" id="sufficient_cooking_space" />
                                                        <Label htmlFor="sufficient_cooking_space">The school has sufficient cooking space for all needs</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Playground</h3>
                                <FormField
                                    control={form.control}
                                    name="playground"
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
                                                        <RadioGroupItem value="no_playground" id="no_playground" />
                                                        <Label htmlFor="no_playground">The school has no playground</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_playground" id="some_playground" />
                                                        <Label htmlFor="some_playground">The school has a playground but not sufficient for all students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_playground" id="sufficient_playground" />
                                                        <Label htmlFor="sufficient_playground">The school has a sufficient playground for all students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 4 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">5. Availability Of Sports Facilities</h3>
                                <FormField
                                    control={form.control}
                                    name="sportsFacilities"
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
                                                        <RadioGroupItem value="no_sports_facilities" id="no_sports_facilities" />
                                                        <Label htmlFor="no_sports_facilities">The school has no sports facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_sports_facilities" id="some_sports_facilities" />
                                                        <Label htmlFor="some_sports_facilities">The school has sports facilities but not sufficient for all students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_sports_facilities" id="sufficient_sports_facilities" />
                                                        <Label htmlFor="sufficient_sports_facilities">The school has sufficient sports facilities for all students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 5 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">6. Availability Of First Aid Facilities</h3>
                                <FormField
                                    control={form.control}
                                    name="firstAid"
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
                                                        <RadioGroupItem value="no_first_aid" id="no_first_aid" />
                                                        <Label htmlFor="no_first_aid">The school has no first aid facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_first_aid" id="some_first_aid" />
                                                        <Label htmlFor="some_first_aid">The school has first aid facilities but not sufficient for all needs</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_first_aid" id="sufficient_first_aid" />
                                                        <Label htmlFor="sufficient_first_aid">The school has sufficient first aid facilities for all needs</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 6 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">7. Availability Of Ramps For Physically Disabled</h3>
                                <FormField
                                    control={form.control}
                                    name="ramps"
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
                                                        <RadioGroupItem value="no_ramps" id="no_ramps" />
                                                        <Label htmlFor="no_ramps">The school has no ramps for the physically disabled</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_ramps" id="some_ramps" />
                                                        <Label htmlFor="some_ramps">The school has ramps but not sufficient for all needs</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_ramps" id="sufficient_ramps" />
                                                        <Label htmlFor="sufficient_ramps">The school has sufficient ramps for all needs</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 7 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">8. Availability Of Fire Safety Measures</h3>
                                <FormField
                                    control={form.control}
                                    name="fireSafety"
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
                                                        <RadioGroupItem value="no_fire_safety" id="no_fire_safety" />
                                                        <Label htmlFor="no_fire_safety">The school has no fire safety measures</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_fire_safety" id="some_fire_safety" />
                                                        <Label htmlFor="some_fire_safety">The school has fire safety measures but not sufficient for all needs</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_fire_safety" id="sufficient_fire_safety" />
                                                        <Label htmlFor="sufficient_fire_safety">The school has sufficient fire safety measures for all needs</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentIndicator === 8 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">9. Availability Of Waste Management Facilities</h3>
                                <FormField
                                    control={form.control}
                                    name="wasteManagement"
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
                                                        <RadioGroupItem value="no_waste_management" id="no_waste_management" />
                                                        <Label htmlFor="no_waste_management">The school has no waste management facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_waste_management" id="some_waste_management" />
                                                        <Label htmlFor="some_waste_management">The school has waste management facilities but not sufficient for all needs</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_waste_management" id="sufficient_waste_management" />
                                                        <Label htmlFor="sufficient_waste_management">The school has sufficient waste management facilities for all needs</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
                    {/* Main container with two columns */}
                    <div className="grid grid-cols-3 gap-6 mb-2">
                        {/* Left Container - Main Criteria Categories */}
                        <div className="p-4 bg-blue-50 rounded-lg">
                            {/* Hidden Criteria Indicator - Scrollable when active */}
                            {(selectedCriteria === 'toilets' || selectedCriteria === 'admin' || selectedCriteria === 'welfare') && (
                                <div className="mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent min-h-auto">
                                    <div
                                        className={`flex  items-center gap-4 p-4 bg-white rounded-lg cursor-pointer
                                        ${selectedCriteria === 'toilets' ? 'ring-2 ring-blue-500 m-2' : ''}
                                        ${selectedCriteria === 'admin' ? 'ring-2 ring-blue-500 m-2' : ''}
                                        ${selectedCriteria === 'welfare' ? 'ring-2 ring-blue-500 m-2' : ''}`}
                                    >
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold     
                                        ${selectedCriteria === 'toilets' ? 'bg-blue-500' : ''}
                                        ${selectedCriteria === 'admin' ? 'bg-blue-500' : ''}
                                        ${selectedCriteria === 'welfare' ? 'bg-blue-500' : ''}`}>
                                            {selectedCriteria === 'toilets' ? form.formState.errors.toilets ? <Toilet className="h-4 w-4" /> : <Toilet className="h-4 w-4" /> :
                                                selectedCriteria === 'admin' ? <Building2 className="h-4 w-4" /> :
                                                    form.formState.errors.welfare ? <Shield className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <h2 className="text-base font-medium">
                                                {selectedCriteria === 'toilets' ? 'Toilets' :
                                                    selectedCriteria === 'admin' ? 'Administrative Offices' :
                                                        'Welfare & Safety'}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {`${currentIndicator + 1} of ${selectedCriteria === 'toilets' ? '2' :
                                                    selectedCriteria === 'admin' ? '4' : '9'
                                                    } indicators`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Main Visible Criteria */}
                            <div className="space-y-4">
                                {/* Classrooms */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'classrooms' ? 'ring-2 ring-blue-500' : ''} ${form.formState.errors.classrooms || form.formState.errors.doorsAndWindows || form.formState.errors.capacity || form.formState.errors.electricity ? 'ring-2 ring-red-400' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('classrooms');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'classrooms' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold ${form.formState.errors.classrooms || form.formState.errors.doorsAndWindows || form.formState.errors.capacity || form.formState.errors.electricity ? 'bg-red-400 text-white' : ''}`}
                                    >
                                        <School className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Classrooms</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'classrooms' ? `${currentIndicator + 1} of 4 indicators` : '4 indicators'}
                                        </p>
                                    </div>
                                </div>

                                {/* Smart Classroom */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'smartClassroom' ? 'ring-2 ring-blue-500' : ''} ${form.formState.errors.smartClassroom || form.formState.errors.computerLabComputers ? 'ring-2 ring-red-400' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('smartClassroom');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'smartClassroom' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold ${form.formState.errors.smartClassroom || form.formState.errors.computerLabComputers ? 'bg-red-400 text-white' : ''}`}
                                    >
                                        <MonitorSmartphone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Smart Classroom</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'smartClassroom' ? `${currentIndicator + 1} of 3 indicators` : '3 indicators'}
                                        </p>
                                    </div>
                                </div>

                                {/* Workshops */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'workshops' ? 'ring-2 ring-blue-500' : ''} ${form.formState.errors.workshops || form.formState.errors.toolsStore || form.formState.errors.library || form.formState.errors.workshopElectricity ? 'ring-2 ring-red-400' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('workshops');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'workshops' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold ${form.formState.errors.workshops || form.formState.errors.toolsStore || form.formState.errors.library || form.formState.errors.workshopElectricity ? 'bg-red-400 text-white' : ''}`}
                                    >
                                        <Hammer className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Workshops</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'workshops' ? `${currentIndicator + 1} of 4 indicators` : '4 indicators'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Container - Indicators */}
                        <div className="space-y-6 col-span-2">
                            {renderIndicators()}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-2 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={hasPreviousCriteria(currentIndicator) ? handlePrevious : onPrevious}
                            disabled={currentStep === 0 && selectedCriteria === 'classrooms'}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" /> {hasPreviousCriteria(currentIndicator) ? 'Previous' : 'Previous Step'}
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
} 