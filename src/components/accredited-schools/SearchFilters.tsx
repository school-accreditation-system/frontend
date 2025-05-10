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
import React, { useState } from "react";

interface SearchFiltersProps {
  searchQuery: string;
  selectedProvince: string;
  selectedDistrict: string;
  selectedSchoolType: string;
  selectedCombination: string;
  accreditationFields: AccreditationField[];
  onSearchChange: (query: string) => void;
  onProvinceChange: (province: string) => void;
  onDistrictChange: (district: string) => void;
  onSchoolTypeChange: (schoolType: string) => void;
  onCombinationChange: (field: string) => void;
  clearFilters: () => void;
  districts: { id: string; name: string; provinceId: string }[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  selectedProvince,
  selectedDistrict,
  selectedSchoolType,
  selectedCombination,
  accreditationFields,
  onSearchChange,
  onProvinceChange,
  onDistrictChange,
  onSchoolTypeChange,
  onCombinationChange,
  clearFilters,
  districts,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Provinces - typically would come from an API
  const provinces = [
    { id: "kigali", name: "Kigali" },
    { id: "eastern", name: "Eastern Province" },
    { id: "western", name: "Western Province" },
    { id: "northern", name: "Northern Province" },
    { id: "southern", name: "Southern Province" },
  ];

  // School types
  const schoolTypes = [
    { id: "public", name: "Public" },
    { id: "private", name: "Private" },
    { id: "boarding", name: "Boarding" },
    { id: "day", name: "Day School" },
  ];

  // Filter districts based on selected province
  const filteredDistricts =
    selectedProvince === "all-provinces"
      ? districts
      : districts.filter(
          (district) => district.provinceId === selectedProvince
        );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const hasActiveFilters =
    searchQuery ||
    (selectedProvince && selectedProvince !== "all-provinces") ||
    (selectedDistrict && selectedDistrict !== "all-districts") ||
    (selectedSchoolType && selectedSchoolType !== "all-types") ||
    (selectedCombination && selectedCombination !== "all-combinations");

  return (
    <div
      className={` bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-[64px] z-10 flex flex-col gap-4`}
    >
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
                onClick={() => {
                  setLocalSearch("");
                  if (searchQuery) onSearchChange("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <Button type="submit">Search</Button>
        </div>

        {/* Always Visible Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Province Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Province
            </label>
            <Select value={selectedProvince} onValueChange={onProvinceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-provinces">All Provinces</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* District Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              District
            </label>
            <Select
              value={selectedDistrict}
              onValueChange={onDistrictChange}
              disabled={
                selectedProvince === "all-provinces" &&
                filteredDistricts.length === 0
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-districts">All Districts</SelectItem>
                  {filteredDistricts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* School Type Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <School className="h-4 w-4" />
              School Type
            </label>
            <Select
              value={selectedSchoolType}
              onValueChange={onSchoolTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-types">All Types</SelectItem>
                  {schoolTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Combinations Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 flex items-center gap-1.5">
              <Library className="h-4 w-4" />
              Combinations
            </label>
            <Select
              value={selectedCombination}
              onValueChange={onCombinationChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select combination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all-combinations">
                    All Combinations
                  </SelectItem>
                  {accreditationFields.map((field) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

          {selectedProvince && selectedProvince !== "all-provinces" && (
            <div className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
              <span>
                Province:{" "}
                {provinces.find((p) => p.id === selectedProvince)?.name ||
                  selectedProvince}
              </span>
              <button
                onClick={() => onProvinceChange("all-provinces")}
                className="hover:text-red-500 hover:cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedDistrict && selectedDistrict !== "all-districts" && (
            <div className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
              <span>
                District:{" "}
                {districts.find((d) => d.id === selectedDistrict)?.name ||
                  selectedDistrict}
              </span>
              <button
                onClick={() => onDistrictChange("all-districts")}
                className="hover:text-red-500 hover:cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedSchoolType && selectedSchoolType !== "all-types" && (
            <div className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
              <span>
                Type:{" "}
                {schoolTypes.find((t) => t.id === selectedSchoolType)?.name ||
                  selectedSchoolType}
              </span>
              <button
                onClick={() => onSchoolTypeChange("all-types")}
                className="hover:text-red-500 hover:cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selectedCombination &&
            selectedCombination !== "all-combinations" && (
              <div className="bg-blue-50 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                <span>
                  Combination:{" "}
                  {accreditationFields.find((f) => f.id === selectedCombination)
                    ?.name || selectedCombination}
                </span>
                <button
                  onClick={() => onCombinationChange("all-combinations")}
                  className="hover:text-red-500 hover:cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

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
