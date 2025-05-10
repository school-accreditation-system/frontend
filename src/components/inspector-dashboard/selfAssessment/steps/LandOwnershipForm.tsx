/* eslint-disable max-depth */
/* eslint-disable max-lines */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetCriteriaByAreaId,
  useGetIndicatorsByCriteriaId,
} from "@/hooks/useStandard";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Building,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUpload } from "../FileUpload";
import {
  createDynamicLandOwnershipSchema,
  landOwnershipSchema,
} from "../types/schema";
import axios from "axios";

interface FormData {
  [key: string]: string | File | null;
}

interface LandOwnershipFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrevious: () => void;
  onNext: () => Promise<boolean>;
  onSubmit: () => void;
  isSubmitting: boolean;
  currentStep: number;
  areaId: string;
}

export const LandOwnershipForm = ({
  formData: parentFormData,
  updateFormData,
  onNext,
  isSubmitting,
  areaId,
}: LandOwnershipFormProps) => {
  const { data: criteria, isLoading: criteriaLoading } =
    useGetCriteriaByAreaId(areaId);
  const [selectedCriteria, setSelectedCriteria] = useState<string | null>(null);
  const [selectedCriteriaId, setSelectedCriteriaId] = useState<string | null>(
    null
  );
  const [currentIndicator, setCurrentIndicator] = useState<number>(0);
  const [dynamicSchema, setDynamicSchema] = useState(landOwnershipSchema);
  const [documentUploads, setDocumentUploads] = useState<
    Record<string, File | null>
  >({});
  const [uploadingDocuments, setUploadingDocuments] = useState<
    Record<string, boolean>
  >({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [incompleteFieldsVisible, setIncompleteFieldsVisible] =
    useState<boolean>(true);
  const [allCriteriaCompleted, setAllCriteriaCompleted] =
    useState<boolean>(false);
  const uploadedFilesRef = useRef<Set<string>>(new Set());
  const initialLoadRef = useRef<boolean>(true);
  const { toast } = useToast();

  // Debug state (only in development)
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Fetch indicators based on selected criteria
  const { data: indicators, isLoading: indicatorsLoading } =
    useGetIndicatorsByCriteriaId(selectedCriteriaId || "");

  // Initialize form with dynamic schema
  const form = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: parentFormData || {},
    mode: "onChange",
  });

  // If criteria finished loading and there are no criteria, go to next step
  if (!criteriaLoading && criteria && criteria.length === 0) {
    setCurrentStep(currentStep + 1);
  }

  // Combine initial data loading with form reset
  useEffect(() => {
    if (parentFormData) {
      // Handle initial document fields extraction
      if (initialLoadRef.current) {
        const documentFields = {};
        Object.entries(parentFormData).forEach(([key, value]) => {
          if (key.endsWith("_document") && value) {
            documentFields[key] = value;
            uploadedFilesRef.current.add(
              `${key}-${(value as File)?.name || "file"}`
            );
          }
        });

        if (Object.keys(documentFields).length > 0) {
          setDocumentUploads(documentFields);
        }
        initialLoadRef.current = false;
      }

      // Update form values
      form.reset({ ...form.getValues(), ...parentFormData });
    }
  }, [parentFormData, form]);

  // Combine form data watching, validation, and parent data updates
  useEffect(() => {
    // Set up form watcher
    const subscription = form.watch((value) => {
      if (Object.keys(value).length > 0) {
        const formValues = { ...value, ...documentUploads };

        // Only update parent if values changed
        if (JSON.stringify(formValues) !== JSON.stringify(parentFormData)) {
          updateFormData(formValues);
        }

        // Update debug info
        if (process.env.NODE_ENV === "development") {
          setDebugInfo(
            JSON.stringify(
              {
                formValues: value,
                documentUploads,
                mergedData: formValues,
              },
              null,
              2
            )
          );
        }
      }
    });

    // Clean up subscription
    return () => subscription.unsubscribe();
  }, [form, documentUploads, parentFormData, updateFormData]);

  // Initialize the first selected criteria
  useEffect(() => {
    if (criteria && criteria.length > 0 && !selectedCriteria) {
      setSelectedCriteria(criteria[0].name);
      setSelectedCriteriaId(criteria[0].id);
    }
  }, [criteria, selectedCriteria]);

  // Update form fields when indicators change
  useEffect(() => {
    if (!indicators || indicators.length === 0) return;

    const indicatorIds = indicators.map((indicator) => indicator.id);

    // Save current values
    const currentValues = form.getValues();

    // Update schema
    setDynamicSchema(createDynamicLandOwnershipSchema(indicatorIds));

    // Reset form with new schema while preserving values
    form.reset({ ...parentFormData, ...currentValues }, { keepValues: true });

    // Initialize document fields
    const initialDocuments: Record<string, File | null> = {};
    let hasNewDocumentFields = false;

    indicators.forEach((indicator) => {
      if (indicator.documentRequired) {
        const docFieldName = `${indicator.id}_document`;
        if (documentUploads[docFieldName] === undefined) {
          initialDocuments[docFieldName] = null;
          hasNewDocumentFields = true;
        }
      }
    });

    if (hasNewDocumentFields) {
      setDocumentUploads((prev) => ({ ...prev, ...initialDocuments }));
    }
  }, [indicators, form, parentFormData]);

  // Safe update function to avoid loops
  const safeUpdateFormData = useCallback(
    (data: any) => {
      if (JSON.stringify(data) !== JSON.stringify(parentFormData)) {
        updateFormData(data);
      }
    },
    [updateFormData, parentFormData]
  );

  // Check if errors are visible
  useEffect(() => {
    const checkIfErrorsAreVisible = () => {
      const errorElements = document.querySelectorAll('[role="alert"]');
      if (errorElements.length === 0) {
        setIncompleteFieldsVisible(true);
        return;
      }

      let allErrorsVisible = true;
      errorElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 && rect.bottom <= window.innerHeight - 70;
        if (!isVisible) {
          allErrorsVisible = false;
        }
      });

      setIncompleteFieldsVisible(allErrorsVisible);
    };

    window.addEventListener("scroll", checkIfErrorsAreVisible);
    checkIfErrorsAreVisible();

    return () => {
      window.removeEventListener("scroll", checkIfErrorsAreVisible);
    };
  }, [form.formState.errors]);

  const onSubmitForm = async (data: FormData) => {
    const mergedData = {
      ...data,
      ...documentUploads,
    };

    safeUpdateFormData(mergedData);

    if (allCriteriaCompleted) {
      await onNext();
    }
  };

  // Handle file upload
  const handleFileUpload = useCallback(
    (indicatorId: string, file: File | null) => {
      const docFieldName = `${indicatorId}_document`;
      const fileKey = `${docFieldName}-${file?.name || "null"}`;
      const isNewUpload = file && !uploadedFilesRef.current.has(fileKey);

      // Update document uploads
      setDocumentUploads((prev) => ({
        ...prev,
        [docFieldName]: file,
      }));

      // Update parent form data
      const formValues = form.getValues();
      safeUpdateFormData({
        ...formValues,
        [docFieldName]: file,
      });

      // Handle file upload UI
      if (file) {
        if (isNewUpload) {
          uploadedFilesRef.current.add(fileKey);
          toast({
            title: "File Uploaded",
            description: `${file.name} has been uploaded successfully.`,
            status: "info",
          });
        }
        mockFileUpload(docFieldName, file);
      } else {
        uploadedFilesRef.current.delete(fileKey.replace("-null", ""));
        setUploadingDocuments((prev) => ({ ...prev, [docFieldName]: false }));
        setUploadProgress((prev) => ({ ...prev, [docFieldName]: 0 }));
      }
    },
    [form, safeUpdateFormData, toast]
  );

  // Mock file upload with progress
  const mockFileUpload = (docFieldName: string, file: File) => {
    setUploadingDocuments((prev) => ({ ...prev, [docFieldName]: true }));
    setUploadProgress((prev) => ({ ...prev, [docFieldName]: 0 }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [docFieldName]: progress }));

      if (progress >= 100) {
        clearInterval(interval);
        setUploadingDocuments((prev) => ({ ...prev, [docFieldName]: false }));
      }
    }, 300);
  };

  // Helper functions for indicators and criteria
  const getCurrentIndicatorFieldName = () => {
    if (indicators && indicators.length > 0 && indicators[currentIndicator]) {
      return indicators[currentIndicator].id;
    }
    return "";
  };

  const getIndicatorCountForCriteria = () => {
    return indicators?.length || 0;
  };

  const isLastCriteriaGroup = () => {
    if (!criteria) return false;
    const index = criteria.findIndex((c) => c.name === selectedCriteria);
    return index === criteria.length - 1;
  };

  const getNextCriteriaGroup = () => {
    if (!criteria) return null;
    const currentIndex = criteria.findIndex((c) => c.name === selectedCriteria);
    if (currentIndex < criteria.length - 1) {
      return criteria[currentIndex + 1];
    }
    return null;
  };

  // Enhanced validation to verify each indicator has a valid option selected
  const validateCurrentCriteria = async () => {
    if (!indicators || indicators.length === 0) return true;

    // Get all indicator IDs for the current criteria
    const currentCriteriaIndicatorIds = indicators.map((ind) => ind.id);

    // Get current form values
    const formValues = form.getValues();

    // Check if any indicators are missing values
    const missingIndicators = currentCriteriaIndicatorIds.filter(
      (id) => !formValues[id]
    );

    if (missingIndicators.length > 0) {
      // Find the index of the first missing indicator
      const firstMissingIndex = currentCriteriaIndicatorIds.findIndex(
        (id) => !formValues[id]
      );

      // Navigate to the first missing indicator
      if (firstMissingIndex !== -1) {
        setCurrentIndicator(firstMissingIndex);

        // Show error toast
        toast({
          title: "Incomplete Questions",
          description:
            "Please answer all questions in this criteria before proceeding",
          status: "error",
        });

        return false;
      }
    }

    // Verify that each selected value is a valid option for its indicator
    let invalidSelection = false;
    let invalidIndicatorIndex = -1;

    for (let i = 0; i < indicators.length; i++) {
      const indicator = indicators[i];
      const selectedValue = formValues[indicator.id];

      if (selectedValue) {
        // Check if the selected value is among the valid options for this indicator
        const validOptions =
          indicator.standardOption?.map((opt) => opt.id) || [];
        if (!validOptions.includes(selectedValue)) {
          invalidSelection = true;
          invalidIndicatorIndex = i;
          break;
        }
      }
    }

    if (invalidSelection && invalidIndicatorIndex >= 0) {
      setCurrentIndicator(invalidIndicatorIndex);
      toast({
        title: "Invalid Selection",
        description:
          "One of your selections is not valid for its question. Please select a valid option.",
        status: "error",
      });
      return false;
    }

    // Validate all fields in the criteria (this will check other validation rules)
    const allFieldsValid = await form.trigger(currentCriteriaIndicatorIds);
    if (!allFieldsValid) {
      // There are other validation errors
      toast({
        title: "Invalid Answers",
        description:
          "Some questions have invalid answers. Please review and correct them.",
        status: "error",
      });
      return false;
    }

    return true;
  };

  // Modified handleNextButtonClick to enforce stricter validation
  const handleNextButtonClick = async () => {
    const currentFieldName = getCurrentIndicatorFieldName();
    if (!currentFieldName) return;

    // Get the current indicator and its valid options
    const currentIndicatorItem = indicators?.[currentIndicator];
    if (!currentIndicatorItem) return;

    const validOptions =
      currentIndicatorItem.standardOption?.map((opt) => opt.id) || [];
    const selectedValue = form.getValues()[currentFieldName];

    // Check if selection is valid for this specific indicator
    if (selectedValue && !validOptions.includes(selectedValue)) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid option for this question",
        status: "error",
      });
      return;
    }

    // Validate current field
    const currentFieldValid = await form.trigger(currentFieldName);

    if (!currentFieldValid) {
      // Show error toast if the current field is invalid
      toast({
        title: "Required Field",
        description:
          "Please select an option for this question before proceeding",
        status: "error",
      });
      return;
    }

    // Save data
    const formValues = form.getValues();
    safeUpdateFormData({
      ...formValues,
      ...documentUploads,
    });

    if (currentIndicator < getIndicatorCountForCriteria() - 1) {
      // Move to next indicator
      setCurrentIndicator((prev) => prev + 1);
    } else {
      // At the last indicator - validate all in criteria
      const allCurrentCriteriaValid = await validateCurrentCriteria();

      if (!allCurrentCriteriaValid) {
        return;
      }

      // All fields in current criteria valid - proceed
      if (isLastCriteriaGroup()) {
        // Validate all criteria before completing
        let allValid = true;
        let missingCriteria = null;
        let invalidSelectionFound = false;

        // Manually validate each criteria group
        if (criteria) {
          for (const criterion of criteria) {
            // Get indicators for this criteria
            const criteriaIndicators = await (async () => {
              try {
                const response = await axios.get(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/standard/findByArea?indicator=${criterion.id}`,
                  {
                    headers: {
                      "qamis-request-key":
                        process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY,
                      "Content-Type": "application/json",
                    },
                  }
                );
                return response.data;
              } catch (error) {
                console.error(
                  `Failed to fetch indicators for criteria ${criterion.id}:`,
                  error
                );
                return [];
              }
            })();

            if (!criteriaIndicators || criteriaIndicators.length === 0)
              continue;

            const criteriaIndicatorIds = criteriaIndicators.map(
              (ind) => ind.id
            );

            // Check if all indicators in this criteria have values
            const values = form.getValues();
            const missingFields = criteriaIndicatorIds.filter(
              (id) => !values[id]
            );

            if (missingFields.length > 0) {
              allValid = false;
              missingCriteria = criterion;
              break;
            }

            // Verify selections are valid for each indicator
            for (const indicator of criteriaIndicators) {
              const selectedValue = values[indicator.id];
              if (selectedValue) {
                const validOptions =
                  indicator.standardOption?.map((opt) => opt.id) || [];
                if (!validOptions.includes(selectedValue)) {
                  allValid = false;
                  missingCriteria = criterion;
                  invalidSelectionFound = true;
                  break;
                }
              }
            }

            if (!allValid) break;
          }
        }

        if (allValid) {
          // Final validation using Zod schema
          const zodValid = await form.trigger();

          if (zodValid) {
            setAllCriteriaCompleted(true);
            // Ensure all data is saved before navigating
            const currentValues = form.getValues();
            safeUpdateFormData({
              ...currentValues,
              ...documentUploads,
            });
            console.log("Moving to next step with data:", {
              ...currentValues,
              ...documentUploads,
            });
            // Now navigate to next step
            await onNext();
          } else {
            toast({
              title: "Form Validation Error",
              description:
                "There are validation errors in the form. Please check all fields.",
              status: "error",
            });
          }
        } else if (missingCriteria) {
          // Navigate to the criteria with missing fields
          const message = invalidSelectionFound
            ? "Some questions have invalid selections. Please review your answers."
            : "Please complete all questions in this criteria.";

          toast({
            title: "Incomplete Assessment",
            description: `${message} (${missingCriteria.name})`,
            status: "error",
          });

          handleCriteriaChange(missingCriteria.name, missingCriteria.id);
        }
      } else {
        // Move to next criteria group
        const nextGroup = getNextCriteriaGroup();
        if (nextGroup) {
          setSelectedCriteria(nextGroup.name);
          setSelectedCriteriaId(nextGroup.id);
          setCurrentIndicator(0);
        }
      }
    }
  };

  // Update criteria change handler to enforce validation
  const handleCriteriaChange = async (
    criterionName: string,
    criterionId: string
  ) => {
    // Only validate if switching from a criteria (not on initial load)
    if (selectedCriteriaId && selectedCriteriaId !== criterionId) {
      const isValid = await validateCurrentCriteria();

      if (!isValid) {
        return; // Prevent navigation if validation fails
      }
    }

    // Change to new criteria
    setSelectedCriteria(criterionName);
    setSelectedCriteriaId(criterionId);
    setCurrentIndicator(0);
  };

  // Update the renderIndicators function to reset potentially invalid selections
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
          <p className="text-center text-gray-500">
            No indicators available for this criteria
          </p>
        </Card>
      );
    }

    // Safety check for indicator bounds
    const safeCurrentIndicator = Math.min(
      Math.max(0, currentIndicator),
      indicators.length - 1
    );

    const currentIndicatorItem = indicators[safeCurrentIndicator];
    if (!currentIndicatorItem) {
      return (
        <Card className="p-6">
          <p className="text-center text-gray-500">
            Indicator information not available
          </p>
        </Card>
      );
    }

    const currentIndicatorId = currentIndicatorItem.id;
    const indicatorOptions = currentIndicatorItem.standardOption || [];
    const requiresDocument = currentIndicatorItem.documentRequired;
    const docFieldName = `${currentIndicatorId}_document`;

    // Get the current value for this indicator
    const currentValue = form.getValues()[currentIndicatorId];

    // Check if the current value is valid for this indicator
    const validOptionIds = indicatorOptions.map((opt) => opt.id);
    const isCurrentValueValid =
      !currentValue || validOptionIds.includes(currentValue);

    // If the current value is not valid for this indicator, reset it
    if (currentValue && !isCurrentValueValid) {
      form.setValue(currentIndicatorId, "");
    }

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
                  value={isCurrentValueValid ? (field.value as string) : ""}
                  onValueChange={field.onChange}
                  className="space-y-3"
                  required
                >
                  {indicatorOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex hover:cursor-pointer hover:text-primary items-center space-x-2"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              {!field.value && (
                <div className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  This field is required
                </div>
              )}
              {field.value && !isCurrentValueValid && (
                <div className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Please select a valid option for this question
                </div>
              )}
            </FormItem>
          )}
        />

        {/* Document Upload section */}
        {requiresDocument && (
          <>
            <FileUpload
              name={docFieldName}
              onFileChange={(file) =>
                handleFileUpload(currentIndicatorId, file)
              }
              value={documentUploads[docFieldName] || null}
              className="rounded-lg shadow-none border border-gray-200"
              label="Supporting Document"
              description="Please upload relevant documentation to support your selection"
              isRequired={false}
              isUploading={uploadingDocuments[docFieldName]}
              progress={uploadProgress[docFieldName]}
            />
            {documentUploads[docFieldName] && (
              <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                File uploaded and will be saved with your submission
              </div>
            )}
          </>
        )}
      </Card>
    );
  };

  // Modify the loading state check
  if (criteriaLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <span className="ml-2">Loading criteria...</span>
      </div>
    );
  }

  // Add this check right after the loading check
  if (!criteriaLoading && (!criteria || criteria.length === 0)) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-gray-500 mb-4">
          No indicators available for this criteria
        </p>
        <Button
          onClick={async () => {
            updateFormData({});
            await onNext();
          }}
          className="bg-primary hover:hover:bg-primary/90 text-white flex items-center gap-2"
        >
          Next Criteria <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-6 mb-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-2">
            <div className="space-y-3 p-3 md:p-4 bg-blue-50 rounded-lg">
              {criteria &&
                criteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className={`flex items-center gap-3 p-3 md:p-4 bg-white/80 rounded-xs cursor-pointer hover:bg-gray-50 
                                        ${
                                          selectedCriteria === criterion.name
                                            ? "ring-2 ring-primary"
                                            : ""
                                        }`}
                    onClick={() =>
                      handleCriteriaChange(criterion.name, criterion.id)
                    }
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 min-w-[28px] md:min-w-[32px] rounded-full
                                        ${
                                          selectedCriteria === criterion.name
                                            ? "bg-primary text-white"
                                            : "bg-blue-100 text-primary"
                                        } 
                                        font-semibold`}
                    >
                      {criterion.name === "Classrooms" ? (
                        <Building className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      ) : (
                        <ClipboardList className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm md:text-base font-medium">
                        {criterion.name}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        Complete the indicators for this criteria
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-2">
              {renderIndicators()}

              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  onClick={handleNextButtonClick}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 text-sm py-2 px-3 md:px-4"
                >
                  {isLastCriteriaGroup() &&
                  currentIndicator === getIndicatorCountForCriteria() - 1
                    ? "Next Step"
                    : currentIndicator < getIndicatorCountForCriteria() - 1
                    ? "Next Question"
                    : "Next Criteria"}{" "}
                  <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Debug information */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
              <h4 className="text-sm font-bold mb-2">Debug Information</h4>
              <div className="text-xs overflow-auto max-h-[200px]">
                <pre>{debugInfo}</pre>
              </div>
            </div>
          )}

          {/* Error notification */}
          {!incompleteFieldsVisible &&
            Object.keys(form.formState.errors).length > 0 && (
              <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                <div className="bg-red-50 text-red-800 px-4 py-2 rounded-full shadow-lg border border-red-200 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    Scroll up to see incomplete fields
                  </span>
                </div>
              </div>
            )}
        </form>
      </Form>
    </div>
  );
};
