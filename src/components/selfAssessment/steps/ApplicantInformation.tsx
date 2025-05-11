"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useFormContext } from "../context/FormContext";

const applicantSchema = z.object({
  nationalId: z
    .string()
    .trim()
    .min(16, { message: "National ID is required" })
    .max(16, { message: "National ID must be 16 characters" }),
  applicantName: z
    .string()
    .trim()
    .min(1, { message: "Applicant name is required" }),
  role: z.string().trim().min(1, { message: "Role is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "Telephone number is required" }),
});

export function ApplicantInformation() {
  const { toast } = useToast();
  const {
    currentStep,
    formData: allFormData,
    updateFormData: contextUpdateFormData,
    goToPreviousStep,
    handleSubmit: contextHandleSubmit,
    isSubmitting,
    steps,
  } = useFormContext();

  const stepId = steps.length > 0 ? steps[currentStep]?.id : currentStep;
  const currentStepFormData = allFormData[stepId] || {};

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicantSchema),
    defaultValues: currentStepFormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (currentStepFormData && Object.keys(currentStepFormData).length > 0) {
      Object.entries(currentStepFormData).forEach(([key, value]) => {
        setValue(key as any, value || "");
      });
    }
  }, [currentStepFormData, setValue]);

  const onSubmit = async (data: any) => {
    try {
      contextUpdateFormData(stepId, data);
      await contextHandleSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to process applicant information before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md  border border-blue-100 mb-4">
        <h3 className="text-lg font-medium text-primary mb-2">Almost there!</h3>
        <p className="text-primary/80">
          You&apos;ve completed all the assessment requirements. Before
          submitting, please provide information about the applicant. The
          inspection team will use this information to contact you during the
          evaluation process.
        </p>
      </div>

      <Card className="w-full rounded-md">
        <CardHeader className="bg-primary text-white py-1">
          <CardTitle className="text-xl font-medium flex items-center">
            <User className="h-5 w-5 mr-2" />
            Applicant Information
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* National ID field */}
            <div className="grid gap-2">
              <Label htmlFor="nationalId" className="font-medium text-gray-700">
                National ID Number
              </Label>
              <Input
                id="nationalId"
                {...register("nationalId")}
                type="text"
                placeholder="Enter your national ID"
                className={`border-gray-300 focus:border-blue-500 ${
                  errors.nationalId ? "border-red-500" : ""
                }`}
              />
              {errors.nationalId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nationalId.message}
                </p>
              )}
            </div>

            {/* Applicant name field */}
            <div className="grid gap-2">
              <Label
                htmlFor="applicantName"
                className="font-medium text-gray-700"
              >
                Applicant Name
              </Label>
              <Input
                id="applicantName"
                {...register("applicantName")}
                type="text"
                placeholder="Enter your full name"
                className={`border-gray-300 focus:border-blue-500 ${
                  errors.applicantName ? "border-red-500" : ""
                }`}
              />
              {errors.applicantName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicantName.message}
                </p>
              )}
            </div>

            {/* Applicant Role */}
            <div className="grid gap-2">
              <Label htmlFor="role" className="font-medium text-gray-700">
                Applicant Role
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={`w-full border-gray-300 focus:border-blue-500 ${
                        errors.role ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Legal Representative">
                        Legal Representative
                      </SelectItem>
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
                <Label htmlFor="email" className="font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="Enter email address"
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="telephone"
                  className="font-medium text-gray-700"
                >
                  Telephone Number
                </Label>
                <Input
                  id="telephone"
                  {...register("telephone")}
                  type="tel"
                  placeholder="Enter telephone number"
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.telephone ? "border-red-500" : ""
                  }`}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telephone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t mt-6">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
              >
                Previous
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-md hover:hover:bg-primary/90 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplicantInformation;
