'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle, Users } from 'lucide-react';
import { useEffect } from 'react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { teachingStaffSchema, TeachingStaffFormValues } from '../types/schema';
import { useFormContext } from '../context/FormContext';



export const TeachingStaffForm = () => {
  const { formData, updateFormData, formErrors, } = useFormContext();
  const stepErrors = formErrors['teaching-staff'] || [];
  const form = useForm<TeachingStaffFormValues>({
    resolver: zodResolver(teachingStaffSchema),
    defaultValues: {
      maleTotalTeachers: formData.maleTotalTeachers || 0,
      femaleTotalTeachers: formData.femaleTotalTeachers || 0,
      maleAssistantTeachers: formData.maleAssistantTeachers || 0,
      femaleAssistantTeachers: formData.femaleAssistantTeachers || 0
    },
    mode: 'onChange'
  });
  
  useEffect(() => {
    if (stepErrors.length > 0) {
      form.trigger();
    }
  }, [stepErrors, form]);

   // When external errors change, trigger validation to show the errors
  useEffect(() => {
    if (stepErrors.length > 0) {
      form.trigger();
    }
    console.log("stepErrors", stepErrors);
  }, [stepErrors, form]);
  
  
  const onFieldChange = (name: string, value: number) => {
    const updatedData = { [name]: value } as Partial<TeachingStaffFormValues>;
    updateFormData('teaching-staff', updatedData);
  };

  const maleTotalTeachers = form.watch('maleTotalTeachers') || 0;
  const femaleTotalTeachers = form.watch('femaleTotalTeachers') || 0;
  const maleAssistantTeachers = form.watch('maleAssistantTeachers') || 0;
  const femaleAssistantTeachers = form.watch('femaleAssistantTeachers') || 0;

  const totalTeachers = maleTotalTeachers + femaleTotalTeachers;
  const totalAssistantTeachers = maleAssistantTeachers + femaleAssistantTeachers;
  
  const assistantTeachersExceedTotal = totalAssistantTeachers > totalTeachers;
  
  return (
    <Form {...form}>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="text-primary" size={20} />
            </div>
            <h3 className="font-medium text-gray-800">Staff Summary</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-800">{totalTeachers}</p>
            </div>
            
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Male Teachers</p>
              <p className="text-2xl font-bold text-blue-600">{maleTotalTeachers}</p>
            </div>
            
            <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Female Teachers</p>
              <p className="text-2xl font-bold text-pink-600">{femaleTotalTeachers}</p>
            </div>
            
            <div className={`bg-white p-3 rounded-md shadow-sm border ${assistantTeachersExceedTotal ? 'border-red-200' : 'border-gray-100'}`}>
              <p className="text-xs text-gray-500">Assistant Teachers</p>
              <p className={`text-2xl font-bold ${assistantTeachersExceedTotal ? 'text-red-600' : 'text-green-600'}`}>
                {totalAssistantTeachers}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Full-Time Teachers</h3>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <FormField
                control={form.control}
                name="maleTotalTeachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Male Teachers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                          onFieldChange("maleTotalTeachers", isNaN(value) ? 0 : value);
                        }} 
                        className={stepErrors.some(e => e.includes("male") || e.includes("Male")) ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="femaleTotalTeachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Female Teachers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                          onFieldChange("femaleTotalTeachers", isNaN(value) ? 0 : value);
                        }} 
                        className={stepErrors.some(e => e.includes("female") || e.includes("Female")) ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Assistant Teachers</h3>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4"
            >
              <FormField
                control={form.control}
                name="maleAssistantTeachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Male Assistant Teachers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                          onFieldChange("maleAssistantTeachers", isNaN(value) ? 0 : value);
                        }} 
                        className={stepErrors.some(e => e.includes("assistant") || e.includes("Assistant")) ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="femaleAssistantTeachers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Female Assistant Teachers</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                          const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                          onFieldChange("femaleAssistantTeachers", isNaN(value) ? 0 : value);
                        }} 
                        className={stepErrors.some(e => e.includes("assistant") || e.includes("Assistant")) ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>
        </div>

        {/* Validation error message for assistant teachers */}
        {assistantTeachersExceedTotal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start gap-2"
          >
            <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
            <div>
              <p className="text-sm font-medium">Invalid number of assistant teachers</p>
              <p className="text-sm mt-1">
                The total number of assistant teachers ({totalAssistantTeachers}) cannot exceed 
                the total number of teachers ({totalTeachers}).
              </p>
            </div>
          </motion.div>
        )}
        
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mt-6">
          <p className="text-sm text-blue-700">
            These numbers will be used for accreditation and reporting purposes. 
            Please ensure they are accurate.
          </p>
        </div>
      </motion.div>
    </Form>
  );
}; 