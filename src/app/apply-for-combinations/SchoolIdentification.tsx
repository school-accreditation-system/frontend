"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SchoolIdentification = ({ onComplete, selectedSchool }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    principalName: "",
    yearEstablished: "",
    numberOfStudents: "",
    numberOfTeachers: "",
    schoolType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data up to the parent component
    onComplete({
      ...selectedSchool,
      ...formData,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Identification</h1>
      <p className="text-gray-600 mb-6">
        Please provide additional information about {selectedSchool?.name || "your school"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Principal Name</label>
          <input
            type="text"
            name="principalName"
            value={formData.principalName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Year Established</label>
          <input
            type="number"
            name="yearEstablished"
            value={formData.yearEstablished}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Number of Students</label>
          <input
            type="number"
            name="numberOfStudents"
            value={formData.numberOfStudents}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Number of Teachers</label>
          <input
            type="number"
            name="numberOfTeachers"
            value={formData.numberOfTeachers}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">School Type</label>
          <select
            name="schoolType"
            value={formData.schoolType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select School Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Charter">Charter</option>
            <option value="International">International</option>
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolIdentification;