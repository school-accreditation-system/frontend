"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TVET_DATA, SECTOR_DETAILS } from "../../../constants/tvetData";
import SuccessModal from "./SuccessModal";
import { generateTradeDetails } from "./generateTradeDetails";

const TVETTradesSelector = ({ onComplete, formData }) => {
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState(
    Object.keys(TVET_DATA.sectors)[0]
  );
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Generate trade details with descriptions
  const tradeDetails = generateTradeDetails();

  // Get all trades as flat array
  const getAllTrades = () => {
    return Object.values(tradeDetails);
  };

  // Filter trades based on search text
  const getFilteredTrades = () => {
    let filteredTrades = getAllTrades();

    // Apply search filter if there's search text
    if (searchText) {
      filteredTrades = filteredTrades.filter(
        (trade) =>
          trade.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          trade.sectorName.toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredTrades;
    }

    // Filter by selected sector if no search
    return filteredTrades.filter((trade) => trade.sector === selectedSector);
  };

  // Toggle selection of a trade
  const toggleTrade = (tradeId) => {
    setSelectedTrades((prev) => {
      if (prev.includes(tradeId)) {
        return prev.filter((id) => id !== tradeId);
      } else {
        return [...prev, tradeId];
      }
    });
  };

  // Select all trades from current filter
  const selectAll = () => {
    const filteredIds = getFilteredTrades().map((trade) => trade.id);
    setSelectedTrades((prev) => {
      const newSelections = [...prev];
      filteredIds.forEach((id) => {
        if (!newSelections.includes(id)) {
          newSelections.push(id);
        }
      });
      return newSelections;
    });
  };

  // Clear all trades from current filter
  const clearAll = () => {
    const filteredIds = getFilteredTrades().map((trade) => trade.id);
    setSelectedTrades((prev) => prev.filter((id) => !filteredIds.includes(id)));
  };

  // Generate a random application ID
  const generateApplicationId = () => {
    const prefix = "TVET";
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
      const selections = selectedTrades.map((id) => tradeDetails[id]);

      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate an application ID
      const newApplicationId = generateApplicationId();
      setApplicationId(newApplicationId);

      // Add the trades to the form data
      if (onComplete) {
        onComplete({
          ...formData,
          trades: selections,
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

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          TVET Trade Selection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the vocational trades you want to apply for. You can select
          multiple trades from different sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Sectors */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Sectors</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {Object.keys(TVET_DATA.sectors).map((sector) => {
                const sectorInfo = SECTOR_DETAILS[sector];
                const tradeCount = TVET_DATA.sectors[sector].length;

                return (
                  <div
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedSector === sector
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                    style={{
                      borderLeft:
                        selectedSector === sector
                          ? `4px solid ${sectorInfo.color}`
                          : "4px solid transparent",
                    }}
                  >
                    <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                      <span className="text-2xl">{sectorInfo.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {sectorInfo.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tradeCount} {tradeCount === 1 ? "trade" : "trades"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Trades Selection */}
        <div className="lg:col-span-3">
          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search trades..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md ${
                    viewMode === "grid" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-md ${
                    viewMode === "list" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="px-3 py-1.5 text-sm rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Current Sector Info */}
          {!searchText && (
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl mr-2">
                  {SECTOR_DETAILS[selectedSector].icon}
                </span>
                <h2 className="text-xl font-semibold">
                  {SECTOR_DETAILS[selectedSector].name}
                </h2>
              </div>
              <p className="text-gray-600 mt-2">
                {SECTOR_DETAILS[selectedSector].description}
              </p>
            </div>
          )}

          {/* Trades Grid/List View */}
          {getFilteredTrades().length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mt-4">
                No trades found
              </h3>
              <p className="text-gray-500 mt-2">
                Try a different search term or sector
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                  : "space-y-4"
              }
            >
              {getFilteredTrades().map((trade) => (
                <div
                  key={trade.id}
                  className={`border rounded-xl overflow-hidden transition-all ${
                    selectedTrades.includes(trade.id)
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-stretch h-full">
                    {/* Colored Side Bar */}
                    <div
                      className="w-2 h-full flex-shrink-0"
                      style={{ backgroundColor: trade.sectorColor }}
                    ></div>

                    <div className="flex flex-col p-4 flex-grow">
                      <div className="flex items-start mb-2">
                        <input
                          type="checkbox"
                          id={`trade-${trade.id}`}
                          checked={selectedTrades.includes(trade.id)}
                          onChange={() => toggleTrade(trade.id)}
                          className="mt-1 h-5 w-5 rounded text-primary focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`trade-${trade.id}`}
                          className="ml-3 cursor-pointer flex-grow"
                        >
                          <div className="font-medium text-gray-800">
                            {trade.fullName}
                          </div>
                          {viewMode === "list" && (
                            <p className="text-gray-600 text-sm mt-1">
                              {trade.description}
                            </p>
                          )}
                        </label>
                        <div className="flex items-center space-x-2">
                          {trade.level && (
                            <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                              {trade.level}
                            </span>
                          )}
                          <span
                            className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${trade.sectorColor}20`,
                              color: trade.sectorColor,
                            }}
                          >
                            {trade.sectorIcon}
                          </span>
                        </div>
                      </div>

                      {viewMode === "grid" && (
                        <p className="text-gray-600 text-sm">
                          {trade.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Count */}
          <div className="flex justify-between items-center mt-8 border-t pt-4">
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedTrades.length} selected
              </span>
              <span className="ml-2 text-gray-500">trades selected</span>
            </div>

            <button
              type="button"
              disabled={selectedTrades.length === 0 || isSubmitting}
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                selectedTrades.length === 0 || isSubmitting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
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
                "Continue Application"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Selected Trades Summary */}
      {selectedTrades.length > 0 && (
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Selected Trades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedTrades.map((id) => {
              const trade = tradeDetails[id];
              return (
                <div
                  key={`selected-${id}`}
                  className="bg-white rounded-lg border p-4 flex items-start"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    style={{ backgroundColor: `${trade.sectorColor}20` }}
                  >
                    <span className="text-xl">{trade.sectorIcon}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{trade.fullName}</div>
                    <div className="text-sm text-gray-500">
                      {trade.sectorName}
                    </div>

                    {trade.level && (
                      <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                        {trade.level}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTrade(id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        applicationId={applicationId}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default TVETTradesSelector;
