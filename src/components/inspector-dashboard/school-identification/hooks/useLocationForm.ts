import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocationDetailsFormValues, locationDetailsSchema } from "../types/schema";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";

export interface UseLocationFormProps {
  formData: any;
  updateFormData: (stepId: string, data: any) => void;
  formErrors: Record<string, string[]>;
}

export const useLocationForm = ({ formData, updateFormData, formErrors }: UseLocationFormProps) => {
  const [isAtSchool, setIsAtSchool] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // State to store available options for each level
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCells, setAvailableCells] = useState<string[]>([]);
  const [availableVillages, setAvailableVillages] = useState<string[]>([]);
  
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

  // Effect to update available districts when province changes
  useEffect(() => {
    const province = form.watch("province");
    if (province) {
      try {
        const districts = Districts(province) || [];
        setAvailableDistricts(districts);
        
        // Clear lower-level selections when province changes
        if (!formData.district || !districts.includes(formData.district)) {
          form.setValue("district", "");
          form.setValue("sector", "");
          form.setValue("cell", "");
          form.setValue("village", "");
          setAvailableSectors([]);
          setAvailableCells([]);
          setAvailableVillages([]);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        setAvailableDistricts([]);
      }
    } else {
      setAvailableDistricts([]);
    }
  }, [form.watch("province"), formData, form]);

  // Effect to update available sectors when district changes
  useEffect(() => {
    const province = form.watch("province");
    const district = form.watch("district");
    
    if (province && district) {
      try {
        const sectors = Sectors(province, district) || [];
        setAvailableSectors(sectors);
        
        // Clear lower-level selections when district changes
        if (!formData.sector || !sectors.includes(formData.sector)) {
          form.setValue("sector", "");
          form.setValue("cell", "");
          form.setValue("village", "");
          setAvailableCells([]);
          setAvailableVillages([]);
        }
      } catch (error) {
        console.error("Error fetching sectors:", error);
        setAvailableSectors([]);
      }
    } else {
      setAvailableSectors([]);
    }
  }, [form.watch("province"), form.watch("district"), formData, form]);

  // Effect to update available cells when sector changes
  useEffect(() => {
    const province = form.watch("province");
    const district = form.watch("district");
    const sector = form.watch("sector");
    
    if (province && district && sector) {
      try {
        const cells = Cells(province, district, sector) || [];
        setAvailableCells(cells);
        
        // Clear village selection when sector changes
        if (!formData.cell || !cells.includes(formData.cell)) {
          form.setValue("cell", "");
          form.setValue("village", "");
          setAvailableVillages([]);
        }
      } catch (error) {
        console.error("Error fetching cells:", error);
        setAvailableCells([]);
      }
    } else {
      setAvailableCells([]);
    }
  }, [form.watch("province"), form.watch("district"), form.watch("sector"), formData, form]);

  // Effect to update available villages when cell changes
  useEffect(() => {
    const province = form.watch("province");
    const district = form.watch("district");
    const sector = form.watch("sector");
    const cell = form.watch("cell");
    
    if (province && district && sector && cell) {
      try {
        const villages = Villages(province, district, sector, cell) || [];
        setAvailableVillages(villages);
        
        // Clear village selection if current selection is not valid
        if (form.getValues("village") && !villages.includes(form.getValues("village"))) {
          form.setValue("village", "");
        }
      } catch (error) {
        console.error("Error fetching villages:", error);
        setAvailableVillages([]);
      }
    } else {
      setAvailableVillages([]);
    }
  }, [form.watch("province"), form.watch("district"), form.watch("sector"), form.watch("cell"), form]);

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

  const onFieldChange = useCallback((name: keyof LocationDetailsFormValues, value: any) => {
    // Create data update
    const updatedData = { [name]: value } as Partial<LocationDetailsFormValues>;
    form.setValue(name, value, { shouldValidate: true });

    // Update data in context
    updateFormData('location-details', updatedData);
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
    availableDistricts,
    availableSectors,
    availableCells,
    availableVillages,
    onFieldChange,
    handleIsAtSchoolChange,
    hasFieldError,
    stepErrors,
    getAllProvinces: Provinces,
  };
}; 