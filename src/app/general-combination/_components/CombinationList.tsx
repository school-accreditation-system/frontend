"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CombinationList = ({
  combinations,
  selectedCombinations,
  toggleCombination,
  searchText,
  setSearchText,
  selectAll,
  clearAll,
}) => {
  return (
    <div className="lg:col-span-2 border rounded-lg p-6">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search combinations..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full"
        />

        <div className="mt-3 flex space-x-3">
          <Button
            type="button"
            onClick={selectAll}
            variant="default"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Select All
          </Button>
          <Button
            type="button"
            onClick={clearAll}
            variant="secondary"
            size="sm"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {combinations.length === 0 ? (
          <div className="text-gray-500 text-center py-6">
            No combinations match your search
          </div>
        ) : (
          combinations.map((combo) => (
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
          ))
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {selectedCombinations.length} selected
          </span>
          <span className="ml-2 text-gray-500">combinations selected</span>
        </div>

        <Button
          type="button"
          className="bg-black hover:bg-gray-800"
          onClick={() => {}} // This will be connected in the parent
          disabled={selectedCombinations.length === 0}
        >
          Save Selection
        </Button>
      </div>
    </div>
  );
};

export default CombinationList;