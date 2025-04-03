'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page links to show
    
    // Always show first page
    pages.push(1);
    
    // Calculate start and end of the visible page range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust if at the beginning
    if (currentPage <= 3) {
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    }
    
    // Adjust if at the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }
    
    // Add ellipsis before middle pages if needed
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis after middle pages if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="flex items-center justify-center">
      <ul className="flex items-center gap-1">
        {/* Previous button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-md border",
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            )}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={`page-${index}`}>
            {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
              <span className="flex items-center justify-center h-9 w-9">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                className={cn(
                  "h-9 w-9 rounded-md",
                  currentPage === page 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "hover:bg-gray-100"
                )}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-md border",
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            )}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}; 