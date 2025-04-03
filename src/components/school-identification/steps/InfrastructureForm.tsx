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
import { InfrastructureFormValues } from "../types/schema";
import { useInfrastructureForm } from "../hooks/useInfrastructureForm";
import { InfrastructureSummary } from "../components/InfrastructureSummary";

export const InfrastructureForm = () => {
  const { formData, updateFormData, formErrors } = useFormContext();
  
  const {
    form,
    onFieldChange,
    hasFieldError,
    stepErrors
  } = useInfrastructureForm({ formData, updateFormData, formErrors });

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
          <h3 className="text-xl font-medium mb-6">Infrastructure</h3>
          
          <div className="space-y-6 mx-auto">
            {/* Infrastructure Summary Cards */}
            <div className="bg-gray-50  rounded-lg border border-gray-100 mb-6">
              <InfrastructureSummary
                numClassrooms={form.watch("numClassrooms")}
                numLatrines={form.watch("numLatrines")}
                numKitchens={form.watch("numKitchens")}
                numDiningHalls={form.watch("numDiningHalls")}
                numLibraries={form.watch("numLibraries")}
                numSmartClassrooms={form.watch("numSmartClassrooms")}
                numComputerLabs={form.watch("numComputerLabs")}
                numAdminOffices={form.watch("numAdminOffices")}
                numMultipurposeHalls={form.watch("numMultipurposeHalls")}
                numAcademicStaffRooms={form.watch("numAcademicStaffRooms")}
              />
            </div>
            
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Classrooms */}
              <FormField
                control={form.control}
                name="numClassrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nbr. of All Classrooms at the School</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numClassrooms", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numClassrooms") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Latrines */}
              <FormField
                control={form.control}
                name="numLatrines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nr. of All Latrines/Toilets</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numLatrines", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numLatrines") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Kitchens */}
              <FormField
                control={form.control}
                name="numKitchens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Kitchen</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numKitchens", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numKitchens") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Dining Halls */}
              <FormField
                control={form.control}
                name="numDiningHalls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Dining Hall</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numDiningHalls", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numDiningHalls") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Third row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Libraries */}
              <FormField
                control={form.control}
                name="numLibraries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Library</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numLibraries", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numLibraries") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Smart Classrooms */}
              <FormField
                control={form.control}
                name="numSmartClassrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Smart Classrooms</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numSmartClassrooms", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numSmartClassrooms") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Fourth row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Computer Labs */}
              <FormField
                control={form.control}
                name="numComputerLabs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Computer Laboratory</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numComputerLabs", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numComputerLabs") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Admin Offices */}
              <FormField
                control={form.control}
                name="numAdminOffices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Administrative Staff Offices</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numAdminOffices", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numAdminOffices") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Fifth row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Multipurpose Halls */}
              <FormField
                control={form.control}
                name="numMultipurposeHalls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Multipurpose Halls</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numMultipurposeHalls", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numMultipurposeHalls") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Number of Academic Staff Rooms */}
              <FormField
                control={form.control}
                name="numAcademicStaffRooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Number of Academic Staff Rooms</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter number" 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onFieldChange("numAcademicStaffRooms", e.target.value);
                        }} 
                        className={`h-12 ${hasFieldError("numAcademicStaffRooms") ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}; 