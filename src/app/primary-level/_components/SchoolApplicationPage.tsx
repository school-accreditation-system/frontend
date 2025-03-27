"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SuccessModal from "./SuccessModal";
import { schoolsData } from "@/constants/schoolsData";

const SchoolApplicationPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [hasIdentification, setHasIdentification] = useState(false);
  const [hasSelfAssessment, setHasSelfAssessment] = useState(false);
  const [hasOrdinaryLevel, setHasOrdinaryLevel] = useState(null);

  const [schools, setSchools] = useState([]);
  useEffect(() => {
    setSchools(schoolsData);
  }, []);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const filteredSchools =
    searchQuery.length > 2
      ? schools.filter((school) =>
          school.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];


  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setHasIdentification(school.schoolIdentification);
    setHasSelfAssessment(school.selfAssessment);
    setHasOrdinaryLevel(school.hasOrdinaryLevel)
  };


  const navigateToIdentification = () => {
    router.push(`/school-identification?schoolId=${selectedSchool.id}`);
  };


  const navigateToSelfAssessment = () => {
    router.push(`/self-assessment?schoolId=${selectedSchool.id}`);
  };


  const navigateToOrdinaryLevel = () => {
    setShowSuccessModal(true);
  };


  const renderSearchResults = () => {
    if (searchQuery.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Search for your school
          </h3>
          <p className="text-gray-500">
            Enter your school name or location to get started
          </p>
        </div>
      );
    }

    if (searchQuery.length < 3) {
      return (
        <div className="text-center py-8 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            Please enter at least 3 characters to search for schools.
          </p>
        </div>
      );
    }

    if (filteredSchools.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">
            No schools match your search. Try different keywords.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all cursor-pointer ${
              selectedSchool?.id === school.id
                ? "border-blue-500"
                : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => handleSchoolSelect(school)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {school.name}
            </h3>
            <p className="text-gray-500 mb-4">{school.location}</p>

            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  school.schoolIdentification
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {school.schoolIdentification
                  ? "Identified"
                  : "Needs Identification"}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  school.selfAssessment
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {school.selfAssessment
                  ? "Assessment Complete"
                  : "Needs Assessment"}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Primary Level Application Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Search for your school and manage applications
        </p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for schools by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* School List */}
        <div className="mb-10">{renderSearchResults()}</div>

        {/* Application Cards */}
        {selectedSchool && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School Identification Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    School Identification
                  </h2>
                  <p className="text-gray-500">
                    Complete your school details and registration information
                  </p>
                </div>
                {hasIdentification && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                )}
              </div>

              <button
                onClick={navigateToIdentification}
                className={`w-full py-2 rounded-lg text-center font-medium ${
                  hasIdentification
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {hasIdentification
                  ? "Update Information"
                  : "Complete Identification"}
              </button>
            </div>

            {/* Self Assessment Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Self Assessment
                  </h2>
                  <p className="text-gray-500">
                    Evaluate your school's readiness and capabilities
                  </p>
                </div>
                {hasSelfAssessment && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                )}
              </div>

              <button
                onClick={navigateToSelfAssessment}
                className={`w-full py-2 rounded-lg text-center font-medium ${
                  hasSelfAssessment
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {hasSelfAssessment
                  ? "Update Assessment"
                  : "Complete Assessment"}
              </button>
            </div>
          </div>
        )}

        {/* Primary Level Application Button */}
        {selectedSchool && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                  Primary Level Application
                  </h2>
                  <p className="text-gray-500">
                    Apply for Primary Level certification and programs
                  </p>
                </div>

                <button
                  onClick={navigateToOrdinaryLevel}
                  disabled={!hasIdentification}
                  className={`px-6 py-2 rounded-lg text-center font-medium ${
                    !hasIdentification
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {!hasIdentification
                    ? "Complete Identification First"
                    : hasOrdinaryLevel
                    ? "You already have Primary level"
                    : "Apply for Primary Level"}
                </button>
              </div>

              {!hasIdentification && (
                <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <p className="text-sm text-yellow-700">
                    You need to complete the School Identification process
                    before applying for Primary Level.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>


      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          selectedSchool={selectedSchool}
        />
      )}
    </div>
  );
};

export default SchoolApplicationPage;
