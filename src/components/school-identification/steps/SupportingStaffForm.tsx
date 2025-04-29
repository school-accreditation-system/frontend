/* eslint-disable max-lines */
'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SupportingStaffFormValues, supportingStaffSchema } from '../types/schema';

interface SupportingStaffFormProps {
  formData: Partial<SupportingStaffFormValues>;
  updateFormData: (data: Partial<SupportingStaffFormValues>) => void;
  errors?: string[];
}

export const SupportingStaffForm = ({ formData, updateFormData, errors = [] }: SupportingStaffFormProps) => {
  const form = useForm<SupportingStaffFormValues>({
    resolver: zodResolver(supportingStaffSchema),
    defaultValues: {
      cleaners: formData.cleaners ?? 0,
      watchmen: formData.watchmen ?? 0,
      schoolCooks: formData.schoolCooks ?? 0,
      storekeeper: formData.storekeeper ?? 0,
      drivers: formData.drivers ?? 0,
      otherSupportingStaff: formData.otherSupportingStaff || ''
    },
    mode: 'onChange'
  });

  // When external errors change, trigger validation to show the errors
  useEffect(() => {
    if (errors.length > 0) {
      form.trigger();
    }
  }, [errors, form]);

  const onFieldChange = (name: string, value: number | string) => {
    const updatedData = { [name]: value } as Partial<SupportingStaffFormValues>;
    updateFormData(updatedData);
  };

  // Calculate total
  const cleaners = form.watch('cleaners') || 0;
  const watchmen = form.watch('watchmen') || 0;
  const schoolCooks = form.watch('schoolCooks') || 0;
  const storekeeper = form.watch('storekeeper') || 0;
  const drivers = form.watch('drivers') || 0;

  const totalSupportingStaff = cleaners + watchmen + schoolCooks + storekeeper + drivers;


  return (
    <Form {...form}>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-full">
            <UserPlus className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Non-Teaching Staff</h3>
            <p className="text-sm text-gray-500">Total: {totalSupportingStaff}</p>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary rounded-md text-sm text-primary mb-6">
          <p>
            Enter the number of supporting staff, if you already have them or Enter their expected number
          </p>
        </div>

        {/* Display summary of provided data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">Supporting Staff Summary</h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-800">{totalSupportingStaff}</p>
            </div>
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Cleaners</p>
              <p className="text-lg font-semibold text-gray-700">{cleaners}</p>
            </div>
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Watchmen</p>
              <p className="text-lg font-semibold text-gray-700">{watchmen}</p>
            </div>
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Cooks</p>
              <p className="text-lg font-semibold text-gray-700">{schoolCooks}</p>
            </div>
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Storekeeper</p>
              <p className="text-lg font-semibold text-gray-700">{storekeeper}</p>
            </div>
            <div className="text-center p-2 bg-white rounded shadow-sm">
              <p className="text-xs text-gray-500">Drivers</p>
              <p className="text-lg font-semibold text-gray-700">{drivers}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name="cleaners"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cleaners</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      value={field.value === 0 && !document.activeElement?.id?.includes("cleaners") ? "" : field.value.toString()}
                      onChange={(e) => {
                        // When input is empty or invalid, default to 0
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                        onFieldChange("cleaners", isNaN(value) ? 0 : value);
                      }}
                      className={errors.some(e => e.includes("cleaners")) ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="watchmen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Watchmen</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      value={field.value === 0 && !document.activeElement?.id?.includes("watchmen") ? "" : field.value.toString()}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                        onFieldChange("watchmen", isNaN(value) ? 0 : value);
                      }}
                      className={errors.some(e => e.includes("watchmen")) ? "border-red-500 focus-visible:ring-red-500" : ""}
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
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FormField
              control={form.control}
              name="schoolCooks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Cooks</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      value={field.value === 0 && !document.activeElement?.id?.includes("schoolCooks") ? "" : field.value.toString()}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                        onFieldChange("schoolCooks", isNaN(value) ? 0 : value);
                      }}
                      className={errors.some(e => e.toLowerCase().includes("cooks") && !e.toLowerCase().includes("valid")) ? "border-red-500 focus-visible:ring-red-500" : ""}
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
              name="storekeeper"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storekeeper</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      value={field.value === 0 && !document.activeElement?.id?.includes("storekeeper") ? "" : field.value.toString()}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                        onFieldChange("storekeeper", isNaN(value) ? 0 : value);
                      }}
                      className={errors.some(e => e.includes("storekeeper")) ? "border-red-500 focus-visible:ring-red-500" : ""}
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
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="drivers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drivers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      value={field.value === 0 && !document.activeElement?.id?.includes("drivers") ? "" : field.value.toString()}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                        onFieldChange("drivers", isNaN(value) ? 0 : value);
                      }}
                      className={errors.some(e => e.includes("drivers")) ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-6"
        >
          <FormField
            control={form.control}
            name="otherSupportingStaff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Supporting Staff (Specify)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List any other supporting staff not covered above"
                    className="resize-none"
                    rows={3}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onFieldChange("otherSupportingStaff", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </motion.div>
    </Form>
  );
};