import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocationDetailsFormValues, locationDetailsSchema } from "../types/schema";
import { useGetProvinces, useGetLocationsByParentCode } from '@/hooks/useLocation';

export interface UseLocationFormProps {
  formData: any;
  updateFormData: (stepId: string, data: any) => void;
  formErrors: Record<string, string[]>;
}

export const useLocationForm = ({ formData, updateFormData, formErrors }: UseLocationFormProps) => {
  const [isAtSchool, setIsAtSchool] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Location codes state for API calls
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | undefined>();
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | undefined>();
  const [selectedSectorCode, setSelectedSectorCode] = useState<string | undefined>();
  const [selectedCellCode, setSelectedCellCode] = useState<string | undefined>();
  
  // Fetch data from the backend using React Query
  const { data: provinces, isLoading: isProvincesLoading } = useGetProvinces();
  const { data: districts, isLoading: isDistrictsLoading } = useGetLocationsByParentCode(selectedProvinceCode);
  const { data: sectors, isLoading: isSectorsLoading } = useGetLocationsByParentCode(selectedDistrictCode);
  const { data: cells, isLoading: isCellsLoading } = useGetLocationsByParentCode(selectedSectorCode);
  const { data: villages, isLoading: isVillagesLoading } = useGetLocationsByParentCode(selectedCellCode);
  
  const stepErrors = formErrors['location-details'] || [];
  
  const form = useForm<LocationDetailsFormValues>({
    resolver: zodResolver(locationDetailsSchema),
    defaultValues: {
      province: formData.province || "",
      district: formData.district || "",
      sector: formData.sector || "",
      cell: formData.cell || "",
      village: formData.village || "",
      latitude: formData.latitude || "",
      longitude: formData.longitude || ""
    },
    mode: "onChange"
  });

  // Initialize location codes from formData if available
  useEffect(() => {
    if (formData.provinceCode) {
      setSelectedProvinceCode(formData.provinceCode);
    }
    if (formData.districtCode) {
      setSelectedDistrictCode(formData.districtCode);
    }
    if (formData.sectorCode) {
      setSelectedSectorCode(formData.sectorCode);
    }
    if (formData.cellCode) {
      setSelectedCellCode(formData.cellCode);
    }
  }, []);

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    // Only reset the form if there's actual data
    if (Object.keys(formData).length > 0) {
      form.reset({
        province: formData.province || "",
        district: formData.district || "",
        sector: formData.sector || "",
        cell: formData.cell || "",
        village: formData.village || "",
        latitude: formData.latitude || "",
        longitude: formData.longitude || ""
      }, { keepValues: true });
    }
  }, [formData, form]);

  // Separate effect for validation to avoid loops
  useEffect(() => {
    // Only trigger validation if there are actual errors
    if (stepErrors.length > 0) {
      const timer = setTimeout(() => {
        form.trigger();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [stepErrors, form]);

  const handleProvinceChange = (value: string, locationCode: string) => {
    form.setValue('province', value, { shouldValidate: true });
    setSelectedProvinceCode(locationCode);
    
    // Reset downstream values
    form.setValue('district', '', { shouldValidate: true });
    form.setValue('sector', '', { shouldValidate: true });
    form.setValue('cell', '', { shouldValidate: true });
    form.setValue('village', '', { shouldValidate: true });
    
    // Reset downstream selected codes
    setSelectedDistrictCode(undefined);
    setSelectedSectorCode(undefined);
    setSelectedCellCode(undefined);
    
    // Update data in context
    updateFormData('location-details', { 
      province: value,
      provinceCode: locationCode,
      district: '',
      districtCode: '',
      sector: '',
      sectorCode: '',
      cell: '',
      cellCode: '',
      village: '' 
    });
  };

  const handleDistrictChange = (value: string, locationCode: string) => {
    form.setValue('district', value, { shouldValidate: true });
    setSelectedDistrictCode(locationCode);
    
    // Reset downstream values
    form.setValue('sector', '', { shouldValidate: true });
    form.setValue('cell', '', { shouldValidate: true });
    form.setValue('village', '', { shouldValidate: true });
    
    // Reset downstream selected codes
    setSelectedSectorCode(undefined);
    setSelectedCellCode(undefined);
    
    // Update data in context
    updateFormData('location-details', { 
      district: value,
      districtCode: locationCode,
      sector: '',
      sectorCode: '',
      cell: '',
      cellCode: '',
      village: '' 
    });
  };

  const handleSectorChange = (value: string, locationCode: string) => {
    form.setValue('sector', value, { shouldValidate: true });
    setSelectedSectorCode(locationCode);
    
    // Reset downstream values
    form.setValue('cell', '', { shouldValidate: true });
    form.setValue('village', '', { shouldValidate: true });
    
    // Reset downstream selected codes
    setSelectedCellCode(undefined);
    
    // Update data in context
    updateFormData('location-details', { 
      sector: value,
      sectorCode: locationCode,
      cell: '',
      cellCode: '',
      village: '' 
    });
  };

  const handleCellChange = (value: string, locationCode: string) => {
    form.setValue('cell', value, { shouldValidate: true });
    setSelectedCellCode(locationCode);
    
    // Reset village selection when cell changes
    form.setValue('village', '', { shouldValidate: true });
    
    // Update data in context
    updateFormData('location-details', { 
      cell: value,
      cellCode: locationCode,
      village: '' 
    });
  };

  const handleVillageChange = (value: string) => {
    form.setValue('village', value, { shouldValidate: true });
    
    // Update data in context
    updateFormData('location-details', { village: value });
  };

  const onFieldChange = useCallback((name: keyof LocationDetailsFormValues, value: any) => {
    // For non-location dropdown fields (like latitude/longitude)
    if (name !== 'province' && name !== 'district' && name !== 'sector' && name !== 'cell' && name !== 'village') {
      const updatedData = { [name]: value } as Partial<LocationDetailsFormValues>;
      form.setValue(name, value, { shouldValidate: true });
      updateFormData('location-details', updatedData);
    }
  }, [form, updateFormData]);

  // Handle checkbox change for geolocation
  const handleIsAtSchoolChange = useCallback((checked: boolean) => {
    setIsAtSchool(checked);
    
    if (checked) {
      // Get current location
      setIsGettingLocation(true);
      setLocationError(null);
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success - update form with coordinates
            const latitude = position.coords.latitude.toString();
            const longitude = position.coords.longitude.toString();
            
            form.setValue("latitude", latitude, { shouldValidate: true });
            form.setValue("longitude", longitude, { shouldValidate: true });
            
            // Update context data
            updateFormData('location-details', {
              latitude,
              longitude
            });
            
            setIsGettingLocation(false);
          },
          (error) => {
            // Error handling
            let errorMessage = "Failed to get location";
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Location access was denied. Please enable location permissions in your browser.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
            }
            setLocationError(errorMessage);
            setIsGettingLocation(false);
            setIsAtSchool(false);
          },
          { 
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
        setIsGettingLocation(false);
        setIsAtSchool(false);
      }
    }
  }, [form, updateFormData]);

  // Check if a field has validation errors
  const hasFieldError = useCallback((fieldName: keyof LocationDetailsFormValues) => {
    return (
      form.formState.errors[fieldName] || 
      stepErrors.some(e => e.toLowerCase().includes(fieldName.toLowerCase()))
    );
  }, [form.formState.errors, stepErrors]);

  return {
    form,
    isAtSchool,
    isGettingLocation,
    locationError,
    provinces,
    districts,
    sectors,
    cells,
    villages,
    isProvincesLoading,
    isDistrictsLoading,
    isSectorsLoading,
    isCellsLoading,
    isVillagesLoading,
    selectedProvinceCode,
    selectedDistrictCode,
    selectedSectorCode,
    selectedCellCode,
    handleProvinceChange,
    handleDistrictChange,
    handleSectorChange,
    handleCellChange,
    handleVillageChange,
    onFieldChange,
    handleIsAtSchoolChange,
    hasFieldError,
    stepErrors
  };
}; 