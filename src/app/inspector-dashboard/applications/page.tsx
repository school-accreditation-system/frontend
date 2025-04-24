"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InspectionModal from "./InspectionModal";

// Sample school data
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

const page = () => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedSchools, setAssignedSchools] = useState([]);
  const [schoolTeamAssignments, setSchoolTeamAssignments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // Load current user's team and its assigned schools from localStorage
  useEffect(() => {
    const loadCurrentUserTeam = () => {
      try {
        // Assuming user information with team ID is stored in localStorage
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const userData = JSON.parse(userJson);

          // Now load the team details
          const teamsJson = localStorage.getItem("teams");
          if (teamsJson) {
            const parsedTeams = JSON.parse(teamsJson);
            if (Array.isArray(parsedTeams)) {
              // Find the team that the current user belongs to (assuming teams have an id)
              const userTeam = parsedTeams.find(
                (team) => team.id === userData.teamId
              );
              if (userTeam) {
                setCurrentTeam(userTeam);
              }
            }
          }
        } else {
          // For testing/demo purposes - load the first team if no user is set
          // In a real application, you might redirect to login
          const teamsJson = localStorage.getItem("teams");
          if (teamsJson) {
            const parsedTeams = JSON.parse(teamsJson);
            if (Array.isArray(parsedTeams) && parsedTeams.length > 0) {
              setCurrentTeam(parsedTeams[0]);
            }
          }
        }
      } catch (error) {
        console.error("Error loading current user team:", error);
      }
    };

    // Load assigned schools for the current team
    const loadAssignedSchools = () => {
      try {
        const assignedJson = localStorage.getItem("assignedSchools");
        if (assignedJson) {
          const parsed = JSON.parse(assignedJson);

          // This will be updated once we know the current team
          if (currentTeam) {
            const teamSchools = parsed[currentTeam.id] || [];
            setAssignedSchools(teamSchools);

            // Create a mapping of schools to teams (just for the current team)
            const schoolToTeam = {};
            teamSchools.forEach((schoolId) => {
              schoolToTeam[schoolId] = currentTeam.id;
            });
            setSchoolTeamAssignments(schoolToTeam);
          }
        }
      } catch (error) {
        console.error("Error loading assigned schools:", error);
      }
    };

    loadCurrentUserTeam();

    // Second useEffect to load schools after current team is set
  }, []);

  // This effect runs when currentTeam changes
  useEffect(() => {
    if (currentTeam) {
      try {
        const assignedJson = localStorage.getItem("assignedSchools");
        if (assignedJson) {
          const parsed = JSON.parse(assignedJson);
          const teamSchools = parsed[currentTeam.id] || [];
          setAssignedSchools(teamSchools);
        }
      } catch (error) {
        console.error("Error loading assigned schools for team:", error);
      }
    }
  }, [currentTeam]);

  // Filter schools based on search term AND only show schools assigned to the current team
  const filteredSchools = schoolsData.filter(
    (school) =>
      // Only include schools assigned to current user's team
      assignedSchools.includes(school.id) &&
      // Apply search filter
      (school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };

  const handleInspection = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSchoolIdentification = () => {
    router.push(
      "/inspector-dashboard/school-identification?from=inspector-dashboard/applications"
    );
  };
  const handleSelfAssessment = () => {
    router.push(
      '/inspector-dashboard/self-assessment?from="inspector-dashboard/applications"'
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
        {currentTeam
          ? `Schools Assigned to ${currentTeam.name}`
          : "Your Team's Schools"}
      </h1>
      {isModalOpen && (
        <InspectionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSchoolIdentification={handleSchoolIdentification}
          handleSelfAssessment={handleSelfAssessment}
        />
      )}
      {!currentTeam ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">
            No team information found. Please log in or contact an
            administrator.
          </p>
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
                  {currentTeam.createdAt && formatDate(currentTeam.createdAt)} -
                  {currentTeam.endDate
                    ? formatDate(currentTeam.endDate)
                    : "20/09/2025"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search schools..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">School ID</th>
                  <th className="py-3 px-4 text-left">School Name</th>
                  <th className="py-3 px-4 text-left">District</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr key={school.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{school.id}</td>
                    <td className="py-3 px-4 font-medium">{school.name}</td>
                    <td className="py-3 px-4">{school.district}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {school.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center space-x-4">
                      <button
                        onClick={handleInspection}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Inspect
                      </button>
                      <button  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Submit</button>
                    </td>
                  </tr>
                ))}

                {filteredSchools.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      {assignedSchools.length === 0
                        ? "No schools assigned to your team"
                        : "No schools match your search criteria"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
