'use client';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowRight } from 'lucide-react';
import { useRegisterSchool } from './hooks/useRegisterSchool';

export const SchoolRegistrationForm = () => {
    const {  provinces,
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
      qualificationOptions,
    genderOptions,
    form,
    onSubmit,
    error,
    isSubmitting } = useRegisterSchool();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full mx-auto">
      {/* {error && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )} */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        {/* School Basic Information - Left Column */}
        <div className="space-y-6 lg:border-r lg:pr-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Information</h3>

      <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-2">
          <Label htmlFor="name">School Name</Label>
          <Input
            id="name"
            {...form.register('name')}
            placeholder="Enter school name"
                  className={`w-full ${form.formState.errors.name ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="schoolShortName">School Short Name</Label>
          <Input
            id="schoolShortName"
            {...form.register('schoolShortName')}
            placeholder="Enter school short name"
                  className={`w-full ${form.formState.errors.schoolShortName ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.schoolShortName && (
            <p className="text-sm text-red-500">{form.formState.errors.schoolShortName.message}</p>
          )}
        </div>
        </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 w-full">
          <Label htmlFor="email">School Email</Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder="Enter school email"
                    className={`w-full ${form.formState.errors.email ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

                <div className="space-y-2 w-full">
          <Label htmlFor="phone">School Phone</Label>
          <Input
            id="phone"
            {...form.register('phone')}
            placeholder="Enter school phone number"
                    className={`w-full ${form.formState.errors.phone ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Location</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="province">Province</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedProvince = provinces?.find(p => p.locationCode === value);
                    if (selectedProvince) {
                      handleProvinceChange(value, selectedProvince.locationCode);
                    }
                  }}
                  value={form.watch('province')}
                  disabled={isProvincesLoading}
                >
                  <SelectTrigger 
                    id="province"
                    className={`w-full ${form.formState.errors.province ? 'border-red-500' : ''}`}
                  >
                      {isProvincesLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span className="text-muted-foreground">Loading provinces...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select province" />
                    )}
                  </SelectTrigger>
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
                {form.formState.errors.province && (
                  <p className="text-sm text-red-500">{form.formState.errors.province.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="district">District</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedDistrict = districts?.find(d => d.locationCode === value);
                    if (selectedDistrict) {
                      handleDistrictChange(value, selectedDistrict.locationCode);
                    }
                  }}
                  value={form.watch('district')}
                  disabled={isDistrictsLoading || !selectedProvinceCode}
                >
                  <SelectTrigger 
                    id="district"
                    className={`w-full ${form.formState.errors.district ? 'border-red-500' : ''}`}
                  >
                    {isDistrictsLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder={isDistrictsLoading ? "Loading..." : (selectedProvinceCode ? "Select district" : "Select province first")} />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {!selectedProvinceCode ? (
                      <div className="p-2 text-sm text-muted-foreground">Select a province first</div>
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
                {form.formState.errors.district && (
                  <p className="text-sm text-red-500">{form.formState.errors.district.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="sector">Sector</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedSector = sectors?.find(s => s.locationCode === value);
                    if (selectedSector) {
                      handleSectorChange(value, selectedSector.locationCode);
                    }
                  }}
                  value={form.watch('sector')}
                  disabled={isSectorsLoading || !selectedDistrictCode}
                >
                  <SelectTrigger 
                    id="sector"
                    className={`w-full ${form.formState.errors.sector ? 'border-red-500' : ''}`}
                  >
                    {isSectorsLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder={isSectorsLoading ? "Loading..." : (selectedDistrictCode ? "Select sector" : "Select district first")} />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {!selectedDistrictCode ? (
                      <div className="p-2 text-sm text-muted-foreground">Select a district first</div>
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
                {form.formState.errors.sector && (
                  <p className="text-sm text-red-500">{form.formState.errors.sector.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="cell">Cell</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedCell = cells?.find(c => c.locationCode === value);
                    if (selectedCell) {
                      handleCellChange(value, selectedCell.locationCode);
                    }
                  }}
                  value={form.watch('cell')}
                  disabled={isCellsLoading || !selectedSectorCode}
                >
                  <SelectTrigger 
                    id="cell"
                    // eslint-disable-next-line max-lines
                    className={`w-full ${form.formState.errors.cell ? 'border-red-500' : ''}`}
                  >
                    {isCellsLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder={isCellsLoading ? "Loading..." : (selectedSectorCode ? "Select cell" : "Select sector first")} />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {!selectedSectorCode ? (
                      <div className="p-2 text-sm text-muted-foreground">Select a sector first</div>
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
                {form.formState.errors.cell && (
                  <p className="text-sm text-red-500">{form.formState.errors.cell.message}</p>
                )}
              </div>
              
              <div className="space-y-2 col-span-2 w-full">
                <Label htmlFor="village">Village</Label>
                <Select
                  onValueChange={(value) => {
                    const selectedVillage = villages?.find(v => v.locationCode === value);
                    if (selectedVillage) {
                      handleVillageChange(value, selectedVillage.locationCode);
                    }
                  }}
                  value={form.watch('village')}
                  disabled={isVillagesLoading || !selectedCellCode}
                >
                  <SelectTrigger 
                    id="village"
                    className={`w-full ${form.formState.errors.village ? 'border-red-500' : ''}`}
                  >
                    {isVillagesLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder={isVillagesLoading ? "Loading..." : (selectedCellCode ? "Select village" : "Select cell first")} />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {!selectedCellCode ? (
                      <div className="p-2 text-sm text-muted-foreground">Select a cell first</div>
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
                {form.formState.errors.village && (
                  <p className="text-sm text-red-500">{form.formState.errors.village.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Head Teacher Information - Right Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Head Teacher Information</h3>
            <p className="text-sm text-muted-foreground mb-4">
              These details are needed for official communication with the school
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="htFirstName">First Name</Label>
          <Input
                  id="htFirstName"
                  {...form.register('htFirstName')}
                  placeholder="Enter head teacher's first name"
                  className={`w-full ${form.formState.errors.htFirstName ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.htFirstName && (
                  <p className="text-sm text-red-500">{form.formState.errors.htFirstName.message}</p>
          )}
        </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="htLastName">Last Name</Label>
                <Input
                  id="htLastName"
                  {...form.register('htLastName')}
                  placeholder="Enter head teacher's last name"
                  className={`w-full ${form.formState.errors.htLastName ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.htLastName && (
                  <p className="text-sm text-red-500">{form.formState.errors.htLastName.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="htEmail">Email</Label>
          <Input
                    id="htEmail"
            type="email"
                    {...form.register('htEmail')}
                    placeholder="Enter head teacher's email"
                    className={`w-full ${form.formState.errors.htEmail ? 'border-red-500' : ''}`}
                  />
                  {form.formState.errors.htEmail && (
                    <p className="text-sm text-red-500">{form.formState.errors.htEmail.message}</p>
                  )}
                </div>
                
                <div className="space-y-2 w-full">
                  <Label htmlFor="htPhone">Phone Number</Label>
                  <Input
                    id="htPhone"
                    {...form.register('htPhone')}
                    placeholder="Enter phone number"
                    className={`w-full ${form.formState.errors.htPhone ? 'border-red-500' : ''}`}
                  />
                  {form.formState.errors.htPhone && (
                    <p className="text-sm text-red-500">{form.formState.errors.htPhone.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="qualification">Qualification</Label>
                <Select
                  onValueChange={(value) => form.setValue('qualification', value as any, { shouldValidate: true })}
                  defaultValue={form.getValues('qualification')}
                >
                  <SelectTrigger 
                    id="qualification"
                    className={`w-full ${form.formState.errors.qualification ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.qualification && (
                  <p className="text-sm text-red-500">{form.formState.errors.qualification.message}</p>
                )}
                </div>
                          <div className="space-y-2 w-full">
                <Label htmlFor="qualification">Gender</Label>
                <Select
                  onValueChange={(value) => form.setValue('gender', value as any, { shouldValidate: true })}
                  defaultValue={form.getValues('gender')}
                >
                  <SelectTrigger 
                    id="gender"
                    className={`w-full ${form.formState.errors.gender ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-sm text-red-500">{form.formState.errors.gender.message}</p>
                )}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
      <Button
        type="submit"
          className="w-full md:w-auto md:min-w-[200px] hover:cursor-pointer bg-primary hover:bg-primary/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Registering...'
        ) : (
          <>
            Register School
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      </div>
    </form>
  );
}; 