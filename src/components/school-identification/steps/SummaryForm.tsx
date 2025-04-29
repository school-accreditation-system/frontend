'use client';

import { motion } from 'framer-motion';
import { Check, School, User, Users, UserPlus, AlertCircle, BookOpen } from 'lucide-react';
import { SchoolIdentificationFormValues } from '../types/schema';
import { useSchool } from '@/components/auth/SchoolContext';

interface SummaryFormProps {
  formData: Partial<SchoolIdentificationFormValues>;
  updateFormData?: (data: Partial<SchoolIdentificationFormValues>) => void;
  errors?: string[];
}

export const SummaryForm = ({ formData, errors = [] }: SummaryFormProps) => {
  const { school } = useSchool();
  // Calculate totals
  const totalTeachers = (formData.maleTotalTeachers || 0) + (formData.femaleTotalTeachers || 0);
  const totalAssistantTeachers = (formData.maleAssistantTeachers || 0) + (formData.femaleAssistantTeachers || 0);
  const totalSupportingStaff =
    (formData.cleaners || 0) +
    (formData.watchmen || 0) +
    (formData.schoolCooks || 0) +
    (formData.storekeeper || 0) +
    (formData.drivers || 0);


  // Calculate student totals
  const numBoys = parseInt(formData.numBoys as string || "0", 10) || 0;
  const numGirls = parseInt(formData.numGirls as string || "0", 10) || 0;
  const totalStudents = numBoys + numGirls;
  const numStudentsWithSEN = parseInt(formData.numStudentsWithSEN as string || "0", 10) || 0;

  // Animation variants for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Check className="text-green-500" size={20} />
        Summary
      </h2>

      {errors.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            <h3 className="font-medium">There are validation errors in previous sections</h3>
          </div>
          <p className="mt-1 text-sm">Please go back and fix all errors before submitting.</p>
        </motion.div>
      )}

      {/* Main summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          variants={itemVariants}
          className="p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <School className="text-blue-600" size={18} />
            </div>
            <h3 className="font-medium text-gray-800">Basic School Information</h3>
          </div>

          <div className="grid grid-cols-1 gap-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">School Name:</p>
              <p className="font-medium text-right">{formData.schoolName || school.schoolName || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">School Code:</p>
              <p className="font-medium text-right">{formData.schoolCode || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Type of School:</p>
              <p className="font-medium text-right capitalize">{formData.typeOfSchool || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Status:</p>
              <p className="font-medium text-right capitalize">{formData.status || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Contact:</p>
              <p className="font-medium text-right">{formData.contact || '—'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-purple-50 rounded-lg border border-purple-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <User className="text-purple-600" size={18} />
            </div>
            <h3 className="font-medium text-gray-800">Administrative Staff</h3>
          </div>

          <div className="grid grid-cols-1 gap-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Deputy Head Teachers:</p>
              <p className="font-medium text-right">{formData.numberOfDeputyHeadTeacher || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Secretaries:</p>
              <p className="font-medium text-right">{formData.numberOfSecretary || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Librarians:</p>
              <p className="font-medium text-right">{formData.numberOfLibrarian || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Accountants:</p>
              <p className="font-medium text-right">{formData.numberOfAccountant || '0'}</p>
            </div>
            {formData.numberOfOtherStaff && (
              <div className="flex justify-between border-b pb-1">
                <p className="text-gray-500">Other Staff:</p>
                <p className="font-medium text-right">{formData.numberOfOtherStaff}</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-amber-50 rounded-lg border border-amber-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-600"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="font-medium text-gray-800">Location Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-y-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Province:</p>
              <p className="font-medium text-right">{formData.province || school?.location?.parent?.parent?.parent?.parent?.locationName || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">District:</p>
              <p className="font-medium text-right">{formData.district || school?.location?.parent?.parent?.parent?.locationName || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Sector:</p>
              <p className="font-medium text-right">{formData.sector || school?.location?.parent?.parent?.locationName || '—'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">GPS Coordinates:</p>
              <p className="font-medium text-right">{formData.latitude || '—'}, {formData.longitude || '—'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-teal-50 rounded-lg border border-teal-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-600"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 className="font-medium text-gray-800">Infrastructure</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Classrooms:</p>
              <p className="font-medium">{formData.numClassrooms || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Latrines:</p>
              <p className="font-medium">{formData.numLatrines || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Libraries:</p>
              <p className="font-medium">{formData.numLibraries || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Smart Classes:</p>
              <p className="font-medium">{formData.numSmartClassrooms || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Offices:</p>
              <p className="font-medium">{formData.numAdminOffices || '0'}</p>
            </div>
            <div className="flex justify-between border-b pb-1">
              <p className="text-gray-500">Halls:</p>
              <p className="font-medium">{formData.numMultipurposeHalls || '0'}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Staff and Student Summary */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          variants={itemVariants}
          className="p-4 bg-indigo-50 rounded-lg border border-indigo-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <BookOpen className="text-indigo-600" size={18} />
            </div>
            <h3 className="font-medium text-gray-800">Students</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-800">{totalStudents}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">With SEN</p>
              <p className="text-lg font-bold text-purple-600">{numStudentsWithSEN}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Boys</p>
              <p className="text-lg font-bold text-blue-600">{numBoys}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Girls</p>
              <p className="text-lg font-bold text-pink-600">{numGirls}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-4 bg-indigo-50 rounded-lg border border-indigo-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Users className="text-indigo-600" size={18} />
            </div>
            <h3 className="font-medium text-gray-800">Teachers</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-800">{totalTeachers}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Assistants</p>
              <p className="text-lg font-bold text-green-600">{totalAssistantTeachers}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Male</p>
              <p className="text-lg font-bold text-blue-600">{formData.maleTotalTeachers || 0}</p>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">Female</p>
              <p className="text-lg font-bold text-pink-600">{formData.femaleTotalTeachers || 0}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Supporting Staff */}
      <motion.div
        variants={itemVariants}
        className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-full">
            <UserPlus className="text-green-600" size={18} />
          </div>
          <h3 className="font-medium text-gray-800">Supporting Staff</h3>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-800">{totalSupportingStaff}</p>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Cleaners</p>
            <p className="text-lg font-bold text-gray-600">{formData.cleaners || 0}</p>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Watchmen</p>
            <p className="text-lg font-bold text-gray-600">{formData.watchmen || 0}</p>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Cooks</p>
            <p className="text-lg font-bold text-gray-600">{formData.schoolCooks || 0}</p>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Storekeeper</p>
            <p className="text-lg font-bold text-gray-600">{formData.storekeeper || 0}</p>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">Drivers</p>
            <p className="text-lg font-bold text-gray-600">{formData.drivers || 0}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded"
      >
        <p className="text-sm font-medium">Please Review</p>
        <p className="text-sm">Ensure all information is correct before submission.</p>
      </motion.div>
    </motion.div>
  );
};