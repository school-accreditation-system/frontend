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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdministrativeStaffFormValues, administrativeStaffSchema } from "../types/schema";
import { useFormContext } from "../context/FormContext";
export const AdministrativeStaffForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();
  const stepErrors = formErrors['administrative-staff'] || [];

  const form = useForm<AdministrativeStaffFormValues>({
    resolver: zodResolver(administrativeStaffSchema),
    defaultValues: {
      numberOfSecretary: formData.numberOfSecretary || 0,
      numberOfLibrarian: formData.numberOfLibrarian || 0,
      numberOfAccountant: formData.numberOfAccountant || 0,
      numberOfDeputyHeadTeacher: formData.numberOfDeputyHeadTeacher || 0,
      numberOfOtherStaff: formData.numberOfOtherStaff || ""
    },
    mode: "onChange"
  });

  // Sync form data on component mount and when formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.reset({
        numberOfSecretary: formData.numberOfSecretary || 0,
        numberOfLibrarian: formData.numberOfLibrarian || 0,
        numberOfAccountant: formData.numberOfAccountant || 0,
        numberOfDeputyHeadTeacher: formData.numberOfDeputyHeadTeacher || 0,
        numberOfOtherStaff: formData.numberOfOtherStaff || ""
      }, { keepValues: true });
    }
  }, [formData, form]);

  // When external errors change, trigger validation to show the errors
  useEffect(() => {
    if (stepErrors.length > 0) {
      form.trigger();
    }
  }, [stepErrors, form]);

  console.log("Year of Est ======> ", formData.yearOfEstablishment)

  const onFieldChange = (name: string, value: any) => {
    const updatedData = { [name]: value } as Partial<AdministrativeStaffFormValues>;
    updateFormData('administrative-staff', updatedData);
  };

  const hasFieldError = (fieldName: keyof AdministrativeStaffFormValues) => {
    return (
      form.formState.errors[fieldName] ||
      stepErrors.some(e => e.toLowerCase().includes(fieldName.toLowerCase()))
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="p-4 bg-primary/5 border border-primary rounded-md text-sm text-primary mb-6">
          <p>
            Please enter information about additional administrative staff if you already have them or the enter their expected number. This information is important
            for understanding the overall staffing structure of the school.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="numberOfSecretary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Secretaries</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of secretaries"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                        onFieldChange("numberOfSecretary", parseInt(e.target.value) || 0);
                      }}
                      className={hasFieldError("numberOfSecretary") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="numberOfLibrarian"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Librarians</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of librarians"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                        onFieldChange("numberOfLibrarian", parseInt(e.target.value) || 0);
                      }}
                      className={hasFieldError("numberOfLibrarian") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="numberOfAccountant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Accountants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of accountants"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                        onFieldChange("numberOfAccountant", parseInt(e.target.value) || 0);
                      }}
                      className={hasFieldError("numberOfAccountant") ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="numberOfDeputyHeadTeacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Deputy Head Teachers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of deputy head teachers"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                        onFieldChange("numberOfDeputyHeadTeacher", parseInt(e.target.value) || 0);
                      }}
                      className={hasFieldError("numberOfDeputyHeadTeacher") ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="numberOfOtherStaff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Administrative Staff (please specify)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter details of other administrative staff"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("numberOfOtherStaff", e.target.value);
                      }}
                      className={hasFieldError("numberOfOtherStaff") ? "border-red-500 focus-visible:ring-red-500" : ""}
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