// components/ClaimForm.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = ({ 
  onSubmit, 
  initialData = {}, 
  isEditing = false,
  allowStatusEdit = false 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    defaultValues: initialData
  });

  const claimTypes = [
    "Reimbursement",
    "Damage",
    "Loss",
    "Incident",
    "Equipment",
    "Other"
  ];

  const roles = [
    "Teacher",
    "Staff",
    "Administrator",
    "Student",
    "Parent",
    "Visitor"
  ];

  const statuses = [
    "Submitted",
    "Under Review",
    "Additional Info Required",
    "Approved",
    "Rejected",
    "Resolved"
  ];

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create form data to handle file uploads
      const formData = new FormData();
      
      // Add all form fields to formData
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      // Add attachments
      attachments.forEach(file => {
        formData.append("attachments", file);
      });
      
      // Call the onSubmit function passed as prop
      await onSubmit(formData);
      
      if (!isEditing) {
        // Reset form after successful submission
        reset();
        setAttachments([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto py-6">
      {/* School Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">School Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="school_code" className="block text-sm font-medium text-gray-700 mb-1">
              School Code
            </label>
            <input
              id="school_code"
              type="text"
              {...register("school_code", { required: "School code is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.school_code && (
              <p className="mt-1 text-sm text-red-600">{errors.school_code.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="school_name" className="block text-sm font-medium text-gray-700 mb-1">
              School Name
            </label>
            <input
              id="school_name"
              type="text"
              {...register("school_name", { required: "School name is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.school_name && (
              <p className="mt-1 text-sm text-red-600">{errors.school_name.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Claim Details Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Claim Details</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="claim_type" className="block text-sm font-medium text-gray-700 mb-1">
              Claim Type
            </label>
            <select
              id="claim_type"
              {...register("claim_type", { required: "Claim type is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select claim type</option>
              {claimTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.claim_type && (
              <p className="mt-1 text-sm text-red-600">{errors.claim_type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="claim_description" className="block text-sm font-medium text-gray-700 mb-1">
              Claim Description
            </label>
            <textarea
              id="claim_description"
              rows={4}
              {...register("claim_description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters"
                }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.claim_description && (
              <p className="mt-1 text-sm text-red-600">{errors.claim_description.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Claimant Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Claimant Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="claimant_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="claimant_name"
              type="text"
              {...register("claimant_name", { required: "Name is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.claimant_name && (
              <p className="mt-1 text-sm text-red-600">{errors.claimant_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="claimant_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="claimant_email"
              type="email"
              {...register("claimant_email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.claimant_email && (
              <p className="mt-1 text-sm text-red-600">{errors.claimant_email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="claimant_phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="claimant_phone"
              type="tel"
              {...register("claimant_phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10,15}$/,
                  message: "Please enter a valid phone number"
                }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.claimant_phone && (
              <p className="mt-1 text-sm text-red-600">{errors.claimant_phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="claimant_role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="claimant_role"
              {...register("claimant_role", { required: "Role is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.claimant_role && (
              <p className="mt-1 text-sm text-red-600">{errors.claimant_role.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Evidence</h2>
        <div>
          <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Documents
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>
          {attachments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Selected files:</h4>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600">
                {attachments.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Status Section - Only shown when editing or for administrators */}
      {(isEditing && allowStatusEdit) && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Status Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Claim Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resolution_notes" className="block text-sm font-medium text-gray-700 mb-1">
                Resolution Notes
              </label>
              <textarea
                id="resolution_notes"
                rows={4}
                {...register("resolution_notes")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : isEditing ? "Update Claim" : "Submit Claim"}
        </button>
      </div>
    </form>
  );
};

export default Page