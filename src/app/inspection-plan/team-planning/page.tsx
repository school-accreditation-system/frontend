"use client";
import React, { useState, useMemo, useEffect } from "react";

const departmentsData = [
  {
    id: 1,
    name: "Analyst",
    description: "Department for analysis and research",
  },
  {
    id: 2,
    name: "Procurement",
    description: "Department for procurement and logistics",
  },
  {
    id: 3,
    name: "Data Management",
    description: "Department for database and information systems",
  },
  {
    id: 4,
    name: "Sponsor",
    description: "Department for sponsorships and fundraising",
  },
  {
    id: 5,
    name: "Senior Management",
    description: "Department for executive leadership",
  },
];

const employeesData = [
  {
    id: 1,
    name: "Uwimana Jean",
    position: "Senior Analyst",
    department: 1,
    phone: "0788123456",
  },
  {
    id: 2,
    name: "Mukamana Claire",
    position: "Administrative Assistant",
    department: 4,
    phone: "0799234567",
  },
  {
    id: 3,
    name: "Nsengimana Eric",
    position: "Project Coordinator",
    department: 1,
    phone: "0722345678",
  },
  {
    id: 4,
    name: "Nyiraneza Alice",
    position: "Data Analyst",
    department: 3,
    phone: "0733456789",
  },
  {
    id: 5,
    name: "Ndayisenga Patrick",
    position: "Program Director",
    department: 4,
    phone: "0788567890",
  },
  {
    id: 6,
    name: "Uwase Marie",
    position: "Procurement Officer",
    department: 2,
    phone: "0788678901",
  },
  {
    id: 7,
    name: "Nshimiyimana David",
    position: "IT Consultant",
    department: 2,
    phone: "0789789012",
  },
  {
    id: 8,
    name: "Mukashyaka Diane",
    position: "Assistant Database Manager",
    department: 3,
    phone: "0788890123",
  },
  {
    id: 9,
    name: "Habimana Jacques",
    position: "Director of Analytics",
    department: 1,
    phone: "0788901234",
  },
  {
    id: 10,
    name: "Uwimana Jeanne",
    position: "Executive Secretary",
    department: 4,
    phone: "0789012345",
  },
  {
    id: 11,
    name: "Ndagijimana Samuel",
    position: "Legal Advisor",
    department: 4,
    phone: "0789123456",
  },
  {
    id: 12,
    name: "Niyonzima Grace",
    position: "Operations Manager",
    department: 5,
    phone: "0788234567",
  },
  {
    id: 13,
    name: "Mugisha Thierry",
    position: "Lead Procurement Specialist",
    department: 2,
    phone: "0789345678",
  },
  {
    id: 14,
    name: "Tuyishime Aline",
    position: "Office Manager",
    department: 5,
    phone: "0788456789",
  },
  {
    id: 15,
    name: "Bizimana Claude",
    position: "Research Analyst",
    department: 1,
    phone: "0789567890",
  },
  {
    id: 16,
    name: "Uwase Clarisse",
    position: "Financial Advisor",
    department: 3,
    phone: "0788678901",
  },
  {
    id: 17,
    name: "Ngarambe Pascal",
    position: "Communications Specialist",
    department: 2,
    phone: "0789789012",
  },
  {
    id: 18,
    name: "Mukamana Yvonne",
    position: "Executive Assistant",
    department: 5,
    phone: "0788890123",
  },
  {
    id: 19,
    name: "Ngabo Robert",
    position: "Database Administrator",
    department: 3,
    phone: "0789901234",
  },
  {
    id: 20,
    name: "Niyigena Alphonsine",
    position: "Business Analyst",
    department: 1,
    phone: "0788012345",
  },
];

const TeamManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error", "success"
  const [teamName, setTeamName] = useState("");
  const [savedTeams, setSavedTeams] = useState([]);

  // Load saved teams from localStorage on component mount
  useEffect(() => {
    const loadSavedTeams = () => {
      try {
        const teamsJson = localStorage.getItem("teams");
        if (teamsJson) {
          const teams = JSON.parse(teamsJson);
          if (Array.isArray(teams)) {
            setSavedTeams(teams);
          }
        }
      } catch (error) {
        console.error("Error loading teams:", error);
      }
    };

    loadSavedTeams();
  }, []);

  // Clear message after timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Filter employees by selected department
  const filteredEmployees = useMemo(() => {
    if (!selectedDepartment) return [];
    return employeesData.filter(
      (employee) =>
        employee.department === selectedDepartment.id &&
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedDepartment, searchTerm]);

  // Get employee count by department
  const departmentCounts = useMemo(() => {
    const counts = {};
    departmentsData.forEach((dept) => {
      counts[dept.id] = employeesData.filter(
        // eslint-disable-next-line max-nested-callbacks
        (emp) => emp.department === dept.id
      ).length;
    });
    return counts;
  }, []);

  // Handle selecting a department
  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    // We're not clearing selectedEmployees to allow cross-department team building
  };

  // Handle selecting an employee - toggle selection with 3-employee limit
  const handleSelectEmployee = (employee) => {
    setSelectedEmployees((prevSelected) => {
      // Check if employee is already in the array
      const isAlreadySelected = prevSelected.some(
        (emp) => emp.id === employee.id
      );

      if (isAlreadySelected) {
        // If already selected, remove from array
        return prevSelected.filter((emp) => emp.id !== employee.id);
      } else {
        // Enforce 3-employee limit
        if (prevSelected.length >= 3) {
          setMessage("Teams can have a maximum of 3 employees");
          setMessageType("error");
          return prevSelected;
        }
        // If not selected and under limit, add to array
        return [...prevSelected, employee];
      }
    });
  };

  // Remove a single employee from selection
  const handleRemoveEmployee = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.filter((emp) => emp.id !== employeeId)
    );
  };

  // Clear all selected employees
  const handleClearAll = () => {
    setSelectedEmployees([]);
    setTeamName("");
  };

  // Save team to localStorage
  const handleSubmitTeam = () => {
    // Validate team
    if (selectedEmployees.length === 0) {
      setMessage("Please select at least one employee for the team");
      setMessageType("error");
      return;
    }

    if (selectedEmployees.length < 3) {
      setMessage("A team must have exactly 3 employees");
      setMessageType("error");
      return;
    }

    try {
      // Get existing teams from localStorage
      const teamsJson = localStorage.getItem("teams");
      let teams = [];

      if (teamsJson) {
        teams = JSON.parse(teamsJson);
        // Ensure teams is an array
        if (!Array.isArray(teams)) {
          teams = [];
        }
      }

      // Generate a unique ID for the new team
      const newId =
        teams.length > 0
          ? Math.max(...teams.map((team) => parseInt(team.id))) + 1
          : 1;

      // Create new team object
      const newTeam = {
        id: newId,
        name: teamName || `Team ${newId}`,
        createdAt: new Date().toISOString(),
        status: "pending",
        members: selectedEmployees,
      };

      // Add new team to the array
      teams.push(newTeam);

      // Save updated teams array to localStorage
      localStorage.setItem("teams", JSON.stringify(teams));

      // Update state
      setSavedTeams(teams);

      // Show success message
      setMessage("Team saved successfully!");
      setMessageType("success");

      // Reset form
      setSelectedEmployees([]);
      setTeamName("");
    } catch (error) {
      console.error("Error saving team:", error);
      setMessage("Failed to save team. Please try again.");
      setMessageType("error");
    }
  };

  // Delete a saved team
  const handleDeleteTeam = (teamId) => {
    try {
      const updatedTeams = savedTeams.filter((team) => team.id !== teamId);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      setSavedTeams(updatedTeams);
      setMessage("Team deleted successfully");
      setMessageType("success");
    } catch (error) {
      console.error("Error deleting team:", error);
      setMessage("Failed to delete team");
      setMessageType("error");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        Team Planning
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Departments list */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
            Departments
          </h2>
          <ul className="space-y-2">
            {departmentsData.map((department) => (
              <li key={department.id}>
                <button
                  onClick={() => handleSelectDepartment(department)}
                  className={`w-full text-left p-2 rounded-md flex justify-between items-center transition-colors ${
                    selectedDepartment?.id === department.id
                      ? "bg-primary text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  <span>{department.name}</span>
                  <span className="bg-blue-200 text-blue-800 rounded-full py-1 px-2 text-xs font-semibold">
                    {departmentCounts[department.id]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Employees in chosen department */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
            {selectedDepartment
              ? `Employees from ${selectedDepartment.name}`
              : "Choose Department"}
          </h2>

          {selectedDepartment && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredEmployees.length > 0 ? (
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredEmployees.map((employee) => (
                    <li key={employee.id}>
                      <button
                        onClick={() => handleSelectEmployee(employee)}
                        className={`w-full text-left p-2 rounded-md hover:bg-blue-50 transition-colors ${
                          selectedEmployees.some(
                            (emp) => emp.id === employee.id
                          )
                            ? "bg-blue-100 border border-blue-300"
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            {selectedEmployees.some(
                              (emp) => emp.id === employee.id
                            ) ? (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                                ✓
                              </div>
                            ) : (
                              <div className="w-5 h-5 border border-gray-300 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-600">
                              {employee.position}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  {searchTerm
                    ? "No employees found matching your search"
                    : "No employees in this department"}
                </div>
              )}
            </>
          )}

          {!selectedDepartment && (
            <div className="text-center text-gray-500 py-8">
              Select a department to see its employees
            </div>
          )}

          {/* Message display */}
          {message && (
            <div
              className={`mt-3 p-2 rounded-md text-sm font-medium ${
                messageType === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Selected employees list */}
        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold text-primary">
              Creating Team ({selectedEmployees.length}/3)
            </h2>
            {selectedEmployees.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>

          {selectedEmployees.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-blue-50 rounded-full px-3 py-1 flex items-center"
                >
                  <span className="mr-2">{employee.name}</span>
                  <button
                    onClick={() => handleRemoveEmployee(employee.id)}
                    className="text-gray-500 hover:text-red-500 text-sm font-bold"
                    aria-label="Remove employee"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No employees selected. Click on employees to add them to your
              team. Teams require exactly 3 members.
            </div>
          )}

          {selectedEmployees.length > 0 && (
            <div className="mt-4">
              <div className="p-3 bg-gray-50 rounded-md mb-4">
                <p className="font-medium">Team Summary:</p>
                <ul className="mt-2 text-sm text-gray-600">
                  <li>Total team members: {selectedEmployees.length}/3</li>
                  <li>
                    Departments represented:{" "}
                    {[
                      ...new Set(
                        selectedEmployees.map((emp) => {
                          const dept = departmentsData.find(
                            (d) => d.id === emp.department
                          );
                          return dept ? dept.name : "Unknown";
                        })
                      ),
                    ].join(", ")}
                  </li>
                  <li>
                    Positions:{" "}
                    {
                      [...new Set(selectedEmployees.map((emp) => emp.position))]
                        .length
                    }{" "}
                    different roles
                  </li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-grow">
                    <label
                      htmlFor="teamName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Team Name
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      placeholder="Enter team name..."
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSubmitTeam}
                    className={`px-4 py-2 rounded-md ${
                      selectedEmployees.length !== 3
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 text-white"
                    } transition-colors`}
                    disabled={selectedEmployees.length !== 3}
                  >
                    Save Team
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Saved Teams */}
        {savedTeams.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2 mt-4">
            <h2 className="text-xl font-semibold mb-4 text-primary border-b pb-2">
              Saved Teams ({savedTeams.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTeams.map((team) => (
                <div
                  key={team.id}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-blue-700">{team.name}</h3>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      aria-label="Delete team"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    Created: {new Date(team.createdAt).toLocaleDateString()}
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium">Members:</p>
                    <ul className="text-sm">
                      {team.members.map((member) => (
                        <li
                          key={member.id}
                          className="py-1 border-b border-gray-100 last:border-b-0"
                        >
                          {member.name} (
                          {
                            departmentsData.find(
                              (d) => d.id === member.department
                            )?.name
                          }
                          )
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
