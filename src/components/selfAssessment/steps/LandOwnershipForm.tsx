'use client';

import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronRight, ClipboardList, FileCheck, Building, Loader2, FileIcon, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { landOwnershipSchema, createDynamicLandOwnershipSchema } from '../types/schema';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCriteriaorByAreaId, useGetIndicatorsByCriteriaId } from '@/hooks/useStandard';
import { FileUpload } from '../FileUpload';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
    [key: string]: string | File | null;
}

interface LandOwnershipFormProps {
    formData: any;
    updateFormData: (data: any) => void;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: (data: any) => void;
    areaId: string;
}

export const LandOwnershipForm = ({
    formData: parentFormData,
    updateFormData,
    onPrevious,
    onNext,
    onSubmit,
    areaId
}: LandOwnershipFormProps) => {
    const { data: criteria, isLoading: criteriaLoading } = useGetCriteriaorByAreaId(areaId);
    
    // State for the selected criteria
    const [selectedCriteria, setSelectedCriteria] = useState<string | null>(null);
    const [selectedCriteriaId, setSelectedCriteriaId] = useState<string | null>(null);
    const [currentIndicator, setCurrentIndicator] = useState<number>(0);
    const [formFields, setFormFields] = useState<string[]>([]);
    const [dynamicSchema, setDynamicSchema] = useState(landOwnershipSchema);
    const [documentUploads, setDocumentUploads] = useState<Record<string, File | null>>({});
    const [uploadingDocuments, setUploadingDocuments] = useState<Record<string, boolean>>({});
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [incompleteFieldsVisible, setIncompleteFieldsVisible] = useState<boolean>(true);
    const { toast } = useToast();
    
    // Fetch indicators based on selected criteria
    const { data: indicators, isLoading: indicatorsLoading } = useGetIndicatorsByCriteriaId(
        selectedCriteriaId || ''
    );
    
    // Initialize form with dynamic schema
    const form = useForm<FormData>({
        resolver: zodResolver(dynamicSchema),
        defaultValues: parentFormData || {},
        mode: "onChange",
    });

    // Initialize the first selected criteria when data loads
    useEffect(() => {
        if (criteria && criteria.length > 0 && !selectedCriteria) {
            setSelectedCriteria(criteria[0].name);
            setSelectedCriteriaId(criteria[0].id);
        }
    }, [criteria, selectedCriteria]);

    // Update form fields when indicators change
    useEffect(() => {
        if (indicators && indicators.length > 0) {
            const indicatorIds = indicators.map(indicator => indicator.id);
            setFormFields(indicatorIds);
            
            // Save current form values before changing schema
            const currentValues = form.getValues();
            
            // Update schema with new indicator fields
            setDynamicSchema(createDynamicLandOwnershipSchema(indicatorIds));
            
            // Reset form with new schema while preserving existing values
            form.reset({ ...parentFormData, ...currentValues }, { keepValues: true });
            
            // Initialize document fields in form
            const initialDocuments: Record<string, File | null> = {};
            indicators.forEach(indicator => {
                if (indicator.documentRequired) {
                    const docFieldName = `${indicator.id}_document`;
                    initialDocuments[docFieldName] = null;
                }
            });
            setDocumentUploads(prev => ({...prev, ...initialDocuments}));
        }
    }, [indicators, form, parentFormData]);
    
    // Check if there are validation errors in the current view - MOVED AFTER FORM INIT
    useEffect(() => {
        const checkIfErrorsAreVisible = () => {
            // Get all error message elements
            const errorElements = document.querySelectorAll('[role="alert"]');
            if (errorElements.length === 0) {
                setIncompleteFieldsVisible(true);
                return;
            }

            // Check if any error is hidden behind the sticky navigation bar
            let allErrorsVisible = true;
            errorElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.bottom <= window.innerHeight - 70 // 70px is approx height of sticky bar
                );
                if (!isVisible) {
                    allErrorsVisible = false;
                }
            });
            
            setIncompleteFieldsVisible(allErrorsVisible);
        };

        // Add scroll event listener to check error visibility
        window.addEventListener('scroll', checkIfErrorsAreVisible);
        
        // Also check on initial render and when form errors change
        checkIfErrorsAreVisible();
        
        return () => {
            window.removeEventListener('scroll', checkIfErrorsAreVisible);
        };
    }, [form.formState.errors]);

    // Watch all form fields for real-time updates
    const formData = form.watch();

    const onSubmitForm = (data: FormData) => {
        // Merge document uploads with form data
        const mergedData = {
            ...data,
            ...documentUploads
        };
        onSubmit(mergedData);
    };

    // Handle file upload
    const handleFileUpload = (indicatorId: string, file: File | null) => {
        const docFieldName = `${indicatorId}_document`;
        setDocumentUploads(prev => ({
            ...prev,
            [docFieldName]: file
        }));
        
        // Mock upload process for demonstration
        if (file) {
            mockFileUpload(docFieldName, file);
        } else {
            setUploadingDocuments(prev => ({...prev, [docFieldName]: false}));
            setUploadProgress(prev => ({...prev, [docFieldName]: 0}));
        }
    };

    // Mock file upload with progress
    const mockFileUpload = (docFieldName: string, file: File) => {
        setUploadingDocuments(prev => ({...prev, [docFieldName]: true}));
        setUploadProgress(prev => ({...prev, [docFieldName]: 0}));
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(prev => ({...prev, [docFieldName]: progress}));
            
            if (progress >= 100) {
                clearInterval(interval);
                setUploadingDocuments(prev => ({...prev, [docFieldName]: false}));
            }
        }, 300);
    };

    // Get the current indicator field name
    const getCurrentIndicatorFieldName = () => {
        if (indicators && indicators.length > 0 && indicators[currentIndicator]) {
            return indicators[currentIndicator].id;
        }
        return '';
    };

    // Get indicator count for selected criteria
    const getIndicatorCountForCriteria = () => {
        return indicators?.length || 0;
    };

    // Check if we're on the last criteria group
    const isLastCriteriaGroup = () => {
        if (!criteria) return false;
        const index = criteria.findIndex(c => c.name === selectedCriteria);
        return index === criteria.length - 1;
    };

    // Get the next criteria group
    const getNextCriteriaGroup = () => {
        if (!criteria) return null;
        const currentIndex = criteria.findIndex(c => c.name === selectedCriteria);
        if (currentIndex < criteria.length - 1) {
            return criteria[currentIndex + 1];
        }
        return null;
    };

    // Get the current indicator title with safety checks
    const getCurrentIndicatorTitle = () => {
        if (!indicators || indicators.length === 0 || currentIndicator === undefined || currentIndicator < 0 || currentIndicator >= indicators.length) {
            return '';
        }
        return indicators[currentIndicator]?.name || '';
    };

    // Render the indicator options with improved safety checks
    const renderIndicators = () => {
        if (criteriaLoading || indicatorsLoading) {
            return (
                <Card className="p-6 flex justify-center items-center min-h-[200px]">
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                        <p>Loading indicators...</p>
                    </div>
                </Card>
            );
        }

        if (!indicators || indicators.length === 0) {
            return (
                <Card className="p-6">
                    <p className="text-center text-gray-500">No indicators available for this criteria</p>
                </Card>
            );
        }

        // Safety check to ensure currentIndicator is within bounds
        const safeCurrentIndicator = Math.min(
            Math.max(0, currentIndicator), 
            indicators.length - 1
        );
        
        const currentIndicatorItem = indicators[safeCurrentIndicator];
        if (!currentIndicatorItem) {
            return (
                <Card className="p-6">
                    <p className="text-center text-gray-500">Indicator information not available</p>
                </Card>
            );
        }
        
        const currentIndicatorId = currentIndicatorItem.id;
        const indicatorOptions = currentIndicatorItem.standardOption || [];
        const requiresDocument = currentIndicatorItem.documentRequired;
        const docFieldName = `${currentIndicatorId}_document`;

        return (
            <Card className="p-6 rounded-lg shadow-none border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">
                    {safeCurrentIndicator + 1}. {currentIndicatorItem.name}
                </h3>
                <FormField
                    control={form.control}
                    name={currentIndicatorId}
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage className="border border-red-300 mb-2 p-3 rounded-md bg-red-200 flex items-center gap-2 text-red-800" />
                            <FormControl>
                                <RadioGroup
                                    value={field.value as string}
                                    onValueChange={field.onChange}
                                    className="space-y-3"
                                >
                                    {indicatorOptions.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.id} id={option.id} />
                                            <Label htmlFor={option.id}>{option.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Document Upload section */}
                {requiresDocument && (
                    <FileUpload
                        name={docFieldName}
                        onFileChange={(file) => handleFileUpload(currentIndicatorId, file)}
                        value={documentUploads[docFieldName] || null}
                        className="rounded-lg shadow-none border border-gray-200"
                        label="Supporting Document"
                        description="Please upload relevant documentation to support your selection"
                        isRequired={false}
                        isUploading={uploadingDocuments[docFieldName]}
                        progress={uploadProgress[docFieldName]}
                    />
                )}
            </Card>
        );
    };

    // Handle next button click
    const handleNextButtonClick = async () => {
        const currentFieldName = getCurrentIndicatorFieldName();
        if (!currentFieldName) return;

        const isValid = await form.trigger(currentFieldName);
        const currentIndicatorData = indicators?.[currentIndicator];
        
        // Check if document is required but not uploaded
        const docFieldName = `${currentFieldName}_document`;
        const isDocumentRequired = currentIndicatorData?.documentRequired;
        // eslint-disable-next-line max-lines
        const isDocumentUploaded = Boolean(documentUploads[docFieldName]);
        
        if (isDocumentRequired && !isDocumentUploaded) {
            // Show document upload error
            toast({
                title: "Document Required",
                description: "Please upload the required supporting document",
                status: "error",
            })
            return;
        }

        if (isValid) {
            if (currentIndicator === getIndicatorCountForCriteria() - 1) {
                // We've completed all indicators in this criteria
                if (isLastCriteriaGroup()) {
                    // This is the last criteria group, submit the form
                    const allValid = await form.trigger();
                    // eslint-disable-next-line max-depth
                    if (allValid) {
                        // Update parent form data and go to next step
                        updateFormData({
                            ...form.getValues(),
                            ...documentUploads
                        });
                        onNext();
                    }
                } else {
                    // Move to the next criteria group
                    const nextGroup = getNextCriteriaGroup();
                    // eslint-disable-next-line max-depth
                    if (nextGroup) {
                        setSelectedCriteria(nextGroup.name);
                        setSelectedCriteriaId(nextGroup.id);
                        setCurrentIndicator(0);
                    }
                }
            } else {
                // Move to the next indicator within the current criteria
                setCurrentIndicator(prev => prev + 1);
            }
        }
    };

    const hasPreviousCriteria = (currentIndicatorIndex: number) => {
        return currentIndicatorIndex > 0;
    };

    // If still loading criteria data, show loading state
    if (criteriaLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading criteria...</span>
            </div>
        );
    }

    return (
        <div className='space-y-6 pb-20'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-2">
                        <div className="space-y-3 p-3 md:p-4 bg-blue-50 rounded-lg">
                            {criteria && criteria.map((criterion) => (
                                <div
                                    key={criterion.id}
                                    className={`flex items-center gap-3 p-3 md:p-4 bg-white/80 rounded-xs cursor-pointer hover:bg-gray-50 
                                        ${selectedCriteria === criterion.name ? 'ring-2 ring-primary' : ''}`}
                                    onClick={() => {
                                        setSelectedCriteria(criterion.name);
                                        setSelectedCriteriaId(criterion.id);
                                        setCurrentIndicator(0);
                                    }}
                                >
                                    <div className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 min-w-[28px] md:min-w-[32px] rounded-full
                                        ${selectedCriteria === criterion.name ? 'bg-primary text-white' : 'bg-blue-100 text-primary'} 
                                        font-semibold`}
                                    >
                                        {criterion.name === 'Classrooms' ? (
                                            <Building className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                        ) : (
                                            <ClipboardList className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm md:text-base font-medium">{criterion.name}</h2>
                                        <p className="text-xs md:text-sm text-gray-500 truncate">
                 Complete the indicators for this criteria
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-2">
                            {renderIndicators()}
                        </div>
                    </div>

                    {/* Error notification that appears when incomplete fields are not visible */}
                    {!incompleteFieldsVisible && Object.keys(form.formState.errors).length > 0 && (
                        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                            <div className="bg-red-50 text-red-800 px-4 py-2 rounded-full shadow-lg border border-red-200 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">Scroll up to see incomplete fields</span>
                            </div>
                        </div>
                    )}

                    {/* Sticky navigation buttons */}
                    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t px-30 border-gray-200 p-4 flex justify-between items-center shadow-lg">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (hasPreviousCriteria(currentIndicator)) {
                                    // Go to previous criteria
                                    setCurrentIndicator(currentIndicator - 1);
                                } else {
                                    // If no previous criteria, go to previous step
                                    onPrevious();
                                }
                            }}
                            className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4 hover:cursor-pointer"
                        >
                            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            Previous
                        </Button>

                        <div className="flex items-center">
                            {/* Show indicator of current section */}
                            <span className="text-sm text-gray-500 mr-3">
                                {selectedCriteria?.toUpperCase()} - {currentIndicator + 1}/{getIndicatorCountForCriteria()}
                            </span>
                        </div>

                        <Button
                            type="button"
                            onClick={handleNextButtonClick}
                            className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4 hover:cursor-pointer"
                        >
                            {isLastCriteriaGroup() && currentIndicator === getIndicatorCountForCriteria() - 1
                                ? 'Next Step'
                                : 'Next'} <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

