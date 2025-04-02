"use client";
import React, { useEffect, useState } from "react";

import { schoolsData } from "../../constants/schoolsData";
import SchoolIdentification from "./_components/SchoolIdentification";
import SelfAssessment from "./_components/SelfAssessment";
import SummaryPage from "./_components/SummaryPage";
import CombinationSelector from "./_components/CombinationSelector";
import ConfirmationModal from "./_components/ConfirmationModal";
import FormSteps from "./_components/FormSteps";
import { useEmail } from "@/lib";
import SchoolIdentificationPage from "../school-identification/page";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [currentStep, setCurrentStep] = useState("search"); // search, identification, assessment, summary, combination
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = useEmail();
  const params = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()
  const url = params + "/" + "?schoolId=" + searchParams.get("schoolId");
  console.log("params", params);
  console.log("search params", searchParams.get("schoolId"));
  console.log("url", url);

  useEffect(() => {
    const schoolInfo = schoolsData.filter((school) => school.email === email);

    setFilteredSchools(schoolInfo);
  }, []);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleConfirmSelection = () => {
    setIsModalOpen(false);
    if (selectedSchool.schoolIdentification && selectedSchool.selfAssessment) {
      setCurrentStep("combination");
      return;
    }
    if (selectedSchool.schoolIdentification) {
      setCurrentStep("assessment");
      return;
    }
    if (selectedSchool.selfAssessment) {
      setCurrentStep("combination");
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
    setCurrentStep("combination");
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
          <div className="grid gap-6">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {school.name}
                      </h2>
                      <p className="text-gray-600 mt-1">{school.address}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      School
                    </div>
                  </div>

                  {/* Status Cards Section */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {school.schoolIdentification ? (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full w-full text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-green-800 font-medium text-sm mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          SCHOOL IDENTIFICATION
                        </h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-green-700 text-sm font-medium">
                              Registered
                            </p>
                            <p className="text-green-600 font-bold">
                              {school.schoolIdentification.registeredDate ||
                                "Jan 15, 2023"}
                            </p>
                          </div>
                          <div>
                            <p className="text-amber-700 text-sm font-medium">
                              Expires
                            </p>
                            <p className="text-amber-600 font-bold">
                              {school.schoolIdentification.expiryDate ||
                                "Jan 15, 2026"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-green-100">
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                              style={{ width: "65%" }}
                            ></div>
                          </div>
                          <p className="text-xs text-green-600 mt-1">
                            Valid for 65% of certification period
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <div className="mb-3 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          School Identification Missing
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          Complete your school identification to gain
                          certification
                        </p>
                        <a
                          href={`/school-identification?schoolId=${school.id}&returnTo=${params}`}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Start Identification Process
                        </a>
                        
                      </div>
                    )}

                    {school.selfAssessment ? (
                      <div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full w-full text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <h3 className="text-blue-800 font-medium text-sm mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          SELF ASSESSMENT
                        </h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-blue-700 text-sm font-medium">
                              Completed
                            </p>
                            <p className="text-blue-600 font-bold">
                              {school.selfAssessment.completedDate ||
                                "Mar 10, 2023"}
                            </p>
                          </div>
                          <div>
                            <p className="text-purple-700 text-sm font-medium">
                              Next Assessment
                            </p>
                            <p className="text-purple-600 font-bold">
                              {school.selfAssessment.nextDate || "Mar 10, 2024"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-blue-100">
                          <div className="w-full bg-blue-100 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full"
                              style={{ width: "80%" }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">
                            {school.selfAssessment.score
                              ? `Assessment score: ${school.selfAssessment.score}%`
                              : "Assessment score: 80%"}
                          </p>
                        </div>
                      </div>
                        <button className="bg-primary py-2 px-4 rounded-md my-2 text-white hover:cursor-pointer" onClick={() => router.push(`/self-assessment?schoolId=${school.id}&returnTo=${params}`)}>Do another self-assessment</button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <div className="mb-3 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          Self Assessment Required
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          Complete a self assessment to improve your school
                        </p>
                        <a
                          href={`/self-assessment?schoolId=${school.id}&returnTo=${params}`}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Start Self Assessment
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{school.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm">{school.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="text-sm">{school.website}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
                  <button
                    onClick={() => handleSchoolSelect(school)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Select {school.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      // case "identification":
      //   return <SchoolIdentificationPage />;
      // case "assessment":
      //   return (
      //     <SelfAssessment
      //       formData={formData}
      //       onComplete={handleAssessmentComplete}
      //     />
      //   );
      // case "summary":
      //   return (
      //     <SummaryPage data={formData} onContinue={handleSummaryComplete} />
      //   );
      case "combination":
        return (
          <CombinationSelector
            formData={formData}
            onComplete={handleCombinationComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto p-4 bg-gray-50">
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
