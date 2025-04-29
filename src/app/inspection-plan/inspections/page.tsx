"use client";
import { Table } from "@/components/Table/Table";
import React, { useState, useEffect, useMemo } from "react";

interface Team {
  id: number;
  name: string;
  status: string;
  members: { id: number; name: string }[];
  createdAt: string;
}

interface Inspection {
  id: number;
  teamName: string;
  inspectionDate: string;
  inspectionType: string;
  inspectionStatus: string;
}

const InspectionsPage = () => {
  const [data, setData] = useState<Inspection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof Inspection>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const teamsJson = localStorage.getItem("teams");
      if (teamsJson) {
        const teams: Team[] = JSON.parse(teamsJson);
        // Map team data to inspection data structure
        const inspections: Inspection[] = teams.map((team) => ({
          id: team.id,
          teamName: team.name,
          inspectionDate: team.createdAt,
          inspectionType: "Annual", // Default type
          inspectionStatus: team.status || "Pending",
        }));
        setData(inspections);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error loading teams:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle sorting
  const handleSort = (field: keyof Inspection) => {
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Sort and paginate data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    });
  }, [data, sortField, sortDirection]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        key: "id" as keyof Inspection,
        header: "ID",
        sortable: true,
      },
      {
        key: "teamName" as keyof Inspection,
        header: "Team Name",
        sortable: true,
      },
      {
        key: "inspectionDate" as keyof Inspection,
        header: "Date",
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString(),
      },
      {
        key: "inspectionType" as keyof Inspection,
        header: "Type",
        sortable: true,
      },
      {
        key: "inspectionStatus" as keyof Inspection,
        header: "Status",
        sortable: true,
        render: (value: string) => {
          let bgColor = "bg-gray-100";
          let textColor = "text-gray-800";

          switch (value?.toLowerCase()) {
            case "completed":
              bgColor = "bg-green-100";
              textColor = "text-green-800";
              break;
            case "pending":
              bgColor = "bg-yellow-100";
              textColor = "text-yellow-800";
              break;
            case "in progress":
              bgColor = "bg-blue-100";
              textColor = "text-blue-800";
              break;
            case "scheduled":
              bgColor = "bg-purple-100";
              textColor = "text-purple-800";
              break;
          }

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor}`}
            >
              {value}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Inspections</h1>

      {/* Page size selector */}
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2 text-sm text-gray-600">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1); // Reset to first page when changing page size
          }}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading inspection data...</p>
      ) : (
        <Table
          data={paginatedData}
          columns={columns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={data.length}
          onPageChange={handlePageChange}
          emptyStateMessage="No inspections found"
        />
      )}
    </div>
  );
};

export default InspectionsPage;
