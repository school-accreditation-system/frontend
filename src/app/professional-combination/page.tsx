"use client";
import React, { useEffect, useState } from "react";

import { schoolsData } from "../../../utils/schoolsData";
import SchoolIdentification from "./_components/SchoolIdentification";
import SelfAssessment from "./_components/SelfAssessment";
import SummaryPage from "./_components/SummaryPage";
import ConfirmationModal from "./_components/ConfirmationModal";
import FormSteps from "./_components/FormSteps";
import ProfessionalProgramSelector from "./_components/ProfessionalProgramSelector";

const Page = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [currentStep, setCurrentStep] = useState("search"); // search, identification, assessment, summary, combination
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSchoolData(schoolsData);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredSchools(schoolData);
    } else {
      const filtered = schoolData.filter((school) =>
        school.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSchools(filtered);
    }
  };

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleConfirmSelection = () => {
    setIsModalOpen(false);
    if (selectedSchool.schoolIdentification && selectedSchool.selfAssessment) {
      setCurrentStep("professional-combination");
      return;
    }
    if (selectedSchool.schoolIdentification) {
      setCurrentStep("assessment");
      return;
    }
    if (selectedSchool.selfAssessment) {
      setCurrentStep("professional-combination");
      return;
    }
    setCurrentStep("identification");
  };

  const handleIdentificationComplete = (data) => {
    setFormData(data);
    setCurrentStep("assessment");
  };

  const handleAssessmentComplete = (completeData) => {
    setFormData(completeData);
    setCurrentStep("summary");
  };

  const handleSummaryComplete = () => {
    setCurrentStep("professional-combination");
  };

  const handleCombinationComplete = (completeData) => {
    setFormData(completeData);
    // In the future: Submit data to backend
    // alert(
    //   "Data ready to be sent to database. Combination selected: " +
    //     completeData.combination
    // );
    // Optionally reset the form or redirect
    // setCurrentStep("search");
  };

  // Render based on current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "search":
        return (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Search School</h1>
              <p className="text-gray-600 mb-3">Enter School name</p>
              <input
                type="text"
                placeholder="Enter school name"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              {filteredSchools.length > 0 ? (
                <div className="space-y-4">
                  {filteredSchools.map((school) => (
                    <div
                      key={school.id}
                      className="border p-4 rounded-md hover:bg-gray-50"
                    >
                      <h2 className="text-xl font-semibold">{school.name}</h2>
                      <p className="text-gray-600">{school.address}</p>
                      <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-x-4">
                        <p>📧 {school.email}</p>
                        <p>📞 {school.phone}</p>
                        <p>🌐 {school.website}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => handleSchoolSelect(school)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                        >
                          Select {school.name} - View Combinations
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No schools found
                </p>
              )}
            </div>
          </div>
        );
      case "identification":
        return (
          <SchoolIdentification
            selectedSchool={selectedSchool}
            onComplete={handleIdentificationComplete}
          />
        );
      case "assessment":
        return (
          <SelfAssessment
            formData={formData}
            onComplete={handleAssessmentComplete}
          />
        );
      case "summary":
        return (
          <SummaryPage data={formData} onContinue={handleSummaryComplete} />
        );
      case "professional-combination":
        return (
          <ProfessionalProgramSelector
            formData={formData}
            onComplete={handleCombinationComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {currentStep !== "search" && <FormSteps currentStep={currentStep} />}
      {renderCurrentStep()}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        school={selectedSchool || {}}
        onConfirm={handleConfirmSelection}
      />
    </div>
  );
};

export default Page;
