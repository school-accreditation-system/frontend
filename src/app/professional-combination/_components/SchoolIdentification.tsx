"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { FormActions } from "./FormActions";
import { validateForm, validateField } from "./validation";
import { required, minLength, isInteger, minValue, maxValue, composeValidators } from "./basicValidators";

const SCHOOL_TYPES = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
  { value: "Charter", label: "Charter" },
  { value: "International", label: "International" },
];

const SchoolIdentification = ({ onComplete, selectedSchool }) => {
  const [formData, setFormData] = useState({
    principalName: "",
    yearEstablished: "",
    numberOfStudents: "",
    numberOfTeachers: "",
    schoolType: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentYear = new Date().getFullYear();
  
  const validators = {
    principalName: composeValidators(
      required,
      minLength(2)
    ),
    yearEstablished: composeValidators(
      required,
      isInteger,
      minValue(1800),
      maxValue(currentYear)
    ),
    numberOfStudents: composeValidators(
      required,
      isInteger,
      minValue(1)
    ),
    numberOfTeachers: composeValidators(
      required,
      isInteger,
      minValue(1)
    ),
    schoolType: required
  };

  // Prefill form with existing data if available
  useEffect(() => {
    if (selectedSchool) {
      const prefillData = {
        principalName: selectedSchool.principalName || "",
        yearEstablished: selectedSchool.yearEstablished || "",
        numberOfStudents: selectedSchool.numberOfStudents || "",
        numberOfTeachers: selectedSchool.numberOfTeachers || "",
        schoolType: selectedSchool.schoolType || "",
      };
      setFormData(prefillData);
    }
  }, [selectedSchool]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const fieldError = validateField(name, value, validators);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { isValid, errors: validationErrors } = validateForm(formData, validators);
    
    if (isValid) {
      // All fields are valid, proceed with submission
      onComplete({
        ...selectedSchool,
        ...formData,
      });
    } else {
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Identification</h1>
      <p className="text-gray-600 mb-6">
        Please provide additional information about{" "}
        {selectedSchool?.name || "your school"}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField 
          label="Principal Name" 
          name="principalName"
          value={formData.principalName}
          onChange={handleChange}
          error={errors.principalName}
          disabled={isSubmitting}
        />
        
        <FormField 
          label="Year Established" 
          name="yearEstablished"
          type="number"
          value={formData.yearEstablished}
          onChange={handleChange}
          error={errors.yearEstablished}
          disabled={isSubmitting}
        />
        
        <FormField 
          label="Number of Students" 
          name="numberOfStudents"
          type="number"
          value={formData.numberOfStudents}
          onChange={handleChange}
          error={errors.numberOfStudents}
          disabled={isSubmitting}
        />
        
        <FormField 
          label="Number of Teachers" 
          name="numberOfTeachers"
          type="number"
          value={formData.numberOfTeachers}
          onChange={handleChange}
          error={errors.numberOfTeachers}
          disabled={isSubmitting}
        />
        
        <SelectField 
          label="School Type"
          name="schoolType"
          value={formData.schoolType}
          onChange={handleChange}
          error={errors.schoolType}
          disabled={isSubmitting}
          options={SCHOOL_TYPES}
        />
        
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default SchoolIdentification;