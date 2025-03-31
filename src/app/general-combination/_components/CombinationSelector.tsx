"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { COMBINATIONS_DATA } from "../../../constants/CombinationsData";
import { generateCombinationDetails } from "./generateCombinationDetails";

import CategorySelector from "./CategorySelector";
import CombinationList from "./CombinationList";
import SelectedCombinations from "./SelectedCombinations";
import NavigationButtons from "./NavigationButtons";
import SuccessModal from "./SuccessModal";

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
    <Card className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto">
      <CardTitle className="text-2xl font-bold">
        Choose Your Combinations
      </CardTitle>
      <CardDescription className="text-gray-600 mb-6">
        Select academic combinations for {formData?.name || "your school"} to
        complete the registration
      </CardDescription>

      <Card className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Left Column - Categories */}
        <CategorySelector
          categories={COMBINATIONS_DATA.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Right Column - Combinations */}
        <CombinationList
          combinations={getFilteredCombinations()}
          selectedCombinations={selectedCombinations}
          toggleCombination={toggleCombination}
          searchText={searchText}
          setSearchText={setSearchText}
          selectAll={selectAll}
          clearAll={clearAll}
        />
      </Card>

      {/* Selected Combinations Summary */}
      <SelectedCombinations
        selectedCombinations={selectedCombinations}
        combinationDetails={combinationDetails}
        toggleCombination={toggleCombination}
      />

      {/* Navigation Buttons */}
      <NavigationButtons
        onBack={() => router.back()}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isDisabled={selectedCombinations.length === 0}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        applicationId={applicationId}
        onClose={handleModalClose}
      />
    </Card>
  );
};

export default CombinationSelector;
