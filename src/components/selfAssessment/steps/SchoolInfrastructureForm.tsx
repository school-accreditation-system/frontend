'use client';

import { useForm } from 'react-hook-form';
import { CheckCircle2, ChevronDown, ChevronUp, BookOpen, Monitor, FlaskConical, Bath, Building2, ShieldCheck } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolInfrastructureSchema, type SchoolInfrastructureFormData, schoolInfrastructureScoreConfigs } from '../types/schema';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface SchoolInfrastructureFormProps {
    onSubmit: (data: FormData) => void;
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

interface ScoreConfig {
    maxScore: number;
    values: Record<string, number>;
}


export function SchoolInfrastructureForm({ onSubmit }: SchoolInfrastructureFormProps) {
    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<SchoolInfrastructureFormData>({
        resolver: zodResolver(schoolInfrastructureSchema),
        mode: 'onChange',
        defaultValues: {
            classrooms: '',
            doorsAndWindows: '',
            capacity: '',
            electricity: '',
            smartClassroom: '',
            computerLabComputers: '',
            computerLabSize: '',
            workshops: '',
            toolsStore: '',
            library: '',
            workshopElectricity: '',
            staffToilets: '',
            learnerToilets: '',
            strategicPlan: '',
            annualActionPlan: '',
            annualBudgetPlan: '',
            registrationDocuments: '',
            landOwnership: '',
            staffRoom: '',
            adminBlock: '',
            internetConnectivity: '',
            adminFacilities: '',
            drinkingWater: '',
            handWashing: '',
            cookingSpace: '',
            playground: '',
            sportsFacilities: '',
            firstAid: '',
            ramps: '',
            fireSafety: '',
            wasteManagement: '',
            multiPurposeHall: '',
            fireExtinguisher: '',
            lightningArrestor: '',
            fencing: '',
            externalLighting: '',
        }
    });

    // Watch form values
    const formValues = watch();

    // Memoize the score calculation
    const scoreData = useMemo(() => {
        let totalScore = 0;
        let totalMaxScore = 0;
        let completedSections = 0;

        Object.entries(schoolInfrastructureScoreConfigs).forEach(([field, config]) => {
            const value = formValues[field as keyof SchoolInfrastructureFormData];
            if (value) {
                totalScore += config.values[value] || 0;
                completedSections++;
            }
            totalMaxScore += config.maxScore;
        });

        return {
            percentage: Math.round((totalScore / totalMaxScore) * 100),
            completedSections,
            totalSections: Object.keys(schoolInfrastructureScoreConfigs).length
        };
    }, [formValues]);

    // Add state for current tab
    const [currentTab, setCurrentTab] = useState("classrooms");

    // Handler for tab changes
    const handleTabChange = (value: string) => {
        setCurrentTab(value);
    };

    // Handler for radio button changes
    const handleRadioChange = useCallback((field: keyof SchoolInfrastructureFormData, value: string) => {
        setValue(field, value, {
            shouldValidate: true,
        });
    }, [setValue]);

    const onSubmitForm = (data: FormData) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-blue-900">
                            Infrastructure Assessment Score
                        </h3>
                        <p className="text-sm text-blue-700">
                            {scoreData.completedSections} of {scoreData.totalSections} sections completed
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-blue-600">
                            {scoreData.percentage}%
                        </div>
                        <CheckCircle2
                            className={`w-6 h-6 ${scoreData.percentage >= 70 ? 'text-green-500' : 'text-gray-400'}`}
                        />
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="classrooms" className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-6 gap-4 p-4">
                    <TabsTrigger
                        value="classrooms"
                        className="flex flex-col items-center gap-2 py-3 bg-blue-50 hover:bg-blue-100 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                    >
                        <BookOpen className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Classrooms</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="smart-classroom"
                        className="flex flex-col items-center gap-2 py-3 bg-purple-50 hover:bg-purple-100 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                    >
                        <Monitor className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Smart Class</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="workshops"
                        className="flex flex-col items-center gap-2 py-3 bg-green-50 hover:bg-green-100 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                    >
                        <FlaskConical className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Workshops</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="toilets"
                        className="flex flex-col items-center gap-2 py-3 bg-amber-50 hover:bg-amber-100 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                    >
                        <Bath className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Toilets</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="admin"
                        className="flex flex-col items-center gap-2 py-3 bg-red-50 hover:bg-red-100 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
                    >
                        <Building2 className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Admin</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="welfare"
                        className="flex flex-col items-center gap-2 py-3 bg-violet-50 hover:bg-violet-100 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
                    >
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-xs sm:text-sm">Welfare</span>
                    </TabsTrigger>
                </TabsList>

                {/* Classrooms Tab Content */}
                <TabsContent key="classrooms" value="classrooms" className="space-y-6 bg-blue-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Classrooms</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.classrooms ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of At Least One Classroom By Each Level</Label>
                                    {errors.classrooms && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.classrooms}
                                    onValueChange={(value) => handleRadioChange('classrooms', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.doorsAndWindows ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Each Classroom Has 2 Doors and Sufficient Windows</Label>
                                    {errors.doorsAndWindows && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.doorsAndWindows}
                                    onValueChange={(value) => handleRadioChange('doorsAndWindows', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.capacity ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Each Classroom has Maximum Capacity of 46 Students</Label>
                                    {errors.capacity && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.capacity}
                                    onValueChange={(value) => handleRadioChange('capacity', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.electricity ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Electricity In All Classrooms</Label>
                                    {errors.electricity && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.electricity}
                                    onValueChange={(value) => handleRadioChange('electricity', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Smart Classroom Tab Content */}
                <TabsContent key="smart-classroom" value="smart-classroom" className="space-y-6 bg-purple-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Smart Classroom</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.smartClassroom ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of At Least 1 Smart Classroom</Label>
                                    {errors.smartClassroom && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.smartClassroom}
                                    onValueChange={(value) => handleRadioChange('smartClassroom', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.computerLabComputers ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Computer Laboratory with Sufficient Computers</Label>
                                    {errors.computerLabComputers && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.computerLabComputers}
                                    onValueChange={(value) => handleRadioChange('computerLabComputers', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.computerLabSize ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Computer Laboratory Having at least 90sqm</Label>
                                    {errors.computerLabSize && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.computerLabSize}
                                    onValueChange={(value) => handleRadioChange('computerLabSize', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Workshops Tab Content */}
                <TabsContent key="workshops" value="workshops" className="space-y-6 bg-green-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Workshops</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.workshops ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of Technical Workshops and/or Science Laboratories</Label>
                                    {errors.workshops && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.workshops}
                                    onValueChange={(value) => handleRadioChange('workshops', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.toolsStore ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Store For Tools And Materials</Label>
                                    {errors.toolsStore && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.toolsStore}
                                    onValueChange={(value) => handleRadioChange('toolsStore', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.library ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of A Library Of 7Mx10M Having 2 Doors And 4 Windows</Label>
                                    {errors.library && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.library}
                                    onValueChange={(value) => handleRadioChange('library', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.workshopElectricity ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Electricity In the Workshop or Laboratory</Label>
                                    {errors.workshopElectricity && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.workshopElectricity}
                                    onValueChange={(value) => handleRadioChange('workshopElectricity', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Toilets Tab Content */}
                <TabsContent key="toilets" value="toilets" className="space-y-6 bg-amber-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Toilets</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.staffToilets ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Toilet For Staff For Each Gender</Label>
                                    {errors.staffToilets && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.staffToilets}
                                    onValueChange={(value) => handleRadioChange('staffToilets', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.learnerToilets ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Toilet For Learners For Each Gender</Label>
                                    {errors.learnerToilets && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.learnerToilets}
                                    onValueChange={(value) => handleRadioChange('learnerToilets', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Admin Offices Tab Content */}
                <TabsContent key="admin" value="admin" className="space-y-6 bg-red-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Administrative Offices</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.staffRoom ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of At Least One Convenient Academic Staff Room</Label>
                                    {errors.staffRoom && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.staffRoom}
                                    onValueChange={(value) => handleRadioChange('staffRoom', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.adminBlock ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability of an Equipped Administration Block</Label>
                                    {errors.adminBlock && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.adminBlock}
                                    onValueChange={(value) => handleRadioChange('adminBlock', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.internetConnectivity ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Internet Connectivity</Label>
                                    {errors.internetConnectivity && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.internetConnectivity}
                                    onValueChange={(value) => handleRadioChange('internetConnectivity', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.adminFacilities ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Administrative Facilities Constructed With Authorised Materials</Label>
                                    {errors.adminFacilities && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.adminFacilities}
                                    onValueChange={(value) => handleRadioChange('adminFacilities', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* Welfare & Safety Tab Content */}
                <TabsContent key="welfare" value="welfare" className="space-y-6 bg-teal-50/30 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Welfare & Safety</h2>
                    <div className="space-y-6">
                        <Card className={`p-6 ${errors.drinkingWater ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Drinking Water</Label>
                                    {errors.drinkingWater && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.drinkingWater}
                                    onValueChange={(value) => handleRadioChange('drinkingWater', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.handWashing ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Hand Washing Facilities</Label>
                                    {errors.handWashing && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.handWashing}
                                    onValueChange={(value) => handleRadioChange('handWashing', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.cookingSpace ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Cooking Space</Label>
                                    {errors.cookingSpace && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.cookingSpace}
                                    onValueChange={(value) => handleRadioChange('cookingSpace', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.playground ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Playground</Label>
                                    {errors.playground && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.playground}
                                    onValueChange={(value) => handleRadioChange('playground', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.sportsFacilities ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Sports Facilities</Label>
                                    {errors.sportsFacilities && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.sportsFacilities}
                                    onValueChange={(value) => handleRadioChange('sportsFacilities', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.firstAid ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of First Aid Facilities</Label>
                                    {errors.firstAid && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.firstAid}
                                    onValueChange={(value) => handleRadioChange('firstAid', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.ramps ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Ramps For Physically Disabled</Label>
                                    {errors.ramps && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.ramps}
                                    onValueChange={(value) => handleRadioChange('ramps', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.fireSafety ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Fire Safety Measures</Label>
                                    {errors.fireSafety && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.fireSafety}
                                    onValueChange={(value) => handleRadioChange('fireSafety', value)}
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
                            </div>
                        </Card>

                        <Card className={`p-6 ${errors.wasteManagement ? 'border-red-200' : ''}`}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-medium">Availability Of Waste Management Facilities</Label>
                                    {errors.wasteManagement && (
                                        <span className="text-sm text-red-500">Required</span>
                                    )}
                                </div>
                                <RadioGroup
                                    value={formValues.wasteManagement}
                                    onValueChange={(value) => handleRadioChange('wasteManagement', value)}
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
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </form>
    );
} 