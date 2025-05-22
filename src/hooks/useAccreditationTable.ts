import { useMemo, useState } from "react";
import { AccreditationRequest } from "./useGetAccreditationRequests";

interface UseAccreditationTableProps {
  requestData: AccreditationRequest[];
}

interface UseAccreditationTableReturn {
  sortField: string;
  sortDirection: "asc" | "desc";
  searchTerm: string;
  selectedStatus: string;
  pageSize: number;
  currentPage: number;
  uniqueStatuses: string[];
  currentPageData: AccreditationRequest[];
  filteredData: AccreditationRequest[];
  handleSort: (field: string) => void;
  handleSearchChange: (value: string) => void;
  handleStatusChange: (value: string) => void;
  handlePageSizeChange: (value: number) => void;
  handlePageChange: (page: number) => void;
  setSearchTerm: (value: string) => void;
  setSelectedStatus: (value: string) => void;
}

export const useAccreditationTable = ({
  requestData,
}: UseAccreditationTableProps): UseAccreditationTableReturn => {
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rankingOptions = [
    "All",
    "UNSATISFACTORY",
    "SATISFACTORY",
    "GOOD",
    "OUTSTANDING",
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort data
  const filteredData = useMemo(() => {
    if (!requestData.length) return [];

    return requestData
      .filter(
        (request) =>
          // Text search filter (email, nationalId, phone)
          (request.assessment.school.schoolName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            request.assessment.combination.shortName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (selectedStatus === "All" ||
            request.assessment?.ranking === selectedStatus)
      )
      .sort((a, b) => {
        // Handle missing fields safely
        const aValue = a[sortField as keyof AccreditationRequest];
        const bValue = b[sortField as keyof AccreditationRequest];
        if (!aValue && !bValue) return 0;
        if (!aValue) return 1;
        if (!bValue) return -1;

        // Special handling for dates
        if (sortField === "createdAt") {
          const dateA = new Date(aValue as string);
          const dateB = new Date(bValue as string);
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Regular string/number comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
  }, [searchTerm, selectedStatus, sortField, sortDirection, requestData]);

  // Calculate current page data for pagination
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pageSize, currentPage]);

  // Event handlers
  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);
  const handlePageSizeChange = (value: number) => setPageSize(value);
  const handlePageChange = (page: number) => setCurrentPage(page);

  return {
    sortField,
    sortDirection,
    searchTerm,
    selectedStatus,
    pageSize,
    currentPage,
    rankingOptions,
    currentPageData,
    filteredData,
    handleSort,
    handleSearchChange,
    handleStatusChange,
    handlePageSizeChange,
    handlePageChange,
    setSearchTerm,
    setSelectedStatus,
  };
};
