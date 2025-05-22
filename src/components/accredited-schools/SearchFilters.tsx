"use client";

/* eslint-disable max-lines */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccreditationField } from "@/types/accredited-schools";
import { Building, Library, MapPin, School, Search, X } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import { FilterItem, FilterOption } from "./FilterItem";

interface SearchFiltersProps {
  searchQuery: string;
  provinces: FilterOption[];
  districts: FilterOption[];
  sectors: FilterOption[];
  schoolTypes: FilterOption[];
  accreditationFields: AccreditationField[];
  selectedValues: {
    query?: string;
    provinces: string[];
    districts: string[];
    sectors: string[];
    schoolTypes: string[];
    combinations: string[];
  };
  checkboxes: Record<string, boolean>;
  onSearchChange: (query: string) => void;
  onProvinceChange: (provinces: string[]) => void;
  onDistrictChange: (districts: string[]) => void;
  onSectorChange: (sectors: string[]) => void;
  onSchoolTypeChange: (types: string[]) => void;
  onCombinationChange: (combinations: string[]) => void;
  onCheckboxChange: (filter: string, checked: boolean) => void;
  clearFilters: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  provinces,
  districts,
  sectors,
  schoolTypes,
  accreditationFields,
  selectedValues,
  checkboxes,
  onSearchChange,
  onProvinceChange,
  onDistrictChange,
  onSectorChange,
  onSchoolTypeChange,
  onCombinationChange,
  onCheckboxChange,
  clearFilters,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Convert accreditationFields to FilterOption format - memoized to prevent unnecessary recreations
  const combinationOptions = useMemo(() =>
    accreditationFields.map((field) => ({
      id: field.id,
      name: field.name,
      color: field.color,
    })),
    [accreditationFields]
  );

  // Don't filter districts by province since the API data structure may be different
  // Instead, we'll just show all districts and let the backend handle the filtering
  const availableDistricts = useMemo(() => districts, [districts]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  }, [localSearch, onSearchChange]);

  const clearLocalSearch = useCallback(() => {
    setLocalSearch("");
    if (searchQuery) onSearchChange("");
  }, [searchQuery, onSearchChange]);

  // Check if there are any active filters
  const hasActiveFilters = useMemo(() =>
    searchQuery ||
    selectedValues?.provinces.length > 0 ||
    selectedValues?.districts.length > 0 ||
    selectedValues?.sectors.length > 0 ||
    selectedValues?.schoolTypes.length > 0 ||
    selectedValues?.combinations.length > 0,
    [searchQuery, selectedValues]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-[64px] z-10 flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 mb-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search schools by name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 py-2 h-9 border-gray-200 focus-visible:ring-0"
            />
            {localSearch && (
              <button
                type="button"
                onClick={clearLocalSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <Button type="submit">Search</Button>
        </div>

        {/* Checkbox Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Province Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Province
            </label>
            <FilterItem
              label="Province"
              filterKey="provinces"
              options={provinces}
              selectedValues={selectedValues.provinces}
              onSelectionChange={onProvinceChange}
              onCheckboxChange={(checked) => onCheckboxChange("provinces", checked)}
              isChecked={checkboxes.provinces}
            />
          </div>

          {/* District Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              District
            </label>
            <FilterItem
              label="District"
              filterKey="districts"
              options={availableDistricts}
              selectedValues={selectedValues.districts}
              onSelectionChange={onDistrictChange}
              onCheckboxChange={(checked) => onCheckboxChange("districts", checked)}
              isChecked={checkboxes.districts}
            />
          </div>

          {/* Sector Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              Sector
            </label>
            <FilterItem
              label="Sector"
              filterKey="sectors"
              options={sectors}
              selectedValues={selectedValues.sectors}
              onSelectionChange={onSectorChange}
              onCheckboxChange={(checked) => onCheckboxChange("sectors", checked)}
              isChecked={checkboxes.sectors}
            />
          </div>

          {/* School Type Filter */}
          {/* <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <School className="h-4 w-4" />
              School Type
            </label>
            <FilterItem
              label="School Type"
              filterKey="schoolTypes"
              options={schoolTypes}
              selectedValues={selectedValues.schoolTypes}
              onSelectionChange={onSchoolTypeChange}
              onCheckboxChange={(checked) => onCheckboxChange("schoolTypes", checked)}
              isChecked={checkboxes.schoolTypes}
            />
          </div> */}

          {/* Combinations Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <Library className="h-4 w-4" />
              Combinations
            </label>
            <FilterItem
              label="Combination"
              filterKey="combinations"
              options={combinationOptions}
              selectedValues={selectedValues.combinations}
              onSelectionChange={onCombinationChange}
              onCheckboxChange={(checked) => onCheckboxChange("combinations", checked)}
              isChecked={checkboxes.combinations}
            />
          </div>
        </div>
      </form>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center text-sm gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>

          {searchQuery && (
            <div className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
              <span>&quot;{searchQuery}&quot;</span>
              <button
                onClick={() => onSearchChange("")}
                className="hover:text-red-500 hover:cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedValues.provinces.map((provinceId) => {
            const province = provinces.find(p => p.id === provinceId);
            return province ? (
              <div key={provinceId} className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                <span>Province: {province.name}</span>
                <button
                  onClick={() => onProvinceChange(selectedValues.provinces.filter(id => id !== provinceId))}
                  className="hover:text-red-500 hover:cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null;
          })}

          {selectedValues.districts.map((districtId) => {
            const district = districts.find(d => d.id === districtId);
            return district ? (
              <div key={districtId} className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                <span>District: {district.name}</span>
                <button
                  onClick={() => onDistrictChange(selectedValues.districts.filter(id => id !== districtId))}
                  className="hover:text-red-500 hover:cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null;
          })}

          {selectedValues.schoolTypes.map((typeId) => {
            const type = schoolTypes.find(t => t.id === typeId);
            return type ? (
              <div key={typeId} className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                <span>Type: {type.name}</span>
                <button
                  onClick={() => onSchoolTypeChange(selectedValues.schoolTypes.filter(id => id !== typeId))}
                  className="hover:text-red-500 hover:cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null;
          })}

          {selectedValues.combinations.map((combinationId) => {
            const combination = combinationOptions.find(c => c.id === combinationId);
            return combination ? (
              <div key={combinationId} className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                <span>Combination: {combination.name}</span>
                <button
                  onClick={() => onCombinationChange(selectedValues.combinations.filter(id => id !== combinationId))}
                  className="hover:text-red-500 hover:cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null;
          })}

          <button
            onClick={clearFilters}
            className="text-primary px-2 py-1 hover:bg-primary hover:text-white rounded-md text-sm hover:cursor-pointer capitalize"
          >
            clear all
          </button>
        </div>
      )}
    </div>
  );
};
