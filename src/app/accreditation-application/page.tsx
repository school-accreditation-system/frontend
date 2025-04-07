"use client"

import React, { useState, useEffect } from 'react'
import SchoolInformation from './_components/SchoolInformation'
import ApplicantInformation from './_components/ApplicantInformation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Define a schema for the entire form
const applicationSchema = z.object({
  schoolInformation: z.object({
    schoolName: z.string().min(1, { message: "School name is required" }),
    schoolCode: z.string().min(1, { message: "School code is required" }),
    province: z.string().min(1, { message: "Province is required" }),
    district: z.string().min(1, { message: "District is required" }),
    sector: z.string().min(1, { message: "Sector is required" }),
    cell: z.string().min(1, { message: "Cell is required" }),
    village: z.string().min(1, { message: "Village is required" })
  }),
  applicantInformation: z.object({
    nationalId: z.string().min(1, { message: "National ID is required" }),
    applicantName: z.string().min(1, { message: "Applicant name is required" }),
    province: z.string().min(1, { message: "Province is required" }),
    district: z.string().min(1, { message: "District is required" }),
    sector: z.string().min(1, { message: "Sector is required" }),
    cell: z.string().min(1, { message: "Cell is required" }),
    village: z.string().min(1, { message: "Village is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    telephone: z.string().min(1, { message: "Telephone number is required" })
  })
});

const Page = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [applicantData, setApplicantData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load initial data from localStorage
  useEffect(() => {
    try {
      // Load school data
      const storedSchoolData = localStorage.getItem("schoolInformation");
      if (storedSchoolData) {
        setSchoolData(JSON.parse(storedSchoolData));
      }
      
      // Load applicant data
      const storedApplicantData = localStorage.getItem("applicantInformation");
      if (storedApplicantData) {
        setApplicantData(JSON.parse(storedApplicantData));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);
  
  // Handle data changes from child components
  const handleSchoolDataChange = (data) => {
    console.log("School data changed:", data);
    setSchoolData(data);
  };
  
  const handleApplicantDataChange = (data) => {
    console.log("Applicant data changed:", data);
    setApplicantData(data);
  };
  
  // Handle form submission
  const handleSaveAll = () => {
    setIsSubmitting(true);

    console.log("schoolData",schoolData)
    
    // Validate that we have both school and applicant data
    if (!schoolData || !applicantData) {
      alert("Please fill in both School Information and Applicant Information forms");
      setIsSubmitting(false);
      return;
    }
    
    // Combine all data
    const combinedData = {
      schoolInformation: schoolData,
      applicantInformation: applicantData
    };
    
    try {
      // Validate the data against our schema
      applicationSchema.parse(combinedData);
      
      // Save to localStorage
      localStorage.setItem("fullApplicationData", JSON.stringify(combinedData));
      
      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // You could also submit to an API here
      // const response = await fetch('/api/submitApplication', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(combinedData)
      // });
      
    } catch (error) {
      console.error("Validation error:", error);
      alert("Please make sure all required fields are filled correctly");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className='flex flex-col items-center justify-center py-10'>
      <SchoolInformation onDataChange={handleSchoolDataChange} />
      <ApplicantInformation onDataChange={handleApplicantDataChange} />
      
      <div className="flex w-full max-w-3xl justify-between mt-6">
        {saveSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            All information saved successfully!
          </div>
        )}
        
        <div className="ml-auto">
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSaveAll}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Information'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page