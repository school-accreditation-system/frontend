"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";
import {
  CATEGORY_ICONS,
  COMBINATIONS_DATA,
} from "../../../constants/CombinationsData";

// Helper to extract abbreviation from a combination string
const getAbbreviation = (combinationString) => {
  const match = combinationString.match(/\(([^)]+)\)/);
  return match ? match[1] : "";
};

// Generate descriptions for each combination
const generateCombinationDetails = () => {
  const details = {};

  Object.keys(COMBINATIONS_DATA.categories).forEach((category) => {
    COMBINATIONS_DATA.categories[category].forEach((combo) => {
      const abbr = getAbbreviation(combo);
      const subjects = combo.replace(` (${abbr})`, "").split(" - ");

      let description = "";
      if (category === "Sciences") {
        description = `A combination focused on physical and mathematical sciences. Ideal for careers in engineering, medicine, and research.`;
      } else if (category === "Humanities") {
        description = `This combination explores social sciences and cultural studies. Great for careers in education, psychology, and social work.`;
      } else if (category === "Languages") {
        description = `A comprehensive language combination for translation, international relations, and communication careers.`;
      }

      details[abbr] = {
        id: abbr,
        name: combo.replace(` (${abbr})`, ""),
        fullName: combo,
        description: description,
        subjects: subjects,
        category: category,
      };
    });
  });

  return details;
};

const CombinationSelector = ({ onComplete, formData }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Sciences");
  const [selectedCombinations, setSelectedCombinations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  // Generate combination details with descriptions
  const combinationDetails = generateCombinationDetails();

  // Get all combinations as flat array
  const getAllCombinations = () => {
    return Object.values(combinationDetails);
  };

  // Filter combinations based on search text and selected category
  const getFilteredCombinations = () => {
    const allCombos = getAllCombinations();

    // If there's search text, filter by search across all categories
    if (searchText) {
      return allCombos.filter(
        (combo) =>
          combo.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          combo.subjects.some((subject) =>
            subject.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }

    // Otherwise, filter by selected category
    return allCombos.filter((combo) => combo.category === selectedCategory);
  };

  // Toggle selection of a combination
  const toggleCombination = (combinationId) => {
    setSelectedCombinations((prev) => {
      if (prev.includes(combinationId)) {
        return prev.filter((id) => id !== combinationId);
      } else {
        return [...prev, combinationId];
      }
    });
  };

  // Select all combinations from current filter
  const selectAll = () => {
    const filteredIds = getFilteredCombinations().map((combo) => combo.id);
    setSelectedCombinations((prev) => {
      const newSelections = [...prev];
      filteredIds.forEach((id) => {
        if (!newSelections.includes(id)) {
          newSelections.push(id);
        }
      });
      return newSelections;
    });
  };

  // Clear all combinations from current filter
  const clearAll = () => {
    const filteredIds = getFilteredCombinations().map((combo) => combo.id);
    setSelectedCombinations((prev) =>
      prev.filter((id) => !filteredIds.includes(id))
    );
  };

  // Generate a random application ID
  const generateApplicationId = () => {
    const prefix = "APP";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create final selections with details
      const selections = selectedCombinations.map(
        (id) => combinationDetails[id]
      );

      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate an application ID
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      // Add the combinations to the form data
      if (onComplete) {
        onComplete({
          ...formData,
          combinations: selections,
          applicationId: newApplicationId,
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

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchText(""); // Clear search text when changing categories
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Choose Your Combinations</h1>
      <p className="text-gray-600 mb-6">
        Select academic combinations for {formData?.name || "your school"} to
        complete the registration
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Categories */}
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Type of Request</h2>
            <div className="border rounded-lg p-3 mt-2">
              <div className="font-medium">General Combinations</div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Select Category</h2>
            <p className="text-sm text-gray-500 mb-4">
              Click on a category to view available combinations
            </p>

            {Object.keys(COMBINATIONS_DATA.categories).map((category) => (
              <div
                key={category}
                className={`flex items-center p-4 mb-3 border rounded-lg cursor-pointer transition-all ${
                  selectedCategory === category
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <span className="text-2xl mr-3">
                  {CATEGORY_ICONS[category]}
                </span>
                <div>
                  <div className="font-medium">{category}</div>
                  <div className="text-sm text-gray-500">
                    {COMBINATIONS_DATA.categories[category].length} combinations
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Combinations */}
        <div className="lg:col-span-2 border rounded-lg p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search combinations..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-3 flex space-x-3">
              <button
                type="button"
                onClick={selectAll}
                className="px-4 py-1 bg-primary text-white rounded-md hover:bg-primary/90 text-sm"
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
            {getFilteredCombinations().map((combo) => (
              <div
                key={combo.id}
                className="border rounded-md p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`combo-${combo.id}`}
                    checked={selectedCombinations.includes(combo.id)}
                    onChange={() => toggleCombination(combo.id)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`combo-${combo.id}`}
                    className="ml-3 cursor-pointer w-full"
                  >
                    <span className="block font-medium">{combo.fullName}</span>
                  </label>
                </div>
              </div>
            ))}

            {getFilteredCombinations().length === 0 && (
              <div className="text-gray-500 text-center py-6">
                No combinations match your search
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {selectedCombinations.length} selected
              </span>
              <span className="ml-2 text-gray-500">combinations selected</span>
            </div>

            <button
              type="button"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              onClick={handleSubmit}
              disabled={selectedCombinations.length === 0}
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>

      {/* Selected Combinations Summary */}
      <div className="mt-8 border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Selected Combinations</h2>

        {selectedCombinations.length === 0 ? (
          <div className="text-gray-500 text-center py-6">
            No combinations selected yet
          </div>
        ) : (
          <div className="space-y-3">
            {selectedCombinations.map((id) => {
              const combo = combinationDetails[id];
              return (
                <div
                  key={`selected-${id}`}
                  className="flex items-start border-b pb-3"
                >
                  <div className="flex-1">
                    <div className="font-medium">{combo.fullName}</div>
                    <p className="text-sm text-gray-600 mt-1">
                      {combo.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {combo.subjects.map((subject) => (
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
                    onClick={() => toggleCombination(id)}
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
          disabled={selectedCombinations.length === 0 || isSubmitting}
          className={`px-6 py-2 rounded-md ${
            selectedCombinations.length === 0 || isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit Registration"
          )}
        </button>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        applicationId={applicationId}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default CombinationSelector;
