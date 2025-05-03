/* eslint-disable max-lines */
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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRegisterSchool } from './hooks/useRegisterSchool';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SchoolRegistrationForm = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { provinces,
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
    isSuccess,
    form,
    onSubmit,
    isSubmitting } = useRegisterSchool();

  // Show success dialog when registration is successful
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessDialog(true);
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">

          {/* School Basic Information - Left Column */}
          <div className="space-y-6 lg:border-r lg:pr-8">
            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Expected School Name (Example: St. Joseph School)</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="Enter school name or expected name"
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


              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">School Location</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please select the province, district, sector, cell and village where your school is located or where it will be located
              </p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Owner Information/ Legal Representative</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please provide the details of the owner/ legal representative of the school or the school head teacher if available
              </p>

              <div className="space-y-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="htFirstName">First Name</Label>
                  <Input
                    id="htFirstName"
                    {...form.register('htFirstName')}
                    placeholder="Enter owner's/ legal representative's first name"
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
                    placeholder="Enter owner's/ legal representative's last name"
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
                      placeholder="Enter owner's/ legal representative's email"
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
                      placeholder="Enter owner's/ legal representative's phone number"
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

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-green-700">
              Registration Successful
            </DialogTitle>
            <DialogDescription className="text-base">
              Your school has been successfully registered to apply for accreditation.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-3">
              Please continue with School Identification where you will provide more
              information about your school. This information will serve as the basis
              for your accreditation application.
            </p>
          </div>

          <DialogFooter className='flex justify-between sm:flex-row gap-2'>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                form.reset();
                router.push('/');
              }}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
              Go Back Home

            </Button>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                form.reset();
                router.push('/school-identification');
              }}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              Continue to School Identification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};