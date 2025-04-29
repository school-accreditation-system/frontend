"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SummaryPage = ({ data, onContinue }) => {
  const router = useRouter();

  if (!data) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">No Data Available</h1>
        <p className="text-gray-600 mb-6">
          Please complete the school identification and assessment forms first.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Go to Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Assessment Summary</h1>

      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">School Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-gray-600">School Name:</p>
            <p className="font-medium">{data.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-medium">{data.address}</p>
          </div>
          <div>
            <p className="text-gray-600">Principal:</p>
            <p className="font-medium">{data.principalName}</p>
          </div>
          <div>
            <p className="text-gray-600">Year Established:</p>
            <p className="font-medium">{data.yearEstablished}</p>
          </div>
          <div>
            <p className="text-gray-600">School Type:</p>
            <p className="font-medium">{data.schoolType}</p>
          </div>
          <div>
            <p className="text-gray-600">Contact:</p>
            <p className="font-medium">
              {data.email} | {data.phone}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Website:</p>
            <p className="font-medium">{data.website}</p>
          </div>
          <div>
            <p className="text-gray-600">Faculty Strength:</p>
            <p className="font-medium">
              {data.numberOfStudents} students, {data.numberOfTeachers} teachers
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Self-Assessment Results</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-1/3 text-gray-600">Academic Performance:</div>
            <div className="w-2/3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {data.assessment.academicPerformance}
                    </span>
                  </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500">Poor</div>
                  <div className="text-xs text-gray-500">Excellent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 text-gray-600">Teacher Quality:</div>
            <div className="w-2/3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {data.assessment.teacherQuality}
                    </span>
                  </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500">Poor</div>
                  <div className="text-xs text-gray-500">Excellent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 text-gray-600">Infrastructure:</div>
            <div className="w-2/3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {data.assessment.infrastructure}
                    </span>
                  </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500">Poor</div>
                  <div className="text-xs text-gray-500">Excellent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 text-gray-600">Extracurricular:</div>
            <div className="w-2/3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {data.assessment.extracurricular}
                    </span>
                  </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500">Poor</div>
                  <div className="text-xs text-gray-500">Excellent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">
              Areas of Improvement:
            </h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
              {data.assessment.areasOfImprovement}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Back to Search
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Choose Combination
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
