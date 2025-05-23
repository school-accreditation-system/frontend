import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortField?: keyof T;
  sortDirection?: "asc" | "desc";
  onSort?: (field: keyof T) => void;
  emptyStateMessage?: string;
  rowClassName?: (index: number) => string;
  // Pagination props
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  isLoading?: boolean;
}

export function Table<T>({
  data,
  columns,
  sortField,
  sortDirection,
  onSort,
  emptyStateMessage = "No data available",
  rowClassName = (index) => (index % 2 === 0 ? "bg-gray-50" : "bg-blue-50"),
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  totalItems,
}: TableProps<T>) {
  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`py-3 px-4 text-left ${column.sortable ? "cursor-pointer" : ""
                  }`}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                {column.header}{" "}
                {column.sortable && sortField === column.key && (
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className={rowClassName(index)}>
                {columns.map((column, index) => (
                  <td key={index} className="py-3 px-4">
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-500"
              >
                {emptyStateMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalItems && totalItems > pageSize && (
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
                }`}
            >
              Previous
            </button>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange?.(pageNum)}
                className={`px-3 py-1 rounded ${currentPage === pageNum
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border"
                  }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
