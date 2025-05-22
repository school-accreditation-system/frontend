/* eslint-disable max-lines */
/* eslint-disable max-nested-callbacks */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccreditationField } from "@/types/accredited-schools";
import {
  SchoolCard,
  SearchFilters,
  Pagination,
} from "@/components/accredited-schools";
import { motion } from "framer-motion";
import { z } from "zod";
import { useGetAccreditedSchools } from "@/hooks/useGetAccreditedSchools";
import { useToast } from "@/components/ui/use-toast";
import { useSchoolFilters } from "./useSchoolFilters";
import { FilterOption } from "@/components/accredited-schools/FilterItem";
import { useGetProvinces, useGetLocationByType } from "@/hooks/useLocation";

const SearchParamsSchema = z.object({
  query: z.string().max(100).optional(),
  provinces: z.array(z.string()).optional(),
  districts: z.array(z.string()).optional(),
  sectors: z.array(z.string()).optional(),
  schoolTypes: z.array(z.string()).optional(),
  combinations: z.array(z.string()).optional(),
});

export default function AccreditedSchoolsPage() {
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { toast } = useToast();
  const { data: provinceData, isLoading: isProvincesLoading } = useGetProvinces();
  const { data: districtData, isLoading: isDistrictsLoading } = useGetLocationByType("DISTRICT");
  const { data: sectorData, isLoading: isSectorsLoading } = useGetLocationByType("SECTOR");

  const {
    selectedValues,
    checkboxes,
    currentPage,
    handleCheckbox,
    handleSelectedValue,
    handleSearchQuery,
    handlePageChange,
    clearFilters,
    hasSelectedValues,
  } = useSchoolFilters();

  const provinces: FilterOption[] = useMemo(() => provinceData?.map((province) => ({
    id: province.locationName,
    name: province.locationName,
  })) || [], [provinceData]);

  const schoolTypes: FilterOption[] = [
    { id: "public", name: "Public" },
    { id: "private", name: "Private" },
    { id: "boarding", name: "Boarding" },
    { id: "day", name: "Day School" },
  ];

  const districts: FilterOption[] = useMemo(() => districtData?.map((district) => ({
    id: district.locationName,
    name: district.locationName,
  })) || [], [districtData]);

  const sectors: FilterOption[] = useMemo(() => sectorData?.map((sector) => ({
    id: sector.locationName,
    name: sector.locationName,
  })) || [], [sectorData]);

  const {
    data: schools = [],
    uniqueCombinations = [],
    isLoading: isApiLoading,
    error: apiError,
  } = useGetAccreditedSchools();

  const accreditationFields: AccreditationField[] = useMemo(() => {
    return uniqueCombinations.map((combo) => ({
      id: combo,
      name: combo,
      color: "bg-gray-100 text-gray-700 border-gray-200",
    }));
  }, [uniqueCombinations]);

  // Apply filters when search parameters or schools data changes
  useEffect(() => {
    if (!schools.length) {
      return;
    }

    const validatedParams = SearchParamsSchema.safeParse({
      query: selectedValues.query,
      provinces: selectedValues.provinces,
      districts: selectedValues.districts,
      sectors: selectedValues.sectors,
      schoolTypes: selectedValues.schoolTypes,
      combinations: selectedValues.combinations,
    });

    if (!validatedParams.success) {
      clearFilters();
      return;
    }

    // Apply filters
    let filtered = [...schools];

    // Search query filtering
    if (selectedValues.query?.trim()) {
      const normalizedQuery = selectedValues.query.toLowerCase().trim();
      filtered = filtered.filter(
        (school) =>
          school.name.toLowerCase().includes(normalizedQuery) ||
          school.email?.toLowerCase().includes(normalizedQuery) ||
          school.phoneNumber?.toLowerCase().includes(normalizedQuery) ||
          school.combinations.some((combination) =>
            combination.name.toLowerCase().includes(normalizedQuery)
          )
      );
    }

    // Province filter
    if (selectedValues?.provinces?.length > 0) {
      filtered = filtered.filter((school) =>
        selectedValues.provinces.includes(school.schoolLocation.province)
      );
    }

    // District filter
    if (selectedValues?.districts?.length > 0) {
      filtered = filtered.filter((school) =>
        selectedValues.districts.includes(school.schoolLocation.district)
      );
    }

    if (selectedValues?.sectors?.length > 0) {
      filtered = filtered.filter((school) =>
        selectedValues.sectors.includes(school.schoolLocation.sector)
      );
    }

    // School type filter
    if (selectedValues?.schoolTypes?.length > 0) {
      filtered = filtered.filter((school) =>
        selectedValues.schoolTypes.includes(school.type)
      );
    }

    // Combination filter
    if (selectedValues?.combinations?.length > 0) {
      filtered = filtered.filter((school) =>
        school.combinations.some((combination) =>
          selectedValues?.combinations.includes(combination.name)
        )
      );
    }

    setFilteredSchools(filtered);
  }, [selectedValues, schools, clearFilters]);

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  // Calculate displayed schools based on current page
  const displayedSchools = useMemo(() => {
    return filteredSchools.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredSchools, currentPage, itemsPerPage]);

  // Loading state - true if any of the required data is loading
  const isLoading = isApiLoading || isProvincesLoading || isDistrictsLoading;

  return (
    <div className="p-4 flex flex-col gap-4 relative">
      {/* Search Filters */}
      <SearchFilters
        searchQuery={selectedValues.query || ""}
        provinces={provinces}
        districts={districts}
        sectors={sectors}
        schoolTypes={schoolTypes}
        accreditationFields={accreditationFields}
        selectedValues={selectedValues}
        checkboxes={checkboxes}
        onSearchChange={handleSearchQuery}
        onProvinceChange={(values) => handleSelectedValue("provinces", values)}
        onDistrictChange={(values) => handleSelectedValue("districts", values)}
        onSectorChange={(values) => handleSelectedValue("sectors", values)}
        onSchoolTypeChange={(values) => handleSelectedValue("schoolTypes", values)}
        onCombinationChange={(values) => handleSelectedValue("combinations", values)}
        onCheckboxChange={handleCheckbox}
        clearFilters={clearFilters}
      />

      {/* Main content area */}
      <div>
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {apiError && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-lg shadow-sm py-8 px-5 text-center border border-red-100">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
              <SearchIcon className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Error Loading Schools
            </h3>
            <p className="text-gray-600">
              We encountered an error while fetching schools data. Please try
              again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="hover:cursor-pointer"
            >
              Retry
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && schools.length > 0 && filteredSchools.length === 0 && (
          <motion.div
            className="bg-white rounded-lg shadow-sm py-8 px-5 text-center border border-gray-200 flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              No Schools Found
            </h3>
            <p className="text-gray-600">
              We could not find any schools matching your search criteria. Try
              adjusting your filters or search term.
            </p>
            <Button onClick={clearFilters} className="hover:cursor-pointer">
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Schools Grid */}
        {!isLoading && schools.length > 0 && filteredSchools.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSchools.map((school, index) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SchoolCard school={school} />
                </motion.div>
              ))}
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
