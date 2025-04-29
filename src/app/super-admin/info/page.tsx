"use client";
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Table } from "@/components/Table/Table";

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

const CombinationManagementPage = () => {
  // State for API data
  const [levels, setLevels] = useState<Level[]>([]);
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  // State for new combination form
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    assessments: "",
  });

  // State for loading and error indicators
  const [isLoadingLevels, setIsLoadingLevels] = useState(false);
  const [isLoadingCombinations, setIsLoadingCombinations] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for sorting and pagination
  const [sortField, setSortField] = useState<string>("code");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch all levels when component mounts
  useEffect(() => {
    const fetchLevels = async () => {
      setIsLoadingLevels(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8081/api/qamis/combination/getallLevels",
          {
            headers: {
              "qamis-request-key": "1234567890",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setLevels(data);

        // Automatically select the first level if available
        if (data.length > 0) {
          setSelectedLevel(data[0].id);
        }
      } catch (error: any) {
        console.error("Error fetching levels:", error);
        setError(error.message);
      } finally {
        setIsLoadingLevels(false);
      }
    };

    fetchLevels();
  }, []);

  // Fetch combinations when selected level changes
  useEffect(() => {
    if (!selectedLevel) return;

    const fetchCombinations = async () => {
      setIsLoadingCombinations(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8081/api/qamis/combination/getCombinationsBylevel?combinationId=${selectedLevel}`,
          {
            headers: {
              "qamis-request-key": "1234567890",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setCombinations(data);
      } catch (error: any) {
        console.error("Error fetching combinations:", error);
        setError(error.message);
      } finally {
        setIsLoadingCombinations(false);
      }
    };

    fetchCombinations();
  }, [selectedLevel]);

  // Handle input changes for the new combination form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewCombination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create a new combination
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8081/api/qamis/combination/save-combination?parentId=${selectedLevel}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "qamis-request-key": "1234567890",
          },
          body: JSON.stringify(newCombination),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Reset form and refresh combinations
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
        assessments: "",
      });

      setIsFormOpen(false);
      toast.success("Combination saved successfully!");

      // Refresh the combinations list
      const refreshResponse = await fetch(
        `http://localhost:8081/api/qamis/combination/getCombinationsBylevel?combinationId=${selectedLevel}`
      );
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setCombinations(data);
      }
    } catch (error: any) {
      console.error("Error saving combination:", error);
      setError(error.message);
      toast.error(`Failed to save combination: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Format category for display
  const formatCategory = (category: string | null) => {
    if (!category) return "N/A";

    return category
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Placeholder functions for edit and delete actions
  const handleEditCombination = (combination: Combination) => {
    console.log("Edit combination:", combination);
    // Implementation would go here
    toast.info(
      "Edit functionality would open a form with this combination's details"
    );
  };

  const handleDeleteCombination = (id: string) => {
    console.log("Delete combination:", id);
    // Implementation would go here
    toast.info(`Delete functionality would remove combination with ID: ${id}`);
  };

  // Handle sorting logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Define table columns for the reusable Table component
  const columns = useMemo(
    () => [
      {
        key: "code",
        header: "Code",
        sortable: true,
      },
      {
        key: "fullName",
        header: "Full Name",
        sortable: true,
      },
      {
        key: "shortName",
        header: "Short Name",
        sortable: true,
      },
      {
        key: "category",
        header: "Category",
        sortable: true,
        render: (value: string | null) => (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {formatCategory(value)}
          </span>
        ),
      },
      {
        key: "combinationType",
        header: "Type",
        sortable: true,
        render: (value: string) => (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {value}
          </span>
        ),
      },
      {
        key: "description",
        header: "Description",
        sortable: true,
        render: (value: string | null) => value || "N/A",
      },
      {
        key: "actions",
        header: "Actions",
        sortable: false,
        render: (_: any, item: Combination) => (
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 bg-primary text-white rounded hover:hover:bg-primary/90 hover:cursor-pointer transition-colors"
              onClick={() => handleEditCombination(item)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer transition-colors"
              onClick={() => handleDeleteCombination(item.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Get the current level name
  const currentLevelName = useMemo(() => {
    if (!selectedLevel || !levels.length) return "Loading...";
    const level = levels.find((l) => l.id === selectedLevel);
    return level ? level.fullName : "Unknown Level";
  }, [selectedLevel, levels]);

  // Count combinations by category
  const combinationCountsByCategory = useMemo(() => {
    if (!combinations.length) return {};

    return combinations.reduce<Record<string, number>>((acc, comb) => {
      const category = comb.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
  }, [combinations]);

  // Get the sorted data
  const sortedData = useMemo(() => {
    return [...combinations].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortDirection === "asc" ? 1 : -1;
      if (bValue === null) return sortDirection === "asc" ? -1 : 1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === bValue) return 0;

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [combinations, sortField, sortDirection]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get paginated data based on current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-md max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2 md:mb-0">
          Combination Management
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Add New Combination
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded border border-red-200">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800">
            Total Combinations
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {combinations.length}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">
            Current Level
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {currentLevelName}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800">Categories</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Object.keys(combinationCountsByCategory).length}
          </p>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-6">
        <label
          htmlFor="level"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Level
        </label>
        <select
          id="level"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoadingLevels}
        >
          {isLoadingLevels ? (
            <option>Loading levels...</option>
          ) : (
            levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.fullName} ({level.shortName})
              </option>
            ))
          )}
        </select>
      </div>

      {/* Category breakdown */}
      {Object.keys(combinationCountsByCategory).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Combinations by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(combinationCountsByCategory).map(
              ([category, count]) => (
                <div
                  key={category}
                  className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg"
                >
                  {formatCategory(category)}:{" "}
                  <span className="font-bold">{count}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Empty state when no combinations */}
      {!isLoadingCombinations && combinations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No combinations found for this level</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Add First Combination
          </button>
        </div>
      ) : (
        /* Reusable Table Component */
        <div className="mb-6 overflow-hidden rounded-lg shadow">
          <Table
            data={paginatedData}
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={combinations.length}
            emptyStateMessage={
              isLoadingCombinations
                ? "Loading combinations..."
                : "No combinations found for this level"
            }
          />
        </div>
      )}

      {/* Add New Combination Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  Add New Combination to {currentLevelName}
                </h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Code*
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      value={newCombination.code}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name*
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={newCombination.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="shortName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Short Name*
                    </label>
                    <input
                      id="shortName"
                      name="shortName"
                      type="text"
                      value={newCombination.shortName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category*
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newCombination.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="SCIENCE_COMBINATIONS">
                        Science Combinations
                      </option>
                      <option value="ARTS_COMBINATIONS">
                        Arts Combinations
                      </option>
                      <option value="TECHNICAL_COMBINATIONS">
                        Technical Combinations
                      </option>
                      <option value="LANGUAGE_COMBINATIONS">
                        Language Combinations
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newCombination.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Combination"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinationManagementPage;
