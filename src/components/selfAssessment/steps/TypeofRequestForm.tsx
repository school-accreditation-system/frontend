'use client';
import { useState, useEffect } from 'react';
import { Search, Beaker, BookOpen, Languages, GraduationCap, Building, Monitor, Zap, Utensils, Plane, Palette, Wrench, Truck, Factory, Scissors, Briefcase, School, Baby, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
type RequestType =
    | 'tvet_trades'
    | 'general_combination'
    | 'professional_combination'
    | 'ordinary_level'
    | 'primary_level'
    | 'pre_primary_level'
    | 'boarding_school';

interface TypeOfRequestFormProps {
    formData: any;
    updateFormData: (data: any) => void;
    errors: string[];
    currentStep: number;
    isSubmitting: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
    totalSteps: number;
}


export const TypeOfRequestForm: React.FC<TypeOfRequestFormProps> = ({
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
    const [searchQuery, setSearchQuery] = useState('');
    const form = useForm<z.infer<typeof typeOfRequestSchema>>({
        resolver: zodResolver(typeOfRequestSchema),
        defaultValues: {
            typeOfRequest: undefined,
            category: '',
            combinations: []
        },
        mode: "onChange",
        reValidateMode: "onChange"
    });

    useEffect(() => {
        form.setValue('typeOfRequest', parentFormData.typeOfRequest);
    }, [parentFormData.typeOfRequest]);

    const { watch, setValue, formState: { errors: formErrors } } = form;
    const selectedType = watch('typeOfRequest');
    const selectedCategory = watch('category');
    const selectedCombinations = watch('combinations');


    // Function to get subcategories based on selected type
    const getSubcategories = () => {
        if (!selectedType || !combinations[selectedType]) return [];
        return Object.entries(combinations[selectedType].subcategories);
    };

    // Function to get items based on selected category
    const getItems = () => {
        if (!selectedType || !selectedCategory) return [];

        // Get the category and its items
        const category = combinations[selectedType].subcategories[selectedCategory];
        const items = category?.items || [];

        // Enhance each item with the category information
        return items.map(item => ({
            ...item,
            category: selectedCategory // Add the category to each item
        }));
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
        // Get the first category for the selected type
        const firstCategory = combinations[value]?.subcategories ? Object.keys(combinations[value].subcategories)[0] : '';
        // Set the first category and reset combinations
        setValue('category', firstCategory);
        setValue('combinations', []);
    };

    // Update category selection handler
    const handleCategoryChange = (category: string) => {
        setValue('category', category);
        // Reset combinations when category changes
        setValue('combinations', []);
    };

    // Update combinations handler
    const handleSelectionsChange = (item: { id: string, label: string, category: string }, checked: boolean) => {
        const currentSelections = form.getValues('combinations');

        // Ensure the item has the category property
        const itemWithCategory = {
            ...item,
            category: selectedCategory // Explicitly ensure category is added
        };

        const newSelections = checked
            ? [...currentSelections, itemWithCategory]
            : currentSelections.filter(selection => selection.id !== item.id);

        setValue('combinations', newSelections);
        console.log("newSelections with category:", newSelections);
    };

    // Handle "Select All" and "Clear All"
    const handleSelectAll = () => {
        // Ensure all items include their category
        const allItemsWithCategory = filteredItems.map(item => ({
            id: item.id,
            label: item.label,
            category: selectedCategory
        }));

        setValue('combinations', allItemsWithCategory);
    };

    const handleClearAll = () => {
        setValue('combinations', []);
    };

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-2">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Type of Request</h2>
                        <FormField
                            control={form.control}
                            name="typeOfRequest"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of Request</FormLabel>
                                    <Select
                                        value={selectedType}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handleTypeChange(value);
                                        }}
                                        defaultValue={field.value}
                                        className='bg-white border border-red-500'
                                    >
                                        <SelectTrigger className="w-full bg-white">
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
                                    <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {selectedType && combinations[selectedType] && (
                        <div className="space-y-4 flex gap-5  border-t pt-4">
                            <div className='basis-1/3'>
                                <h3 className="text-lg font-semibold">Select {combinations[selectedType].title} Category</h3>

                                {/* Categories horizontal scrolling */}
                                <div className="w-full">
                                    <div className="flex pb-2">
                                        <div className="flex flex-col min-w-full gap-2 p-1">
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

                            </div>

                            {/* Show items only when a category is selected */}
                            {selectedCategory && (
                                <div className="space-y-4 basis-2/3">
                                    <div className="relative bg-white">
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
                                            className='hover:bg-blue-500 hover:text-white hover:cursor-pointer'
                                            onClick={handleSelectAll}
                                        >
                                            Select All
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className='hover:bg-blue-500 hover:text-white hover:cursor-pointer'
                                            onClick={handleClearAll}
                                        >
                                            Clear All
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="combinations"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {form.formState.errors.combinations && (
                                                        <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                                                    )}
                                                    {filteredItems.map((item) => (
                                                        <div key={item.id} className="flex items-center space-x-2">
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="combinations"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <div className='flex items-center gap-2'>
                                                                                <Checkbox
                                                                                    checked={selectedCombinations.some(selection => selection.id === item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        // Create a complete item object with the category
                                                                                        const fullItem = {
                                                                                            id: item.id,
                                                                                            label: item.label,
                                                                                            category: selectedCategory
                                                                                        };

                                                                                        return checked
                                                                                            ? field.onChange([...field.value, fullItem])
                                                                                            : field.onChange(field.value.filter((selection) => selection.id !== item.id));
                                                                                    }}
                                                                                />
                                                                                <Label htmlFor={item.id}>{item.label}</Label>
                                                                            </div>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    ))}
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <span className="text-sm text-gray-500">
                                            {selectedCombinations.length} items selected
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-1 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onPrevious}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                        <Button
                            type="button"
                            onClick={async (e) => {
                                e.preventDefault();
                                const result = await form.trigger();
                                if (result) {
                                    // Get the complete form values including all selected combinations
                                    const formValues = form.getValues();

                                    // Update the parent form data with ALL selected combinations
                                    updateFormData({
                                        typeOfRequest: formValues.typeOfRequest,
                                        category: formValues.category,
                                        combinations: formValues.combinations
                                    });
                                    onNext();
                                }
                            }}
                            className="flex items-center gap-2 hover:cursor-pointer"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    );
}
