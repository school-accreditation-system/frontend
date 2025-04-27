"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import InspectionModal from "./InspectionModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample school data - in a real app, this might come from an API
const schoolsData = [
  { id: 1, name: "College Saint Andre", district: "Kigali", type: "MPC" },
  { id: 2, name: "Lycée de Kigali", district: "Kigali", type: "Science" },
  { id: 3, name: "FAWE Girls School", district: "Gasabo", type: "Science" },
  {
    id: 4,
    name: "Groupe Scolaire Officiel de Butare",
    district: "Huye",
    type: "Liberal Arts",
  },
  {
    id: 5,
    name: "Ecole Technique Saint Joseph",
    district: "Muhanga",
    type: "Technical",
  },
  {
    id: 6,
    name: "Green Hills Academy",
    district: "Kigali",
    type: "International",
  },
  {
    id: 7,
    name: "Rwanda Leading Institute",
    district: "Kicukiro",
    type: "Engineering",
  },
  { id: 8, name: "Riviera High School", district: "Gasabo", type: "Languages" },
  {
    id: 9,
    name: "Wellspring Academy",
    district: "Nyarugenge",
    type: "Primary",
  },
  {
    id: 10,
    name: "Kigali International Community School",
    district: "Kigali",
    type: "International",
  },
];

// Role hierarchy
const initialRolesByDepartment = [
  {id: 1, role: "analyst", supervisor: "inspector", submittedRole: ""},
  {id: 2, role: "inspector", supervisor: "division", submittedRole: ""},
  {id: 3, role: "division", supervisor: "hod", submittedRole: ""},
  {id: 4, role: "hod", supervisor: "director", submittedRole: ""},
  {id: 5, role: "director", supervisor: "director", submittedRole: ""}
];

// Initial inspections data structure
const initialInspections = schoolsData.map(school => ({
  id: school.id,
  name: school.name,
  district: school.district,
  type: school.type,
  status: Math.random() > 0.5 ? "Completed" : "In Progress",
  submittedTo: "",
  approved: false
}));

// Hardcoded team for testing
const hardcodedTeam = {
  id: 4,
  name: "Team Nyanza",
  members: [
    { id: 1, name: "Tuyishime Aline" },
    { id: 2, name: "Uwase Marie" },
    { id: 3, name: "Mukashyaka Diane" },
  ],
  createdAt: "2023-04-16T00:00:00.000Z",
  endDate: "2025-09-20T00:00:00.000Z",
};

// Hardcoded assigned schools for testing
const hardcodedAssignedSchools = {
  4: {
    schoolIds: [1, 2, 3],
    startDate: "2023-04-16T00:00:00.000Z",
    endDate: "2025-09-20T00:00:00.000Z",
  },
};

const TeamSchoolsPage = () => {
  const router = useRouter();
  const [currentTeam, setCurrentTeam] = useState(hardcodedTeam);
  const [assignedSchools, setAssignedSchools] = useState(
    hardcodedAssignedSchools[4]?.schoolIds || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState("inspector"); // Default role
  const [rolesByDepartment, setRolesByDepartment] = useState(initialRolesByDepartment);
  const [inspections, setInspections] = useState(initialInspections);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (dataLoaded) return; // Prevent multiple loads
    
    try {
      // Load user role
      const userData = localStorage.getItem("loggedInUser");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setLoggedInUserRole(parsedUserData.role || "inspector");
      }

      // Load roles data
      const savedRoles = localStorage.getItem("rolesByDepartment");
      if (savedRoles) {
        setRolesByDepartment(JSON.parse(savedRoles));
      } else {
        // Initialize localStorage with default roles if not present
        localStorage.setItem("rolesByDepartment", JSON.stringify(initialRolesByDepartment));
      }
      
      // Load inspections data
      const savedInspections = localStorage.getItem("inspections");
      if (savedInspections) {
        setInspections(JSON.parse(savedInspections));
      } else {
        // Initialize localStorage with default inspections if not present
        localStorage.setItem("inspections", JSON.stringify(initialInspections));
      }

      // Try loading team from localStorage
      const userJson = localStorage.getItem("loggedInUser");
      let foundTeam = null;

      if (userJson) {
        const userData = JSON.parse(userJson);
        const teamsJson = localStorage.getItem("teams");

        if (teamsJson) {
          const parsedTeams = JSON.parse(teamsJson);
          if (Array.isArray(parsedTeams)) {
            foundTeam = parsedTeams.find(
              (team) => team.id === userData.teamId
            );
          }
        }
      }

      // Set the found team or fallback to hardcoded
      setCurrentTeam(foundTeam || hardcodedTeam);

      // Load assigned schools
      const teamId = (foundTeam || hardcodedTeam).id;
      let schoolIds = [];

      const assignedJson = localStorage.getItem("assignedSchools");
      if (assignedJson) {
        const parsed = JSON.parse(assignedJson);
        const teamAssignments = parsed[teamId];
        if (teamAssignments && teamAssignments.schoolIds) {
          schoolIds = teamAssignments.schoolIds;
        }
      }

      // Use hardcoded data as fallback
      if (schoolIds.length === 0 && hardcodedAssignedSchools[teamId]) {
        schoolIds = hardcodedAssignedSchools[teamId].schoolIds;
      }

      setAssignedSchools(schoolIds);
      setDataLoaded(true);
      
    } catch (error) {
      console.error("Error loading data:", error);
      // Ensure we have default data
      setCurrentTeam(hardcodedTeam);
      setAssignedSchools(hardcodedAssignedSchools[4]?.schoolIds || []);
      setRolesByDepartment(initialRolesByDepartment);
      setInspections(initialInspections);
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  // Get the role hierarchy and determine which roles the current user can submit to
  const getEligibleRoles = () => {
    const allRoles = rolesByDepartment.map(r => r.role);
    const currentRoleIndex = rolesByDepartment.findIndex(r => r.role === loggedInUserRole);

    console.log("Current Role Index:", currentRoleIndex);
    console.log("All Roles:", allRoles);
    
    if (currentRoleIndex === -1) return { eligibleRoles: [], allRoles };
    
    // Find the next role in the hierarchy that this user can submit to
    const currentRole = rolesByDepartment[currentRoleIndex];
    const supervisorRole = currentRole.supervisor;

    console.log("Supervisor Role:", supervisorRole);

    
    // The only eligible role is the direct supervisor of the current role
    const eligibleRoles = [supervisorRole];
    
    return { eligibleRoles, allRoles };
  };

  // Determine if a specific role is eligible for the current user to submit to
  const isEligibleRole = (role) => {
    const { eligibleRoles } = getEligibleRoles();
    return eligibleRoles.includes(role);
  };

  // Handle submission of a school inspection to a specific role
  const handleInspectionRole = (school, targetRole) => {
    try {
      // 1. Update the inspection status in the inspections array
      const updatedInspections = inspections.map(inspection => {
        if (inspection.id === school.id) {
          return { 
            ...inspection, 
            submittedTo: targetRole,
            status: "Submitted" // Optional: update status when submitted
          };
        }
        return inspection;
      });
      
      // 2. Update rolesByDepartment to track submission
      const updatedRoles = rolesByDepartment.map(role => {
        if (role.role === targetRole) {
          return {
            ...role,
            submittedRole: loggedInUserRole // Mark that this user submitted
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
      alert(`Inspection submitted to ${targetRole.toUpperCase()}`);
    } catch (error) {
      console.error("Error updating inspection submission:", error);
      alert("Failed to submit inspection. Please try again.");
    }
  };

  // Create the filtered school data based on assigned IDs
  const assignedSchoolsData = useMemo(() => {
    // Merge school data with inspection status
    return schoolsData
      .filter(school => assignedSchools.includes(school.id))
      .map(school => {
        // Find corresponding inspection data
        const inspectionData = inspections.find(insp => insp.id === school.id) || {};
        return {
          ...school,
          status: inspectionData.status || "Not Started",
          submittedTo: inspectionData.submittedTo || "",
          approved: inspectionData.approved || false
        };
      });
  }, [assignedSchools, inspections]);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toLocaleDateString() : "";
    } catch (e) {
      return "Invalid date";
    }
  };

  // Handle opening the inspection modal
  const handleInspect = (school) => {
    setCurrentSchool(school);
    setIsModalOpen(true);
  };

  // Handle inspection type selection
  const handleSchoolIdentification = () => {
    setIsModalOpen(false);
    if (currentSchool) {
      router.push(
        `/inspector-dashboard/school-identification?schoolId=${currentSchool.id}&from=inspector-dashboard/applications`
      );
    }
  };

  const handleSelfAssessment = () => {
    setIsModalOpen(false);
    if (currentSchool) {
      router.push(
        `/inspector-dashboard/self-assessment?schoolId=${currentSchool.id}&from=inspector-dashboard/applications`
      );
    }
  };

  // Define columns for the MantineReactTable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "School ID",
        size: 80,
      },
      {
        accessorKey: "name",
        header: "School Name",
        size: 250,
      },
      {
        accessorKey: "district",
        header: "District",
        size: 150,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 120,
        Cell: ({ cell }) => (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          let bgColor = "bg-gray-100";
          let textColor = "text-gray-700";
          
          switch (status) {
            case "Completed":
              bgColor = "bg-green-100";
              textColor = "text-green-700";
              break;
            case "In Progress":
              bgColor = "bg-blue-100";
              textColor = "text-blue-700";
              break;
            case "Submitted":
              bgColor = "bg-purple-100";
              textColor = "text-purple-700";
              break;
          }
          
          return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
              {status}
            </span>
          );
        }
      },
      {
        accessorKey: "submittedTo",
        header: "Submitted To",
        size: 130,
        Cell: ({ cell }) => {
          const submittedTo = cell.getValue<string>();
          return submittedTo ? (
            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              {submittedTo.toUpperCase()}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Not submitted</span>
          );
        }
      },
      {
        id: "actions",
        header: "Actions",
        size: 220,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const school = row.original;
          const { allRoles, eligibleRoles } = getEligibleRoles();
          
          // Don't show submit button if already submitted
          const alreadySubmitted = !!school.submittedTo;
          
          return (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleInspect(school)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Inspect
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 bg-white border-gray-200 text-sm"
                    disabled={alreadySubmitted} // Disable if already submitted
                  >
                    {alreadySubmitted ? "Submitted" : "Submit to"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Submit to:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {rolesByDepartment.map((roleInfo) => (
                    <DropdownMenuItem
                      key={roleInfo.id}
                      onClick={() => handleInspectionRole(school, roleInfo.role)}
                      disabled={!isEligibleRole(roleInfo.role)} // Only enable eligible roles
                      className={!isEligibleRole(roleInfo.role) ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                    >
                      {roleInfo.role.charAt(0).toUpperCase() + roleInfo.role.slice(1)}
                      {!isEligibleRole(roleInfo.role) && " (Not eligible)"}
                    </DropdownMenuItem>
                  ))}
                  {rolesByDepartment.length === 0 && (
                    <DropdownMenuItem disabled>
                      No roles available
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [loggedInUserRole, rolesByDepartment, inspections]
  );

  // Create table instance
  const table = useMantineReactTable({
    columns,
    data: assignedSchoolsData,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: "id", desc: false }],
    },
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
    },
    renderTopToolbarCustomActions: () => (
      <div className="text-lg font-semibold text-blue-600 flex items-center space-x-4">
        <span>Assigned Schools</span>
        {loggedInUserRole && (
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
            Logged in as: {loggedInUserRole.toUpperCase()}
          </span>
        )}
      </div>
    ),
  });

  // If data isn't loaded yet, show loading state
  if (!dataLoaded) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Loading team information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
        {currentTeam
          ? `Schools Assigned to ${currentTeam.name}`
          : "Your Team's Schools"}
      </h1>

      {isModalOpen && currentSchool && (
        <InspectionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSchoolIdentification={handleSchoolIdentification}
          handleSelfAssessment={handleSelfAssessment}
        />
      )}

      {!currentTeam ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No team information found.</p>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              Team Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Team Name:</p>
                <p className="font-medium">{currentTeam.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Members:</p>
                <ul className="list-disc list-inside">
                  {currentTeam.members &&
                    currentTeam.members.map((member) => (
                      <li key={member.id} className="text-sm">
                        {member.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600">Timeline:</p>
                <p className="text-sm">
                  {formatDate(currentTeam.createdAt)} -{" "}
                  {formatDate(currentTeam.endDate)}
                </p>
              </div>
            </div>
          </div>

          {assignedSchoolsData.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No schools assigned to your team</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg shadow">
              <MantineReactTable table={table} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeamSchoolsPage;