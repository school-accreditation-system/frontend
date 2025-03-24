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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HeadTeacherFormValues, headTeacherSchema } from "../types/schema";
import { useFormContext } from "../context/FormContext";
export const HeadTeacherForm = () => {
  const { formData, updateFormData, formErrors, } = useFormContext();
  const stepErrors = formErrors['head-teacher'] || [];
  const form = useForm<HeadTeacherFormValues>({
    resolver: zodResolver(headTeacherSchema),
    defaultValues: {
      htName: formData.htName || "",
      qualification: formData.qualification || "",
      telephone: formData.telephone || ""
    },
    mode: "onChange"
  });
  
  // When external errors change, trigger validation to show the errors
  useEffect(() => {
    if (stepErrors.length > 0) {
      form.trigger();
    }
  }, [stepErrors, form]);
  
  const onFieldChange = (name: string, value: string) => {
    const updatedData = { [name]: value } as Partial<HeadTeacherFormValues>;
    updateFormData('head-teacher', updatedData);
  };

  const hasFieldError = (fieldName: keyof HeadTeacherFormValues) => {
    return (
      form.formState.errors[fieldName] || 
      stepErrors.some(e => e.toLowerCase().includes(fieldName.toLowerCase()))
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="htName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head Teacher Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter head teacher's full name" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("htName", e.target.value);
                      }} 
                      className={hasFieldError("htName") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Master's in Education" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("qualification", e.target.value);
                      }} 
                      className={hasFieldError("qualification") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter telephone number" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("telephone", e.target.value);
                      }} 
                      className={hasFieldError("telephone") ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700">
          <p>
            Head teacher information is required for communication and accountability purposes. 
            All information is kept confidential and used only for official education purposes.
          </p>
        </div>
      </div>
    </Form>
  );
}; 