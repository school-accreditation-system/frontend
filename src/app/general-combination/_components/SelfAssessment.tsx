"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SelfAssessment = ({ onComplete, formData }) => {
  const router = useRouter();
  const [assessment, setAssessment] = useState({
    academicPerformance: "",
    teacherQuality: "",
    infrastructure: "",
    extracurricular: "",
    areasOfImprovement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment({
      ...assessment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine previous form data with assessment data
    onComplete({
      ...formData,
      assessment: assessment,
    });
  };

  const ratings = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Self-Assessment</h1>
      <p className="text-gray-600 mb-6">
        Please provide an honest assessment of {formData?.name || "your school"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            Academic Performance
          </label>
          <select
            name="academicPerformance"
            value={assessment.academicPerformance}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Teacher Quality</label>
          <select
            name="teacherQuality"
            value={assessment.teacherQuality}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Infrastructure</label>
          <select
            name="infrastructure"
            value={assessment.infrastructure}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Extracurricular Activities
          </label>
          <select
            name="extracurricular"
            value={assessment.extracurricular}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Areas of Improvement
          </label>
          <textarea
            name="areasOfImprovement"
            value={assessment.areasOfImprovement}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Please describe areas where your school needs improvement"
            required
          ></textarea>
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
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelfAssessment;
