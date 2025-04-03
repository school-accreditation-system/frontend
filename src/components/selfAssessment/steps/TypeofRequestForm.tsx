/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { useGetCombinationByLevels } from '@/hooks/useCombination';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Beaker, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Languages, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { typeOfRequestSchema } from '../types/schema';

interface TypeOfRequestFormProps {
    formData: any;
    updateFormData: (data: any) => void;
    onPrevious: () => void;
    onNext: () => Promise<boolean>;
    onSubmit: () => void;
    currentStep: number;
    isSubmitting: boolean;
}

export const TypeOfRequestForm = ({
    formData,
    updateFormData,
    onPrevious,
    onNext,
    onSubmit,
    currentStep,
    isSubmitting
}: TypeOfRequestFormProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    
    const form = useForm<z.infer<typeof typeOfRequestSchema>>({
        resolver: zodResolver(typeOfRequestSchema),
        defaultValues: formData || {
            selectedCombination: ''
        },
        mode: "onChange"
    });

    const { combinationId } = useParams();
    const { data: combinations, isLoading } = useGetCombinationByLevels(combinationId as string);

    // When form data changes externally, update the form
    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            form.reset(formData);
        }
    }, [formData, form]);

    useEffect(() => {
        if (combinations && combinations.length > 0) {
            // Extract unique categories from combinations
            const uniqueCategories = Array.from(new Set(combinations.map(item => item?.category)));
            setCategories(uniqueCategories);
            
            // Set the first category as selected by default
            if (uniqueCategories.length > 0 && !selectedCategory) {
                setSelectedCategory(uniqueCategories[0]);
            }
        }
    }, [combinations, selectedCategory]);

    const { watch, setValue } = form;
    const selectedCombination = watch('selectedCombination');

    // Update parent form data when the form changes
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (Object.keys(value).some(key => value[key] !== undefined)) {
                updateFormData(value);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, updateFormData]);

    // Filter combinations based on selected category and search query
    const filteredCombinations = combinations?.filter(item =>
        (!selectedCategory || item?.category === selectedCategory) &&
        (searchQuery === '' || 
            item?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item?.code?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ) || [];

    // Get count of combinations per category
    const getCategoryItemCount = (category) => {
        return combinations?.filter(item => item?.category === category).length || 0;
    };

    // Get category icon
    const getCategoryIcon = (category) => {
        if (category?.includes('SCIENCE')) {
            return <Beaker className="w-5 h-5 text-emerald-600" />;
        } else if (category?.includes('HUMANIT')) {
            return <BookOpen className="w-5 h-5 text-teal-600" />;
        } else if (category?.includes('LANGUAGE')) {
            return <Languages className="w-5 h-5 text-violet-600" />;
        } else {
            return <Beaker className="w-5 h-5 text-gray-600" />;
        }
    };

    // Format category name for display
    const formatCategoryName = (category) => {
        return category
            ?.replace('_COMBINATIONS', '')
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    // Get category color
    const getCategoryColor = (category) => {
        if (category?.includes('SCIENCE')) {
            return selectedCategory === category 
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400' 
                : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200';
        } else if (category?.includes('HUMANIT')) {
            return selectedCategory === category 
                ? 'bg-teal-50 border-teal-400 ring-2 ring-teal-400' 
                : 'bg-teal-50 hover:bg-teal-100 border-teal-200';
        } else if (category?.includes('LANGUAGE')) {
            return selectedCategory === category 
                ? 'bg-violet-50 border-violet-400 ring-2 ring-violet-400' 
                : 'bg-violet-50 hover:bg-violet-100 border-violet-200';
        } else {
            return selectedCategory === category 
                ? 'bg-gray-50 border-gray-400 ring-2 ring-gray-400' 
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200';
        }
    };

    // Get combination color based on its category
    const getCombinationColor = (category) => {
        if (category?.includes('SCIENCE')) {
            return 'from-emerald-50 to-emerald-100 border-emerald-200';
        } else if (category?.includes('HUMANIT')) {
            return 'from-teal-50 to-teal-100 border-teal-200';
        } else if (category?.includes('LANGUAGE')) {
            return 'from-violet-50 to-violet-100 border-violet-200';
        } else {
            return 'from-gray-50 to-gray-100 border-gray-200';
        }
    };

    // Handle select all combinations
    const handleSelectAll = () => {
        if (filteredCombinations.length > 0) {
            setValue('selectedCombination', filteredCombinations[0]?.id, { 
                shouldValidate: true,
                shouldDirty: true
            });
        }
    };

    // Handle clear all selections
    const handleClearAll = () => {
        setValue('selectedCombination', '', { 
            shouldValidate: true,
            shouldDirty: true
        });
    };

    // Handle form submission
    const handleFormSubmit = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            const formValues = form.getValues();
            updateFormData(formValues);
            await onNext();
        }
    };

    return (
        <div className='space-y-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 mb-2">
                    {isLoading ? (
                        <div className="flex justify-center p-6">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">
                                Select {selectedCategory ? formatCategoryName(selectedCategory) : ''} Category
                            </h2>

                            {/* Categories horizontal scrolling */}
                            <div className="relative">
                                <div className="overflow-x-auto pb-2">
                                    <div className="flex gap-2 min-w-max p-1">
                                        {categories.map((category) => (
                                            <div
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`p-3 rounded-lg cursor-pointer border transition-all duration-200 
                                                min-w-[150px] group ${getCategoryColor(category)}`}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getCategoryIcon(category)}
                                                    <h4 className="font-medium capitalize text-sm">
                                                        {formatCategoryName(category)}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-500">
                                                        {getCategoryItemCount(category)} items
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

                            {/* Search input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search items..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Select All / Clear All buttons */}
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

                            {/* Custom card-based selection replacing RadioGroup */}
                            <p className='text-sm text-gray-500'>Select one of the following items and click next to continue</p>
                            <FormField
                                control={form.control}
                                name="selectedCombination"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormMessage />
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            {filteredCombinations?.map((item) => {
                                                const isSelected = field.value === item?.id;

                                                return (
                                                    <div 
                                                        key={item?.id}
                                                        onClick={() => field.onChange(item?.id)}
                                                        className={cn(
                                                            "relative bg-white border rounded-xs p-4 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl",
                                                            isSelected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-gray-300"
                                                        )}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute top-3 right-3">
                                                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                                            </div>
                                                        )}
                                                        <div className="flex items-center mb-2">
                                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <div className="ml-3 flex flex-col">
                                                                <div className="flex items-center gap-2">
                                                                      <h3 className="font-medium mt-1 text-lg">{item?.fullName}</h3>
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        ({item?.shortName})
                                                                    </span>
                                                                </div>
                                                                <p className='text-sm text-gray-500 line-clamp-2 my-1'>{item?.description || 'No description available'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormItem>
                                )}
                            />
                            
                            {/* Item count display */}
                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="text-sm text-gray-500">
                                    {selectedCombination ? '1' : '0'} items selected
                                </span>
                                
                                <div className="flex gap-2">
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
                                        onClick={handleFormSubmit}
                                        disabled={!selectedCombination || isSubmitting}
                                        className="flex items-center gap-2 hover:cursor-pointer"
                                    >
                                        Next <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
}
