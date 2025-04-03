import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';



export const SearchFilters= ({
  searchQuery,
  selectedField,
  accreditationFields,
  onSearchChange,
  onFieldChange,
  // totalSchools,
  clearFilters
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const hasActiveFilters = searchQuery || selectedField;

  const [searchParam, setSearchParam] = useQueryState('search', { default: searchQuery });
  const [fieldParam, setFieldParam] = useQueryState('field', { default: selectedField });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log("query",query)
    setSearchParam(query);
    onSearchChange(query);
  };

  const handleFieldChange = (fieldId: string) => {
    if (fieldParam === fieldId) {
      setFieldParam('');
      onFieldChange('');
    } else {
      setFieldParam(fieldId);
      onFieldChange(fieldId);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
      <div className="p-6 pb-4">
        {/* Search box */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for schools by name..."
            className="pl-10 py-2 pr-4 h-12 border border-gray-200 rounded-lg w-full text-base text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
            value={searchParam || ''}
            onChange={handleSearchChange}
          />
          {searchParam && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Combinations filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Combination</h3>
          <div className="flex flex-wrap gap-2">
            {accreditationFields.map((field) => (
              <Badge
                key={field.id}
                variant="outline"
                className={cn(
                  "cursor-pointer py-1.5 px-3 border transition-colors",
                  fieldParam === field.id
                    ? field.color || "bg-blue-100 text-blue-700 border-blue-200"
                    : "hover:bg-gray-50"
                )}
                onClick={() => handleFieldChange(field.id)}
              >
                {field.name || field.id}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            {searchParam && (
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                  <span>Search: {searchParam}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)} />
                </Badge>
              </div>
            )}
            
            {fieldParam && (
              <div className="flex items-center gap-1">
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <span>Combination: {accreditationFields.find(f => f.id === fieldParam)?.name || fieldParam}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleFieldChange('')} />
                </Badge>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results count
      <div className="px-6 pb-4">
        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          {totalSchools} {totalSchools === 1 ? 'School' : 'Schools'} Found
        </h3>
      </div> */}
    </div>
  );
}; 