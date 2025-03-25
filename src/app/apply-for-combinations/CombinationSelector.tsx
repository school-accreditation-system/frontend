"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CombinationSelector = ({ onComplete, formData }) => {
  const router = useRouter();
  const [selectedCombination, setSelectedCombination] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the combination to the form data
    onComplete({
      ...formData,
      combination: selectedCombination
    });
  };

  const combinations = [
    {
      id: "MPC",
      name: "Mathematics, Physics, Chemistry",
      description: "A combination focused on physical sciences and mathematics. Ideal for engineering, medicine, and scientific research careers.",
      subjects: ["Mathematics", "Physics", "Chemistry"]
    },
    {
      id: "MPG",
      name: "Mathematics, Physics, Geography",
      description: "This combination blends physical sciences with geography. Well-suited for careers in environmental science, geology, and urban planning.",
      subjects: ["Mathematics", "Physics", "Geography"]
    },
    {
      id: "MEG",
      name: "Mathematics, Economics, Geography",
      description: "Focusing on socio-economic and spatial analysis. Great for careers in economics, business analytics, urban planning, and social sciences.",
      subjects: ["Mathematics", "Economics", "Geography"]
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose Your Combination</h1>
      <p className="text-gray-600 mb-6">
        Select an academic combination for {formData?.name || "your school"} to complete the registration
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {combinations.map((combo) => (
            <div 
              key={combo.id}
              className={`border p-4 rounded-md cursor-pointer transition-all ${
                selectedCombination === combo.id 
                  ? "border-blue-500 bg-blue-50" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCombination(combo.id)}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  id={combo.id}
                  name="combination"
                  value={combo.id}
                  checked={selectedCombination === combo.id}
                  onChange={() => setSelectedCombination(combo.id)}
                  className="mt-1"
                />
                <div className="ml-2">
                  <label htmlFor={combo.id} className="block text-lg font-semibold cursor-pointer">
                    {combo.id} - {combo.name}
                  </label>
                  <p className="text-gray-600 mt-1">{combo.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {combo.subjects.map(subject => (
                      <span 
                        key={subject} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            disabled={!selectedCombination}
            className={`px-6 py-2 rounded-md ${
              !selectedCombination 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default CombinationSelector;