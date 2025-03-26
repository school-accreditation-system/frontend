"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Professional programs data
const PROFESSIONAL_PROGRAMS = {
  programs: [
    {
      id: "accounting",
      name: "Accounting",
      description: "Professional program focused on financial accounting, auditing, and business management. Ideal for careers in finance, consulting, and corporate accounting.",
      subjects: ["Financial Accounting", "Management Accounting", "Auditing", "Taxation", "Finance"]
    },
    {
      id: "anp",
      name: "Associate Nursing Program (ANP)",
      description: "Healthcare program that prepares students for careers in nursing. Focuses on clinical skills, patient care, and healthcare fundamentals.",
      subjects: ["Anatomy & Physiology", "Pharmacology", "Clinical Nursing", "Healthcare Ethics", "Patient Assessment"]
    },
    {
      id: "ttc",
      name: "TTC Subjects",
      description: "Teacher Training College program that prepares students for careers in education. Focuses on teaching methodologies and educational fundamentals.",
      subjects: ["Educational Psychology", "Teaching Methods", "Curriculum Development", "Classroom Management", "Assessment Techniques"]
    }
  ]
};

// Program icons
const PROGRAM_ICONS = {
  "accounting": "💼",
  "anp": "🏥",
  "ttc": "🎓"
};

const ProfessionalProgramSelector = ({ onComplete, formData }) => {
  const router = useRouter();
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  // Filter programs based on search text
  const getFilteredPrograms = () => {
    const allPrograms = PROFESSIONAL_PROGRAMS.programs;
    
    if (searchText) {
      return allPrograms.filter(program => 
        program.name.toLowerCase().includes(searchText.toLowerCase()) ||
        program.subjects.some(subject => 
          subject.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    
    return allPrograms;
  };
  
  // Toggle selection of a program
  const toggleProgram = (programId) => {
    setSelectedPrograms(prev => {
      if (prev.includes(programId)) {
        return prev.filter(id => id !== programId);
      } else {
        return [...prev, programId];
      }
    });
  };
  
  // Select all programs
  const selectAll = () => {
    const allProgramIds = getFilteredPrograms().map(program => program.id);
    setSelectedPrograms(allProgramIds);
  };
  
  // Clear all selections
  const clearAll = () => {
    setSelectedPrograms([]);
  };
  
  // Generate a random application ID
  const generateApplicationId = () => {
    const prefix = "PRO";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${timestamp}-${random}`;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create final selections with details
      const selections = selectedPrograms.map(id => 
        PROFESSIONAL_PROGRAMS.programs.find(program => program.id === id)
      );
      
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate an application ID
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);
      
      // Add the programs to the form data
      if (onComplete) {
        onComplete({
          ...formData,
          professionalPrograms: selections,
          applicationId: newApplicationId
        });
      }
      
      // Show success modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Choose Professional Programs</h1>
      <p className="text-gray-600 mb-6">
        Select professional programs for {formData?.name || "your institution"} to complete the registration
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Program Type */}
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Type of Request</h2>
            <div className="border rounded-lg p-3 mt-2">
              <div className="font-medium">Professional Programs</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Programs</h2>
            <p className="text-sm text-gray-500 mb-4">Select from our professional program offerings</p>
            
            {PROFESSIONAL_PROGRAMS.programs.map(program => (
              <div 
                key={program.id}
                className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer transition-all ${
                  selectedPrograms.includes(program.id) 
                    ? "border-blue-500 bg-blue-50" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleProgram(program.id)}
              >
                <span className="text-2xl mr-3">{PROGRAM_ICONS[program.id]}</span>
                <div>
                  <div className="font-medium">{program.name}</div>
                  <div className="text-sm text-gray-500">
                    {program.subjects.length} subjects
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column - Programs */}
        <div className="lg:col-span-2 border rounded-lg p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search programs or subjects..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="mt-3 flex space-x-3">
              <button 
                type="button"
                onClick={selectAll}
                className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Select All
              </button>
              <button 
                type="button"
                onClick={clearAll}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {getFilteredPrograms().map(program => (
              <div 
                key={program.id} 
                className="border rounded-md p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`program-${program.id}`}
                    checked={selectedPrograms.includes(program.id)}
                    onChange={() => toggleProgram(program.id)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor={`program-${program.id}`}
                    className="ml-3 cursor-pointer w-full"
                  >
                    <span className="block font-medium">{program.name}</span>
                    <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                  </label>
                </div>
              </div>
            ))}
            
            {getFilteredPrograms().length === 0 && (
              <div className="text-gray-500 text-center py-6">
                No programs match your search
              </div>
            )}
          </div>
          
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {selectedPrograms.length} selected
              </span>
              <span className="ml-2 text-gray-500">programs selected</span>
            </div>
            
            <button
              type="button"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              onClick={handleSubmit}
              disabled={selectedPrograms.length === 0 || isSubmitting}
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>
      
      {/* Selected Programs Summary */}
      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Selected Programs</h2>
        
        {selectedPrograms.length === 0 ? (
          <div className="text-gray-500 text-center py-6">
            No programs selected yet
          </div>
        ) : (
          <div className="space-y-3">
            {selectedPrograms.map(id => {
              const program = PROFESSIONAL_PROGRAMS.programs.find(p => p.id === id);
              return (
                <div key={`selected-${id}`} className="flex items-start border-b pb-3">
                  <div className="flex-1">
                    <div className="font-medium">{program.name}</div>
                    <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {program.subjects.map(subject => (
                        <span 
                          key={`${id}-${subject}`} 
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => toggleProgram(id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedPrograms.length === 0 || isSubmitting}
          className={`px-6 py-2 rounded-md ${
            selectedPrograms.length === 0 || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit Registration"
          )}
        </button>
      </div>
      
      {/* Success Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your professional programs have been successfully registered.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-500">Application ID</p>
                <p className="text-lg font-semibold">{applicationId}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Please save this application ID for future reference.
              </p>
              <button
                onClick={handleModalClose}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalProgramSelector;