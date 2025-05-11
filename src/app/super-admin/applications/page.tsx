"use client";
import Pagination from "@/components/inspection-plan/_components/Pagination";
import React, { useState, useEffect, useMemo } from "react";
import { Table } from "@/components/Table/Table";

const RequestDirectoryPage = () => {
  // State for sorting and filtering
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [pageSize, setPageSize] = useState(5);

  // State for request data
  const [requestData, setRequestData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);

  // State for request details modal
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch API data for requests
  useEffect(() => {
    async function fetchRequestData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8081/api/qamis/request/getAllRequests"
        );
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        setRequestData(data);
        console.log("Request data loaded:", data);
      } catch (error) {
        console.error("Error fetching request data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRequestData();
  }, []);

  // Get unique statuses for filter dropdown
  const uniqueStatuses = useMemo(() => {
    if (!requestData.length) return ["All"];
    return [
      "All",
      ...new Set(requestData.map((request) => request.status).filter(Boolean)),
    ];
  }, [requestData]);

  // Sorting function
  const handleSort = (field) => {
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
          (request.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.nationalId
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            request.phoneNumber
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            request.applicantRole
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          // Status filter
          (selectedStatus === "All" || request.status === selectedStatus)
      )
      .sort((a, b) => {
        // Handle missing fields safely
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (!aValue && !bValue) return 0;
        if (!aValue) return 1;
        if (!bValue) return -1;

        // Special handling for dates
        if (sortField === "createdAt") {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);

          if (sortDirection === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        }

        // Regular string/number comparison
        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [searchTerm, selectedStatus, sortField, sortDirection, requestData]);

  // Initialize currentPageData whenever filtered data changes
  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentPageData(filteredData.slice(0, pageSize));
    } else {
      setCurrentPageData([]);
    }
  }, [filteredData, pageSize]);

  // Handle page change from pagination component
  const handlePageChange = useMemo(() => {
    return (page, pageData) => {
      const { startIndex, endIndex } = pageData;
      setCurrentPageData(filteredData.slice(startIndex, endIndex));
    };
  }, [filteredData]);

  // Handle showing details for a request
  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  // Handle closing details modal
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Define table columns
  const columns = [
    {
      key: "id",
      header: "ID",
      sortable: true,
      render: (value) => value.substring(0, 8) + "...",
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (value) => <span className="text-primary">{value}</span>,
    },
    {
      key: "nationalId",
      header: "National ID",
      sortable: true,
    },
    {
      key: "applicantRole",
      header: "Role",
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 ${getStatusBadgeClass(
            value
          )} rounded-full text-sm`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      render: (value) => formatDate(value),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, item) => (
        <button
          onClick={() => handleShowDetails(item)}
          className="px-3 py-1 bg-primary text-white rounded hover:hover:bg-primary/90 hover:cursor-pointer transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Application Requests
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        {/* Search input */}
        <div className="flex-grow">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search requests
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by email, National ID, phone number..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <div className="min-w-[200px]">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page size selector */}
      <div className="mb-4">
        <label
          htmlFor="pageSize"
          className="text-sm font-medium text-gray-700 mr-2"
        >
          Items per page:
        </label>
        <select
          id="pageSize"
          className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Active filters display */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {selectedStatus !== "All" && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            Status: {selectedStatus}
            <button
              onClick={() => setSelectedStatus("All")}
              className="ml-2 text-blue-500 hover:text-blue-600"
              aria-label="Clear status filter"
            >
              ×
            </button>
          </div>
        )}
        {searchTerm && (
          <div className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm flex items-center">
            Search: "{searchTerm}"
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-blue-500 hover:text-blue-800"
              aria-label="Clear search filter"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* API Status Messages */}
      {isLoading && (
        <div className="my-4 p-3 bg-blue-50 text-blue-700 rounded">
          Loading request data...
        </div>
      )}

      {error && (
        <div className="my-4 p-3 bg-red-50 text-red-700 rounded">
          Error loading request data: {error}
        </div>
      )}

      {/* Reusable Table Component */}
      <Table
        data={currentPageData}
        columns={columns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        emptyStateMessage={
          requestData.length === 0
            ? "No request data available. Please check API connection."
            : "No requests found matching your search criteria"
        }
        pageSize={pageSize}
        currentPage={Math.ceil(
          (filteredData.indexOf(currentPageData[0]) + 1) / pageSize
        )}
        onPageChange={(page) => {
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          setCurrentPageData(filteredData.slice(startIndex, endIndex));
        }}
        totalItems={filteredData.length}
      />

      {/* Request Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  Request Details
                </h2>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Applicant Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">ID</p>
                      <p className="font-medium">{selectedRequest.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">National ID</p>
                      <p className="font-medium">
                        {selectedRequest.nationalId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">
                        {selectedRequest.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {selectedRequest.applicantRole}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p>
                        <span
                          className={`px-2 py-1 ${getStatusBadgeClass(
                            selectedRequest.status
                          )} rounded-full text-sm`}
                        >
                          {selectedRequest.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="font-medium">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Assessment Information
                  </h3>
                  {selectedRequest.assessment ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Assessment ID</p>
                        <p className="font-medium">
                          {selectedRequest.assessment.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">School</p>
                        <p className="font-medium">
                          {selectedRequest.assessment.school?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Combination</p>
                        <p className="font-medium">
                          {selectedRequest.assessment.combination?.name ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ranking</p>
                        <p className="font-medium">
                          {selectedRequest.assessment.ranking || "Not ranked"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Options</p>
                        {selectedRequest.assessment.options &&
                        selectedRequest.assessment.options.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {selectedRequest.assessment.options.map(
                              (option, index) => (
                                <li key={index}>{option.name || option}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No options available</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No assessment information available
                    </p>
                  )}
                </div>
              </div>

              {selectedRequest.documentPath && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Documents
                  </h3>
                  <div className="p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      {selectedRequest.documentPath}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDirectoryPage;
