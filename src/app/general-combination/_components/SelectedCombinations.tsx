"use client";
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SelectedCombinations = ({ 
  selectedCombinations, 
  combinationDetails,
  toggleCombination
}) => {
  return (
    <Card className="mt-8 border rounded-lg p-6">
      <CardTitle className="text-lg font-semibold mb-4">
        Selected Combinations
      </CardTitle>

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
                      <Badge
                        key={`${id}-${subject}`}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {subject}
                      </Badge>
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
    </Card>
  );
};

export default SelectedCombinations;