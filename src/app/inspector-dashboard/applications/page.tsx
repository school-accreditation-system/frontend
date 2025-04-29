/* eslint-disable max-lines */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/Table/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InspectionModal from "./InspectionModal";

export const rankingScore = [
  { id: 1, name: "Outstanding", score: 89 },
  { id: 2, name: "Good", score: 73 },
  { id: 3, name: "Satisfactory", score: 63 },
  { id: 4, name: "Unsatisfactory", score: 47 },
];

// Sample school data - in a real app, this might come from an API
const schoolsData = [
  {
    id: 1,
    name: "College Saint Andre",
    district: "Kigali",
    type: "MPC",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 2,
    name: "Lycée de Kigali",
    district: "Kigali",
    type: "Science",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 3,
    name: "FAWE Girls School",
    district: "Gasabo",
    type: "Science",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 4,
    name: "Groupe Scolaire Officiel de Butare",
    district: "Huye",
    type: "Liberal Arts",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 5,
    name: "Ecole Technique Saint Joseph",
    district: "Muhanga",
    type: "Technical",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 6,
    name: "Green Hills Academy",
    district: "Kigali",
    type: "International",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 7,
    name: "Rwanda Leading Institute",
    district: "Kicukiro",
    type: "Engineering",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 8,
    name: "Riviera High School",
    district: "Gasabo",
    type: "Languages",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 9,
    name: "Wellspring Academy",
    district: "Nyarugenge",
    type: "Primary",
    ranking: "",
    score: "",
    applicationId: "",
  },
  {
    id: 10,
    name: "Kigali International Community School",
    district: "Kigali",
    type: "International",
    ranking: "",
    score: "",
    applicationId: "",
  },
];

// Role hierarchy
const initialRolesByDepartment = [
  { id: 1, role: "analyst", supervisor: "inspector", submittedRole: "" },
  { id: 2, role: "inspector", supervisor: "division", submittedRole: "" },
  { id: 3, role: "division", supervisor: "hod", submittedRole: "" },
  { id: 4, role: "hod", supervisor: "director", submittedRole: "" },
  { id: 5, role: "director", supervisor: "director", submittedRole: "" },
];
function generateApplicationId(schoolName, index) {
  // Extract initials from school name
  const initials = schoolName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // Format: [Initials]-[Year]-[Sequence Number padded to 3 digits]
  const year = new Date().getFullYear();
  const sequence = String(index + 1).padStart(3, "0");

  return `${initials}-${year}-${sequence}`;
}
// Initial inspections data structure
const initialInspections = schoolsData.map((school) => ({
  id: school.id,
  name: school.name,
  district: school.district,
  type: school.type,
  status: Math.random() > 0.5 ? "Completed" : "In Progress",
  submittedTo: "",
  approved: false,
  ranking: "",
  score: "",
  applicationId: generateApplicationId(school.name, school.id - 1),
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
  const [rolesByDepartment, setRolesByDepartment] = useState(
    initialRolesByDepartment
  );
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
        localStorage.setItem(
          "rolesByDepartment",
          JSON.stringify(initialRolesByDepartment)
        );
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
          // eslint-disable-next-line max-depth
          if (Array.isArray(parsedTeams)) {
            foundTeam = parsedTeams.find((team) => team.id === userData.teamId);
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

  useEffect(() => {
    const newInspections = localStorage.getItem("inspections");
    setInspections(JSON.parse(newInspections));
    console.log(newInspections);
  }, [router]);
  // Get the role hierarchy and determine which roles the current user can submit to
  const getEligibleRoles = () => {
    const allRoles = rolesByDepartment.map((r) => r.role);
    const currentRoleIndex = rolesByDepartment.findIndex(
      (r) => r.role === loggedInUserRole
    );

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
      const updatedInspections = inspections.map((inspection) => {
        console.log("Inspection", inspection); //null
        console.log("school", school);
        console.log("targetRole", targetRole);
        console.log("checking ", inspection.id === school.id);
        if (inspection?.id === school.id) {
          return {
            ...inspection,
            submittedTo: targetRole,
            status: "Submitted", // Optional: update status when submitted
          };
        }
        return inspection;
      });

      // 2. Update rolesByDepartment to track submission
      const updatedRoles = rolesByDepartment.map((role) => {
        if (role.role === targetRole) {
          return {
            ...role,
            submittedRole: loggedInUserRole, // Mark that this user submitted
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
      .filter((school) => assignedSchools.includes(school.id))
      .map((school) => {
        // Find corresponding inspection data
        const inspectionData =
          inspections.find((insp) => insp.id === school.id) || {};
        return {
          ...school,
          status: inspectionData.status || "Not Started",
          submittedTo: inspectionData.submittedTo || "",
          approved: inspectionData.approved || false,
          ranking: inspectionData.ranking,
          score: inspectionData.score,
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
        `/inspector-dashboard/school-identification?schoolId=${currentSchool.id}&combinationId=${currentSchool.type}&from=inspector-dashboard/applications`
      );
    }
  };

  const handleSelfAssessment = () => {
    setIsModalOpen(false);
    if (currentSchool) {
      router.push(
        `/inspector-dashboard/self-assessment?schoolId=${currentSchool.id}&combinationId=${currentSchool.type}&from=inspector-dashboard/applications`
      );
    }
  };

  // Update columns definition for the reusable Table component
  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "School ID",
      },
      {
        key: "name",
        header: "School Name",
      },
      {
        key: "district",
        header: "District",
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
        render: (value: string) => {
          let bgColor = "bg-gray-100";
          let textColor = "text-gray-700";

          switch (value) {
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
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        key: "submittedTo",
        header: "Submitted To",
        render: (value: string) => {
          return value ? (
            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              {value.toUpperCase()}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Not submitted</span>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        render: (_, school) => {
          const { allRoles, eligibleRoles } = getEligibleRoles();
          const alreadySubmitted = !!school.submittedTo;

          return (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleInspect(school)}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 text-sm"
              >
                Inspect
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 bg-white border-gray-200 text-sm"
                    disabled={alreadySubmitted}
                  >
                    {alreadySubmitted ? "Submitted" : "Submit to"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Submit to:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {rolesByDepartment
                    .filter((roleInfo) => isEligibleRole(roleInfo.role))
                    .map((roleInfo) => (
                      <DropdownMenuItem
                        key={roleInfo.id}
                        onClick={() =>
                          handleInspectionRole(school, roleInfo.role)
                        }
                        className="cursor-pointer"
                      >
                        {roleInfo.role.charAt(0).toUpperCase() +
                          roleInfo.role.slice(1)}
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
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
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
              <div className="p-4 border-b">
                <div className="text-lg font-semibold text-blue-600 flex items-center space-x-4">
                  <span>Assigned Schools</span>
                  {loggedInUserRole && (
                    <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
                      Logged in as: {loggedInUserRole.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <Table
                data={assignedSchoolsData}
                columns={columns}
                emptyStateMessage="No schools assigned to your team"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeamSchoolsPage;
