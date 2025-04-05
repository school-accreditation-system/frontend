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
    // Classrooms Section
    classrooms: string;
    doorsAndWindows: string;
    capacity: string;
    electricity: string;

    // Smart Classroom Section
    smartClassroom: string;
    computerLabComputers: string;
    computerLabSize: string;

    // Workshops Section
    workshops: string;
    toolsStore: string;
    library: string;
    workshopElectricity: string;

    // Toilets Section
    staffToilets: string;
    learnerToilets: string;

    // Administrative Offices Section
    staffRoom: string;
    adminBlock: string;
    internetConnectivity: string;
    adminFacilities: string;

    // Welfare Facilities Section
    diningHall: string;
    handWashing: string;
    cookingSpace: string;
    playground: string;
    rainWaterHarvesting: string;
    dormitory: string;
    disabilityAccess: string;
    girlRoom: string;
    drinkingWater: string;
    greening: string;
    basicCleaness: string;
    wasteManagement: string;
    multiPurposeHall: string;

    // Safety and Security Section
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
            staffRoom: parentFormData.staffRoom || undefined,
            adminBlock: parentFormData.adminBlock || undefined,
            internetConnectivity: parentFormData.internetConnectivity || undefined,
            adminFacilities: parentFormData.adminFacilities || undefined,
            diningHall: parentFormData.diningHall || undefined,
            handWashing: parentFormData.handWashing || undefined,
            cookingSpace: parentFormData.cookingSpace || undefined,
            playground: parentFormData.playground || undefined,
            rainWaterHarvesting: parentFormData.rainWaterHarvesting || undefined,
            dormitory: parentFormData.dormitory || undefined,
            disabilityAccess: parentFormData.disabilityAccess || undefined,
            girlRoom: parentFormData.girlRoom || undefined,
            drinkingWater: parentFormData.drinkingWater || undefined,
            greening: parentFormData.greening || undefined,
            basicCleaness: parentFormData.basicCleaness || undefined,
            wasteManagement: parentFormData.wasteManagement || undefined,
            multiPurposeHall: parentFormData.multiPurposeHall || undefined,
            fireExtinguisher: parentFormData.fireExtinguisher || undefined,
            lightningArrestor: parentFormData.lightningArrestor || undefined,
            fencing: parentFormData.fencing || undefined,
            externalLighting: parentFormData.externalLighting || undefined
        },
        mode: 'onSubmit'
    });

    const formData = form.watch();

    // Add states for criteria and indicator navigation
    const [selectedCriteria, setSelectedCriteria] = useState<string>('classrooms');
    const [currentIndicator, setCurrentIndicator] = useState<number>(0);
    const [showSecondGroup, setShowSecondGroup] = useState(false);

    // Add state to track completed criteria
    const [completedCriteria, setCompletedCriteria] = useState<{
        classrooms: boolean,
        smartClassroom: boolean,
        workshops: boolean,
        toilets: boolean,
        admin: boolean,
        welfare: boolean,
        safety: boolean
    }>({
        classrooms: false,
        smartClassroom: false,
        workshops: false,
        toilets: false,
        admin: false,
        welfare: false,
        safety: false
    });

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
                    case 0: return 'diningHall';
                    case 1: return 'handWashing';
                    case 2: return 'cookingSpace';
                    case 3: return 'playground';
                    case 4: return 'rainWaterHarvesting';
                    case 5: return 'dormitory';
                    case 6: return 'disabilityAccess';
                    case 7: return 'girlRoom';
                    case 8: return 'drinkingWater';
                    case 9: return 'greening';
                    case 10: return 'basicCleaness';
                    case 11: return 'wasteManagement';
                    case 12: return 'multiPurposeHall';
                }
                break;
            case 'safety':
                switch (currentIndicator) {
                    case 0: return 'fireExtinguisher';
                    case 1: return 'lightningArrestor';
                    case 2: return 'fencing';
                    case 3: return 'externalLighting';
                }
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
                return 13;
            case 'safety':
                return 4;
            default:
                return 0;
        }
    };

    // Helper to check if we're on the last criteria group
    const isLastCriteriaGroup = () => {
        const criteriaGroups = ['classrooms', 'smartClassroom', 'workshops', 'toilets', 'admin', 'welfare', 'safety'];
        return criteriaGroups.indexOf(selectedCriteria) === criteriaGroups.length - 1;
    };

    // Helper to get the next criteria group
    const getNextCriteriaGroup = () => {
        const criteriaGroups = ['classrooms', 'smartClassroom', 'workshops', 'toilets', 'admin', 'welfare', 'safety'];
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
                return 'safety';
            case 'safety':
                return null;
            default:
                return 'classrooms';
        }
    };

    // Helper function to get previous criteria
    const getPreviousCriteria = (current: string): string | null => {
        switch (current) {
            case 'safety':
                return 'welfare';
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

    // Function to check if a criteria is accessible
    const isCriteriaAccessible = (criteriaName: string) => {
        if (criteriaName === 'classrooms') return true;
        if (criteriaName === 'smartClassroom') return completedCriteria.classrooms;
        if (criteriaName === 'workshops') return completedCriteria.classrooms && completedCriteria.smartClassroom;
        if (criteriaName === 'toilets') return completedCriteria.classrooms && completedCriteria.smartClassroom && completedCriteria.workshops;
        if (criteriaName === 'admin') return completedCriteria.classrooms && completedCriteria.smartClassroom && completedCriteria.workshops && completedCriteria.toilets;
        if (criteriaName === 'welfare') return completedCriteria.classrooms && completedCriteria.smartClassroom && completedCriteria.workshops && completedCriteria.toilets && completedCriteria.admin;
        if (criteriaName === 'safety') return completedCriteria.classrooms && completedCriteria.smartClassroom && completedCriteria.workshops && completedCriteria.toilets && completedCriteria.admin && completedCriteria.welfare;
        return false;
    };

    // Modified handleNextButtonClick function
    const handleNextButtonClick = async () => {
        const currentFieldName = getCurrentFieldName();

        if (!currentFieldName) {
            return;
        }

        const isValid = await form.trigger(currentFieldName, { shouldFocus: true });

        if (isValid) {
            if (currentIndicator === getIndicatorCountForCriteria() - 1) {
                // Mark current criteria as completed
                setCompletedCriteria(prev => ({
                    ...prev,
                    [selectedCriteria]: true
                }));

                if (isLastCriteriaGroup()) {
                    // Update form data before validation
                    updateFormData(form.getValues());
                    onNext(); // Remove the additional validation here since we've already validated each field
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
                return 14; // all welfare indicators
            case 'safety':
                return 4; // all safety indicators
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
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of At Least One Classroom By Each Level (3 for preprimary, 3 for combinations, TVET trades L3-5  and OL, 6 for primary, 1 for L1 or L2 TVET trades</h3>
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
                                                        <Label htmlFor="no_classrooms">The school has no classrooms for the applied level/ trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_classrooms" id="some_classrooms" />
                                                        <Label htmlFor="some_classrooms">The school has 50% and above (not all) of  classrooms for the applied level/ trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_classrooms" id="all_classrooms" />
                                                        <Label htmlFor="all_classrooms"> The school has all required  classrooms for the applied level/trade/combination</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Each Classroom Has 2 Doors and Sufficient Windows </h3>
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
                                                        <Label htmlFor="no_doors_windows">No classroom Available for the applied level/ trade/combinations</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_doors_windows" id="few_doors_windows" />
                                                        <Label htmlFor="few_doors_windows">Approximately 1-25% Classrooms have 2 doors and windows with an area ranging from 1-10% of floor area</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_doors_windows" id="some_doors_windows" />
                                                        <Label htmlFor="some_doors_windows">Approximately 26-50% Classrooms have 2 doors and windows with an area ranging from 11-15% of floor area</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_doors_windows" id="most_doors_windows" />
                                                        <Label htmlFor="most_doors_windows">Approximately 51-75% Classroom have 2 doors and windows with an area ranging from 16-20% of floor area</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3. Each Classroom has Maximum Capacity of  46 students (for special considerations, less capacity may be considered and a student take 1.2 to 2.5 sqm)</h3>
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
                                                        <Label htmlFor="no_capacity">All available classrooms do not have a Maximum Capacity Of 46 students or a student can not take 1.2 to 2.5 sqm</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_capacity" id="few_capacity" />
                                                        <Label htmlFor="few_capacity">Approximately 1-25% of classrooms have a Maximum Capacity Of 46 students or 1-25% of students can take 1.2 to 2.5 sqm</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_capacity" id="some_capacity" />
                                                        <Label htmlFor="some_capacity">26-50% of classrooms have a Maximum Capacity Of 46 students or 26-50% of students can take 1.2 to 2.5 sqm</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_capacity" id="most_capacity" />
                                                        <Label htmlFor="most_capacity">51-75% of classrooms have a Maximum Capacity Of 46 students or 51-75% of students can take 1.2 to 2.5 sqm</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_capacity" id="all_capacity" />
                                                        <Label htmlFor="all_capacity">76-100% of classrooms have a Maximum Capacity Of 46 studentsor 76-100% of students can take 1.2 to 2.5 sqm</Label>
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
                                                        <Label htmlFor="few_smart_classroom">The school has amart classroom with Approximately 1-25% of smart classroom requirements (at least 30 computers, projector, room to accommodate at least 30 students and internet)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_smart_classroom" id="some_smart_classroom" />
                                                        <Label htmlFor="some_smart_classroom">The school has a smart classroom with  Approximately 26-50% of smart classroom requirements (at least 30 computers, projector, room to accommodate at least 30 students and internet)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_smart_classroom" id="most_smart_classroom" />
                                                        <Label htmlFor="most_smart_classroom">The school has a smart classroom with  Approximately 51-75% of smart classroom requirements (at least 30 computers, projector, room to accommodate at least 30 students and internet)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_smart_classroom" id="all_smart_classroom" />
                                                        <Label htmlFor="all_smart_classroom">The school has a smart classroom with  Approximately 76-100% of smart classroom requirements (at least 30 computers, projector, room to accommodate at least 30 students and internet)</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability of Computer Laboratory with sufficient Computers  (computer for Each student  during lesson delivery)</h3>
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
                                                        <Label htmlFor="few_computers">The school has a computer laboratory and approximately 1-25% of students have computers during the lession delivery in computer laboratory</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_computers" id="some_computers" />
                                                        <Label htmlFor="some_computers">The school has a computer laboratory and approximately 26-50% of students have computers during the lession delivery in computer laboratory</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_computers" id="most_computers" />
                                                        <Label htmlFor="most_computers">The school has a computer laboratory and approximately 51-75% of students have computers during the lession delivery in computer laboratory</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_computers" id="all_computers" />
                                                        <Label htmlFor="all_computers">The school has a computer laboratory and approximately 76-100% of students have computers during the lession delivery in computer laboratory</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of Computer Laboratory Having at least 90sqm with 2 Doors and Sufficient windows</h3>
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
                                                        <Label htmlFor="no_lab_size">The school has No computer Laboratory </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_one_door" id="lab_size_one_door" />
                                                        <Label htmlFor="lab_size_one_door">The Available Computer Laboratory has at least 90sqm, at least 1 door and windows have an area ranging from 1-10% of floor area</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_two_doors" id="lab_size_two_doors" />
                                                        <Label htmlFor="lab_size_two_doors">The Available Computer Laboratory has at least 90sqm, at least 1 or 2 openings having an area ranging from 11-15% of floor area</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_two_doors_windows" id="lab_size_two_doors_windows" />
                                                        <Label htmlFor="lab_size_two_doors_windows">The Available Computer Laboratory has at least 90sqm, 2 doors and windows have an area ranging from 16-20% of floor area</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="lab_size_three_doors_windows" id="lab_size_three_doors_windows" />
                                                        <Label htmlFor="lab_size_three_doors_windows">The Available Computer Laboratory has at least 90sqm, 3 doors and windows have an area ranging from 21-25% of floor area</Label>
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
                                <h3 className="text-lg font-semibold mb-4">1. Availability of Technical Workshops and/or science Laboratories.</h3>
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
                                                        <Label htmlFor="no_workshops">The school has no  Workshop and/or science Laboratory for the requested trades/ combination</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_workshops" id="few_workshops" />
                                                        <Label htmlFor="few_workshops">The school has  a Workshop and/or science Laboratory  for the rquested trade/combination with a Capacity  to host approximately 1%-25% of students on average </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_workshops" id="some_workshops" />
                                                        <Label htmlFor="some_workshops">The school has  a Workshop and/or science Laboratory  for the rquested trade/combination with a Capacity  to host approximately 26%-50% of students on average </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_workshops" id="most_workshops" />
                                                        <Label htmlFor="most_workshops">The school has  a Workshop and/or science Laboratory  for the rquested trade/combination with a Capacity  to host approximately 51%-75% of students on average </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_workshops" id="all_workshops" />
                                                        <Label htmlFor="all_workshops">The school has  a Workshop and/or science Laboratory  for the rquested trade/combination with a Capacity  to host approximately 76%-100% of students on average </Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Store For Tools And Materials For Each Workshop  science laboratory</h3>
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
                                                        <Label htmlFor="no_tools_store">There is no workshop or The workshop or science laboratory  has no  Store For Tools And Materials </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_tools_store" id="few_tools_store" />
                                                        <Label htmlFor="few_tools_store">The workshop or science laboratory  has   Store For Tools And Materials  and Approximately 1-25% storage capacity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_tools_store" id="some_tools_store" />
                                                        <Label htmlFor="some_tools_store">The workshop or science laboratory  has   Store For Tools And Materials  and Approximately 26-50% storage capacity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_tools_store" id="most_tools_store" />
                                                        <Label htmlFor="most_tools_store">The workshop or science laboratory  has   Store For Tools And Materials  and Approximately 51-75% storage capacity</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_tools_store" id="all_tools_store" />
                                                        <Label htmlFor="all_tools_store">The workshop or science laboratory  has   Store For Tools And Materials  and Approximately 76-100% storage capacity</Label>
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
                                                        <Label htmlFor="no_library">The school has no No  library </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="small_library" id="small_library" />
                                                        <Label htmlFor="small_library">The school has a   library with  a floor area of approximately  18sqm and having, 1 door and 2 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="medium_library" id="medium_library" />
                                                        <Label htmlFor="medium_library">The school has a   library with   a floor area of approximately  35sqm  and having, 2 door and 4 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="large_library" id="large_library" />
                                                        <Label htmlFor="large_library">The school has a   library with   a floor area of approximately  50sqm  and having, 2 door and 4 windows</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_library" id="full_library" />
                                                        <Label htmlFor="full_library">The school has a   library with   a floor area of   70sqm or more   and having, 2 door and 4 windows</Label>
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
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Electricity In the workshop or laboratory </h3>
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
                                                        <Label htmlFor="no_workshop_electricity">There is no electricity in the  workshop or science laboratories</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="workshop_electricity" id="workshop_electricity" />
                                                        <Label htmlFor="workshop_electricity">There is  electricity in the  workshop or science laboratories</Label>
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
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of Toilet For Staff For Each Gender That Can Serve At Least 15 Staff  </h3>
                                <FormField
                                    control={form.control}
                                    name="staffToilets"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        // Trigger validation immediately
                                                        form.trigger("staffToilets");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_staff_toilets" id="no_staff_toilets" />
                                                        <Label htmlFor="no_staff_toilets">The school has no  Toilets For Staff For Each Gender that can serve 15 staff  or students and staff share toilets</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="shared_staff_toilets" id="shared_staff_toilets" />
                                                        <Label htmlFor="shared_staff_toilets">The school has one toilet shared by  both female and male staff  or has 2 toilets for (one for each gender) but shared by more than  15 staff  each</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_staff_toilets" id="sufficient_staff_toilets" />
                                                        <Label htmlFor="sufficient_staff_toilets"> The school has  sufficient  Toilets for staff   For Each Gender shared by  15 staff or less each </Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Toilet For Learners For Each Gender That Can Serve students (30 for Girls and 40 for Boys) </h3>
                                <FormField
                                    control={form.control}
                                    name="learnerToilets"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        // Trigger validation immediately
                                                        form.trigger("learnerToilets");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_learner_toilets" id="no_learner_toilets" />
                                                        <Label htmlFor="no_learner_toilets">The school has no  Toilet For Learners For Each Gender</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="shared_learner_toilets" id="shared_learner_toilets" />
                                                        <Label htmlFor="shared_learner_toilets">The school has Toilets that  Serve all learners regardless of gender  </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_learner_toilets" id="some_learner_toilets" />
                                                        <Label htmlFor="some_learner_toilets">The school has Toilets For Learners For Each Gender shared by  more than 30 for Girls and 40 for Boys</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_learner_toilets" id="sufficient_learner_toilets" />
                                                        <Label htmlFor="sufficient_learner_toilets">The school has Toilets For Learners For Each Gender shared by  more than 30 for Girls and 40 for Boys and a Separate Toilets for people with disability is available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_learner_toilets" id="more_sufficient_learner_toilets" />
                                                        <Label htmlFor="more_sufficient_learner_toilets">The school has Toilets  For Learners For Each Gender shared by  30 for Girls and 40 for Boys or less  and 2 Separate Toilets for people with disability</Label>
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
                                <h3 className="text-lg font-semibold mb-4">1. Availability of At Least One Convenient Academic Staff Room </h3>
                                <FormField
                                    control={form.control}
                                    name="staffRoom"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("staffRoom");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_staff_room" id="no_staff_room" />
                                                        <Label htmlFor="no_staff_room">The school has no Academic Staff Room</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_staff_room" id="some_staff_room" />
                                                        <Label htmlFor="some_staff_room">The school has an Academic Staff Room that can serve up to 25% of the available teaching staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_staff_room" id="half_staff_room" />
                                                        <Label htmlFor="half_staff_room">The school has an Academic Staff Room that can serve up to 50% of the available teaching staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_staff_room" id="most_staff_room" />
                                                        <Label htmlFor="most_staff_room">The school has an Academic Staff Room that can serve up to 75% of the available teaching staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_staff_room" id="all_staff_room" />
                                                        <Label htmlFor="all_staff_room">The school has an Academic Staff Room that  serve 76%-100% of the available teaching staff</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability of an equiped administration block for all staff   on the school structure</h3>
                                <FormField
                                    control={form.control}
                                    name="adminBlock"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("adminBlock");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_admin_block" id="no_admin_block" />
                                                        <Label htmlFor="no_admin_block">The school has no administration block or offices for administration</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_admin_block" id="some_admin_block" />
                                                        <Label htmlFor="some_admin_block">The school has admininistrative block or offices that  serve up to 25% of the  staff on the school organisational  structure</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_admin_block" id="half_admin_block" />
                                                        <Label htmlFor="half_admin_block">The school has admininistrative block or offices that  serve up to 50% of the  staff on the school organisational  structure</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_admin_block" id="most_admin_block" />
                                                        <Label htmlFor="most_admin_block">The school has admininistrative block or offices that  serve up to 75% of the  staff on the school organisational  structure and offices are equiped with chairs, tables and cupboards</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_admin_block" id="all_admin_block" />
                                                        <Label htmlFor="all_admin_block">The school has admininistrative block or offices that  all  the  staff on the school organisational  structure and offices are equiped with chairs, tables and cupboards</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of Internet Connectivity In All Administrative Offices and  teaching staff</h3>
                                <FormField
                                    control={form.control}
                                    name="internetConnectivity"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("internetConnectivity");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_internet" id="no_internet" />
                                                        <Label htmlFor="no_internet">There is no internet for both administarive staff and teaching staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="admin_internet" id="admin_internet" />
                                                        <Label htmlFor="admin_internet">There is  internet for only the  administarive staff </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_internet" id="full_internet" />
                                                        <Label htmlFor="full_internet">There is internet with sufficient coverage  for both administarive and teaching staff</Label>
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
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("adminFacilities");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_admin_facilities" id="no_admin_facilities" />
                                                        <Label htmlFor="no_admin_facilities">The school has no administration block or offices for administration</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_admin_facilities" id="some_admin_facilities" />
                                                        <Label htmlFor="some_admin_facilities">The school has an administration block or offices for administration made of adobe bricks or which are very  old</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_admin_facilities" id="full_admin_facilities" />
                                                        <Label htmlFor="full_admin_facilities">The school has an administration block or offices for administration made of bunt  bricks  </Label>
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
                        {/* 0. Dining Hall */}
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of A Dining Hall With (6 Windows And 2 Doors, Container Of Portable Water,Shelves To Store Plates And Cups,Ceiling To Prevent Noise )</h3>
                                <FormField
                                    control={form.control}
                                    name="diningHall"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("diningHall");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_dining_hall" id="no_dining_hall" />
                                                        <Label htmlFor="no_dining_hall">The school has no dining hall </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_dining_hall" id="some_dining_hall" />
                                                        <Label htmlFor="some_dining_hall">The school has a dining hall with only 1 door and less than 6 windows, with a capacity to hold up to 25% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_dining_hall" id="sufficient_dining_hall" />
                                                        <Label htmlFor="sufficient_dining_hall">The school has a dining hall with  2 door and 6 windows, with a capacity to hold up to 50% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_dining_hall" id="more_sufficient_dining_hall" />
                                                        <Label htmlFor="more_sufficient_dining_hall">The school has a dining hall with  2 door and 6 windows and  the capacity to host all students at the same time but without  convenient furniture</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_dining_hall" id="full_sufficient_dining_hall" />
                                                        <Label htmlFor="full_sufficient_dining_hall">The school has a dining hall with  2 door and 6 windows and  the capacity to host all students at the same time,having a  container of portable water, shelves to store plates and cups, ceiling to prevent noise</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 1. Hand Washing */}
                        {currentIndicator === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of A Space For Hand Washing Facilities(in Toilet, at Gate, in Dinning Hall, Others Places Not Mentioned)</h3>
                                <FormField
                                    control={form.control}
                                    name="handWashing"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("handWashing");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_hand_washing" id="no_hand_washing" />
                                                        <Label htmlFor="no_hand_washing">The school has no Hand washing facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_hand_washing" id="some_hand_washing" />
                                                        <Label htmlFor="some_hand_washing">The school has at least one place For Hand washing facilities </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_hand_washing" id="sufficient_hand_washing" />
                                                        <Label htmlFor="sufficient_hand_washing">The school has   two places For Hand washing facilities but still insufficient (serve up to 50% of students)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_hand_washing" id="more_sufficient_hand_washing" />
                                                        <Label htmlFor="more_sufficient_hand_washing">The school has two or more places For Hand washing facilities but still insufficient (serve up to 75%of students )</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_hand_washing" id="full_sufficient_hand_washing" />
                                                        <Label htmlFor="full_sufficient_hand_washing">The school has the hand washing facilities in every critical part (toilet,gate,dinning hall, others places not mentioned) and serve all students at the school</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 2. Cooking Space */}
                        {currentIndicator === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of A Kitchen (With Modern Cooking Stove, Means Allowing To Keep Clean Water,Tiling For Kitchen)</h3>
                                <FormField
                                    control={form.control}
                                    name="cookingSpace"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("cookingSpace");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_cooking_space" id="no_cooking_space" />
                                                        <Label htmlFor="no_cooking_space">There is no Kitchen at the school</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_cooking_self_adapted" id="some_cooking_self_adapted" />
                                                        <Label htmlFor="some_cooking_self_adapted">Kitchen is  a self adapted and has no cooking stove</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_cooking_space" id="sufficient_cooking_space" />
                                                        <Label htmlFor="sufficient_cooking_space">The school has a Kitchen with Modern Cooking Stove</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_cooking_space" id="more_sufficient_cooking_space" />
                                                        <Label htmlFor="more_sufficient_cooking_space">There is a Kitchen with Modern Cooking Stove with the capacity to serve all students at the same time (not cooking in shift)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_cooking_space" id="full_sufficient_cooking_space" />
                                                        <Label htmlFor="full_sufficient_cooking_space">The school has a Kitchen with Modern Cooking Stove, Means to Keep Clean Water and Tiling inside the  Kitchen</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 3. Playground */}
                        {currentIndicator === 3 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of A Playground For Different Games And Sports Which Can Accommodate students And Staff</h3>
                                <FormField
                                    control={form.control}
                                    name="playground"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("playground");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_playground" id="no_playground" />
                                                        <Label htmlFor="no_playground">The school has no  Playground</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_playground" id="some_playground" />
                                                        <Label htmlFor="some_playground">The school has one   Playground</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_playground" id="sufficient_playground" />
                                                        <Label htmlFor="sufficient_playground">The school has  two operational Playground For Different Games And Sports Which Can Accommodate students And Staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_playground" id="more_sufficient_playground" />
                                                        <Label htmlFor="more_sufficient_playground">The school has three operational Playground For Different Games And Sports Which Can Accommodate students And Staff</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_playground" id="full_sufficient_playground" />
                                                        <Label htmlFor="full_sufficient_playground">The school has four  or more operational Playground For Different Games And Sports Which Can Accommodate students And Staff</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 4. Rain Water Harvesting */}
                        {currentIndicator === 4 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">5. Availability Of  Water Tanks for rainwater harvesting system</h3>
                                <FormField
                                    control={form.control}
                                    name="rainWaterHarvesting"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("rainWaterHarvesting");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_rain_water_harvesting" id="no_rain_water_harvesting" />
                                                        <Label htmlFor="no_rain_water_harvesting">The school has no  Rain Water Havesting System facilities</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_rain_water_harvesting" id="some_rain_water_harvesting" />
                                                        <Label htmlFor="some_rain_water_harvesting">Only Up to 25% of the school buildings have  the  Rain Water Havesting System</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_rain_water_harvesting" id="sufficient_rain_water_harvesting" />
                                                        <Label htmlFor="sufficient_rain_water_harvesting">only Up to 50% of the school buildings have  the  Rain Water Havesting System</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_rain_water_harvesting" id="more_sufficient_rain_water_harvesting" />
                                                        <Label htmlFor="more_sufficient_rain_water_harvesting">only Up to 75% of the school buildings have  the  Rain Water Havesting System  </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_rain_water_harvesting" id="full_sufficient_rain_water_harvesting" />
                                                        <Label htmlFor="full_sufficient_rain_water_harvesting"> 75 to 100 % of the school buildings have  the  Rain Water Havesting System  </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 5. Dormitory */}
                        {currentIndicator === 5 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">6. Availability Of A Dormitory Constructed (With Authorized Construction Materials, Toilets And Bathroom In The Same Building, A Mosquito Net For Each Trainee,Tiling For Toilets & Bathroom For Dormitory)</h3>
                                <FormField
                                    control={form.control}
                                    name="dormitory"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("dormitory");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_dormitory" id="some_dormitory" />
                                                        <Label htmlFor="some_dormitory">The dormitory is available Constructed  and accommodate up to 50% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_dormitory" id="sufficient_dormitory" />
                                                        <Label htmlFor="sufficient_dormitory">The school has dormitories that are  Constructed With Authorized Construction Materials (burnt bricks,tubes,ects),Toilets And Bathroom and can host up to 90% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_dormitory" id="full_sufficient_dormitory" />
                                                        <Label htmlFor="full_sufficient_dormitory">The school has dormitories that are  Constructed With Authorized Construction Materials,Toilets And Bathroom In The Same Building,A Mosquito Net For Each Trainee,Tiling For Toilets And Bathroom For Dormitory) and have a capacity to host all students</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 6. Disability Access */}
                        {currentIndicator === 6 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">7. Availability Of Pathway For The People With Disability</h3>
                                <FormField
                                    control={form.control}
                                    name="disabilityAccess"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("disabilityAccess");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_disability_access" id="no_disability_access" />
                                                        <Label htmlFor="no_disability_access">There are no Pathway For The People With Disability</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="available_disability_access" id="available_disability_access" />
                                                        <Label htmlFor="available_disability_access">Pathway For The People With Disability are partly available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_disability_access" id="more_disability_access" />
                                                        <Label htmlFor="more_disability_access">Pathway For The People With Disability are fully  available within in the school premises.</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_disability_access" id="half_disability_access" />
                                                        <Label htmlFor="half_disability_access">Pathway For The People With Disability are available and half covered in school premises</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_disability_access" id="full_disability_access" />
                                                        <Label htmlFor="full_disability_access">Pathway For The People With Disability are available within in the school premises and fully covered </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 7. Girl Room */}
                        {currentIndicator === 7 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">8. Availability Of a Special Room For Female Learners (Girl's room)</h3>
                                <FormField
                                    control={form.control}
                                    name="girlRoom"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("girlRoom");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_girl_room" id="no_girl_room" />
                                                        <Label htmlFor="no_girl_room">The school has no Special Room For Female Learners</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_girl_room" id="some_girl_room" />
                                                        <Label htmlFor="some_girl_room">The school has a self adapted  Room For Female Learners and there are no required materials</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_girl_room" id="sufficient_girl_room" />
                                                        <Label htmlFor="sufficient_girl_room">The school has a Special Room For Female Learners with essential materials to be used</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_girl_room" id="more_sufficient_girl_room" />
                                                        <Label htmlFor="more_sufficient_girl_room">The school has a Special Room For Female Learners, with essential materials to be used and  having bathroom  inside</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_girl_room" id="full_sufficient_girl_room" />
                                                        <Label htmlFor="full_sufficient_girl_room">The school has a Special Room For Female Learners, with with essential materials to be used and   having bathroom and toilet inside</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 8. Drinking Water */}
                        {currentIndicator === 8 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">9. Availability Of Clean Drinking Water</h3>
                                <FormField
                                    control={form.control}
                                    name="drinkingWater"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("drinkingWater");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_drinking_water" id="no_drinking_water" />
                                                        <Label htmlFor="no_drinking_water">The school has no Clean Drinking Water</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_drinking_water" id="some_drinking_water" />
                                                        <Label htmlFor="some_drinking_water">Tape water is available and drunk with out boiling </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_drinking_water" id="sufficient_drinking_water" />
                                                        <Label htmlFor="sufficient_drinking_water">Tape water is available, boiled and kept   in Jericans</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_drinking_water" id="more_sufficient_drinking_water" />
                                                        <Label htmlFor="more_sufficient_drinking_water">The school has a filtering system (smart tank) for Clean Drinking Water </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="full_sufficient_drinking_water" id="full_sufficient_drinking_water" />
                                                        <Label htmlFor="full_sufficient_drinking_water">The school has a filtering system (smart tank) for Clean Drinking Water with enough clean cups</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 9. Greening */}
                        {currentIndicator === 9 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">10. Availability Of A Garden And Trees In The School Yard (Greening)</h3>
                                <FormField
                                    control={form.control}
                                    name="greening"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("greening");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_greening" id="no_greening" />
                                                        <Label htmlFor="no_greening">The school has no garden  And Trees In The School Yard</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_greening" id="some_greening" />
                                                        <Label htmlFor="some_greening">The school is partly gardened </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_greening" id="sufficient_greening" />
                                                        <Label htmlFor="sufficient_greening">The school is completely  green and has  a Well mentained Garden </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 10. Basic Cleaness */}
                        {currentIndicator === 10 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">11. Availability Of Basic Cleaness in key places  (Toilet, Classroom, Kitchen, Dormitory, Dinning (Absence Of Bushes And Pools Of Water)</h3>
                                <FormField
                                    control={form.control}
                                    name="basicCleaness"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("basicCleaness");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_basic_cleaness" id="no_basic_cleaness" />
                                                        <Label htmlFor="no_basic_cleaness">No cleaness is found in all corners of the  school</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_basic_cleaness" id="some_basic_cleaness" />
                                                        <Label htmlFor="some_basic_cleaness">The school is partly clean</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_basic_cleaness" id="sufficient_basic_cleaness" />
                                                        <Label htmlFor="sufficient_basic_cleaness">All  key parts of the school  are  clean with Absence Of Bushes And Pools Of Water</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 11. Waste Management */}
                        {currentIndicator === 11 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">12. Availability Of Waste  Management Facilities (composting, land filling)</h3>
                                <FormField
                                    control={form.control}
                                    name="wasteManagement"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("wasteManagement");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_waste_management" id="no_waste_management" />
                                                        <Label htmlFor="no_waste_management">There are no facilities for the management (disposal) of degradable and non degradable waste</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_waste_management" id="some_waste_management" />
                                                        <Label htmlFor="some_waste_management">The school has  facilities for the management (disposal) of waste but degradable and non degradable waste are mised </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="sufficient_waste_management" id="sufficient_waste_management" />
                                                        <Label htmlFor="sufficient_waste_management">The school has  facilities for separate disposal of degradable and non degradable waste which are not  covered  </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_sufficient_waste_management" id="more_sufficient_waste_management" />
                                                        <Label htmlFor="more_sufficient_waste_management">The school has  facilities for separate disposal of degradable and non degradable waste and are covered </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {/* 12. Multi-Purpose Hall */}
                        {currentIndicator === 12 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">13. Availability Of A Multi-Purpose Hall   (For boarding schools)</h3>
                                <FormField
                                    control={form.control}
                                    name="multiPurposeHall"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("multiPurposeHall");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_hall" id="no_hall" />
                                                        <Label htmlFor="no_hall">There is No Multi-purpose Hall </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_hall" id="half_hall" />
                                                        <Label htmlFor="half_hall">The school has Multi-purpose Hall  with a capacity to host up to 50% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_hall" id="most_hall" />
                                                        <Label htmlFor="most_hall">The school has Multi-purpose Hall  with a capacity to host up to 75% of students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_hall" id="all_hall" />
                                                        <Label htmlFor="all_hall">The school has Multi-purpose Hall  with a capacity to host all students</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="more_hall" id="more_hall" />
                                                        <Label htmlFor="more_hall">The school has Multi-purpose Hall  with a capacity to host all students and toilet inside and changing room</Label>
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
            case 'safety':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of At Least A Valid Fire Extinguisher </h3>
                                <FormField
                                    control={form.control}
                                    name="fireExtinguisher"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("fireExtinguisher");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_extinguisher" id="no_extinguisher" />
                                                        <Label htmlFor="no_extinguisher">The school has No (Valid)  Fire Extinguisher at all</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_extinguishers" id="few_extinguishers" />
                                                        <Label htmlFor="few_extinguishers">1-25% of Buildings have Valid Fire Extinguisher</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_extinguishers" id="some_extinguishers" />
                                                        <Label htmlFor="some_extinguishers">26-50% of Buildings have Valid Fire Extinguisher</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_extinguishers" id="most_extinguishers" />
                                                        <Label htmlFor="most_extinguishers">51-75% of Buildings have Valid Fire Extinguisher</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_extinguishers" id="all_extinguishers" />
                                                        <Label htmlFor="all_extinguishers">All  (or 76-100% of)  Buildings have Valid Fire Extinguisher</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2.Availability Of At Least A Lightening Arrestor </h3>
                                <FormField
                                    control={form.control}
                                    name="lightningArrestor"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("lightningArrestor");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_arrestor" id="no_arrestor" />
                                                        <Label htmlFor="no_arrestor">The school has no Lightening Arrestor</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_arrestors" id="few_arrestors" />
                                                        <Label htmlFor="few_arrestors">At least Lightening Arrestors covering 0-25% school surface is available </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_arrestors" id="some_arrestors" />
                                                        <Label htmlFor="some_arrestors">At least Lightening Arrestors covering 25-50% school surface is available </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_arrestors" id="most_arrestors" />
                                                        <Label htmlFor="most_arrestors">At least Lightening Arrestors covering 50-75% school surface is available </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_arrestors" id="all_arrestors" />
                                                        <Label htmlFor="all_arrestors">At least Lightening Arrestors covering 100% school surface is available </Label>
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
                                <h3 className="text-lg font-semibold mb-4">3.Availability Of A Fence Built In Accordance With The Norms Of Construction Which Guarantee The Security Of Learners And The School Property</h3>
                                <FormField
                                    control={form.control}
                                    name="fencing"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("fencing");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_fence" id="no_fence" />
                                                        <Label htmlFor="no_fence">The school is not fenced</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_fence" id="half_fence" />
                                                        <Label htmlFor="half_fence">Half  Fenced</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_fence" id="most_fence" />
                                                        <Label htmlFor="most_fence">51%-75% of school is fenced with durable  materialse</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_fence" id="all_fence" />
                                                        <Label htmlFor="all_fence">All parts of the  school (or 76-100% of) are  fenced with required materials</Label>
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
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of At Least An External Lighting In All Buildings </h3>
                                <FormField
                                    control={form.control}
                                    name="externalLighting"
                                    render={({ field }) => (
                                        <FormItem>
                                            {form.formState.errors[field.name] && (
                                                <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                            )}
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        form.trigger("externalLighting");
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="no_lighting" id="no_lighting" />
                                                        <Label htmlFor="no_lighting">No External Lighting In All Buildings</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_lighting" id="few_lighting" />
                                                        <Label htmlFor="few_lighting">up to 25% building have External Lighting</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_lighting" id="some_lighting" />
                                                        <Label htmlFor="some_lighting">26-50% building have External Lighting</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_lighting" id="most_lighting" />
                                                        <Label htmlFor="most_lighting">51-75% building have External Lighting</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_lighting" id="all_lighting" />
                                                        <Label htmlFor="all_lighting">76-100% building have External Lighting</Label>
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
                            {(selectedCriteria === 'toilets' || selectedCriteria === 'admin' || selectedCriteria === 'welfare' || selectedCriteria === 'safety') && (
                                <div className="mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent min-h-auto">
                                    <div
                                        className={`flex  items-center gap-4 p-4 bg-white rounded-lg cursor-pointer
                                        ${selectedCriteria === 'toilets' ? 'ring-2 ring-blue-500 m-2' : ''}
                                        ${selectedCriteria === 'admin' ? 'ring-2 ring-blue-500 m-2' : ''}
                                        ${selectedCriteria === 'welfare' ? 'ring-2 ring-blue-500 m-2' : ''}
                                        ${selectedCriteria === 'safety' ? 'ring-2 ring-blue-500 m-2' : ''}`}
                                    >
                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold     
                                        ${selectedCriteria === 'toilets' ? 'bg-blue-500' : ''}
                                        ${selectedCriteria === 'admin' ? 'bg-blue-500' : ''}
                                        ${selectedCriteria === 'welfare' ? 'bg-blue-500' : ''}
                                        ${selectedCriteria === 'safety' ? 'bg-blue-500' : ''}`}>
                                            {selectedCriteria === 'toilets' ? form.formState.errors.toilets ? <Toilet className="h-4 w-4" /> : <Toilet className="h-4 w-4" /> :
                                                selectedCriteria === 'admin' ? <Building2 className="h-4 w-4" /> :
                                                    form.formState.errors.welfare ? <Shield className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <h2 className="text-base font-medium">
                                                {selectedCriteria === 'toilets' ? 'Toilets' :
                                                    selectedCriteria === 'admin' ? 'Administrative Offices' :
                                                        selectedCriteria === 'safety' ? 'Safety' :
                                                            'Welfare'}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {`${currentIndicator + 1} of ${selectedCriteria === 'toilets' ? '2' :
                                                    selectedCriteria === 'admin' ? '4' :
                                                        selectedCriteria === 'safety' ? '4' :
                                                            '13'} indicators`}
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
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg ${isCriteriaAccessible('smartClassroom') ? 'cursor-pointer hover:bg-gray-50' : 'opacity-60 cursor-not-allowed'} 
                                    ${selectedCriteria === 'smartClassroom' ? 'ring-2 ring-blue-500' : ''} ${form.formState.errors.smartClassroom || form.formState.errors.computerLabComputers || form.formState.errors.computerLabSize ? 'ring-2 ring-red-400' : ''}`}
                                    onClick={() => {
                                        if (isCriteriaAccessible('smartClassroom')) {
                                            setSelectedCriteria('smartClassroom');
                                            setCurrentIndicator(0);
                                        }
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'smartClassroom' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold ${form.formState.errors.smartClassroom || form.formState.errors.computerLabComputers || form.formState.errors.computerLabSize ? 'bg-red-400 text-white' : ''}`}
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
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg ${isCriteriaAccessible('workshops') ? 'cursor-pointer hover:bg-gray-50' : 'opacity-60 cursor-not-allowed'} 
                                    ${selectedCriteria === 'workshops' ? 'ring-2 ring-blue-500' : ''} ${form.formState.errors.workshops || form.formState.errors.toolsStore || form.formState.errors.library || form.formState.errors.workshopElectricity ? 'ring-2 ring-red-400' : ''}`}
                                    onClick={() => {
                                        if (isCriteriaAccessible('workshops')) {
                                            setSelectedCriteria('workshops');
                                            setCurrentIndicator(0);
                                        }
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