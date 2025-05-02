/* eslint-disable max-lines */
/* eslint-disable max-nested-callbacks */
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccreditationField } from '@/types/accredited-schools';
import { SchoolCard, SearchFilters, Pagination } from '@/components/accredited-schools';
import { motion } from 'framer-motion';
import { useQueryState, parseAsString } from 'nuqs';
import { z } from 'zod';
import { useGetAccreditedSchools } from '@/hooks/useGetAccreditedSchools';
import { useToast } from '@/components/ui/use-toast';
import { generateDummySchools } from '@/utils/mockData';

// Zod schema for validating search parameters
const SearchParamsSchema = z.object({
  query: z.string().max(100).optional(),
  province: z.string().max(30).optional(),
  district: z.string().max(30).optional(),
  schoolType: z.string().max(20).optional(),
  combination: z.string().max(50).optional(),
});

export default function AccreditedSchoolsPage() {
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString, { defaultValue: '' });
  const [provinceFilter, setProvinceFilter] = useQueryState('province', parseAsString, { defaultValue: 'all-provinces' });
  const [districtFilter, setDistrictFilter] = useQueryState('district', parseAsString, { defaultValue: 'all-districts' });
  const [schoolTypeFilter, setSchoolTypeFilter] = useQueryState('type', parseAsString, { defaultValue: 'all-types' });
  const [combinationFilter, setCombinationFilter] = useQueryState('combination', parseAsString, { defaultValue: 'all-combinations' });
  const [currentPage, setCurrentPage] = useQueryState('page', {
    parse: (value) => {
      const parsed = parseInt(value || '1', 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => String(value),
    defaultValue: 1,
  });

  // Mock districts data - in a real app, this would likely come from an API
  const districts = [
    { id: 'nyarugenge', name: 'Nyarugenge', provinceId: 'kigali' },
    { id: 'gasabo', name: 'Gasabo', provinceId: 'kigali' },
    { id: 'kicukiro', name: 'Kicukiro', provinceId: 'kigali' },
    { id: 'rwamagana', name: 'Rwamagana', provinceId: 'eastern' },
    { id: 'nyagatare', name: 'Nyagatare', provinceId: 'eastern' },
    { id: 'bugesera', name: 'Bugesera', provinceId: 'eastern' },
    { id: 'rubavu', name: 'Rubavu', provinceId: 'western' },
    { id: 'karongi', name: 'Karongi', provinceId: 'western' },
    { id: 'rusizi', name: 'Rusizi', provinceId: 'western' },
    { id: 'musanze', name: 'Musanze', provinceId: 'northern' },
    { id: 'gicumbi', name: 'Gicumbi', provinceId: 'northern' },
    { id: 'burera', name: 'Burera', provinceId: 'northern' },
    { id: 'huye', name: 'Huye', provinceId: 'southern' },
    { id: 'nyamagabe', name: 'Nyamagabe', provinceId: 'southern' },
    { id: 'muhanga', name: 'Muhanga', provinceId: 'southern' },
  ];

  // Here we'll use our dummy data if the real data has issues
  const { data: apiSchools = [], uniqueCombinations: apiCombinations = [], isLoading: isApiLoading, error: apiError } = useGetAccreditedSchools();

  // Generate dummy schools for development
  const dummySchools = useMemo(() => generateDummySchools(24), []);
  const dummyCombinations = useMemo(() => [...new Set(dummySchools.flatMap(
    school => school.combinations.map(combo => combo.name)
  ))], [dummySchools]);

  // Use API data if available, otherwise fall back to dummy data
  const schools = useMemo(() =>
    (apiError || apiSchools.length === 0) ? dummySchools : apiSchools,
    [apiSchools, dummySchools, apiError]
  );

  const uniqueCombinations = useMemo(() =>
    (apiError || apiCombinations.length === 0) ? dummyCombinations : apiCombinations,
    [apiCombinations, dummyCombinations, apiError]
  );

  const isLoading = isApiLoading && schools.length === 0;

  // Create memoized fields to prevent unnecessary re-renders
  const accreditationFields: AccreditationField[] = useMemo(() => {
    return uniqueCombinations.map(combo => ({
      id: combo,
      name: combo,
      color: 'bg-gray-100 text-gray-700 border-gray-200',
    }));
  }, [uniqueCombinations]);

  // Apply filters when search parameters or schools data changes
  useEffect(() => {
    // Don't run this effect if schools aren't loaded yet or data is loading
    if (isLoading || !schools.length) {
      return;
    }

    // Only validate when we have actual query parameters
    const hasQueryParams = (searchQuery?.trim() || '') ||
      (provinceFilter !== 'all-provinces') ||
      (districtFilter !== 'all-districts') ||
      (schoolTypeFilter !== 'all-types') ||
      (combinationFilter !== 'all-combinations');

    if (hasQueryParams) {
      const validatedParams = SearchParamsSchema.safeParse({
        query: searchQuery,
        province: provinceFilter,
        district: districtFilter,
        schoolType: schoolTypeFilter,
        combination: combinationFilter,
      });

      if (!validatedParams.success) {
        toast({
          title: 'Invalid search parameters',
          description: 'Please check your search criteria and try again.',
          variant: 'destructive',
        });

        // Reset to valid defaults
        setSearchQuery('');
        setProvinceFilter('all-provinces');
        setDistrictFilter('all-districts');
        setSchoolTypeFilter('all-types');
        setCombinationFilter('all-combinations');
        return;
      }
    }

    // Apply filters
    let filtered = [...schools];

    // Search query filtering
    if (searchQuery?.trim()) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(normalizedQuery) ||
        school.email?.toLowerCase().includes(normalizedQuery) ||
        school.phoneNumber?.toLowerCase().includes(normalizedQuery) ||
        school.combinations.some(combination =>
          combination.name.toLowerCase().includes(normalizedQuery)
        )
      );
    }

    // Province filter
    if (provinceFilter && provinceFilter !== 'all-provinces') {
      filtered = filtered.filter(school =>
        school.province === provinceFilter ||
        // For mockup data, simulate province filtering
        school.location?.toLowerCase().includes(provinceFilter)
      );
    }

    // District filter - only apply if a district is selected
    if (districtFilter && districtFilter !== 'all-districts') {
      filtered = filtered.filter(school =>
        school.district === districtFilter ||
        // For mockup data, simulate district filtering
        school.location?.toLowerCase().includes(districtFilter)
      );
    }

    // School type filter
    if (schoolTypeFilter && schoolTypeFilter !== 'all-types') {
      filtered = filtered.filter(school =>
        school.type === schoolTypeFilter ||
        // For mockup data, simulate school type filtering
        (schoolTypeFilter === 'public' && school.isPublic) ||
        (schoolTypeFilter === 'private' && !school.isPublic) ||
        (schoolTypeFilter === 'boarding' && school.isBoarding) ||
        (schoolTypeFilter === 'day' && !school.isBoarding)
      );
    }

    // Combination filter
    if (combinationFilter && combinationFilter !== 'all-combinations') {
      filtered = filtered.filter(school => {
        return school.combinations.some(combination =>
          combination.name.toUpperCase() === combinationFilter.toUpperCase()
        );
      });
    }

    setFilteredSchools(filtered);

    // Reset page to 1 if filters change and we're not on page 1
    if (hasQueryParams && currentPage > 1 && filtered.length <= 6) {
      setCurrentPage(1);
    }
  }, [
    searchQuery,
    provinceFilter,
    districtFilter,
    schoolTypeFilter,
    combinationFilter,
    schools,
    isLoading,
    toast,
    currentPage,
    setCurrentPage
  ]);

  // Handle pagination separately to avoid circular dependencies
  useEffect(() => {
    // Check if we need to update the page number (e.g., if we have fewer results than the current page)
    if (filteredSchools.length > 0) {
      const maxPage = Math.ceil(filteredSchools.length / 6); // 6 is itemsPerPage
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      }
    }
  }, [filteredSchools.length, currentPage, setCurrentPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query || undefined);
    if (currentPage > 1) setCurrentPage(1);
  };

  const handleProvinceChange = (province: string) => {
    setProvinceFilter(province);
    // Reset district when province changes
    if (province !== 'all-provinces') {
      setDistrictFilter('all-districts');
    }
    if (currentPage > 1) setCurrentPage(1);
  };

  const handleDistrictChange = (district: string) => {
    setDistrictFilter(district);
    if (currentPage > 1) setCurrentPage(1);
  };

  const handleSchoolTypeChange = (type: string) => {
    setSchoolTypeFilter(type);
    if (currentPage > 1) setCurrentPage(1);
  };

  const handleCombinationChange = (combination: string) => {
    setCombinationFilter(combination);
    if (currentPage > 1) setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery(undefined);
    setProvinceFilter('all-provinces');
    setDistrictFilter('all-districts');
    setSchoolTypeFilter('all-types');
    setCombinationFilter('all-combinations');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  // Calculate displayed schools based on current page
  const displayedSchools = useMemo(() => {
    return filteredSchools.slice(
      ((currentPage || 1) - 1) * itemsPerPage,
      (currentPage || 1) * itemsPerPage
    );
  }, [filteredSchools, currentPage, itemsPerPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <SearchFilters
          searchQuery={searchQuery || ''}
          selectedProvince={provinceFilter || 'all-provinces'}
          selectedDistrict={districtFilter || 'all-districts'}
          selectedSchoolType={schoolTypeFilter || 'all-types'}
          selectedCombination={combinationFilter || 'all-combinations'}
          accreditationFields={accreditationFields}
          onSearchChange={handleSearchChange}
          onProvinceChange={handleProvinceChange}
          onDistrictChange={handleDistrictChange}
          onSchoolTypeChange={handleSchoolTypeChange}
          onCombinationChange={handleCombinationChange}
          clearFilters={clearFilters}
          districts={districts}
        />

        {/* Main content area */}
        <div>
          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                <h3 className="text-xl font-semibold text-gray-800">Loading Schools</h3>
                <p className="text-gray-600">
                  Please wait while we fetch the latest accredited schools data...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {apiError && !isLoading && !schools.length && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-red-100">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Error Loading Schools</h3>
                <p className="text-gray-600 max-w-md">
                  We encountered an error while fetching schools data. Please try again later.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-2 hover:cursor-pointer"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {!isLoading && schools.length > 0 && filteredSchools.length === 0 && (
            <motion.div
              className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">No Schools Found</h3>
                <p className="text-gray-600 max-w-md">
                  We could not find any schools matching your search criteria. Try adjusting your filters or search term.
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-2 hover:cursor-pointer"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}

          {/* Schools Grid */}
          {!isLoading && schools.length > 0 && filteredSchools.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <div className="mt-8 mb-12 flex justify-center">
                <Pagination
                  currentPage={currentPage || 1}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}