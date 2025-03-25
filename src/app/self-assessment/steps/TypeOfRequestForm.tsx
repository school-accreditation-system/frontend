'use client';
import { useState } from 'react';
import { Search, Beaker, BookOpen, Languages, GraduationCap, Building, Monitor, Zap, Utensils, Plane, Palette, Wrench, Truck, Factory, Scissors, Briefcase, School, Baby, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type RequestType =
    | 'tvet_trades'
    | 'general_combination'
    | 'professional_combination'
    | 'ordinary_level'
    | 'primary_level'
    | 'pre_primary_level'
    | 'boarding_school';

interface TypeOfRequestFormProps {
    onSubmit: (data: any) => void;
}

export function TypeOfRequestForm({ onSubmit }: TypeOfRequestFormProps) {
    const [selectedType, setSelectedType] = useState<RequestType | null>(null);
    const [selectedCombinations, setSelectedCombinations] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const requestTypes = [
        { value: 'tvet_trades', label: 'TVET Trades' },
        { value: 'general_combination', label: 'General Combination' },
        { value: 'professional_combination', label: 'Professional Combination' },
        { value: 'ordinary_level', label: 'Ordinary Level' },
        { value: 'primary_level', label: 'Primary Level' },
        { value: 'pre_primary_level', label: 'Pre-Primary Level' },
        { value: 'boarding_school', label: 'Boarding School' },
    ];

    const combinations = {
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

    // Function to get subcategories based on selected type
    const getSubcategories = () => {
        if (!selectedType || !combinations[selectedType]) return [];
        return Object.entries(combinations[selectedType].subcategories);
    };

    // Function to get items based on selected category
    const getItems = () => {
        if (!selectedType || !selectedCategory) return [];
        return combinations[selectedType].subcategories[selectedCategory]?.items || [];
    };

    // Filter items based on search query
    const filteredItems = getItems().filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCategoryIcon = (category: string) => {
        switch (category) {
            // TVET Trades categories
            case 'construction_building':
                return <Building className="w-5 h-5 text-orange-600" />;
            case 'ict_multimedia':
                return <Monitor className="w-5 h-5 text-blue-600" />;
            case 'energy':
                return <Zap className="w-5 h-5 text-yellow-600" />;
            case 'agriculture_food_processing':
                return <Utensils className="w-5 h-5 text-green-600" />;
            case 'hospitality_tourism':
                return <Plane className="w-5 h-5 text-purple-600" />;
            case 'arts_crafting':
                return <Palette className="w-5 h-5 text-pink-600" />;
            case 'technical_services':
                return <Wrench className="w-5 h-5 text-gray-600" />;
            case 'transport_logistics':
                return <Truck className="w-5 h-5 text-indigo-600" />;
            case 'manufacturing_mining':
                return <Factory className="w-5 h-5 text-red-600" />;
            case 'beauty_aesthetics':
                return <Scissors className="w-5 h-5 text-rose-600" />;

            // General Combination categories
            case 'sciences':
                return <Beaker className="w-5 h-5 text-emerald-600" />;
            case 'humanities':
                return <BookOpen className="w-5 h-5 text-teal-600" />;
            case 'languages':
                return <Languages className="w-5 h-5 text-violet-600" />;

            // Other main categories
            case 'professional_combination':
                return <Briefcase className="w-5 h-5 text-sky-600" />;
            case 'ordinary_level':
                return <School className="w-5 h-5 text-cyan-600" />;
            case 'primary_level':
                return <School className="w-5 h-5 text-amber-600" />;
            case 'pre_primary_level':
                return <Baby className="w-5 h-5 text-lime-600" />;
            case 'boarding_school':
                return <Building2 className="w-5 h-5 text-slate-600" />;

            default:
                return <GraduationCap className="w-5 h-5 text-gray-600" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            // TVET Trades categories
            case 'construction_building':
                return 'bg-orange-50 hover:bg-orange-100 border-orange-200';
            case 'ict_multimedia':
                return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
            case 'energy':
                return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200';
            case 'agriculture_food_processing':
                return 'bg-green-50 hover:bg-green-100 border-green-200';
            case 'hospitality_tourism':
                return 'bg-purple-50 hover:bg-purple-100 border-purple-200';
            case 'arts_crafting':
                return 'bg-pink-50 hover:bg-pink-100 border-pink-200';
            case 'technical_services':
                return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
            case 'transport_logistics':
                return 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200';
            case 'manufacturing_mining':
                return 'bg-red-50 hover:bg-red-100 border-red-200';
            case 'beauty_aesthetics':
                return 'bg-rose-50 hover:bg-rose-100 border-rose-200';

            // General Combination categories
            case 'sciences':
                return 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200';
            case 'humanities':
                return 'bg-teal-50 hover:bg-teal-100 border-teal-200';
            case 'languages':
                return 'bg-violet-50 hover:bg-violet-100 border-violet-200';

            // Default fallback
            default:
                return 'bg-gray-50 hover:bg-gray-100 border-gray-200';
        }
    };

    // Set default category when type changes
    const setDefaultCategory = (type: RequestType) => {
        const subcategories = combinations[type]?.subcategories;
        if (subcategories) {
            const firstCategory = Object.keys(subcategories)[0];
            setSelectedCategory(firstCategory);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Type of Request</h2>
                <Select
                    value={selectedType || ''}
                    onValueChange={(value: string) => {
                        const newType = value as RequestType;
                        setSelectedType(newType);
                        setDefaultCategory(newType);
                        setSelectedCombinations([]);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a request type" />
                    </SelectTrigger>
                    <SelectContent>
                        {requestTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedType && combinations[selectedType] && (
                <div className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">Select {combinations[selectedType].title} Category</h3>

                    {/* Categories horizontal scrolling */}
                    <div className="relative">
                        <div className="overflow-x-auto pb-2">
                            <div className="flex gap-2 min-w-max p-1">
                                {getSubcategories().map(([key, category]) => (
                                    <div
                                        key={key}
                                        onClick={() => setSelectedCategory(key)}
                                        className={`p-3 rounded-lg cursor-pointer border transition-all duration-200 
                                            min-w-[150px] group ${getCategoryColor(key)} 
                                            ${selectedCategory === key ? 'ring-2 ring-primary' : ''}`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            {getCategoryIcon(key)}
                                            <h4 className="font-medium capitalize text-sm">
                                                {category.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-500">
                                                {category.items.length} items
                                            </p>
                                            <span className="text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                View →
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Show items only when a category is selected */}
                    {selectedCategory && (
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search items..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedCombinations(filteredItems.map(c => c.id))}
                                >
                                    Select All
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedCombinations([])}
                                >
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {filteredItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={item.id}
                                            checked={selectedCombinations.includes(item.id)}
                                            onCheckedChange={(checked: boolean) => {
                                                if (checked) {
                                                    setSelectedCombinations([...selectedCombinations, item.id]);
                                                } else {
                                                    setSelectedCombinations(
                                                        selectedCombinations.filter((id) => id !== item.id)
                                                    );
                                                }
                                            }}
                                        />
                                        <Label htmlFor={item.id}>{item.label}</Label>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="text-sm text-gray-500">
                                    {selectedCombinations.length} items selected
                                </span>
                                <Button
                                    onClick={() => onSubmit({
                                        type: selectedType,
                                        category: selectedCategory,
                                        selections: selectedCombinations
                                    })}
                                >
                                    Save Selection
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 