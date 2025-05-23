"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

// Define types for our data
type Level = {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  combinationType: string;
  category: string | null;
  description: string | null;
};

type Combination = {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  combinationType: string;
  category: string | null;
  description: string | null;
};

type NewCombination = {
  code: string;
  fullName: string;
  shortName: string;
  combinationType: string;
  category: string;
  description: string;
  combination: string;
  combinationIndicators: string;
  schoolCombinations: string;
  assessments: string;
};

type IndicatorOption = {
  name: string;
  description: string;
};
const AddCombinationPage = () => {
  const router = useRouter();

  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("NEXT_PUBLIC_API_URL", NEXT_PUBLIC_API_URL);
  // State for API data
  const [levels, setLevels] = useState<Level[]>([]);
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("d971d476-b338-41f2-9b01-e7e099d4aa21"); // Default to the provided ID
  const [currentLevelName, setCurrentLevelName] = useState<string>("Loading...");
  const [selectedCombination, setSelectedCombination] = useState<string>("");

  // State for new combination form
  const [newCombination, setNewCombination] = useState<NewCombination>({
    code: "",
    fullName: "",
    shortName: "",
    combinationType: "COMBINATION",
    category: "SCIENCE_COMBINATIONS",
    description: "",
    combination: "",
    combinationIndicators: "",
    schoolCombinations: "",
    assessments: ""
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState<'combination' | 'indicator'>('combination');

  // State for loading and error indicators
  const [isLoadingLevels, setIsLoadingLevels] = useState(false);
  const [isLoadingCombinations, setIsLoadingCombinations] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingIndicator, setIsSavingIndicator] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch all levels when component mounts
  useEffect(() => {
    const fetchLevels = async () => {
      setIsLoadingLevels(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/getallLevels`, {
          headers: {
            "qamis-request-key": "1234567890"
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setLevels(data);

        // Find the current level name
        const currentLevel = data.find((level: Level) => level.id === selectedLevel);
        if (currentLevel) {
          setCurrentLevelName(currentLevel.fullName);
        }
      } catch (error: any) {
        console.error("Error fetching levels:", error);
        setError(error.message);
      } finally {
        setIsLoadingLevels(false);
      }
    };

    fetchLevels();
  }, [selectedLevel]);

  // Fetch combinations when selected level changes
  useEffect(() => {
    if (!selectedLevel) return;

    const fetchCombinations = async () => {
      setIsLoadingCombinations(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/getCombinationsBylevel?combinationId=${selectedLevel}`, {
          headers: {
            "qamis-request-key": "1234567890"
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setCombinations(data);

        // Select the first combination by default if available
        if (data.length > 0 && activeTab === 'indicator') {
          setSelectedCombination(data[0].id);
        }
      } catch (error: any) {
        console.error("Error fetching combinations:", error);
        setError(error.message);
      } finally {
        setIsLoadingCombinations(false);
      }
    };

    fetchCombinations();
  }, [selectedLevel, activeTab]);

  // Update current level name when selected level changes
  useEffect(() => {
    if (levels.length > 0) {
      const currentLevel = levels.find(level => level.id === selectedLevel);
      if (currentLevel) {
        setCurrentLevelName(currentLevel.fullName);
      }
    }
  }, [selectedLevel, levels]);

  // Handle input changes for the new combination form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCombination(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle level change
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
  };

  // Handle combination change for indicators
  const handleCombinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCombination(e.target.value);
    setSelectedLevel(e.target.value);
  };

  // Handle tab change
  const handleTabChange = (tab: 'combination' | 'indicator') => {
    setActiveTab(tab);
    setError(null);
    setSuccess(null);
  };

  // Handle form submission to create a new combination
  const handleSubmitCombination = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/save-combination?parentId=${selectedLevel}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "qamis-request-key": "1234567890"
        },
        body: JSON.stringify(newCombination)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Reset form
      setNewCombination({
        code: "",
        fullName: "",
        shortName: "",
        combinationType: "COMBINATION",
        category: "SCIENCE_COMBINATIONS",
        description: "",
        combination: "",
        combinationIndicators: "",
        schoolCombinations: "",
        assessments: ""
      });

      setSuccess("Combination saved successfully!");
      toast.success("Combination saved successfully!");

      // Refresh the combinations list
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/getCombinationsBylevel?combinationId=${selectedLevel}`, {
        headers: {
          "qamis-request-key": "1234567890"
        }
      });
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setCombinations(data);

        // If data is returned and has at least one combination, select it
        if (data.length > 0) {
          setSelectedCombination(data[0].id);
        }
      }
    } catch (error: any) {
      console.error("Error saving combination:", error);
      setError(error.message);
      toast.error(`Failed to save combination: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Update the IndicatorOption type to include all required fields
  type IndicatorOption = {
    name: string;
    description: string;
    scare: string;
    scareWeight: string;
    indicator: string;
  };

  // Update the initial state to include all fields
  const [newIndicator, setNewIndicator] = useState<IndicatorOption>({
    name: "",
    description: "",
    scare: "",
    scareWeight: "",
    indicator: ""
  });

  // Update the handleIndicatorInputChange function to handle all fields
  const handleIndicatorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewIndicator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update the handleSubmitIndicator function
  const handleSubmitIndicator = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCombination) {
      setError("Please select a combination first");
      toast.error("Please select a combination first");
      return;
    }

    setIsSavingIndicator(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qamis/options/save-option?indicatorId=${selectedCombination}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "qamis-request-key": "1234567890"
        },
        body: JSON.stringify({
          name: newIndicator.name,
          scare: newIndicator.scare,
          scareWeight: newIndicator.scareWeight,
          indicator: newIndicator.indicator,
          description: newIndicator.description
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Reset form
      setNewIndicator({
        name: "",
        description: "",
        scare: "",
        scareWeight: "",
        indicator: ""
      });

      setSuccess("Indicator option saved successfully!");
      toast.success("Indicator option saved successfully!");
    } catch (error: any) {
      console.error("Error saving indicator option:", error);
      setError(error.message);
      toast.error(`Failed to save indicator option: ${error.message}`);
    } finally {
      setIsSavingIndicator(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Manage Combinations & Indicators</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <p className="font-semibold">Success:</p>
            <p>{success}</p>
          </div>
        )}

        {/* Level Selector */}
        <div className="mb-8">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
            Select Level
          </label>
          <select
            id="level"
            value={selectedLevel}
            onChange={handleLevelChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoadingLevels || isSaving || isSavingIndicator}
          >
            {isLoadingLevels ? (
              <option>Loading levels...</option>
            ) : (
              levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.fullName} ({level.shortName})
                </option>
              ))
            )}
          </select>
          <p className="mt-2 text-sm text-gray-600">
            Working with level: <span className="font-semibold">{currentLevelName}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex">
            <button
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'combination'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => handleTabChange('combination')}
            >
              Add Combination
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'indicator'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => handleTabChange('indicator')}
            >
              Add Indicator Option
            </button>
          </div>
        </div>

        {/* Combination Form */}
        {activeTab === 'combination' && (
          <form onSubmit={handleSubmitCombination} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Code*
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={newCombination.code}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PCM"
                  required
                  disabled={isSaving}
                />
                <p className="mt-1 text-xs text-gray-500">A unique code for this combination</p>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={newCombination.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Physics Chemistry Mathematics"
                  required
                  disabled={isSaving}
                />
              </div>

              <div>
                <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Name*
                </label>
                <input
                  id="shortName"
                  name="shortName"
                  type="text"
                  value={newCombination.shortName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PCM"
                  required
                  disabled={isSaving}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={newCombination.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSaving}
                >
                  <option value="SCIENCE_COMBINATIONS">Science Combinations</option>
                  <option value="ARTS_COMBINATIONS">Arts Combinations</option>
                  <option value="TECHNICAL_COMBINATIONS">Technical Combinations</option>
                  <option value="LANGUAGE_COMBINATIONS">Language Combinations</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCombination.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a description for this combination (optional)"
                  disabled={isSaving}
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setNewCombination({
                    code: "",
                    fullName: "",
                    shortName: "",
                    combinationType: "COMBINATION",
                    category: "SCIENCE_COMBINATIONS",
                    description: "",
                    combination: "",
                    combinationIndicators: "",
                    schoolCombinations: "",
                    assessments: ""
                  });
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isSaving}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Combination'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Indicator Options Form */}
        {activeTab === 'indicator' && (
          <>
            {/* Combination Selector for Indicators */}
            <div className="mb-6">
              <label htmlFor="combination" className="block text-sm font-medium text-gray-700 mb-1">
                Select Combination*
              </label>
              <select
                id="combination"
                value={selectedCombination}
                onChange={handleCombinationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoadingCombinations || isSavingIndicator || combinations.length === 0}
                required
              >
                {isLoadingCombinations ? (
                  <option value="">Loading combinations...</option>
                ) : combinations.length === 0 ? (
                  <option value="">No combinations available</option>
                ) : (
                  <>
                    <option value="">Select a combination</option>
                    {combinations.map(combination => (
                      <option key={combination.id} value={combination.id}>
                        {combination.fullName} ({combination.shortName})
                      </option>
                    ))}
                  </>
                )}
              </select>
              {combinations.length === 0 && !isLoadingCombinations && (
                <p className="mt-2 text-sm text-yellow-600">
                  Please add a combination first before adding indicator options.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmitIndicator} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Indicator Name*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={newIndicator.name}
                    onChange={handleIndicatorInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Advanced Mathematics"
                    required
                    disabled={isSavingIndicator || !selectedCombination}
                  />
                </div>

                <div>
                  <label htmlFor="indicator" className="block text-sm font-medium text-gray-700 mb-1">
                    Indicator Value*
                  </label>
                  <input
                    id="indicator"
                    name="indicator"
                    type="text"
                    value={newIndicator.indicator}
                    onChange={handleIndicatorInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter indicator value"
                    required
                    disabled={isSavingIndicator || !selectedCombination}
                  />
                </div>

                <div>
                  <label htmlFor="scare" className="block text-sm font-medium text-gray-700 mb-1">
                    Scare Value*
                  </label>
                  <input
                    id="scare"
                    name="scare"
                    type="text"
                    value={newIndicator.scare}
                    onChange={handleIndicatorInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter scare value"
                    required
                    disabled={isSavingIndicator || !selectedCombination}
                  />
                </div>

                <div>
                  <label htmlFor="scareWeight" className="block text-sm font-medium text-gray-700 mb-1">
                    Scare Weight*
                  </label>
                  <input
                    id="scareWeight"
                    name="scareWeight"
                    type="text"
                    value={newIndicator.scareWeight}
                    onChange={handleIndicatorInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter scare weight"
                    required
                    disabled={isSavingIndicator || !selectedCombination}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="indicatorDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="indicatorDescription"
                    name="description"
                    value={newIndicator.description}
                    onChange={handleIndicatorInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a description for this indicator option (optional)"
                    disabled={isSavingIndicator || !selectedCombination}
                  ></textarea>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setNewIndicator({
                      name: "",
                      description: "",
                      scare: "",
                      scareWeight: "",
                      indicator: ""
                    });
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={isSavingIndicator || !selectedCombination}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                  disabled={isSavingIndicator || !selectedCombination}
                >
                  {isSavingIndicator ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Indicator Option'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
        {/* Add another button (shown after successful save) */}
        {success && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setSuccess(null);
                window.scrollTo(0, 0);
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Another {activeTab === 'combination' ? 'Combination' : 'Indicator Option'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCombinationPage;