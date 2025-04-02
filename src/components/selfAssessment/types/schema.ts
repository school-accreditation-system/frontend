import { z } from 'zod';

export const typeOfRequestSchema = z.object({
    typeOfRequest: z.enum([
        'tvet_trades',
        'general_combination',
        'professional_combination',
        'ordinary_level',
        'primary_level',
        'pre_primary_level',
        'boarding_school'
    ], {
        required_error: 'Type of request selection is required',
    }),
    category: z.string(),
    combinations: z.array(z.object({
        id: z.string(),
        label: z.string(),
        category: z.string()
    })).min(1, {
        message: "Please select at least one item from the category"
    })
});

// Labels mapping for the type of request
export const typeOfRequestLabels: Record<z.infer<typeof typeOfRequestSchema>['typeOfRequest'], string> = {
    tvet_trades: 'TVET Trades',
    general_combination: 'General Combination',
    professional_combination: 'Professional Combination',
    ordinary_level: 'Ordinary Level',
    primary_level: 'Primary Level',
    pre_primary_level: 'Pre-Primary Level',
    boarding_school: 'Boarding School'
};

export const landOwnershipSchema = z.object({
    strategicPlan: z.enum(['no_plan', 'basic_plan', 'with_vision', 'with_structure', 'complete_plan'], {
        required_error: 'Strategic plan selection is required',
    }),
    annualActionPlan: z.enum(['no_action_plan', 'has_action_plan', 'complete_action_plan'], {
        required_error: 'Annual action plan selection is required',
    }),
    annualBudgetPlan: z.enum(['no_budget_plan', 'has_budget_plan', 'complete_budget_plan'], {
        required_error: 'Annual budget plan selection is required',
    }),
    registrationDocuments: z.enum(['no_register', 'has_register'], {
        required_error: 'Registration documents selection is required',
    }),
    landOwnership: z.enum(['owned_land', 'no_land', 'valid_contract_1_year', 'valid_contract_2_3_years', 'valid_contract_5_years'], {
        required_error: 'Land ownership selection is required',
    }),
});

export const schoolInfrastructureSchema = z.object({
    // Classrooms Section
    classrooms: z.enum(['no_classrooms', 'some_classrooms', 'all_classrooms'], {
        required_error: 'Classroom assessment is required',
    }),
    doorsAndWindows: z.enum(['no_doors_windows', 'few_doors_windows', 'some_doors_windows', 'most_doors_windows', 'all_doors_windows'], {
        required_error: 'Doors and windows assessment is required',
    }),
    capacity: z.enum(['no_capacity', 'few_capacity', 'some_capacity', 'most_capacity', 'all_capacity'], {
        required_error: 'Capacity assessment is required',
    }),
    electricity: z.enum(['no_electricity', 'few_electricity', 'some_electricity', 'most_electricity', 'all_electricity'], {
        required_error: 'Electricity assessment is required',
    }),

    // Smart Classroom Section
    smartClassroom: z.enum(['no_smart_classroom', 'few_smart_classroom', 'some_smart_classroom', 'most_smart_classroom', 'all_smart_classroom'], {
        required_error: 'Smart classroom assessment is required',
    }),
    computerLabComputers: z.enum(['no_computer_lab', 'few_computers', 'some_computers', 'most_computers', 'all_computers'], {
        required_error: 'Computer lab assessment is required',
    }),
    computerLabSize: z.enum(['no_lab_size', 'lab_size_one_door', 'lab_size_two_doors', 'lab_size_two_doors_windows', 'lab_size_three_doors_windows'], {
        required_error: 'Computer lab size assessment is required',
    }),

    // Workshops Section
    workshops: z.enum(['no_workshops', 'few_workshops', 'some_workshops', 'most_workshops', 'all_workshops'], {
        required_error: 'Workshops assessment is required',
    }),
    toolsStore: z.enum(['no_tools_store', 'few_tools_store', 'some_tools_store', 'most_tools_store', 'all_tools_store'], {
        required_error: 'Tools store assessment is required',
    }),
    library: z.enum(['no_library', 'small_library', 'medium_library', 'large_library', 'full_library'], {
        required_error: 'Library assessment is required',
    }),
    workshopElectricity: z.enum(['no_workshop_electricity', 'workshop_electricity'], {
        required_error: 'Workshop electricity assessment is required',
    }),

    // Toilets Section
    staffToilets: z.enum(['no_staff_toilets', 'shared_staff_toilets', 'sufficient_staff_toilets'], {
        required_error: 'Staff toilets assessment is required',
    }),
    learnerToilets: z.enum(['no_learner_toilets', 'shared_learner_toilets', 'some_learner_toilets', 'sufficient_learner_toilets', 'more_sufficient_learner_toilets'], {
        required_error: 'Learner toilets assessment is required',
    }),

    // Administrative Offices Section
    staffRoom: z.enum(['no_staff_room', 'some_staff_room', 'half_staff_room', 'most_staff_room', 'all_staff_room'], {
        required_error: 'Staff room assessment is required',
    }),
    adminBlock: z.enum(['no_admin_block', 'some_admin_block', 'half_admin_block', 'most_admin_block', 'all_admin_block'], {
        required_error: 'Admin block assessment is required',
    }),
    internetConnectivity: z.enum(['no_internet', 'admin_internet', 'full_internet'], {
        required_error: 'Internet connectivity assessment is required',
    }),
    adminFacilities: z.enum(['no_admin_facilities', 'some_admin_facilities', 'full_admin_facilities'], {
        required_error: 'Admin facilities assessment is required',
    }),

    // Welfare Facilities Section
    diningHall: z.enum(['no_dining_hall', 'some_dining_hall', 'sufficient_dining_hall', 'more_sufficient_dining_hall', 'full_sufficient_dining_hall'], {
        required_error: 'Dining hall assessment is required',
    }),
    handWashing: z.enum(['no_hand_washing', 'some_hand_washing', 'sufficient_hand_washing', 'more_sufficient_hand_washing', 'full_sufficient_hand_washing'], {
        required_error: 'Hand washing facilities assessment is required',
    }),
    cookingSpace: z.enum(['no_cooking_space', 'some_cooking_self_adapted', 'sufficient_cooking_space', 'more_sufficient_cooking_space', 'full_sufficient_cooking_space'], {
        required_error: 'Cooking space assessment is required',
    }),
    playground: z.enum(['no_playground', 'some_playground', 'sufficient_playground', 'more_sufficient_playground', 'full_sufficient_playground'], {
        required_error: 'Playground assessment is required',
    }),
    rainWaterHarvesting: z.enum(['no_rain_water_harvesting', 'some_rain_water_harvesting', 'sufficient_rain_water_harvesting', 'more_sufficient_rain_water_harvesting', 'full_sufficient_rain_water_harvesting'], {
        required_error: 'Rain water harvesting assessment is required',
    }),
    dormitory: z.enum(['some_dormitory', 'sufficient_dormitory', 'full_sufficient_dormitory'], {
        required_error: 'Dormitory assessment is required',
    }),
    firstAid: z.enum(['no_first_aid', 'some_first_aid', 'sufficient_first_aid'], {
        required_error: 'First aid facilities assessment is required',
    }),
    disabilityAccess: z.enum(['no_disability_access', 'available_disability_access', 'more_disability_access', 'half_disability_access', 'full_disability_access'], {
        required_error: 'Disability access assessment is required',
    }),
    girlRoom: z.enum(['no_girl_room', 'some_girl_room', 'sufficient_girl_room', 'more_sufficient_girl_room', 'full_sufficient_girl_room'], {
        required_error: 'Girl room assessment is required',
    }),
    drinkingWater: z.enum(['no_drinking_water', 'some_drinking_water', 'sufficient_drinking_water', 'more_sufficient_drinking_water', 'full_sufficient_drinking_water'], {
        required_error: 'Drinking water assessment is required',
    }),
    greening: z.enum(['no_greening', 'some_greening', 'sufficient_greening'], {
        required_error: 'Greening assessment is required',
    }),
    basicCleaness: z.enum(['no_basic_cleaness', 'some_basic_cleaness', 'sufficient_basic_cleaness'], {
        required_error: 'Basic cleaness assessment is required',
    }),
    wasteManagement: z.enum(['no_waste_management', 'some_waste_management', 'sufficient_waste_management', 'more_sufficient_waste_management'], {
        required_error: 'Waste management assessment is required',
    }),
    multiPurposeHall: z.enum(['no_hall', 'half_hall', 'most_hall', 'all_hall', 'more_hall'], {
        required_error: 'Multi-purpose hall assessment is required',
    }),

    // Safety and Security Section
    fireExtinguisher: z.enum(['no_extinguisher', 'few_extinguishers', 'some_extinguishers', 'most_extinguishers', 'all_extinguishers'], {
        required_error: 'Fire extinguisher assessment is required',
    }),
    lightningArrestor: z.enum(['no_arrestor', 'few_arrestors', 'some_arrestors', 'most_arrestors', 'all_arrestors'], {
        required_error: 'Lightning arrestor assessment is required',
    }),
    fencing: z.enum(['no_fence', 'half_fence', 'most_fence', 'all_fence'], {
        required_error: 'Fencing assessment is required',
    }),
    externalLighting: z.enum(['no_lighting', 'few_lighting', 'some_lighting', 'most_lighting', 'all_lighting'], {
        required_error: 'External lighting assessment is required',
    }),
});

export const teachingResourcesSchema = z.object({
    // Equipment, Tools, and Materials Section
    materialsToolsEquipment: z.enum(['no_tools', 'few_tools', 'some_tools', 'most_tools', 'all_tools'], {
        required_error: 'Materials and tools assessment is required',
    }),
    approvedCurriculum: z.enum(['no_curriculum', 'approved_curriculum'], {
        required_error: 'Curriculum assessment is required',
    }),
    readingMaterials: z.enum(['no_reading_materials', 'few_reading_materials', 'some_reading_materials', 'most_reading_materials', 'all_reading_materials'], {
        required_error: 'Reading materials assessment is required',
    }),
    projectors: z.enum(['no_projector', 'few_projectors', 'some_projectors', 'most_projectors', 'all_projectors'], {
        required_error: 'Projector assessment is required',
    }),

    // Furniture Section
    desks: z.enum(['no_desks', 'few_desks', 'shared_desks', 'more_desks', 'most_desks', 'all_desks'], {
        required_error: 'Desk assessment is required',
    }),
    teacherChairs: z.enum(['no_teacher_chair', 'few_teacher_chairs', 'partial_teacher_chairs', 'most_teacher_chairs', 'all_teacher_chairs'], {
        required_error: 'Teacher chair assessment is required',
    }),
    teacherTables: z.enum(['no_teacher_table', 'few_teacher_tables', 'partial_teacher_tables', 'most_teacher_tables', 'all_teacher_tables'], {
        required_error: 'Teacher table assessment is required',
    }),
    shelves: z.enum(['no_shelves', 'few_shelves', 'partial_shelves', 'most_shelves', 'all_shelves'], {
        required_error: 'Shelves assessment is required',
    }),
    dustbins: z.enum(['no_dustbins', 'few_dustbins', 'partial_dustbins', 'most_dustbins', 'all_dustbins'], {
        required_error: 'Dustbin assessment is required',
    }),



    // Teaching Staff Section
    sufficientTeachers: z.enum(['insufficient', 'most_teachers', 'all_teachers'], {
        required_error: 'Teacher sufficiency assessment is required',
    }),
    qualifiedTeachers: z.enum(['no_qualified_teachers', 'few_qualified_teachers', 'some_qualified_teachers', 'most_qualified_teachers', 'all_qualified_teachers'], {
        required_error: 'Teacher qualification assessment is required',
    }),
    adminStaffQualification: z.enum(['irrelevant_qualification', 'quarter_relevant', 'half_relevant', 'three_quarter_relevant', 'all_relevant'], {
        required_error: 'Admin staff qualification assessment is required',
    }),
    adminStaffAvailability: z.enum(['no_admin_staff', 'few_admin_staff', 'half_admin_staff', 'most_admin_staff', 'all_admin_staff'], {
        required_error: 'Admin staff availability assessment is required',
    }),
    staffFiles: z.enum(['no_staff_files', 'few_staff_files', 'half_staff_files', 'most_staff_files', 'all_staff_files'], {
        required_error: 'Staff files assessment is required',
    }),
});

// Combined schema for the entire form
export const selfAssessmentSchema = z.discriminatedUnion('currentStep', [
    z.object({
        currentStep: z.literal(1),
        data: typeOfRequestSchema,
    }),
    z.object({
        currentStep: z.literal(2),
        data: landOwnershipSchema,
    }),
    z.object({
        currentStep: z.literal(3),
        data: schoolInfrastructureSchema,
    }),
    z.object({
        currentStep: z.literal(4),
        data: teachingResourcesSchema,
    }),
]);

// Type exports
export type TypeOfRequestFormData = z.infer<typeof typeOfRequestSchema>;
export type LandOwnershipFormData = z.infer<typeof landOwnershipSchema>;
export type SchoolInfrastructureFormData = z.infer<typeof schoolInfrastructureSchema>;
export type TeachingResourcesFormData = z.infer<typeof teachingResourcesSchema>;
export type SelfAssessmentFormData = z.infer<typeof selfAssessmentSchema>;

// Score configurations (matching your existing scoreConfigs)
export const scoreConfigs = {
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
} as const;

export const schoolInfrastructureScoreConfigs = {
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
    classrooms: {
        maxScore: 3,
        values: {
            no_classrooms: 0,
            some_classrooms: 1,
            all_classrooms: 3
        }
    },
    doorsAndWindows: {
        maxScore: 3,
        values: {
            no_doors_windows: 0,
            few_doors_windows: 1,
            some_doors_windows: 2,
            most_doors_windows: 2.5,
            all_doors_windows: 3
        }
    },
    capacity: {
        maxScore: 3,
        values: {
            no_capacity: 0,
            few_capacity: 1,
            some_capacity: 2,
            most_capacity: 2.5,
            all_capacity: 3
        }
    },
    electricity: {
        maxScore: 3,
        values: {
            no_electricity: 0,
            few_electricity: 1,
            some_electricity: 2,
            most_electricity: 2.5,
            all_electricity: 3
        }
    },
} as const;

// Context type for form state
export type FormContextType = {
    currentStep: number;
    formData: Partial<{
        typeOfRequest: TypeOfRequestFormData;
        landOwnership: LandOwnershipFormData;
        infrastructure: SchoolInfrastructureFormData;
        resources: TeachingResourcesFormData;
    }>;
    formErrors: Record<string, string>;
    isSubmitting: boolean;
    stepsWithErrors: number[];
    updateFormData: (step: number, data: any) => void;
    validateStep: (step: number) => boolean;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    handleSubmit: () => void;
};
