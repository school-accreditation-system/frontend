import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LocationDetailsFormValues,
  locationDetailsSchema,
} from "../types/schema";
import { useToast } from "@/components/ui/use-toast";
export interface UseLocationFormProps {
  formData: any;
  updateFormData: (stepId: string, data: any) => void;
  formErrors: Record<string, string[]>;
}

export const useLocationForm = ({
  formData,
  updateFormData,
  formErrors,
}: UseLocationFormProps) => {
  const [isAtSchool, setIsAtSchool] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { toast } = useToast();

  const stepErrors = formErrors["location-details"] || [];

  const form = useForm<LocationDetailsFormValues>({
    resolver: zodResolver(locationDetailsSchema),
    defaultValues: {
      latitude: formData.latitude || "",
      longitude: formData.longitude || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    // Only reset the form if there's actual data
    if (Object.keys(formData).length > 0) {
      form.reset(
        {
          latitude: formData.latitude || "",
          longitude: formData.longitude || "",
        },
        { keepValues: true }
      );
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

  const onFieldChange = useCallback(
    (name: keyof LocationDetailsFormValues, value: any) => {
      // Update form data for all fields including latitude and longitude
      const updatedData = {
        [name]: value,
      } as Partial<LocationDetailsFormValues>;
      form.setValue(name, value, { shouldValidate: true });
      updateFormData("location-details", updatedData);
    },
    [form, updateFormData]
  );

  const handleIsAtSchoolChange = useCallback(
    (checked: boolean) => {
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
              updateFormData("location-details", {
                latitude,
                longitude,
              });

              setIsGettingLocation(false);
            },
            (error) => {
              // Error handling
              let errorMessage = "Failed to get location";
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  toast({
                    title: "Location Access Denied",
                    description:
                      "Location access was denied. Please enable location permissions in your browser.",
                    status: "error",
                  });
                  errorMessage =
                    "Location access was denied. Please enable location permissions in your browser.";
                  break;
                case error.POSITION_UNAVAILABLE:
                  toast({
                    title: "Location Information Unavailable",
                    description:
                      "Location information is unavailable. Enter the coordinates manually.",
                    status: "error",
                  });
                  errorMessage = "Location information is unavailable.";
                  break;
                case error.TIMEOUT:
                  toast({
                    title: "Location Request Timed Out",
                    description:
                      "Location request timed out. Enter the coordinates manually.",
                    status: "error",
                  });
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
              maximumAge: 0,
            }
          );
        } else {
          setLocationError("Geolocation is not supported by this browser.");
          setIsGettingLocation(false);
          setIsAtSchool(false);
        }
      }
    },
    [form, updateFormData]
  );

  const hasFieldError = useCallback(
    (fieldName: keyof LocationDetailsFormValues) => {
      return (
        form.formState.errors[fieldName] ||
        stepErrors.some((e) =>
          e.toLowerCase().includes(fieldName.toLowerCase())
        )
      );
    },
    [form.formState.errors, stepErrors]
  );

  return {
    form,
    isAtSchool,
    isGettingLocation,
    locationError,
    onFieldChange,
    handleIsAtSchoolChange,
    hasFieldError,
    stepErrors,
  };
};
