'use client';

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
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Loader2 } from "lucide-react";
import { useFormContext } from "../context/FormContext";
import { useLocationForm } from "../hooks/useLocationForm";

export const LocationDetailsForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();
  
  const {
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
    hasFieldError
  } = useLocationForm({ formData, updateFormData, formErrors });

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Province Select */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="province"
              render={() => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const selectedProvince = provinces?.find(p => p.locationCode === value);
                      if (selectedProvince) {
                        handleProvinceChange(selectedProvince.locationName, value);
                      }
                    }}
                    value={selectedProvinceCode}
                    disabled={isProvincesLoading}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("province") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        {isProvincesLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-muted-foreground">Loading...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select province" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isProvincesLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Loading provinces...</div>
                      ) : provinces?.length ? (
                        provinces.map((province) => (
                          <SelectItem key={province.id} value={province.locationCode}>
                            {province.locationName}
                          </SelectItem>
                        ))
                          
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">No provinces found</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* District Select */}
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="district"ß
              render={() => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const selectedDistrict = districts?.find(d => d.locationCode === value);
                      if (selectedDistrict) {
                        handleDistrictChange(selectedDistrict.locationName, value);
                      }
                    }}
                    value={selectedDistrictCode}
                    disabled={isDistrictsLoading || !selectedProvinceCode}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("district") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        {isDistrictsLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder={isDistrictsLoading ? "Loading..." : (selectedProvinceCode ? "Select district" : "Select province first")} />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!selectedProvinceCode ? (
                        <div className="p-2 text-sm text-muted-foreground">Select a province first</div>
                      ) : isDistrictsLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Loading districts...</div>
                      ) : districts?.length ? (
                        districts.map((district) => (
                          <SelectItem key={district.id} value={district.locationCode}>
                            {district.locationName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No districts found</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sector Select */}
          <div>
            <FormField
              control={form.control}
              name="sector"
              render={() => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const selectedSector = sectors?.find(s => s.locationCode === value);
                      if (selectedSector) {
                        handleSectorChange(selectedSector.locationName, value);
                      }
                    }}
                    value={selectedSectorCode}
                    disabled={isSectorsLoading || !selectedDistrictCode}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("sector") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        {isSectorsLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder={isSectorsLoading ? "Loading..." : (selectedDistrictCode ? "Select sector" : "Select district first")} />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!selectedDistrictCode ? (
                        <div className="p-2 text-sm text-muted-foreground">Select a district first</div>
                      ) : isSectorsLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Loading sectors...</div>
                      ) : sectors?.length ? (
                        sectors.map((sector) => (
                          <SelectItem key={sector.id} value={sector.locationCode}>
                            {sector.locationName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No sectors found</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cell Select */}
          <div>
            <FormField
              control={form.control}
              name="cell"
              render={() => (
                <FormItem>
                  <FormLabel>Cell</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const selectedCell = cells?.find(c => c.locationCode === value);
                      if (selectedCell) {
                        handleCellChange(selectedCell.locationName, value);
                      }
                    }}
                    value={selectedCellCode}
                    disabled={isCellsLoading || !selectedSectorCode}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("cell") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        {isCellsLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder={isCellsLoading ? "Loading..." : (selectedSectorCode ? "Select cell" : "Select sector first")} />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!selectedSectorCode ? (
                        <div className="p-2 text-sm text-muted-foreground">Select a sector first</div>
                      ) : isCellsLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Loading cells...</div>
                      ) : cells?.length ? (
                        cells.map((cell) => (
                          <SelectItem key={cell.id} value={cell.locationCode}>
                            {cell.locationName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No cells found</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Village Select */}
          <div>
            <FormField
              control={form.control}
              name="village"
              render={() => (
                <FormItem>
                  <FormLabel>Village</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      const selectedVillage = villages?.find(v => v.locationCode === value);
                      if (selectedVillage) {
                        handleVillageChange(selectedVillage.locationName);
                      }
                    }}
                    value={form.watch('village')}
                    disabled={isVillagesLoading || !selectedCellCode}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("village") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        {isVillagesLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder={isVillagesLoading ? "Loading..." : (selectedCellCode ? "Select village" : "Select cell first")} />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!selectedCellCode ? (
                        <div className="p-2 text-sm text-muted-foreground">Select a cell first</div>
                      ) : isVillagesLoading ? (
                        <div className="p-2 text-center text-sm text-muted-foreground">Loading villages...</div>
                      ) : villages?.length ? (
                        villages.map((village) => (
                          <SelectItem key={village.id} value={village.locationCode}>
                            {village.locationName}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No villages found</div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Geolocation Section */}
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
            <div c>
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
            click "I am at the school location" to automatically fill these fields.
          </p>
        </div>
      </div>
    </Form>
  );
}; 