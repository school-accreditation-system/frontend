'use client';

import { useForm } from 'react-hook-form';
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TeachingResourcesFormProps {
    onSubmit: (data: FormData) => void;
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
    },
    materialsToolsEquipment: {
        maxScore: 2,
        values: {
            no_tools: 0,
            few_tools: 0.5,
            some_tools: 1,
            most_tools: 1.5,
            all_tools: 2
        }
    },
    approvedCurriculum: {
        maxScore: 2,
        values: {
            no_curriculum: 0,
            approved_curriculum: 2
        }
    },
    readingMaterials: {
        maxScore: 2,
        values: {
            no_reading_materials: 0,
            few_reading_materials: 0.5,
            some_reading_materials: 1,
            most_reading_materials: 1.5,
            all_reading_materials: 2
        }
    },
    projectors: {
        maxScore: 2,
        values: {
            no_projector: 0,
            few_projectors: 0.5,
            some_projectors: 1,
            most_projectors: 1.5,
            all_projectors: 2
        }
    },
    desks: { maxScore: 0, values: {} },
    teacherChairs: { maxScore: 0, values: {} },
    teacherTables: { maxScore: 0, values: {} },
    shelves: { maxScore: 0, values: {} },
    dustbins: { maxScore: 0, values: {} },
    sufficientTeachers: { maxScore: 0, values: {} },
    qualifiedTeachers: { maxScore: 0, values: {} },
    adminStaffQualification: { maxScore: 0, values: {} },
    adminStaffAvailability: { maxScore: 0, values: {} },
    staffFiles: { maxScore: 0, values: {} },
};

export function TeachingResourcesForm({ onSubmit }: TeachingResourcesFormProps) {
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
            materialsToolsEquipment: '',
            approvedCurriculum: '',
            readingMaterials: '',
            projectors: '',
            desks: '',
            teacherChairs: '',
            teacherTables: '',
            shelves: '',
            dustbins: '',
            sufficientTeachers: '',
            qualifiedTeachers: '',
            adminStaffQualification: '',
            adminStaffAvailability: '',
            staffFiles: '',
        }
    });

    const [isEquipmentOpen, setEquipmentOpen] = useState(true);
    const [isFurnitureOpen, setFurnitureOpen] = useState(true);
    const [isTeachingStaffOpen, setTeachingStaffOpen] = useState(true);
    const [isStrategicPlanOpen, setStrategicPlanOpen] = useState(true);

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

            {/* Equipment, Tools, and Materials Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Equipment, Tools, and Materials</h2>
                    <button
                        type="button"
                        onClick={() => setEquipmentOpen(!isEquipmentOpen)}
                        className="focus:outline-none"
                    >
                        {isEquipmentOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                {isEquipmentOpen && (
                    <>
                        <Card className={`p-6 ${errors.materialsToolsEquipment ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Materials, Tools, and Equipment</Label>
                                    {errors.materialsToolsEquipment && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.materialsToolsEquipment}
                                    onValueChange={(value) => setValue('materialsToolsEquipment', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_tools" id="no_tools" />
                                        <Label htmlFor="no_tools">No Tools and Equipment or science laboratory materials are available</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_tools" id="few_tools" />
                                        <Label htmlFor="few_tools">The Available Tools and Equipment or materials correspond up to 25% of the required</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_tools" id="some_tools" />
                                        <Label htmlFor="some_tools">The school has up to 50% of the required Tools and Equipment or science laboratory materials</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="most_tools" id="most_tools" />
                                        <Label htmlFor="most_tools">The school has up to 75% of the required Tools and Equipment or science laboratory materials</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all_tools" id="all_tools" />
                                        <Label htmlFor="all_tools">The school has up to 76 to 100% of the required Tools and Equipment or science laboratory materials</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.approvedCurriculum ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Approved Curriculum</Label>
                                    {errors.approvedCurriculum && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.approvedCurriculum}
                                    onValueChange={(value) => setValue('approvedCurriculum', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.readingMaterials ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Students Textbooks and Other Reading Materials</Label>
                                    {errors.readingMaterials && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.readingMaterials}
                                    onValueChange={(value) => setValue('readingMaterials', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_reading_materials" id="no_reading_materials" />
                                        <Label htmlFor="no_reading_materials">No Reading Material, such as book and/or e-resource</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_reading_materials" id="few_reading_materials" />
                                        <Label htmlFor="few_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by up to 25% of students</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_reading_materials" id="some_reading_materials" />
                                        <Label htmlFor="some_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by up to 50% of students</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="most_reading_materials" id="most_reading_materials" />
                                        <Label htmlFor="most_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by up to 75% of students</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all_reading_materials" id="all_reading_materials" />
                                        <Label htmlFor="all_reading_materials">Available Reading Materials, such as books and/or e-resources, to be used by 76-100% of students</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.projectors ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of A Projector In Each Level</Label>
                                    {errors.projectors && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.projectors}
                                    onValueChange={(value) => setValue('projectors', value)}
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
                            </div>
                        </Card>
                    </>
                )}
            </div>

            {/* Furniture Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Furniture</h2>
                    <button
                        type="button"
                        onClick={() => setFurnitureOpen(!isFurnitureOpen)}
                        className="focus:outline-none"
                    >
                        {isFurnitureOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                {isFurnitureOpen && (
                    <>
                        <Card className={`p-6 ${errors.desks ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of One Desk Per Two Students</Label>
                                    {errors.desks && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.desks}
                                    onValueChange={(value) => setValue('desks', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="shared_desks" id="shared_desks" />
                                        <Label htmlFor="shared_desks">Each desk is shared by more than two students</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_desks" id="few_desks" />
                                        <Label htmlFor="few_desks">Only up to 25% of desks are occupied by 2 students maximum</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_desks" id="some_desks" />
                                        <Label htmlFor="some_desks">Only 26%-50% of desks are occupied by 2 students maximum</Label>
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.teacherChairs ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of One Chair For Teacher In Each Classroom</Label>
                                    {errors.teacherChairs && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.teacherChairs}
                                    onValueChange={(value) => setValue('teacherChairs', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_teacher_chair" id="no_teacher_chair" />
                                        <Label htmlFor="no_teacher_chair">No classroom has teacher's chair</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_teacher_chairs" id="few_teacher_chairs" />
                                        <Label htmlFor="few_teacher_chairs">Approximately up 25% classrooms have teacher's chair</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_teacher_chairs" id="some_teacher_chairs" />
                                        <Label htmlFor="some_teacher_chairs">Approximately 25%-50% classrooms have teacher's chair</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="most_teacher_chairs" id="most_teacher_chairs" />
                                        <Label htmlFor="most_teacher_chairs">Approximately 51%-75% classrooms have teacher's chair</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all_teacher_chairs" id="all_teacher_chairs" />
                                        <Label htmlFor="all_teacher_chairs">Approximately 76%-100% classrooms have teacher's chair</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.teacherTables ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of One Table For Teacher In Each Classroom</Label>
                                    {errors.teacherTables && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.teacherTables}
                                    onValueChange={(value) => setValue('teacherTables', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_teacher_table" id="no_teacher_table" />
                                        <Label htmlFor="no_teacher_table">No classroom has teacher's table</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_teacher_tables" id="few_teacher_tables" />
                                        <Label htmlFor="few_teacher_tables">Approximately up 25% classrooms have teacher's table</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_teacher_tables" id="some_teacher_tables" />
                                        <Label htmlFor="some_teacher_tables">Approximately 25%-50% classrooms have teacher's table</Label>
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.shelves ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Shelves To Store Materials In Each Classroom</Label>
                                    {errors.shelves && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.shelves}
                                    onValueChange={(value) => setValue('shelves', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_shelves" id="no_shelves" />
                                        <Label htmlFor="no_shelves">When all classrooms do not have shelves</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_shelves" id="few_shelves" />
                                        <Label htmlFor="few_shelves">Approximately up 25% classrooms have shelves</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_shelves" id="some_shelves" />
                                        <Label htmlFor="some_shelves">Approximately 25%-50% classrooms have shelves</Label>
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.dustbins ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Dustbin In Each Classroom And Workshop/Laboratory/Library</Label>
                                    {errors.dustbins && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.dustbins}
                                    onValueChange={(value) => setValue('dustbins', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_dustbins" id="no_dustbins" />
                                        <Label htmlFor="no_dustbins">When no dustbin is available in all classrooms and workshop</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_dustbins" id="few_dustbins" />
                                        <Label htmlFor="few_dustbins">Approximately up 25% classrooms and workshops have dustbin</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_dustbins" id="some_dustbins" />
                                        <Label htmlFor="some_dustbins">Approximately 25%-50% classrooms and workshops have dustbin</Label>
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
                            </div>
                        </Card>
                    </>
                )}
            </div>

            {/* Teaching Staff, Administrative Staff, and Competences Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Teaching Staff, Administrative Staff, and Competences</h2>
                    <button
                        type="button"
                        onClick={() => setTeachingStaffOpen(!isTeachingStaffOpen)}
                        className="focus:outline-none"
                    >
                        {isTeachingStaffOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                {isTeachingStaffOpen && (
                    <>
                        <Card className={`p-6 ${errors.sufficientTeachers ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Sufficient Teachers</Label>
                                    {errors.sufficientTeachers && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.sufficientTeachers}
                                    onValueChange={(value) => setValue('sufficientTeachers', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="lacks_teachers" id="lacks_teachers" />
                                        <Label htmlFor="lacks_teachers">The school lacks 50% of the required teachers</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_teachers" id="some_teachers" />
                                        <Label htmlFor="some_teachers">The school has up 80% of the required teachers</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all_teachers" id="all_teachers" />
                                        <Label htmlFor="all_teachers">The school has all required teachers</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.qualifiedTeachers ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Qualified Teachers</Label>
                                    {errors.qualifiedTeachers && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.qualifiedTeachers}
                                    onValueChange={(value) => setValue('qualifiedTeachers', value)}
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
                                        <Label htmlFor="all_qualified_teachers">Approximately 76%-100% of teachers meeting qualifications required by the school</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.adminStaffQualification ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Administrative Staff With Relevant Qualification</Label>
                                    {errors.adminStaffQualification && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.adminStaffQualification}
                                    onValueChange={(value) => setValue('adminStaffQualification', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_admin_qualification" id="no_admin_qualification" />
                                        <Label htmlFor="no_admin_qualification">All administrative staff have irrelevant qualification</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_admin_qualification" id="few_admin_qualification" />
                                        <Label htmlFor="few_admin_qualification">Up to 25% of the administrative staff have relevant qualification</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_admin_qualification" id="some_admin_qualification" />
                                        <Label htmlFor="some_admin_qualification">Up to 50% of the administrative staff have relevant qualification</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="most_admin_qualification" id="most_admin_qualification" />
                                        <Label htmlFor="most_admin_qualification">Up to 75% of the administrative staff have relevant qualification</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all_admin_qualification" id="all_admin_qualification" />
                                        <Label htmlFor="all_admin_qualification">All the administrative staff have relevant qualification</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.adminStaffAvailability ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of All Administrative Staff According To Organisational Structure</Label>
                                    {errors.adminStaffAvailability && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.adminStaffAvailability}
                                    onValueChange={(value) => setValue('adminStaffAvailability', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no_admin_staff" id="no_admin_staff" />
                                        <Label htmlFor="no_admin_staff">No administrative staff is available</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="few_admin_staff" id="few_admin_staff" />
                                        <Label htmlFor="few_admin_staff">Approximately up to 25% of administrative staff are available</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="some_admin_staff" id="some_admin_staff" />
                                        <Label htmlFor="some_admin_staff">Approximately 26-50% of administrative staff are available</Label>
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.staffFiles ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Complete Staff Files at School</Label>
                                    {errors.staffFiles && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formData.staffFiles}
                                    onValueChange={(value) => setValue('staffFiles', value)}
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
                                        <RadioGroupItem value="some_staff_files" id="some_staff_files" />
                                        <Label htmlFor="some_staff_files">Approximately 26 to 50% of staff have a complete file</Label>
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
                            </div>
                        </Card>
                    </>
                )}
            </div>

            {/* Strategic Plan */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Strategic Plan</h2>
                    <button
                        type="button"
                        onClick={() => setStrategicPlanOpen(!isStrategicPlanOpen)}
                        className="focus:outline-none"
                    >
                        {isStrategicPlanOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>
                {isStrategicPlanOpen && (
                    <Card className={`p-6 ${errors.strategicPlan ? 'border-red-200' : ''}`}>
                        <div className="space-y-4">
                            <SectionHeader field="strategicPlan" label="Strategic Plan" />
                            <RadioGroup
                                value={formData.strategicPlan}
                                onValueChange={(value) => setValue('strategicPlan', value)}
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
                )}
            </div>

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