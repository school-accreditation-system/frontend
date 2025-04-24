"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InspectionModal from "./InspectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, PlusCircle, ArrowDownUp, CheckCircle2, Clock, ThumbsUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast"; // Assuming you have a toast component

// Initial data - will be updated from localStorage if available
const initialInspections = [
  { id: 1, name: "College Saint Andre", district: "Kigali", type: "MPC", status: "Completed", submittedTo: "", approved: false },
  { id: 2, name: "Lycée de Kigali", district: "Kigali", type: "Science", status: "In Progress", submittedTo: "", approved: false },
  { id: 3, name: "FAWE Girls School", district: "Gasabo", type: "Science", status: "Completed", submittedTo: "", approved: false }
];

const initialRolesByDepartment = [
  {id: 1, role: "division", supervisor: "hod", submittedRole: ""},
  {id: 2, role: "hod", supervisor: "director", submittedRole: ""},
  {id: 3, role: "director", supervisor: "director", submittedRole: ""}
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
  const [inspections, setInspections] = useState(initialInspections);
  const [rolesByDepartment, setRolesByDepartment] = useState(initialRolesByDepartment);
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
        localStorage.setItem("rolesByDepartment", JSON.stringify(initialRolesByDepartment));
      }
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  }, []);

  // Filter and sort schools
  const filteredAndSortedInspections = [...inspections]
    .filter(school => 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Basic sorting
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

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
    router.push("/inspector-dashboard/school-identification?from=inspector-dashboard/applications");
  };
  
  const handleSelfAssessment = () => {
    setIsModalOpen(false);
    router.push('/inspector-dashboard/self-assessment?from="inspector-dashboard/applications"');
  };

  const getEligibleRoles = () => {
    // Find current role index
    const currentRoleIndex = rolesByDepartment.findIndex(r => r.role === loggedInUserRole);
    if (currentRoleIndex === -1) return [];
    
    // Return roles with higher index (supervisors)
    return rolesByDepartment.filter((_, index) => index > currentRoleIndex);
  };

  // Handle role submission
  const handleInspectionRole = (schoolId, targetRole) => {
    try {
      // 1. Update the inspection with the role it was submitted to
      const updatedInspections = inspections.map(inspection => {
        if (inspection.id === schoolId) {
          return { 
            ...inspection, 
            submittedTo: targetRole,
          };
        }
        return inspection;
      });
      
      // 2. Update rolesByDepartment to mark which role received the submission
      const updatedRoles = rolesByDepartment.map(role => {
        if (role.role === targetRole) {
          return {
            ...role,
            submittedRole: loggedInUserRole // This marks that this role received a submission from current user
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
      if (typeof toast !== 'undefined') {
        toast({
          title: "Submission Complete",
          description: `Inspection submitted to ${targetRole.toUpperCase()}`,
          status: "success",
          duration: 3000,
        });
      } else {
        alert(`Inspection submitted to ${targetRole.toUpperCase()}`);
      }
    } catch (error) {
      console.error("Error updating inspection submission:", error);
      alert("Failed to submit inspection. Please try again.");
    }
  };

  // New function to handle inspection approval by director
  const handleApproveInspection = (schoolId) => {
    try {
      // 1. Update the inspection's approved status
      const updatedInspections = inspections.map(inspection => {
        if (inspection.id === schoolId) {
          return { 
            ...inspection, 
            approved: true,
            status: "Completed" // Optionally update status to Completed when approved
          };
        }
        return inspection;
      });
      
      // 2. Save updates to localStorage
      localStorage.setItem("inspections", JSON.stringify(updatedInspections));
      
      // 3. Update state
      setInspections(updatedInspections);
      
      // 4. Show success message
      if (typeof toast !== 'undefined') {
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with action button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Inspections</h1>
          <p className="text-gray-500 mt-1">Manage and track inspection status</p>
          {loggedInUserRole && (
            <p className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block mt-2">
              Logged in as: {loggedInUserRole.toUpperCase()}
            </p>
          )}
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
            <DropdownMenuItem onClick={() => setSearchTerm("")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("completed")}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("in progress")}>In Progress</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Approval</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSearchTerm("approved")}>Approved</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("not approved")}>Not Approved</DropdownMenuItem>
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

      {/* Table of inspections */}
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
                <th className="py-3.5 px-4 text-left text-sm font-medium">District</th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">Type</th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">Status</th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">Approval Status</th>
                <th className="py-3.5 px-4 text-left text-sm font-medium">Submitted To</th>
                <th className="py-3.5 px-4 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAndSortedInspections.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900">{school.id}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{school.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{school.district}</td>
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
                          <span className="text-sm font-medium text-green-700">Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-purple-500 mr-1.5" />
                          <span className="text-sm font-medium text-purple-700">In Progress</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4"> 
                    <div className="flex items-center">
                      {school.approved ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                          <span className="text-sm font-medium text-green-700">Approved</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-500 mr-1.5" />
                          <span className="text-sm font-medium text-amber-700">Not Approved</span>
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
                      {!school.approved && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-3 bg-white border-gray-200 text-sm"
                              disabled={!!school.submittedTo || loggedInUserRole === "director"} // Disable if already submitted or user is director
                            >
                              {school.submittedTo ? "Submitted" : "Submit to"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Submit to:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {getEligibleRoles().map((role) => (
                              <DropdownMenuItem 
                                key={role.id}
                                className="cursor-pointer"
                                onClick={() => handleInspectionRole(school.id, role.role)}
                              >
                                {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
                              </DropdownMenuItem>
                            ))}
                            {getEligibleRoles().length === 0 && (
                              <DropdownMenuItem disabled>
                                No eligible roles
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      
                      {/* Approve button only for directors */}
                      {loggedInUserRole === "director" && !school.approved && school.submittedTo && (
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

              {filteredAndSortedInspections.length === 0 && (
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