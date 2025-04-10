"use client";
import React, { useEffect, useState } from "react";

/**
 * @param {Object} props
 * @param {number} props.totalItems - Total number of items to paginate
 * @param {number} props.pageSize - Number of items per page
 * @param {Function} props.onPageChange - Callback function when page changes, receives current page and paginated data
 * @param {string} props.itemName - Name of the items being paginated (e.g., "schools", "users")
 * @param {string} props.className - Additional CSS classes for the container
 * @param {Object} props.labels - Custom text labels
 */
const Pagination = ({ 
  totalItems, 
  pageSize = 10, 
  onPageChange, 
  itemName = "items",
  className = "",
  labels = {
    showing: "Showing",
    to: "to",
    of: "of",
    prev: "Prev",
    next: "Next"
  }
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate derived values instead of using them as dependencies
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Reset to first page when total items or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, pageSize]);

  // Call the onPageChange callback when the page changes
  // Fix 1: Use a useEffect with explicit dependencies that won't change on each render
  useEffect(() => {
    if (onPageChange) {
      const pageData = {
        startIndex: (currentPage - 1) * pageSize,
        endIndex: Math.min((currentPage - 1) * pageSize + pageSize, totalItems),
        pageSize,
        currentPage
      };
      onPageChange(currentPage, pageData);
    }
  }, [currentPage, pageSize, totalItems, onPageChange]);

  // Pagination handlers
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`${className}`}>
      {/* Pagination UI */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          {totalItems > 0 ? (
            <>
              {labels.showing}{" "}
              {totalItems > 0 ? startIndex + 1 : 0} {labels.to}{" "}
              {endIndex} {labels.of}{" "}
              {totalItems} {itemName}
            </>
          ) : (
            `No ${itemName} found`
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
            >
              {labels.prev}
            </button>

            {/* Page numbers */}
            <div className="flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                // Show current page, first page, last page, and one page before and after current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  pageNumber === currentPage ||
                  pageNumber === currentPage - 1 ||
                  pageNumber === currentPage + 1
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`w-8 h-8 mx-1 flex items-center justify-center rounded ${
                        currentPage === pageNumber
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                // Show ellipsis for gaps
                if (pageNumber === 2 && currentPage > 3) {
                  return (
                    <span key={`ellipsis-1`} className="mx-1" aria-hidden="true">
                      &hellip;
                    </span>
                  );
                }

                if (
                  pageNumber === totalPages - 1 &&
                  currentPage < totalPages - 2
                ) {
                  return (
                    <span key={`ellipsis-2`} className="mx-1" aria-hidden="true">
                      &hellip;
                    </span>
                  );
                }

                return null;
              })}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
            >
              {labels.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;