/* eslint-disable max-lines */
"use client";

import { Table } from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast"; // Assuming you have a toast component
import { ArrowDownUp, CheckCircle2, Clock, Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import InspectionModal from "./InspectionModal";

// Initial data - will be updated from localStorage if available
const initialInspections = [
  {
    id: 1,
    name: "College Saint Andre",
    district: "Kigali",
    type: "MPC",
    status: "Completed",
    submittedTo: "",
    approved: false,
  },
  {
    id: 2,
    name: "Lycée de Kigali",
    district: "Kigali",
    type: "Science",
    status: "In Progress",
    submittedTo: "",
    approved: false,
  },
  {
    id: 3,
    name: "FAWE Girls School",
    district: "Gasabo",
    type: "Science",
    status: "Completed",
    submittedTo: "",
    approved: false,
  },
];

const initialRolesByDepartment = [
  { id: 1, role: "analyst", supervisor: "hod", submittedRole: "" },
  { id: 2, role: "inspector", supervisor: "division", submittedRole: "" },
  { id: 3, role: "division", supervisor: "hod", submittedRole: "" },
  { id: 4, role: "hod", supervisor: "director", submittedRole: "" },
  { id: 5, role: "director", supervisor: "director", submittedRole: "" }, // Fixed ID from 3 to 5
];

const Page = () => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedSchools, setAssignedSchools] = useState([]);
  const [schoolTeamAssignments, setSchoolTeamAssignments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [inspections, setInspections] = useState([]);
  const [rolesByDepartment, setRolesByDepartment] = useState(
    initialRolesByDepartment
  );
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);

  const router = useRouter();

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load user role
    try {
      const userData = localStorage.getItem("loggedInUser");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setLoggedInUserRole(parsedUserData.role || "division"); // Default to division if no role
      } else {
        setLoggedInUserRole("division"); // Default for demo purposes
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setLoggedInUserRole("division"); // Fallback
    }

    // Load inspections data
    try {
      const savedInspections = localStorage.getItem("inspections");
      if (savedInspections) {
        setInspections(JSON.parse(savedInspections));
      } else {
        // Initialize localStorage with default inspections if not present
        localStorage.setItem("inspections", JSON.stringify(initialInspections));
      }
    } catch (error) {
      console.error("Error loading inspections:", error);
    }

    // Load roles data
    try {
      const savedRoles = localStorage.getItem("rolesByDepartment");
      if (savedRoles) {
        setRolesByDepartment(JSON.parse(savedRoles));
      } else {
        // Initialize localStorage with default roles if not present
        localStorage.setItem(
          "rolesByDepartment",
          JSON.stringify(initialRolesByDepartment)
        );
      }
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  }, []);

  // Filter and sort schools
  // const filteredAndSortedInspections = [...inspections]
  //   .filter(
  //     (school) =>
  //       school?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       school?.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       school?.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       school?.status.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     // Basic sorting
  //     if (sortDirection === "asc") {
  //       return a[sortField] > b[sortField] ? 1 : -1;
  //     } else {
  //       return a[sortField] < b[sortField] ? 1 : -1;
  //     }
  //   });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleInspection = () => {
    setIsModalOpen(true);
  };

  const handleSchoolIdentification = () => {
    setIsModalOpen(false);
    router.push(
      "/inspector-dashboard/school-identification?from=inspector-dashboard/applications"
    );
  };

  const handleSelfAssessment = () => {
    setIsModalOpen(false);
    router.push(
      '/inspector-dashboard/self-assessment?from="inspector-dashboard/applications"'
    );
  };

  const getEligibleRoles = (school) => {
    // First, find the current role in the hierarchy
    const currentRole = rolesByDepartment.find(
      (r) => r.role === loggedInUserRole
    );
    if (!currentRole) return [];

    // Get the direct supervisor role
    const supervisorRole = currentRole.supervisor;

    // Create the actual hierarchy map from the data
    const roleHierarchyOrder = [
      "analyst", // Level 0
      "inspector", // Level 1
      "division", // Level 2
      "hod", // Level 3
      "director", // Level 4
    ];

    // Get current position in hierarchy
    const currentPositionIndex = roleHierarchyOrder.indexOf(loggedInUserRole);

    // Only return the direct supervisor role (one level above)
    return rolesByDepartment.filter((role) => {
      // Only allow the direct supervisor role
      return role.role === supervisorRole;
    });
  };

  const handleInspectionRole = (schoolId, targetRole) => {
    try {
      // 1. Update the inspection with the role it was submitted to
      const updatedInspections = inspections.map((inspection) => {
        if (inspection.id === schoolId) {
          return {
            ...inspection,
            submittedTo: targetRole,
            status: "Submitted", // Ensure status shows as submitted
            // Track submission history
            submissionHistory: [
              ...(inspection.submissionHistory || []),
              {
                from: loggedInUserRole,
                to: targetRole,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return inspection;
      });

      // 2. Update rolesByDepartment to mark which role received the submission
      const updatedRoles = rolesByDepartment.map((role) => {
        if (role.role === targetRole) {
          return {
            ...role,
            submittedRole: loggedInUserRole, // This marks that this role received a submission from current user
          };
        }
        return role;
      });

      // 3. Save both updates to localStorage
      localStorage.setItem("inspections", JSON.stringify(updatedInspections));
      localStorage.setItem("rolesByDepartment", JSON.stringify(updatedRoles));

      // 4. Update state
      setInspections(updatedInspections);
      setRolesByDepartment(updatedRoles);

      // 5. Show success message
      toast({
        title: "Submission Complete",
        description: `Inspection submitted to ${targetRole.toUpperCase()}`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating inspection submission:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit inspection. Please try again.",
        status: "error",
        duration: 3000,
      });
    }
  };

  // New function to handle inspection approval by director
  const handleApproveInspection = (schoolId) => {
    try {
      // 1. Update the inspection's approved status
      const updatedInspections = inspections.map((inspection) => {
        if (inspection.id === schoolId) {
          return {
            ...inspection,
            approved: true,
            status: "Completed", // Optionally update status to Completed when approved
          };
        }
        return inspection;
      });

      // 2. Save updates to localStorage
      localStorage.setItem("inspections", JSON.stringify(updatedInspections));

      // 3. Update state
      setInspections(updatedInspections);

      // 4. Show success message
      if (typeof toast !== "undefined") {
        toast({
          title: "Inspection Approved",

          description: `The inspection has been successfully approved`,
          status: "success",
          duration: 3000,
        });
      } else {
        alert(`Inspection has been approved successfully`);
      }
    } catch (error) {
      console.error("Error approving inspection:", error);
      alert("Failed to approve inspection. Please try again.");
    }
  };
  // Updated canSubmitInspection based on the actual data structure
  const canSubmitInspection = (school) => {
    // Case 1: New inspection not yet submitted
    if (!school.submittedTo) {
      return true;
    }

    // Case 2: If the school is submitted to the current user, they can forward it
    if (school.submittedTo === loggedInUserRole) {
      return true;
    }

    // Otherwise, user cannot submit/forward this inspection
    return false;
  };

  // Define columns for the inspections table
  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "School ID",
        render: (value: number) => (
          <span className="text-sm text-gray-900">{value}</span>
        ),
      },
      {
        key: "name",
        header: "School Name",
        render: (value: string) => (
          <span className="text-sm font-medium text-gray-900">{value}</span>
        ),
      },
      {
        key: "district",
        header: "District",
        render: (value: string) => (
          <span className="text-sm text-gray-600">{value}</span>
        ),
      },
      {
        key: "type",
        header: "Type",
        render: (value: string) => (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {value}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (value: string) => (
          <div className="flex items-center">
            {value.toLowerCase() === "completed" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                <span className="text-sm font-medium text-green-700">
                  Completed
                </span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 text-purple-500 mr-1.5" />
                <span className="text-sm font-medium text-purple-700">
                  In Progress
                </span>
              </>
            )}
          </div>
        ),
      },
      {
        key: "approved",
        header: "Approval Status",
        render: (value: boolean) => (
          <div className="flex items-center">
            {value ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                <span className="text-sm font-medium text-green-700">
                  Approved
                </span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 text-amber-500 mr-1.5" />
                <span className="text-sm font-medium text-amber-700">
                  Not Approved
                </span>
              </>
            )}
          </div>
        ),
      },
      {
        key: "submittedTo",
        header: "Submitted To",
        render: (value: string) =>
          value ? (
            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              {value.toUpperCase()}
            </span>
          ) : (
            <span className="text-gray-400">Not submitted</span>
          ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (_, school) => (
          <div className="flex items-center justify-center gap-2">
            {school.submittedTo &&
              !school.approved &&
              canSubmitInspection(school) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 bg-white border-gray-200 text-sm"
                    >
                      {school.submittedTo === loggedInUserRole
                        ? "Forward"
                        : "Submit"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Submit to:</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {getEligibleRoles(school).map((role) => (
                      <DropdownMenuItem
                        key={role.id}
                        className="cursor-pointer"
                        onClick={() =>
                          handleInspectionRole(school.id, role.role)
                        }
                      >
                        {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
                      </DropdownMenuItem>
                    ))}
                    {getEligibleRoles(school).length === 0 && (
                      <DropdownMenuItem disabled>
                        No eligible roles
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

            {school.submittedTo && school.submittedTo !== loggedInUserRole && (
              <span className="text-sm text-gray-500">
                Submitted to {school.submittedTo.toUpperCase()}
              </span>
            )}

            {loggedInUserRole === "director" &&
              !school.approved &&
              school.submittedTo === loggedInUserRole && (
                <Button
                  size="sm"
                  className="h-8 bg-primary text-white"
                  onClick={() => handleApproveInspection(school.id)}
                >
                  Approve
                </Button>
              )}
          </div>
        ),
      },
    ],
    [loggedInUserRole, getEligibleRoles, canSubmitInspection]
  );

  return (
    <div className="p-6  mx-auto">
      {/* Header with action button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            School Inspections
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track inspection status
          </p>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search schools..."
            className="pl-10 w-full border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchTerm("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("completed")}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("in progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Approval</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSearchTerm("approved")}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("not approved")}>
              Not Approved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* InspectionModal (conditionally rendered) */}
      <InspectionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSchoolIdentification={handleSchoolIdentification}
        handleSelfAssessment={handleSelfAssessment}
      />

      {/* Replace table with reusable Table component */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-700 border-b">
              <tr>
                <th
                  className="py-3.5 px-4 text-left text-sm font-medium cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-2">
                    School ID
                    {sortField === "id" && (
                      <ArrowDownUp className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 text-left text-sm font-medium cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    School Name
                    {sortField === "name" && (
                      <ArrowDownUp className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  District
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Type
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Approval Status
                </th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">
                  Submitted To
                </th>
                <th className="py-3.5 px-4 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inspections.map((school) => (
                <tr
                  key={school.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {school.id}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {school.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {school.district}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {school.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {school.status.toLowerCase() === "completed" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                          <span className="text-sm font-medium text-green-700">
                            Completed
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-purple-500 mr-1.5" />
                          <span className="text-sm font-medium text-purple-700">
                            In Progress
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{school.ranking}</td>
                  <td>{school.score}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {school.approved ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                          <span className="text-sm font-medium text-green-700">
                            Approved
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-500 mr-1.5" />
                          <span className="text-sm font-medium text-amber-700">
                            Not Approved
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {school.submittedTo ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        {school.submittedTo.toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-gray-400">Not submitted</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
  <div className="flex items-center justify-center gap-2">
    {/* Submission dropdown */}
    { school.submittedTo && !school.approved && canSubmitInspection(school) && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 bg-white border-gray-200 text-sm"
          >
            {school.submittedTo === loggedInUserRole ? "Forward" : "Submit"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Submit to:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getEligibleRoles(school).map((role) => (
            <DropdownMenuItem
              key={role.id}
              className="cursor-pointer"
              onClick={() => handleInspectionRole(school.id, role.role)}
            >
              {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
            </DropdownMenuItem>
          ))}
          {getEligibleRoles(school).length === 0 && (
            <DropdownMenuItem disabled>
              No eligible roles
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )}

    {/* Show status message if already submitted but not to current user */}
    {school.submittedTo && school.submittedTo !== loggedInUserRole && (
      <span className="text-sm text-gray-500">
        Submitted to {school.submittedTo.toUpperCase()}
      </span>
    )}

    {/* Approve button only for directors */}
    {loggedInUserRole === "director" &&
      !school.approved &&
      school.submittedTo === loggedInUserRole && (
      <Button
        variant="default"
        size="sm"
        className="h-8 bg-green-600 hover:bg-green-700 text-white"
        onClick={() => handleApproveInspection(school.id)}
      >
        Approve
      </Button>
    )}
  </div>
</td>

                </tr>
              ))}

              {inspections.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Search className="h-8 w-8 text-gray-300 mb-2" />
                      <p>No inspections match your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
