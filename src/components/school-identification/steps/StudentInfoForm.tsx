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
import { useFormContext } from "../context/FormContext";
import { StudentInfoFormValues } from "../types/schema";
import { useStudentInfoForm } from "../hooks/useStudentInfoForm";
import { StudentSummary } from "../components/StudentSummary";

export const StudentInfoForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();
  
  const {
    form,
    onFieldChange,
    hasFieldError,
    stepErrors
  } = useStudentInfoForm({ formData, updateFormData, formErrors });

  return (
    <Form {...form}>
      <div className="space-y-6">
        {stepErrors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              {stepErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-medium mb-6">Student Information</h3>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Student Summary Cards */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <StudentSummary
                numBoys={form.watch("numBoys")}
                numGirls={form.watch("numGirls")}
                numStudentsWithSEN={form.watch("numStudentsWithSEN")}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Boys */}
              <FormField
                control={form.control}
                name="numBoys"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Boys</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number of boys" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numBoys", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numBoys") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Girls */}
              <FormField
                control={form.control}
                name="numGirls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Girls</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number of girls" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numGirls", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numGirls") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Students with SEN */}
            <FormField
              control={form.control}
              name="numStudentsWithSEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Students with SEN</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter number of students with special educational needs" 
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onFieldChange("numStudentsWithSEN", e.target.value);
                      }} 
                      className={`h-12 ${hasFieldError("numStudentsWithSEN") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
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