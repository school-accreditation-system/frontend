'use client';

import React, { useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { schoolsData } from '@/constants/schoolsData';
import { AccreditationField, AccreditedSchool } from '@/types/accredited-schools';
import { SchoolCard, SearchFilters, Pagination } from '@/components/accredited-schools';
import { motion } from 'framer-motion';
import { useQueryState, parseAsString } from 'nuqs';
import { z } from 'zod';

// Zod schema for validating search parameters
const SearchParamsSchema = z.object({
  query: z.string().optional(),
});

// Accreditation fields data
const accreditationFields: AccreditationField[] = [
  { id: 'pcb', name: 'PCB (Physics, Chemistry, Biology)', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'pcm', name: 'PCM (Physics, Chemistry, Mathematics)', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'mce', name: 'MCE (Mathematics, Chemistry, Economics)', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'mpc', name: 'MPC (Mathematics, Physics, Computer Science)', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'bam', name: 'BAM (Business, Accounting, Mathematics)', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'general', name: 'General Accreditation', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

// Extract unique provinces and districts from the school data
const provinces = Array.from(new Set(schoolsData.map(school => school.province))).sort();
const allDistricts = Array.from(new Set(schoolsData.map(school => school.district))).sort();

// Add accreditation fields to the mock data for demonstration
const schoolsWithAccreditation: AccreditedSchool[] = schoolsData.map(school => {
  // Randomly assign 1-3 accreditation fields to each school
  const fieldsCount = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...accreditationFields].sort(() => 0.5 - Math.random());
  const selectedFields = shuffled.slice(0, fieldsCount);
  
  // Add general accreditation to some schools
  const hasGeneralAccreditation = Math.random() > 0.5;
  if (hasGeneralAccreditation && !selectedFields.find(f => f.id === 'general')) {
    selectedFields.push(accreditationFields.find(f => f.id === 'general')!);
  }
  
  return {
    ...school,
    accreditationFields: selectedFields,
    accreditationStatus: Math.random() > 0.2 ? 'Fully Accredited' : 'Provisionally Accredited',
    lastAccreditationDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    nextReviewDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  };
});

export default function AccreditedSchoolsPage() {
  // Define query states using nuqs
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString);
  const [currentPage, setCurrentPage] = useQueryState('page', {
    parse: (value) => {
      const parsed = parseInt(value || '1', 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => String(value)
  });

  // State for filtered schools
  const [filteredSchools, setFilteredSchools] = React.useState<AccreditedSchool[]>(schoolsWithAccreditation);
  
  // Apply filters when search parameters change
  useEffect(() => {
    // Validate and sanitize search parameters
    const validatedParams = SearchParamsSchema.safeParse({
      query: searchQuery,
    });

    if (!validatedParams.success) {
      console.error('Invalid search parameters:', validatedParams.error);
      return;
    }

    // Apply filters
    let filtered = schoolsWithAccreditation;

    // Filter by search query
    if (searchQuery?.trim()) {
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
    
    // Reset page to 1 if filters change and we're not on page 1
    if (currentPage && currentPage > 1 && filtered.length <= 6) {
      setCurrentPage(1);
    }
  }, [searchQuery, currentPage]);
  
  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };
  
  // Page change handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const displayedSchools = filteredSchools.slice(
    ((currentPage || 1) - 1) * itemsPerPage,
    (currentPage || 1) * itemsPerPage
  );

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
          searchQuery={searchQuery}
          selectedField={''} // No field selection since we're removing filters
          accreditationFields={accreditationFields}
          onSearchChange={handleSearchChange}
          onFieldChange={() => {}} // No field change handling
          totalSchools={filteredSchools.length}
          clearFilters={clearFilters}
        />
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Found <span className="font-medium text-gray-900">{filteredSchools.length}</span> schools
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        </div>
        
        {/* Main content area */}
        <div>
          {/* No Results Message */}
          {filteredSchools.length === 0 ? (
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
                  We couldn't find any schools matching your search criteria. Try adjusting your filters or search term.
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-2 hover:cursor-pointer"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Schools Grid */}
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