"use client";
import { Table } from "@/components/Table/Table";
import React, { useState, useEffect, useMemo } from "react";

// Sample inspection data
const INSPECTIONS_DATA = [
  {
    id: 1,
    teamName: "Kayonza",
    inspectionDate: "2023-10-01",
    inspectionType: "Annual",
    inspectionStatus: "Completed",
  },
  {
    id: 2,
    teamName: "Rubavi",
    inspectionDate: "2023-10-15",
    inspectionType: "Follow-up",
    inspectionStatus: "Pending",
  },
  {
    id: 3,
    teamName: "Gasabo",
    inspectionDate: "2023-11-05",
    inspectionType: "Special",
    inspectionStatus: "In Progress",
  },
  {
    id: 4,
    teamName: "Nyarugenge",
    inspectionDate: "2023-11-20",
    inspectionType: "Annual",
    inspectionStatus: "Scheduled",
  },
  {
    id: 5,
    teamName: "Nyaruguru",
    inspectionDate: "2023-12-03",
    inspectionType: "Follow-up",
    inspectionStatus: "Completed",
  },
];

const InspectionsPage = () => {
  const [data, setData] = useState(INSPECTIONS_DATA);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    try {
      const teams = JSON.parse(localStorage.getItem("teams") || "[]");
      if (teams && teams.length > 0) {
        setData(teams);
      } else {
        setData(INSPECTIONS_DATA);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setData(INSPECTIONS_DATA);
    }
  }, []);

  // Define the columns for the reusable Table
  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "ID",
        sortable: true,
      },
      {
        key: "name",
        header: "Team Name",
        sortable: true,
      },
      {
        key: "createdAt",
        header: "Date",
        sortable: true,
        render: (value: string) => {
          if (!value) return "N/A";
          try {
            return new Date(value).toLocaleDateString();
          } catch (e) {
            return "Invalid date";
          }
        },
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (value: string) => {
          if (!value) return "N/A";

          let bgColor = "bg-gray-100";
          let textColor = "text-gray-800";

          switch (value.toLowerCase()) {
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

  // Handle sorting logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get the sorted data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (sortField === "createdAt") {
        const dateA = aValue ? new Date(aValue as string).getTime() : 0;
        const dateB = bValue ? new Date(bValue as string).getTime() : 0;
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === bValue) return 0;

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortField, sortDirection]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get paginated data based on current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Inspections</h1>
      {data.length > 0 ? (
        <Table
          data={paginatedData}
          columns={columns}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={data.length}
          emptyStateMessage="No inspection data available"
        />
      ) : (
        <p>Loading inspection data...</p>
      )}
    </div>
  );
};

export default InspectionsPage;
