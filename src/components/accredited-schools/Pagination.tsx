import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Create an array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // Always show the first page
    pages.push(1);

    // If we have more than 7 pages, we need ellipses
    if (totalPages > 7) {
      // If current page is close to start
      if (currentPage <= 3) {
        pages.push(2, 3, 4, '...', totalPages);
      } 
      // If current page is close to end
      else if (currentPage >= totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } 
      // If current page is in the middle
      else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    } else {
      // If we have 7 or fewer pages, show all
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-lg border mr-2",
          currentPage === 1
            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
            : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:cursor-pointer"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {/* Page numbers */}
      <div className="flex items-center">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={cn(
                "h-10 w-10 rounded-lg mx-1 flex items-center justify-center text-sm font-medium transition-all hover:cursor-pointer",
                currentPage === page
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="mx-1 text-gray-400 w-10 text-center">
              …
            </span>
          )
        ))}
      </div>
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-lg border ml-2",
          currentPage === totalPages
            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
            : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:cursor-pointer"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}; 