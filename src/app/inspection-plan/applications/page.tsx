"use client";
import Pagination from "@/components/inspection-plan/_components/Pagination";
import React, { useState, useEffect, useMemo } from "react";

// Sample data in JSON format
const schoolData = [
  {
    id: 1,
    name: "College Saint Andre",
    email: "college@gmail.com",
    type: "MPC",
    district: "Kigali",
  },
  {
    id: 2,
    name: "Lycée Jean Moulin",
    email: "jeanmoulin@education.org",
    type: "Science",
    district: "Kigali",
  },
  {
    id: 3,
    name: "International Academy",
    email: "contact@international-academy.edu",
    type: "Liberal Arts",
    district: "Kigali",
  },
  {
    id: 4,
    name: "Technical Institute of Engineering",
    email: "admissions@tie.tech",
    type: "Engineering",
    district: "Gasabo",
  },
  {
    id: 5,
    name: "Academia Linguistica",
    email: "info@academia-linguistica.com",
    type: "Languages",
    district: "Nyarugenge",
  },
  {
    id: 6,
    name: "Saint Patrick High School",
    email: "stpatrick@education.rw",
    type: "Sciences",
    district: "Kicukiro",
  },
  {
    id: 7,
    name: "Rwanda Technical College",
    email: "rtc@gmail.com",
    type: "Technical",
    district: "Gasabo",
  },
];

const SchoolDirectoryPage = () => {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  // Get unique districts for filter dropdown
  const uniqueDistricts = useMemo(() => {
    return ["All", ...new Set(schoolData.map((school) => school.district))];
  }, []);

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
    return schoolData
      .filter(
        (school) =>
          // Text search filter
          (school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
          // District filter
          (selectedDistrict === "All" || school.district === selectedDistrict)
      )
      .sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
  }, [searchTerm, selectedDistrict, sortField, sortDirection]);

  // Initialize currentPageData on first render
  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentPageData(filteredData.slice(0, pageSize));
    } else {
      setCurrentPageData([]);
    }
  }, [filteredData, pageSize]);

  // Handle page change from pagination component
  // Fix: Use memoized callback to prevent recreation on every render
  const handlePageChange = useMemo(() => {
    return (page, pageData) => {
      const { startIndex, endIndex } = pageData;
      setCurrentPageData(filteredData.slice(startIndex, endIndex));
    };
  }, [filteredData]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-primary">School Directory</h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        {/* Search input */}
        <div className="flex-grow">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search schools
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, email or type..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* District filter */}
        <div className="min-w-[200px]">
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by district
          </label>
          <select
            id="district"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
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
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* Active filters display */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {selectedDistrict !== "All" && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            District: {selectedDistrict}
            <button
              onClick={() => setSelectedDistrict("All")}
              className="ml-2 text-blue-500 hover:text-blue-600"
              aria-label="Clear district filter"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("type")}
              >
                Type{" "}
                {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("district")}
              >
                District{" "}
                {sortField === "district" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((school, index) => (
              <tr
                key={school.id}
                className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}
              >
                <td className="py-3 px-4 border-b">{school.id}</td>
                <td className="py-3 px-4 border-b font-medium">
                  {school.name}
                </td>
                <td className="py-3 px-4 border-b text-blue-600">
                  {school.email}
                </td>
                <td className="py-3 px-4 border-b">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {school.type}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {school.district}
                  </span>
                </td>
              </tr>
            ))}

            {/* Empty state when no schools match filters */}
            {currentPageData.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No schools found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      <Pagination
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        itemName="schools"
      />
    </div>
  );
};

export default SchoolDirectoryPage;