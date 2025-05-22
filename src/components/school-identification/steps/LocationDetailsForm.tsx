'use client';

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin } from "lucide-react";
import { useFormContext } from "../context/FormContext";
import { useLocationForm } from "../hooks/useLocationForm";

export const LocationDetailsForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();

  const {
    form,
    isAtSchool,
    isGettingLocation,
    locationError,
    onFieldChange,
    handleIsAtSchoolChange,
    hasFieldError
  } = useLocationForm({ formData, updateFormData, formErrors });

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-900">Geographical Coordinates</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAtSchool"
                checked={isAtSchool}
                onCheckedChange={handleIsAtSchoolChange}
                disabled={isGettingLocation}
              />
              <label
                htmlFor="isAtSchool"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I am at the school location
                {isGettingLocation && (
                  <span className="ml-2 text-xs inline-flex items-center text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Getting location...
                  </span>
                )}
              </label>
            </div>
          </div>

          {locationError && (
            <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded text-sm text-red-600">
              {locationError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="e.g., -1.9545"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            onFieldChange("latitude", e.target.value);
                          }}
                          className={`pl-9 ${hasFieldError("latitude") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          disabled={isGettingLocation}
                        />
                        <MapPin className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="e.g., 30.0574"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            onFieldChange("longitude", e.target.value);
                          }}
                          className={`pl-9 ${hasFieldError("longitude") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          disabled={isGettingLocation}
                        />
                        <MapPin className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            These coordinates help us accurately locate the school on mapping systems. If you are physically at the school,
            click &quot;I am at the school location&quot; to automatically fill these fields.
          </p>
        </div>
      </div>
    </Form>
  );
}; 