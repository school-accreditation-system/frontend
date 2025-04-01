'use client';

import { useForm } from 'react-hook-form';
import { ChevronRight, ChevronLeft, PenTool, ChartBarIcon, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { zodResolver, z } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { teachingResourcesSchema, type TeachingResourcesFormData } from '../types/schema';

interface TeachingResourcesFormProps {
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
    strategicPlan: string;
    annualActionPlan: string;
    annualBudgetPlan: string;
    registrationDocuments: string;
    landOwnership: string;
    materialsToolsEquipment: string;
    approvedCurriculum: string;
    readingMaterials: string;
    projectors: string;
    desks: string;
    teacherChairs: string;
    teacherTables: string;
    shelves: string;
    dustbins: string;
    sufficientTeachers: string;
    qualifiedTeachers: string;
    adminStaffQualification: string;
    adminStaffAvailability: string;
    staffFiles: string;
}

export function TeachingResourcesForm({
    formData: parentFormData,
    updateFormData,
    errors,
    currentStep,
    isSubmitting,
    onPrevious,
    onNext,
    onSubmit,
    totalSteps
}: TeachingResourcesFormProps) {
    const form = useForm<z.infer<typeof teachingResourcesSchema>>({
        resolver: zodResolver(teachingResourcesSchema),
        mode: 'onChange',
        defaultValues: {
            // Equipment Tools and Materials
            equipmentAvailability: parentFormData.equipmentAvailability || undefined,
            toolsCondition: parentFormData.toolsCondition || undefined,
            materialsStock: parentFormData.materialsStock || undefined,
            maintenanceSystem: parentFormData.maintenanceSystem || undefined,

            // Furniture
            studentDesks: parentFormData.studentDesks || undefined,
            teacherFurniture: parentFormData.teacherFurniture || undefined,
            storageFurniture: parentFormData.storageFurniture || undefined,
            laboratoryFurniture: parentFormData.laboratoryFurniture || undefined,
            libraryFurniture: parentFormData.libraryFurniture || undefined,

            // Teaching & Administrative Staff
            sufficientTeachers: parentFormData.sufficientTeachers || undefined,
            qualifiedTeachers: parentFormData.qualifiedTeachers || undefined,
            adminStaffQualification: parentFormData.adminStaffQualification || undefined,
            adminStaffAvailability: parentFormData.adminStaffAvailability || undefined,
            staffFiles: parentFormData.staffFiles || undefined,
        }
    });

    const formData = form.watch();

    // Add states for criteria and indicator navigation
    const [selectedCriteria, setSelectedCriteria] = useState<string>('equipment');
    const [currentIndicator, setCurrentIndicator] = useState<number>(0);

    // Helper function to get the current field name based on criteria and indicator
    const getCurrentFieldName = () => {
        switch (selectedCriteria) {
            case 'equipment':
                switch (currentIndicator) {
                    case 0: return 'materialsToolsEquipment';
                    case 1: return 'approvedCurriculum';
                    case 2: return 'readingMaterials';
                    case 3: return 'projectors';
                }
                break;
            case 'furniture':
                switch (currentIndicator) {
                    case 0: return 'desks';
                    case 1: return 'teacherChairs';
                    case 2: return 'teacherTables';
                    case 3: return 'laboratoryFurniture';
                    case 4: return 'libraryFurniture';
                }
                break;
            case 'staff':
                switch (currentIndicator) {
                    case 0: return 'sufficientTeachers';
                    case 1: return 'qualifiedTeachers';
                    case 2: return 'adminStaffQualification';
                    case 3: return 'adminStaffAvailability';
                    case 4: return 'staffFiles';
                }
                break;
            default:
                return null;
        }
    }

    // Helper to get indicator count for a criteria
    const getIndicatorCountForCriteria = (criteria = selectedCriteria) => {
        switch (criteria) {
            case 'equipment':
                return 4;
            case 'furniture':
                return 3;
            case 'staff':
                return 5;
            default:
                return 0;
        }
    };

    // Helper function to get the number of indicators for current criteria
    const getIndicatorCount = (criteria: string): number => {
        switch (criteria) {
            case 'equipment':
                return 4;
            case 'furniture':
                return 5;
            case 'staff':
                return 5;
            default:
                return 0;
        }
    };

    const isLastCriteriaGroup = () => {
        const criteriaGroups = ['equipment', 'furniture', 'staff'];
        return criteriaGroups.indexOf(selectedCriteria) === criteriaGroups.length - 1;
    };

    const getNextCriteriaGroup = () => {
        const criteriaGroups = ['equipment', 'furniture', 'staff'];
        const currentIndex = criteriaGroups.indexOf(selectedCriteria);
        return criteriaGroups[currentIndex + 1] || criteriaGroups[0];
    };

    // Helper function to get next criteria
    const getNextCriteria = (current: string): string | null => {
        switch (current) {
            case 'equipment':
                return 'furniture';
            case 'furniture':
                return 'staff';
            case 'staff':
                return null;
            default:
                return 'equipment';
        }
    };

    // Helper function to get previous criteria
    const getPreviousCriteria = (current: string): string | null => {
        switch (current) {
            case 'staff':
                return 'furniture';
            case 'furniture':
                return 'equipment';
            case 'equipment':
                return null;
            default:
                return null;
        }
    };

    const hasPreviousCriteria = (currentCriteriaIndex: number) => {
        return currentCriteriaIndex > 0;
    };

    // handleNextButtonClick function
    const handleNextButtonClick = async () => {
        console.log("handleNextButtonClick");
        const currentFieldName = getCurrentFieldName();

        if (!currentFieldName) {
            console.error('No field name found for current criteria and indicator');
            return;
        }

        const isValid = await form.trigger(currentFieldName, { shouldFocus: true });
        console.log("isValid", isValid);
        if (isValid) {
            if (currentIndicator === getIndicatorCountForCriteria() - 1) {
                if (isLastCriteriaGroup()) {
                    updateFormData(form.getValues());
                    console.log("form.getValues()", form.getValues());
                    onNext();
                } else {
                    setSelectedCriteria(getNextCriteriaGroup());
                    setCurrentIndicator(0);
                }
            } else {
                setCurrentIndicator(prev => prev + 1);
            }
        } else {
            console.log("isValid", isValid);
        }
    }

    // handlePreviousButtonClick function
    const handlePrevious = () => {
        if (currentIndicator > 0) {
            setCurrentIndicator(currentIndicator - 1);
        } else {
            const prevCriteria = getPreviousCriteria(selectedCriteria);
            if (prevCriteria) {
                setSelectedCriteria(prevCriteria);
                setCurrentIndicator(getIndicatorCount(prevCriteria) - 1);
            } else {
                onPrevious();
                setSelectedCriteria('equipment');
                setCurrentIndicator(0);
            }
        }
    }

    // Helper function to check if a criteria is completed
    const isCriteriaCompleted = (criteria: string): boolean => {
        switch (criteria) {
            case 'equipment':
                return Boolean(formData.equipmentAvailability && formData.toolsCondition &&
                    formData.materialsStock && formData.maintenanceSystem);
            case 'furniture':
                return Boolean(formData.studentDesks && formData.teacherFurniture &&
                    formData.storageFurniture);
            case 'staff':
                return Boolean(formData.sufficientTeachers && formData.qualifiedTeachers &&
                    formData.adminStaff && formData.supportStaff);
            default:
                return false;
        }
    };

    const onSubmitForm = (data: FormData) => {
        onSubmit(data);
    };

    const renderIndicators = () => {
        switch (selectedCriteria) {
            case 'equipment':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability of Materials, Tools and Equipment</h3>
                                <FormField
                                    control={form.control}
                                    name="materialsToolsEquipment"
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
                                                        <RadioGroupItem value="no_tools" id="no_tools" />
                                                        <Label htmlFor="no_tools">No Tools and Equipment, materials are available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_tools" id="few_tools" />
                                                        <Label htmlFor="few_tools">The Available Tools and Equipment or materials correspond to up to 25% of the required</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_tools" id="some_tools" />
                                                        <Label htmlFor="some_tools">The school has up to 50% of the required Tools and Equipment or materials</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_tools" id="most_tools" />
                                                        <Label htmlFor="most_tools">The school has up to 75% of the required Tools and Equipment or materials</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_tools" id="all_tools" />
                                                        <Label htmlFor="all_tools">The school has up to 76 to 100% of the required Tools and Equipment or materials</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability of Approved Curriculum</h3>
                                <FormField
                                    control={form.control}
                                    name="approvedCurriculum"
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
                                                        <RadioGroupItem value="no_curriculum" id="no_curriculum" />
                                                        <Label htmlFor="no_curriculum">The school has no approved national curriculum or has no licence for international curriculum</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="approved_curriculum" id="approved_curriculum" />
                                                        <Label htmlFor="approved_curriculum">The school has an approved national curriculum or has licence for international curriculum</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3. Availability of Students Textbooks and Reading Materials</h3>
                                <FormField
                                    control={form.control}
                                    name="readingMaterials"
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
                                                        <RadioGroupItem value="no_reading_materials" id="no_reading_materials" />
                                                        <Label htmlFor="no_reading_materials">No Reading Material, such as book and/or e-resource</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_reading_materials" id="few_reading_materials" />
                                                        <Label htmlFor="few_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by approximately 1%-25% of students on average for every trade</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_reading_materials" id="some_reading_materials" />
                                                        <Label htmlFor="some_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by approximately 26%-50% of students on average for every trade</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_reading_materials" id="most_reading_materials" />
                                                        <Label htmlFor="most_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by approximately 51%-75% of students on average for every trade</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_reading_materials" id="all_reading_materials" />
                                                        <Label htmlFor="all_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by approximately 76%-100% of students on average for every trade</Label>
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
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of A Projector In Each Level</h3>
                                <FormField
                                    control={form.control}
                                    name="projectors"
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
                                                        <RadioGroupItem value="no_projector" id="no_projector" />
                                                        <Label htmlFor="no_projector">The school has no projector</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_projectors" id="few_projectors" />
                                                        <Label htmlFor="few_projectors">Approximately 1-25% of projectors are available in each level</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_projectors" id="some_projectors" />
                                                        <Label htmlFor="some_projectors">Approximately 26-50% of projectors are available in each level</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_projectors" id="most_projectors" />
                                                        <Label htmlFor="most_projectors">Approximately 51-75% of projectors are available in each level</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_projectors" id="all_projectors" />
                                                        <Label htmlFor="all_projectors">Approximately 76-100% of projectors are available in each level</Label>
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

            case 'furniture':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability Of One Desk Per Two students (Seat And Table )</h3>
                                <FormField
                                    control={form.control}
                                    name="desks"
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
                                                        <RadioGroupItem value="no_desks" id="no_desks" />
                                                        <Label htmlFor="no_desks">
                                                            Each desk is shared by more  than two students </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_desks" id="few_desks" />
                                                        <Label htmlFor="few_desks">Only up to 25% of desks are occupied by 2 students maximum</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="shared_desks" id="shared_desks" />
                                                        <Label htmlFor="shared_desks">Only 26%-50% of desks are occupied by 2 students maximum</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_desks" id="most_desks" />
                                                        <Label htmlFor="most_desks">Only 51%-75% of desks are occupied by 2 students maximum</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_desks" id="all_desks" />
                                                        <Label htmlFor="all_desks">Approximately 76%-100% of desks are occupied by 2 students maximum</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of One Chair For teacher In Each Classroom</h3>
                                <FormField
                                    control={form.control}
                                    name="teacherChairs"
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
                                                        <RadioGroupItem value="no_teacher_chair" id="no_teacher_chair" />
                                                        <Label htmlFor="no_teacher_chair">No classroom has teacher's chair</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_teacher_chairs" id="few_teacher_chairs" />
                                                        <Label htmlFor="few_teacher_chairs">Approximately up to 25% classrooms have teacher's chair</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="partial_teacher_chairs" id="partial_teacher_chairs" />
                                                        <Label htmlFor="partial_teacher_chairs">Approximately 25%-50% classrooms have teacher's chair</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_teacher_chairs" id="most_teacher_chairs" />
                                                        <Label htmlFor="most_teacher_chairs">Approximately to 51%-75% classrooms have teacher's chair</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_teacher_chairs" id="all_teacher_chairs" />
                                                        <Label htmlFor="all_teacher_chairs">Approximately to 76%-100% classrooms have teacher's chair</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3. Availability Of One Table For teacher In Each Classroom</h3>
                                <FormField
                                    control={form.control}
                                    name="teacherTables"
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
                                                        <RadioGroupItem value="no_teacher_table" id="no_teacher_table" />
                                                        <Label htmlFor="no_teacher_table">No classroom has teacher's table</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_teacher_tables" id="few_teacher_tables" />
                                                        <Label htmlFor="few_teacher_tables">Approximately up to 25% classrooms have teacher's table)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="partial_teacher_tables" id="partial_teacher_tables" />
                                                        <Label htmlFor="partial_teacher_tables">Approximately 25%-50% classrooms have teacher's table</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_teacher_tables" id="most_teacher_tables" />
                                                        <Label htmlFor="most_teacher_tables">Approximately 51%-75% classrooms have teacher's table</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_teacher_tables" id="all_teacher_tables" />
                                                        <Label htmlFor="all_teacher_tables">Approximately 76%-100% classrooms have teacher's table</Label>
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
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of Shelves To Store Materials In Each Classroom</h3>
                                <FormField
                                    control={form.control}
                                    name="shelves"
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
                                                        <RadioGroupItem value="no_shelves" id="no_shelves" />
                                                        <Label htmlFor="no_shelves">when all classrooms do not have shelves</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_shelves" id="few_shelves" />
                                                        <Label htmlFor="few_shelves">Approximately up to 25% classrooms have shelves</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="partial_shelves" id="partial_shelves" />
                                                        <Label htmlFor="partial_shelves">Approximately 25%-50% classrooms have shelves</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_shelves" id="most_shelves" />
                                                        <Label htmlFor="most_shelves">Approximately 51%-75% classrooms have shelves</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_shelves" id="all_shelves" />
                                                        <Label htmlFor="all_shelves">Approximately 76%-100% classrooms have shelves</Label>
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
                                <h3 className="text-lg font-semibold mb-4">5. Availability Of Dustbin In Each Classroom And Workshop/laboratory/library</h3>
                                <FormField
                                    control={form.control}
                                    name="dustbins"
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
                                                        <RadioGroupItem value="no_dustbins" id="no_dustbins" />
                                                        <Label htmlFor="no_dustbins">When no dustbin is available in all classroom and workshop</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_dustbins" id="few_dustbins" />
                                                        <Label htmlFor="few_dustbins">Approximately up to 25% classrooms and workshops have dustbin</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="partial_dustbins" id="partial_dustbins" />
                                                        <Label htmlFor="partial_dustbins">Approximately 25%-50% classrooms and workshops have dustbin</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_dustbins" id="most_dustbins" />
                                                        <Label htmlFor="most_dustbins">Approximately 51%-75% classrooms and workshops have dustbin</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_dustbins" id="all_dustbins" />
                                                        <Label htmlFor="all_dustbins">Approximately 76%-100% classrooms and workshops have dustbin</Label>
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

            case 'staff':
                return (
                    <Card className="p-6">
                        {currentIndicator === 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-4">1. Availability of Sufficient Teachers</h3>
                                <FormField
                                    control={form.control}
                                    name="sufficientTeachers"
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
                                                        <RadioGroupItem value="insufficient" id="insufficient" />
                                                        <Label htmlFor="insufficient">The school lacks 50% of the required teachers</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_teachers" id="most_teachers" />
                                                        <Label htmlFor="most_teachers">The school has up to 80% of the required teachers</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_teachers" id="all_teachers" />
                                                        <Label htmlFor="all_teachers">The school has all required teachers</Label>
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
                                <h3 className="text-lg font-semibold mb-4">2. Availability Of Qualified Teachers</h3>
                                <FormField
                                    control={form.control}
                                    name="qualifiedTeachers"
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
                                                        <RadioGroupItem value="no_qualified_teachers" id="no_qualified_teachers" />
                                                        <Label htmlFor="no_qualified_teachers">All teachers have no teaching qualification or no certified training</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_qualified_teachers" id="few_qualified_teachers" />
                                                        <Label htmlFor="few_qualified_teachers">Up to 25% of the teachers have teaching qualification or certified training</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="some_qualified_teachers" id="some_qualified_teachers" />
                                                        <Label htmlFor="some_qualified_teachers">Only Up to 50% of the teachers have teaching qualification or certified training</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_qualified_teachers" id="most_qualified_teachers" />
                                                        <Label htmlFor="most_qualified_teachers">Only Up to 75% of the teachers have teaching qualification or certified training</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_qualified_teachers" id="all_qualified_teachers" />
                                                        <Label htmlFor="all_qualified_teachers">Approximately 76%-100% of teachers meeting qualifications required by teacher Profile</Label>
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
                                <h3 className="text-lg font-semibold mb-4">3.Availability Of administrative staff With Relevant Qualification </h3>
                                <FormField
                                    control={form.control}
                                    name="adminStaffQualification"
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
                                                        <RadioGroupItem value="irrelevant_qualification" id="irrelevant_qualification" />
                                                        <Label htmlFor="irrelevant_qualification">All administrative staff have irrelevant qualification</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="quarter_relevant" id="quarter_relevant" />
                                                        <Label htmlFor="quarter_relevant">Up to 25% of the administrative staff have relevant qualification</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_relevant" id="half_relevant" />
                                                        <Label htmlFor="half_relevant">Up to 50% of the administrative staff have relevant qualification</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="three_quarter_relevant" id="three_quarter_relevant" />
                                                        <Label htmlFor="three_quarter_relevant">Approximately 75% of the administrative staff have relevant qualification</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_relevant" id="all_relevant" />
                                                        <Label htmlFor="all_relevant">All the administrative staff have relevant qualification</Label>
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
                                <h3 className="text-lg font-semibold mb-4">4. Availability Of All Administrative Staff According To Organisational Structure (School Head Teacher, Deputy Head Teacher In Charge Of Training And Deputy Head Teacher In Charge Of Discipline, Bursar/Accountant and Secretary )</h3>
                                <FormField
                                    control={form.control}
                                    name="adminStaffAvailability"
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
                                                        <RadioGroupItem value="no_admin_staff" id="no_admin_staff" />
                                                        <Label htmlFor="no_admin">No administrative staff is available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_admin_staff" id="quarter_admin" />
                                                        <Label htmlFor="quarter_admin">Approximately up to 25% of administrative staff are available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_admin_staff" id="half_admin_staff" />
                                                        <Label htmlFor="half_admin_staff">Approximately 26-50% of administrative staff are available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_admin_staff" id="most_admin_staff" />
                                                        <Label htmlFor="most_admin_staff">Approximately 51-75% of administrative staff are available</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_admin_staff" id="all_admin_staff" />
                                                        <Label htmlFor="all_admin_staff">Approximately 76-100% of administrative staff are available</Label>
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
                                <h3 className="text-lg font-semibold mb-4">5. Availability of complete staff files at school</h3>
                                <FormField
                                    control={form.control}
                                    name="staffFiles"
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
                                                        <RadioGroupItem value="no_staff_files" id="no_staff_files" />
                                                        <Label htmlFor="no_staff_files">No staff has a complete file</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="few_staff_files" id="few_staff_files" />
                                                        <Label htmlFor="few_staff_files">Approximately up to 25% of staff have a complete file</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="half_staff_files" id="half_staff_files" />
                                                        <Label htmlFor="half_staff_files">Approximately up to 50% of staff have a complete file</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="most_staff_files" id="most_staff_files" />
                                                        <Label htmlFor="most_staff_files">Approximately 51 to 75% of staff have a complete file</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="all_staff_files" id="all_staff_files" />
                                                        <Label htmlFor="all_staff_files">Approximately 76-100% of staff have a complete file</Label>
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
                            {/* Main Visible Criteria */}
                            <div className="space-y-4">
                                {/* Equipment Tools and Materials */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'equipment' ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('equipment');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'equipment' ? 'bg-blue-500 text-white' :
                                            isCriteriaCompleted('equipment') ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold`}
                                    >
                                        <PenTool className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Equipment & Tools</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'equipment' ? `${currentIndicator + 1} of 4 indicators` : '4 indicators'}
                                        </p>
                                    </div>
                                </div>

                                {/* Furniture */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'furniture' ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('furniture');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'furniture' ? 'bg-blue-500 text-white' :
                                            isCriteriaCompleted('furniture') ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold`}
                                    >
                                        <ChartBarIcon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Furniture</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'furniture' ? `${currentIndicator + 1} of 5 indicators` : '5 indicators'}
                                        </p>
                                    </div>
                                </div>

                                {/* Staff */}
                                <div
                                    className={`flex items-center gap-4 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50 
                                    ${selectedCriteria === 'staff' ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria('staff');
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                                    ${selectedCriteria === 'staff' ? 'bg-blue-500 text-white' :
                                            isCriteriaCompleted('staff') ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'} 
                                    font-semibold`}
                                    >
                                        <Users className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-medium">Teaching & Admin Staff</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedCriteria === 'staff' ? `${currentIndicator + 1} of 5 indicators` : '5 indicators'}
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
                            disabled={currentStep === 0 && selectedCriteria === 'equipment'}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
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