import { TypeOfRequestForm } from "@/components/selfAssessment/steps/TypeofRequestForm";
import { LandOwnershipForm } from "@/components/selfAssessment/steps/LandOwnershipForm";
import { SchoolInfrastructureForm } from "@/components/selfAssessment/steps/SchoolInfrastructureForm";
import { TeachingResourcesForm } from "@/components/selfAssessment/steps/TeachingResourcesForm";
import { ProvisionalResults } from "@/components/selfAssessment/steps/ProvisionalResults";

import {
    typeOfRequestSchema,
    landOwnershipSchema,
    schoolInfrastructureSchema,
    teachingResourcesSchema
} from "./types/schema";
import { Step } from "./types/step";


export const ASSESSMENT_STEPS: Step[] = [
    {
        id: 0,
        title: 'Type of Request',
        description: 'Select the type of request you want to make',
        component: TypeOfRequestForm,
        validationSchema: typeOfRequestSchema,
    },
    {
        id: 1,
        title: 'Land Ownership & Legal Docs',
        description: 'Choose required information',
        component: LandOwnershipForm,
        validationSchema: landOwnershipSchema,
    },
    {
        id: 2,
        title: 'School Infrastructure',
        description: 'Provide infrastructure details',
        component: SchoolInfrastructureForm,
        validationSchema: schoolInfrastructureSchema,
    },
    {
        id: 3,
        title: 'Teaching Resources',
        description: 'List available teaching resources',
        component: TeachingResourcesForm,
        validationSchema: teachingResourcesSchema,
    },
    {
        id: 4,
        title: 'Provisional results',
        description: 'Review provisional results',
        component: ProvisionalResults
    },
]

export const combinations = {
    tvet_trades: {
        title: 'TVET Trades',
        subcategories: {
            construction_building: {
                title: 'Construction & Building',
                items: [
                    { id: 'building_construction', label: 'Building Construction' },
                    { id: 'public_works', label: 'Public Works' },
                    { id: 'land_surveying', label: 'Land Surveying' },
                    { id: 'interior_design', label: 'Interior Design' },
                    { id: 'plumbing_technology', label: 'Plumbing Technology' },
                    { id: 'masonry', label: 'Masonry' },
                    { id: 'road_construction_machinery', label: 'Road Construction Machinery Operation' },
                    { id: 'carpentry', label: 'Carpentry' },
                    { id: 'domestic_plumbing', label: 'Domestic Plumbing' },
                    { id: 'painting_decoration', label: 'Painting & Decoration' }
                ]
            },
            ict_multimedia: {
                title: 'ICT & Multimedia',
                items: [
                    { id: 'software_development', label: 'Software Development' },
                    { id: 'multimedia_production', label: 'Multimedia Production' },
                    { id: 'networking_internet', label: 'Networking and Internet Technology' },
                    { id: 'software_programming', label: 'Software Programming and Embedded System' },
                    { id: 'computer_system', label: 'Computer System and Architecture' },
                    { id: 'computer_application_l2', label: 'Computer Application L2' },
                    { id: 'computer_maintenance_l2', label: 'Computer Maintenance L2' }
                ]
            },
            energy: {
                title: 'Energy',
                items: [
                    { id: 'electrical_technology', label: 'Electrical Technology' },
                    { id: 'renewable_energy', label: 'Renewable Energy' },
                    { id: 'domestic_electricity_l1', label: 'Domestic Electricity L1' },
                    { id: 'domestic_electricity_l2', label: 'Domestic Electricity L2' },
                    { id: 'solar_energy_l1', label: 'Solar Energy L1' },
                    { id: 'solar_energy_l2', label: 'Solar Energy L2' },
                    { id: 'peaty_energy_l1', label: 'Peaty Energy L1' },
                    { id: 'peaty_energy_l2', label: 'Peaty Energy L2' },
                    { id: 'biomass_stoves_l1', label: 'Biomass and Improved Cooking Stoves L1' },
                    { id: 'improve_stoves_l2', label: 'Improve Cooking Stoves L2' }
                ]
            },
            agriculture_food_processing: {
                title: 'Agriculture & Food Processing',
                items: [
                    { id: 'food_processing', label: 'Food Processing Technology' },
                    { id: 'agriculture_technology', label: 'Agriculture Technology' },
                    { id: 'veterinary_technology', label: 'Veterinary Technology' },
                    { id: 'agribusiness', label: 'Agribusiness' },
                    { id: 'horticulture', label: 'Horticulture' }
                ]
            },
            hospitality_tourism: {
                title: 'Hospitality & Tourism',
                items: [
                    { id: 'hospitality_management', label: 'Hospitality Management' },
                    { id: 'tourism_operations', label: 'Tourism Operations' },
                    { id: 'culinary_arts', label: 'Culinary Arts' },
                    { id: 'hotel_operations', label: 'Hotel Operations' }
                ]
            },
            arts_crafting: {
                title: 'Arts & Crafting',
                items: [
                    { id: 'fine_arts', label: 'Fine Arts' },
                    { id: 'creative_design', label: 'Creative Design' },
                    { id: 'fashion_design', label: 'Fashion Design' },
                    { id: 'pottery_ceramics', label: 'Pottery & Ceramics' }
                ]
            },
            technical_services: {
                title: 'Technical Services',
                items: [
                    { id: 'automotive_mechanics', label: 'Automotive Mechanics' },
                    { id: 'electronics_repair', label: 'Electronics Repair' },
                    { id: 'welding_fabrication', label: 'Welding & Fabrication' },
                    { id: 'machinery_maintenance', label: 'Machinery Maintenance' }
                ]
            },
            transport_logistics: {
                title: 'Transport & Logistics',
                items: [
                    { id: 'logistics_management', label: 'Logistics Management' },
                    { id: 'supply_chain', label: 'Supply Chain Operations' },
                    { id: 'fleet_management', label: 'Fleet Management' },
                    { id: 'warehouse_operations', label: 'Warehouse Operations' }
                ]
            },
            manufacturing_mining: {
                title: 'Manufacturing & Mining',
                items: [
                    { id: 'manufacturing_technology', label: 'Manufacturing Technology' },
                    { id: 'mining_operations', label: 'Mining Operations' },
                    { id: 'quality_control', label: 'Quality Control' },
                    { id: 'industrial_automation', label: 'Industrial Automation' }
                ]
            },
            beauty_aesthetics: {
                title: 'Beauty & Aesthetics',
                items: [
                    { id: 'cosmetology', label: 'Cosmetology' },
                    { id: 'hair_styling', label: 'Hair Styling' },
                    { id: 'beauty_therapy', label: 'Beauty Therapy' },
                    { id: 'nail_technology', label: 'Nail Technology' }
                ]
            }
        }
    },
    general_combination: {
        title: 'General Combination',
        subcategories: {
            sciences: {
                title: 'Sciences',
                items: [
                    { id: 'MPG', label: 'Mathematics - Physics - Geography (MPG)' },
                    { id: 'PCM', label: 'Physics - Chemistry - Mathematics (PCM)' },
                    { id: 'PCB', label: 'Physics - Chemistry - Biology (PCB)' },
                    { id: 'MEG', label: 'Mathematics - Economics - Geography (MEG)' },
                    { id: 'MCE', label: 'Mathematics - Computer Science - Economics (MCE)' },
                    { id: 'MPC', label: 'Mathematics - Physics - Computer Science (MPC)' },
                    { id: 'MCB', label: 'Mathematics - Chemistry - Biology (MCB)' }
                ]
            },
            humanities: {
                title: 'Humanities',
                items: [
                    { id: 'HLP', label: 'History - Literature in English - Psychology (HLP)' },
                    { id: 'HSL', label: 'History - Geography - Literature in English (HSL)' }
                ]
            },
            languages: {
                title: 'Languages',
                items: [
                    { id: 'LFK', label: 'Literature in English - French - Kinyarwanda - Kiswahili (LFK)' }
                ]
            }
        }
    },
    professional_combination: {
        title: 'Professional Combination',
        subcategories: {
            business: {
                title: 'Business Studies',
                items: [
                    { id: 'accounting', label: 'Accounting' },
                    { id: 'business_management', label: 'Business Management' },
                    { id: 'marketing', label: 'Marketing' }
                ]
            }
        }
    },
    ordinary_level: {
        title: 'Ordinary Level',
        subcategories: {
            o_level: {
                title: 'O-Level Programs',
                items: [
                    { id: 'science_track', label: 'Science Track' },
                    { id: 'arts_track', label: 'Arts Track' }
                ]
            }
        }
    },
    primary_level: {
        title: 'Primary Level',
        subcategories: {
            primary: {
                title: 'Primary Education',
                items: [
                    { id: 'primary_1_3', label: 'Primary 1-3' },
                    { id: 'primary_4_6', label: 'Primary 4-6' }
                ]
            }
        }
    },
    pre_primary_level: {
        title: 'Pre-Primary Level',
        subcategories: {
            nursery: {
                title: 'Nursery Education',
                items: [
                    { id: 'nursery', label: 'Nursery' },
                    { id: 'kindergarten', label: 'Kindergarten' }
                ]
            }
        }
    },
    boarding_school: {
        title: 'Boarding School',
        subcategories: {
            boarding: {
                title: 'Boarding Facilities',
                items: [
                    { id: 'full_boarding', label: 'Full Boarding' },
                    { id: 'day_boarding', label: 'Day Boarding' }
                ]
            }
        }
    }
};

export const requestTypes = [
    { value: 'tvet_trades', label: 'TVET Trades' },
    { value: 'general_combination', label: 'General Combination' },
    { value: 'professional_combination', label: 'Professional Combination' },
    { value: 'ordinary_level', label: 'Ordinary Level' },
    { value: 'primary_level', label: 'Primary Level' },
    { value: 'pre_primary_level', label: 'Pre-Primary Level' },
    { value: 'boarding_school', label: 'Boarding School' },
];