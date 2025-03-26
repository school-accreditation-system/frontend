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
      schoolName: formData.schoolName || "",
      schoolCode: formData.schoolCode || "",
      schoolEmail: formData.schoolEmail || "",
      status: formData.status || undefined,
      typeOfSchool: formData.typeOfSchool || undefined,
      schoolOwner: formData.schoolOwner || "",
      contact: formData.contact || "",
      accommodationStatus: formData.accommodationStatus || undefined,
      yearOfEstablishment: formData.yearOfEstablishment || ""
    },
    mode: "onChange"
  });

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    // Only reset the form if there's actual data and we're not in the middle of validation
    if (Object.keys(formData).length > 0) {
      form.reset({
        schoolName: formData.schoolName || "",
        schoolCode: formData.schoolCode || "",
        schoolEmail: formData.schoolEmail || "",
        status: formData.status || undefined,
        typeOfSchool: formData.typeOfSchool || undefined,
        schoolOwner: formData.schoolOwner || "",
        contact: formData.contact || "",
        accommodationStatus: formData.accommodationStatus || undefined,
        yearOfEstablishment: formData.yearOfEstablishment || ""
      }, { keepValues: true });
    }
  }, [formData]); 

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
          <div>
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter school name" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("schoolName", e.target.value);
                      }} 
                      className={hasFieldError("schoolName") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="schoolCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter school code" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("schoolCode", e.target.value);
                      }} 
                      className={hasFieldError("schoolCode") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="schoolEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Enter school email" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("schoolEmail", e.target.value);
                      }} 
                      className={hasFieldError("schoolEmail") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      onFieldChange("status", value as "public" | "private" | "Government Aided");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("status") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="Government Aided">Government Aided</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="typeOfSchool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of School</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      onFieldChange("typeOfSchool", value as "TVET" | "General Education");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("typeOfSchool") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        <SelectValue defaultValue={field.value} placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TVET">TVET</SelectItem>
                      <SelectItem value="General Education">General Education</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="schoolOwner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Owner</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter school owner" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("schoolOwner", e.target.value);
                      }} 
                      className={hasFieldError("schoolOwner") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter contact number" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("contact", e.target.value);
                      }} 
                      className={hasFieldError("contact") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="accommodationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accommodation Status</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      onFieldChange("accommodationStatus", value as "day" | "boarding" | "mixed");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className={hasFieldError("accommodationStatus") ? "border-red-500 focus-visible:ring-red-500" : ""}
                      >
                        <SelectValue placeholder="Select accommodation status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="boarding">Boarding</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="yearOfEstablishment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Establishment</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="YYYY" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("yearOfEstablishment", e.target.value);
                      }} 
                      className={hasFieldError("yearOfEstablishment") ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}; 