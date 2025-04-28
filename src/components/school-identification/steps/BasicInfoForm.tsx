/* eslint-disable max-lines */
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../context/FormContext";
import { BasicInfoFormValues, basicInfoSchema } from "../types/schema";

export const BasicInfoForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();
  
  const stepErrors = formErrors['basic-info'] || [];
  
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      schoolEmail: "",
      status: undefined,
      typeOfSchool: undefined,
      schoolCurriculum: undefined,
      schoolOwner: "",
      contact: "",
      accommodationStatus: undefined,
      yearOfEstablishment: ""
    },
    mode: "onChange"
  });

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      
      // First reset with basic values
      form.reset({
        schoolEmail: formData.schoolEmail || "",
        status: formData.status || undefined,
        typeOfSchool: formData.typeOfSchool || undefined,
        schoolCurriculum: formData.schoolCurriculum || undefined,
        schoolOwner: formData.schoolOwner || "",
        contact: formData.contact || "",
        accommodationStatus: formData.accommodationStatus || undefined,
        yearOfEstablishment: formData.yearOfEstablishment || ""
      });
      
      // Then ensure select fields get their values set properly
      if (formData.status) form.setValue("status", formData.status);
      if (formData.typeOfSchool) form.setValue("typeOfSchool", formData.typeOfSchool);
      if (formData.schoolCurriculum) form.setValue("schoolCurriculum", formData.schoolCurriculum);
      if (formData.accommodationStatus) form.setValue("accommodationStatus", formData.accommodationStatus);
    }
  }, [formData, form]);

  useEffect(() => {
    if (stepErrors.length > 0) {
      const timer = setTimeout(() => {
        form.trigger();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [stepErrors, form]);

  const onFieldChange = useCallback((name: keyof BasicInfoFormValues, value: any) => {
    const updatedData = { [name]: value } as Partial<BasicInfoFormValues>;
    form.setValue(name, value, { shouldValidate: true });

    // Update data in context
    updateFormData('basic-info', updatedData);
  }, [form, updateFormData]);

  const hasFieldError = useCallback((fieldName: keyof BasicInfoFormValues) => {
    return (
      form.formState.errors[fieldName] || 
      stepErrors.some(e => e.toLowerCase().includes(fieldName.toLowerCase()))
    );
  }, [form.formState.errors, stepErrors]);

  return (
    <Form {...form}>
      <div className="space-y-6">        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                    
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    onFieldChange("status", value as "PUBLIC" | "PRIVATE" | "GOVERNMENT_AIDED");
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                      className={`w-full ${hasFieldError("status") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                    <SelectItem value="GOVERNMENT_AIDED">Government Aided</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="typeOfSchool"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Type of School</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    onFieldChange("typeOfSchool", value as "MIXED" | "FEMALE" | "MALE");
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                      className={`w-full ${hasFieldError("typeOfSchool") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    >
                      <SelectValue defaultValue={field.value} placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MIXED">Mixed</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schoolCurriculum"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>School Curriculum</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    onFieldChange("schoolCurriculum", value as "CBC" | "CBD" | "Other");
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                      className={`w-full ${hasFieldError("schoolCurriculum") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    >
                      <SelectValue defaultValue={field.value} placeholder="Select curriculum" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CBC">CBC</SelectItem>
                    <SelectItem value="CBD">CBD</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schoolOwner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>School Owner</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter school owner" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange("schoolOwner", e.target.value);
                    }} 
                    className={`w-full ${hasFieldError("schoolOwner") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />               
          
          <FormField
            control={form.control}
            name="accommodationStatus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Accommodation Status</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    onFieldChange("accommodationStatus", value as "DAY" | "BOARDING" | "MIXED");
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                      className={`w-full ${hasFieldError("accommodationStatus") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select accommodation status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DAY">Day</SelectItem>
                    <SelectItem value="BOARDING">Boarding</SelectItem>
                    <SelectItem value="MIXED">Mixed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="yearOfEstablishment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year of Establishment</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="YYYY" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange("yearOfEstablishment", e.target.value);
                    }} 
                    className={`w-full ${hasFieldError("yearOfEstablishment") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schoolEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>School Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter school email" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange("schoolEmail", e.target.value);
                    }} 
                    className={`w-full ${hasFieldError("schoolEmail") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter contact number" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange("contact", e.target.value);
                    }} 
                    className={`w-full ${hasFieldError("contact") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};