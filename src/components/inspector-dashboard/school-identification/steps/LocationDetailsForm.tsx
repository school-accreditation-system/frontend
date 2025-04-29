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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useFormContext } from "../context/FormContext";
import { useLocationForm } from "../hooks/useLocationForm";

export const LocationDetailsForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();

  const {
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
    getAllProvinces
  } = useLocationForm({ formData, updateFormData, formErrors });

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-medium mb-6">Location Details</h3>

          <div className="space-y-6 max-w-7xl mx-auto">
            {/* First row: Province & District */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Province Selection */}
              <div className="w-full md:w-[48%]">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">Province</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          onFieldChange("province", value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full ${hasFieldError("province") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Select your province" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getAllProvinces().map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* District Selection */}
              <div className="w-full md:w-[48%]">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">District</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          onFieldChange("district", value);
                        }}
                        value={field.value}
                        disabled={availableDistricts.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full ${hasFieldError("district") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder={availableDistricts.length === 0 ? "Select province first" : "Select your district"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Second row: Sector & Cell */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Sector Selection */}
              <div className="w-full md:w-[48%]">
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">Sector</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          onFieldChange("sector", value);
                        }}
                        value={field.value}
                        disabled={availableSectors.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full ${hasFieldError("sector") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder={availableSectors.length === 0 ? "Select district first" : "Select your sector"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cell Selection */}
              <div className="w-full md:w-[48%]">
                <FormField
                  control={form.control}
                  name="cell"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">Cell</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          onFieldChange("cell", value);
                        }}
                        value={field.value}
                        disabled={availableCells.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`h-12 w-full ${hasFieldError("cell") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder={availableCells.length === 0 ? "Select sector first" : "Select your cell"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableCells.map((cell) => (
                            <SelectItem key={cell} value={cell}>
                              {cell}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Village Selection - Full width */}
            <div className="w-full md:w-1/2 md:mx-auto">
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-gray-700 font-medium">Village</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onFieldChange("village", value);
                      }}
                      value={field.value}
                      disabled={availableVillages.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`h-12 w-full ${hasFieldError("village") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        >
                          <SelectValue placeholder={availableVillages.length === 0 ? "Select cell first" : "Select your village"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableVillages.map((village) => (
                          <SelectItem key={village} value={village}>
                            {village}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* GPS Coordinates section */}
          <div className="mt-8 pt-6 border-t border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">
              <h4 className="text-lg font-medium">GPS Coordinates</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="atSchool"
                  checked={isAtSchool}
                  onCheckedChange={handleIsAtSchoolChange}
                  disabled={isGettingLocation}
                />
                <label
                  htmlFor="atSchool"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I am currently at the school location
                </label>
              </div>
            </div>

            {locationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                {locationError}
              </div>
            )}

            {isGettingLocation && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-600">
                Getting your current location...
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">Latitude</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. -1.9441 (decimal coordinates)"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            onFieldChange("latitude", e.target.value);
                          }}
                          className={`h-12 ${hasFieldError("latitude") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          disabled={isAtSchool || isGettingLocation}
                        />
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
                    <FormItem className="w-full">
                      <FormLabel className="text-gray-700 font-medium">Longitude</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 30.0619 (decimal coordinates)"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            onFieldChange("longitude", e.target.value);
                          }}
                          className={`h-12 ${hasFieldError("longitude") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          disabled={isAtSchool || isGettingLocation}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}; 