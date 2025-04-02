'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { SchoolRegistrationFormData } from '@/components/school-finder/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";

const schoolRegistrationSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  cell: z.string().min(1, { message: "Cell is required" }),
  village: z.string().min(1, { message: "Village is required" }),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  htName: z.string().min(3, { message: "Head teacher name is required" }),
  htEmail: z.string().email({ message: "Please enter a valid email" }),
  qualification: z.enum(["Diploma A2","Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD"], {
    required_error: "Qualification is required",
  }),
  telephone: z.string().min(10, { message: "Telephone should be at least 10 digits" }).max(10, { message: "Telephone should be 10 digits" })
});

export const SchoolRegistrationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // Location dropdown state
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSectors, setAvailableSectors] = useState<string[]>([]);
  const [availableCells, setAvailableCells] = useState<string[]>([]);
  const [availableVillages, setAvailableVillages] = useState<string[]>([]);

  const form = useForm<SchoolRegistrationFormData>({
    resolver: zodResolver(schoolRegistrationSchema),
    defaultValues: {
      name: '',
      province: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      email: '',
      phone: '',
      htName: '',
      htEmail: '',
      qualification: undefined,
      telephone: '',
    },
  });

  // Get all provinces
  const getAllProvinces = () => {
    try {
      return Provinces();
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  };

  // Effect to update available districts when province changes
  useEffect(() => {
    const province = form.watch("province");
    if (province) {
      try {
        const districts = Districts(province) || [];
        setAvailableDistricts(districts);
        
        // Clear lower-level selections when province changes
        form.setValue("district", "");
        form.setValue("sector", "");
        form.setValue("cell", "");
        form.setValue("village", "");
        setAvailableSectors([]);
        setAvailableCells([]);
        setAvailableVillages([]);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setAvailableDistricts([]);
      }
    } else {
      setAvailableDistricts([]);
    }
  }, [form.watch("province")]);

  // Effect to update available sectors when district changes
  useEffect(() => {
    const province = form.watch("province");
    const district = form.watch("district");
    
    if (province && district) {
      try {
        const sectors = Sectors(province, district) || [];
        setAvailableSectors(sectors);
        
        // Clear lower-level selections when district changes
        form.setValue("sector", "");
        form.setValue("cell", "");
        form.setValue("village", "");
        setAvailableCells([]);
        setAvailableVillages([]);
      } catch (error) {
        console.error("Error fetching sectors:", error);
        setAvailableSectors([]);
      }
    } else {
      setAvailableSectors([]);
    }
  }, [form.watch("district")]);

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
        form.setValue("cell", "");
        form.setValue("village", "");
        setAvailableVillages([]);
      } catch (error) {
        console.error("Error fetching cells:", error);
        setAvailableCells([]);
      }
    } else {
      setAvailableCells([]);
    }
  }, [form.watch("sector")]);

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
        form.setValue("village", "");
      } catch (error) {
        console.error("Error fetching villages:", error);
        setAvailableVillages([]);
      }
    } else {
      setAvailableVillages([]);
    }
  }, [form.watch("cell")]);

  const onSubmit = async (data: SchoolRegistrationFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store the registration data temporarily
      localStorage.setItem('pendingSchoolRegistration', JSON.stringify(data));
      
      // Redirect to verification page
      router.push('/verify-school');
    } catch (err) {
      setError('Failed to register school. Please try again.');
      setIsSubmitting(false);
    }
  };

  const qualificationOptions = [
    { value: 'Diploma A2', label: 'Diploma A2' },
    { value: 'Associate Degree', label: 'Associate Degree' },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" },
  ];
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-full mx-auto">
      {error && (
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        {/* School Basic Information - Left Column */}
        <div className="space-y-6 lg:border-r lg:pr-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
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
                  onValueChange={(value) => form.setValue('province', value, { shouldValidate: true })}
                  value={form.watch('province')}
                >
                  <SelectTrigger 
                    id="province"
                    className={`w-full ${form.formState.errors.province ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllProvinces().map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.province && (
                  <p className="text-sm text-red-500">{form.formState.errors.province.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="district">District</Label>
                <Select
                  onValueChange={(value) => form.setValue('district', value, { shouldValidate: true })}
                  value={form.watch('district')}
                  disabled={availableDistricts.length === 0}
                >
                  <SelectTrigger 
                    id="district"
                    className={`w-full ${form.formState.errors.district ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder={availableDistricts.length === 0 ? "Select province first" : "Select district"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.district && (
                  <p className="text-sm text-red-500">{form.formState.errors.district.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="sector">Sector</Label>
                <Select
                  onValueChange={(value) => form.setValue('sector', value, { shouldValidate: true })}
                  value={form.watch('sector')}
                  disabled={availableSectors.length === 0}
                >
                  <SelectTrigger 
                    id="sector"
                    className={`w-full ${form.formState.errors.sector ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder={availableSectors.length === 0 ? "Select district first" : "Select sector"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.sector && (
                  <p className="text-sm text-red-500">{form.formState.errors.sector.message}</p>
                )}
              </div>
              
              <div className="space-y-2 w-full">
                <Label htmlFor="cell">Cell</Label>
                <Select
                  onValueChange={(value) => form.setValue('cell', value, { shouldValidate: true })}
                  value={form.watch('cell')}
                  disabled={availableCells.length === 0}
                >
                  <SelectTrigger 
                    id="cell"
                    className={`w-full ${form.formState.errors.cell ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder={availableCells.length === 0 ? "Select sector first" : "Select cell"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCells.map((cell) => (
                      <SelectItem key={cell} value={cell}>
                        {cell}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.cell && (
                  <p className="text-sm text-red-500">{form.formState.errors.cell.message}</p>
                )}
              </div>
              
              <div className="space-y-2 col-span-2 w-full">
                <Label htmlFor="village">Village</Label>
                <Select
                  onValueChange={(value) => form.setValue('village', value, { shouldValidate: true })}
                  value={form.watch('village')}
                  disabled={availableVillages.length === 0}
                >
                  <SelectTrigger 
                    id="village"
                    className={`w-full ${form.formState.errors.village ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder={availableVillages.length === 0 ? "Select cell first" : "Select village"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVillages.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
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
                <Label htmlFor="htName">Full Name</Label>
                <Input
                  id="htName"
                  {...form.register('htName')}
                  placeholder="Enter head teacher's full name"
                  className={`w-full ${form.formState.errors.htName ? 'border-red-500' : ''}`}
                />
                {form.formState.errors.htName && (
                  <p className="text-sm text-red-500">{form.formState.errors.htName.message}</p>
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
                  <Label htmlFor="telephone">Phone Number</Label>
                  <Input
                    id="telephone"
                    {...form.register('telephone')}
                    placeholder="Enter phone number"
                    className={`w-full ${form.formState.errors.telephone ? 'border-red-500' : ''}`}
                  />
                  {form.formState.errors.telephone && (
                    <p className="text-sm text-red-500">{form.formState.errors.telephone.message}</p>
                  )}
                </div>
              </div>
              
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