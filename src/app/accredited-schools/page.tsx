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

// Zod schema for validating search parameters
const SearchParamsSchema = z.object({
  query: z.string().max(100).optional(),
  field: z.string().max(10).optional(),
});

export default function AccreditedSchoolsPage() {
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString);
  const [fieldFilter, setFieldFilter] = useQueryState('field', parseAsString);
  const [currentPage, setCurrentPage] = useQueryState('page', {
    parse: (value) => {
      const parsed = parseInt(value || '1', 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => String(value)
  });
  
  const { data: schools = [], uniqueCombinations = [], isLoading, error } = useGetAccreditedSchools();

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
    const hasQueryParams = searchQuery || fieldFilter;
    
    if (hasQueryParams) {
      const validatedParams = SearchParamsSchema.safeParse({
        query: searchQuery,
        field: fieldFilter,
      });
  
      if (!validatedParams.success) {
        // Only show toast for actual invalid values, not initial empty values
        toast({
          title: 'Invalid search parameters',
          description: 'Please check your search criteria and try again.',
          variant: 'destructive',
        });
        
        // Reset to valid defaults
        setSearchQuery(undefined);
        setFieldFilter(undefined);
        return;
      }
    }

    // Apply filters
    let filtered = [...schools];

    // Search query filtering on the frontend
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

    // Filter by combination field
    if (fieldFilter?.trim()) {
      filtered = filtered.filter(school => {
        return school.combinations.some(combination => 
          combination.name.toUpperCase() === fieldFilter.toUpperCase()
        );
      });
    }

    setFilteredSchools(filtered);
    
    // Reset page to 1 if filters change and we're not on page 1
    // But only do this if we have actual filter changes
    if ((searchQuery || fieldFilter) && currentPage > 1 && filtered.length <= 6) {
      setCurrentPage(1);
    }
  }, [searchQuery, fieldFilter, schools, isLoading, toast]);
  
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
    // Reset page when changing search to avoid potential "no results" on later pages
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  
  const handleFieldChange = (field: string) => {
    setFieldFilter(field || undefined);
    // Reset page when changing filters to avoid potential "no results" on later pages
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  
  const clearFilters = () => {
    setSearchQuery(undefined);
    setFieldFilter(undefined);
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Accredited Schools Directory
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our comprehensive list of accredited educational institutions. Filter by subject combinations, location, and find the perfect school for your child.
          </motion.p>
        </div>
        
        {/* Search Filters */}
        <SearchFilters
          searchQuery={searchQuery || ''}
          selectedField={fieldFilter || ''}
          accreditationFields={accreditationFields}
          onSearchChange={handleSearchChange}
          onFieldChange={handleFieldChange}
          clearFilters={clearFilters}
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
          {error && !isLoading && (
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
          {!isLoading && !error && schools.length > 0 && filteredSchools.length === 0 && (
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
          {!isLoading && !error && filteredSchools.length > 0 && (
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