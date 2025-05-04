/* eslint-disable max-lines */
"use client"

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define schema using Zod
const applicantSchema = z.object({
  nationalId: z.string().min(1, { message: "National ID is required" }),
  applicantName: z.string().min(1, { message: "Applicant name is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  cell: z.string().min(1, { message: "Cell is required" }),
  village: z.string().min(1, { message: "Village is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: z.string().min(1, { message: "Telephone number is required" })
});

const ApplicantInformation = ({ onDataChange }) => {
  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      nationalId: "",
      applicantName: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      role: "Owner",
      email: "",
      telephone: ""
    }
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("applicantInformation");
    
    if (storedData) {
      const applicantData = JSON.parse(storedData);
      
      // Set form values from localStorage
      Object.entries(applicantData).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    // Save to localStorage
    localStorage.setItem("applicantInformation", JSON.stringify(data));
    
    // Notify parent component if needed
    if (onDataChange) {
      onDataChange(data);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md py-0 pb-6">
      <CardHeader className="bg-primary text-white rounded-t-lg py-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          Applicant Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onChange={handleSubmit(onSubmit)} className="space-y-6">
          {/* National ID field */}
          <div className="grid gap-2">
            <Label htmlFor="nationalId" className="font-medium text-gray-700">National ID Number</Label>
            <Input 
              id="nationalId" 
              {...register("nationalId")}
              type="text"
              placeholder="Enter your national ID" 
              className={`border-gray-300 focus:border-blue-500 ${errors.nationalId ? "border-red-500" : ""}`}
            />
            {errors.nationalId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          {/* Applicant name field */}
          <div className="grid gap-2">
            <Label htmlFor="applicantName" className="font-medium text-gray-700">Applicant Name</Label>
            <Input 
              id="applicantName" 
              {...register("applicantName")}
              type="text"
              placeholder="Enter your full name" 
              className={`border-gray-300 focus:border-blue-500 ${errors.applicantName ? "border-red-500" : ""}`}
            />
            {errors.applicantName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.applicantName.message}
              </p>
            )}
          </div>

          {/* Address section */}
          <div className="space-y-3">
            <Label className="font-medium text-gray-700 block">Applicant Address</Label>
            
            <div className="bg-gray-50 rounded-lg p-4 overflow-hidden border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-500">
                    <th className="px-4 py-2 text-left w-1/3 rounded-tl-md">Level</th>
                    <th className="px-4 py-2 text-left w-2/3 rounded-tr-md">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">Province</td>
                    <td className="px-4 py-3">
                      <Input 
                        type="text" 
                        {...register("province")}
                        className={`border-gray-200 ${errors.province ? "border-red-500" : ""}`} 
                        placeholder="Enter province" 
                      />
                      {errors.province && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.province.message}
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">District</td>
                    <td className="px-4 py-3">
                      <Input 
                        type="text" 
                        {...register("district")}
                        className={`border-gray-200 ${errors.district ? "border-red-500" : ""}`} 
                        placeholder="Enter district" 
                      />
                      {errors.district && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.district.message}
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">Sector</td>
                    <td className="px-4 py-3">
                      <Input 
                        type="text" 
                        {...register("sector")}
                        className={`border-gray-200 ${errors.sector ? "border-red-500" : ""}`} 
                        placeholder="Enter sector" 
                      />
                      {errors.sector && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sector.message}
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">Cell</td>
                    <td className="px-4 py-3">
                      <Input 
                        type="text" 
                        {...register("cell")}
                        className={`border-gray-200 ${errors.cell ? "border-red-500" : ""}`} 
                        placeholder="Enter cell" 
                      />
                      {errors.cell && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cell.message}
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium rounded-bl-md">Village</td>
                    <td className="px-4 py-3 rounded-br-md">
                      <Input 
                        type="text" 
                        {...register("village")}
                        className={`border-gray-200 ${errors.village ? "border-red-500" : ""}`} 
                        placeholder="Enter village" 
                      />
                      {errors.village && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.village.message}
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Applicant Role */}
          <div className="grid gap-2">
            <Label htmlFor="role" className="font-medium text-gray-700">Applicant Role</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger 
                    className={`w-full border-gray-300 focus:border-blue-500 ${errors.role ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Legal Representative">Legal Representative</SelectItem>
                    <SelectItem value="District">District</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Contact Information section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="font-medium text-gray-700">Email Address</Label>
              <Input 
                id="email" 
                {...register("email")}
                type="email"
                placeholder="Enter email address" 
                className={`border-gray-300 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="telephone" className="font-medium text-gray-700">Telephone Number</Label>
              <Input 
                id="telephone" 
                {...register("telephone")}
                type="tel"
                placeholder="Enter telephone number" 
                className={`border-gray-300 focus:border-blue-500 ${errors.telephone ? "border-red-500" : ""}`}
              />
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.telephone.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicantInformation;