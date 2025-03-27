'use client';
import { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { typeOfRequestSchema } from '../types/schema';
import { z } from 'zod';
import { cn } from "@/lib/utils";
import { combinations, requestTypes } from '../constanst';
import { useFormContext } from '../context/FormContext';

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
    const [searchQuery, setSearchQuery] = useState('');
    const { formData, updateFormData, formErrors, } = useFormContext();

    const form = useForm<z.infer<typeof typeOfRequestSchema>>({
        resolver: zodResolver(typeOfRequestSchema),
        defaultValues: {
            typeOfRequest: undefined,
            category: '',
            selections: []
        },
        mode: "onChange"
    });

    useEffect(() => {
        form.setValue('typeOfRequest', formData.typeOfRequest);
    }, [formData.typeOfRequest]);

    const { watch, setValue, formState: { errors } } = form;
    const selectedType = watch('typeOfRequest');
    const selectedCategory = watch('category');
    const selectedCombinations = watch('selections');


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

    // Update the type selection handler
    const handleTypeChange = (value: string) => {
        setValue('typeOfRequest', value as z.infer<typeof typeOfRequestSchema>['typeOfRequest']);
        // Reset category and selections when type changes
        setValue('category', '');
        setValue('selections', []);
    };

    // Update category selection handler
    const handleCategoryChange = (category: string) => {
        setValue('category', category);
        // Reset selections when category changes
        setValue('selections', []);
    };

    // Update selections handler
    const handleSelectionsChange = (itemId: string, checked: boolean) => {
        const currentSelections = form.getValues('selections');
        const newSelections = checked
            ? [...currentSelections, itemId]
            : currentSelections.filter(id => id !== itemId);
        setValue('selections', newSelections);
    };

    // Handle "Select All" and "Clear All"
    const handleSelectAll = () => {
        const allItems = filteredItems.map(item => item.id);
        setValue('selections', allItems);
    };

    const handleClearAll = () => {
        setValue('selections', []);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Type of Request</h2>
                <Select
                    value={selectedType}
                    onValueChange={handleTypeChange}
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
                {errors.typeOfRequest && (
                    <p className="text-sm text-red-500">
                        {errors.typeOfRequest.message}
                    </p>
                )}
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
                                        onClick={() => handleCategoryChange(key)}
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
                    {errors.category && (
                        <p className="text-sm text-red-500">
                            {errors.category.message}
                        </p>
                    )}

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
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                >
                                    Select All
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClearAll}
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
                                            onCheckedChange={(checked) =>
                                                handleSelectionsChange(item.id, checked as boolean)
                                            }
                                        />
                                        <Label htmlFor={item.id}>{item.label}</Label>
                                    </div>
                                ))}
                            </div>
                            {errors.selections && (
                                <p className="text-sm text-red-500">
                                    {errors.selections.message}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="text-sm text-gray-500">
                                    {selectedCombinations.length} items selected
                                </span>
                                <Button type="submit">
                                    Save Selection
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
} 