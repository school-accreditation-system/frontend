"use client"

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define schema using Zod
const schoolSchema = z.object({
  schoolName: z.string().min(1, { message: "School name is required" }),
  schoolCode: z.string().min(1, { message: "School code is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  cell: z.string().min(1, { message: "Cell is required" }),
  village: z.string().min(1, { message: "Village is required" })
});

const SchoolInformation = ({ onDataChange }) => {
  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolName: "",
      schoolCode: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: ""
    }
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("schoolIdentification");
    
    if (storedData) {
      const schoolData = JSON.parse(storedData);
      
      // Set form values from localStorage
      Object.entries(schoolData).forEach(([key, value]) => {
        setValue(key, value || "");
      });
    }
  }, [setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    // Save to localStorage
    localStorage.setItem("schoolInformation", JSON.stringify(data));
    // console.log(data)
    // Notify parent component if needed
    if (onDataChange) {
      onDataChange(data);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md py-0 mb-4">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          School Information
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* School name field */}
          <div className="grid gap-2">
            <Label htmlFor="schoolName" className="font-medium text-gray-700">
              School Name
            </Label>
            <Input
              id="schoolName"
              {...register("schoolName")}
              placeholder="Enter school name"
              className={`border-gray-300 focus:border-blue-500 ${errors.schoolName ? "border-red-500" : ""}`}
            />
            {errors.schoolName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.schoolName.message}
              </p>
            )}
          </div>

          {/* School code field */}
          <div className="grid gap-2">
            <Label htmlFor="schoolCode" className="font-medium text-gray-700">
              School Code
            </Label>
            <Input
              id="schoolCode"
              {...register("schoolCode")}
              placeholder="Enter school code"
              className={`border-gray-300 focus:border-blue-500 ${errors.schoolCode ? "border-red-500" : ""}`}
            />
            {errors.schoolCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.schoolCode.message}
              </p>
            )}
          </div>

          {/* School address section */}
          <div className="space-y-3 mb-4">
            <Label
              htmlFor="address"
              className="font-medium text-gray-700 block"
            >
              School Address
            </Label>

            <div className="bg-gray-50 rounded-lg p-4 overflow-hidden border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-500">
                    <th className="px-4 py-2 text-left w-1/3 rounded-tl-md">
                      Level
                    </th>
                    <th className="px-4 py-2 text-left w-2/3 rounded-tr-md">
                      Location
                    </th>
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
                    <td className="px-4 py-3 font-medium rounded-bl-md">
                      Village
                    </td>
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
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolInformation;