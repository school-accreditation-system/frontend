"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';

// Import the shadcn/ui components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Make sure you have this utility
import  DatePicker  from "./DatePicker"; 

// Sample school data
const schoolsData = [
  { id: 1, name: "College Saint Andre", district: "Kigali", type: "MPC" },
  { id: 2, name: "Lycée de Kigali", district: "Kigali", type: "Science" },
  { id: 3, name: "FAWE Girls School", district: "Gasabo", type: "Science" },
  { id: 4, name: "Groupe Scolaire Officiel de Butare", district: "Huye", type: "Liberal Arts" },
  { id: 5, name: "Ecole Technique Saint Joseph", district: "Muhanga", type: "Technical" },
  { id: 6, name: "Green Hills Academy", district: "Kigali", type: "International" },
  { id: 7, name: "Rwanda Leading Institute", district: "Kicukiro", type: "Engineering" },
  { id: 8, name: "Riviera High School", district: "Gasabo", type: "Languages" },
  { id: 9, name: "Wellspring Academy", district: "Nyarugenge", type: "Primary" },
  { id: 10, name: "Kigali International Community School", district: "Kigali", type: "International" },
];

// Define the type for team and assignment data
type TeamMember = {
  id: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
  status:string;
  members: TeamMember[];
  createdAt: string;
};

type TeamAssignment = {
  schoolIds: number[];
  startDate: string;
  endDate: string;
};

type AssignedSchools = {
  [teamId: number]: TeamAssignment;
};



const TeamAssignmentPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedSchools, setAssignedSchools] = useState<AssignedSchools>({});
  const [selectedSchools, setSelectedSchools] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Load teams from localStorage
  useEffect(() => {
    const loadTeams = () => {
      try {
        const teamsJson = localStorage.getItem('teams');
        if (teamsJson) {
          const parsedTeams = JSON.parse(teamsJson);
          if (Array.isArray(parsedTeams)) {
            setTeams(parsedTeams);
          }
        }
      } catch (error) {
        console.error('Error loading teams:', error);
      }
    };

    // Load assigned schools from localStorage
    const loadAssignedSchools = () => {
      try {
        const assignedJson = localStorage.getItem('assignedSchools');
        if (assignedJson) {
          const parsed = JSON.parse(assignedJson);
          setAssignedSchools(parsed || {});
        }
      } catch (error) {
        console.error('Error loading assigned schools:', error);
      }
    };

    loadTeams();
    loadAssignedSchools();
  }, []);

  // Filter schools based on search term
  const filteredSchools = schoolsData.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignSchools = (team: Team) => {
    if (!team || typeof team.id !== 'number') {
      console.error('Invalid team provided to handleAssignSchools');
      return;
    }
  
    setCurrentTeam(team);
    
    try {
      // Get existing assignments with proper type checking
      const teamAssignment = assignedSchools[team.id] || {};
      
      // Safely extract school IDs with proper array check
      let schoolIds: number[] = [];
      if (teamAssignment.schoolIds && Array.isArray(teamAssignment.schoolIds)) {
        schoolIds = teamAssignment.schoolIds;
      }
      setSelectedSchools(schoolIds);
      
      // Set both dates consistently with sensible defaults
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Properly parse dates with error handling
      try {
        setStartDate(teamAssignment.startDate ? new Date(teamAssignment.startDate) : today);
      } catch (e) {
        console.error('Error parsing start date, using default', e);
        setStartDate(today);
      }
      
      try {
        setEndDate(teamAssignment.endDate ? new Date(teamAssignment.endDate) : tomorrow);
      } catch (e) {
        console.error('Error parsing end date, using default', e);
        setEndDate(tomorrow);
      }
    } catch (error) {
      console.error('Error preparing school assignments form:', error);
      // Set safe defaults
      setSelectedSchools([]);
      setStartDate(new Date());
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 1)));
    }
    
    setShowModal(true);
  }
  // Toggle school selection
  const toggleSchoolSelection = (schoolId: number) => {
    setSelectedSchools(prev => {
      if (prev.includes(schoolId)) {
        return prev.filter(id => id !== schoolId);
      } else {
        return [...prev, schoolId];
      }
    });
  };

  const handleSaveAssignments = () => {
    try {
      // Validate current team
      if (!currentTeam || typeof currentTeam.id !== 'number') {
        alert("Invalid team selection");
        return;
      }
      
      // Validate dates exist and are valid Date objects
      if (!startDate || !(startDate instanceof Date) || isNaN(startDate.getTime())) {
        alert("Please select a valid start date");
        return;
      }
      
      if (!endDate || !(endDate instanceof Date) || isNaN(endDate.getTime())) {
        alert("Please select a valid end date");
        return;
      }
      
      // Validate date range
      if (startDate >= endDate) {
        alert("End date must be after start date");
        return;
      }
      
      // Validate schools selection
      if (!Array.isArray(selectedSchools) || selectedSchools.length === 0) {
        alert("Please select at least one school");
        return;
      }
      
      // Update assigned schools with dates
      const updatedAssignments = {
        ...assignedSchools,
        [currentTeam.id]: {
          schoolIds: selectedSchools,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      };
      
      // Save to localStorage with error handling
      try {
        localStorage.setItem('assignedSchools', JSON.stringify(updatedAssignments));
        setAssignedSchools(updatedAssignments);
        
        // Close modal and reset form state
        setShowModal(false);
        setCurrentTeam(null);
        setSelectedSchools([]);
        setStartDate(null);
        setEndDate(null);
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        alert("Failed to save assignments. Please try again.");
      }
    } catch (error) {
      console.error('Error in handleSaveAssignments:', error);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  // Get school names for display (used in tooltip or expanded view)
  const getSchoolNamesByIds = (schoolIds: number[]) => {
    if (!schoolIds || schoolIds.length === 0) {
      return '';
    }
    
    return schoolIds
      .map(id => schoolsData.find(school => school.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Transform teams data for MantineReactTable
  const tableData = useMemo(() => {
    return teams.map(team => {
      const teamAssignment = assignedSchools[team.id] || {};
      return {
        id: team.id,
        name: team.name,
        members: team.members,
        startDate: teamAssignment.startDate || '',
        endDate: teamAssignment.endDate || '',
        schoolIds: teamAssignment.schoolIds || [],
        schoolsCount: teamAssignment.schoolIds?.length || 0,
        schools: getSchoolNamesByIds(teamAssignment.schoolIds || []),
      };
    });
  }, [teams, assignedSchools]);

  // Define the columns for MantineReactTable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Team ID',
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Team Name',
        size: 180,
      },
      {
        accessorKey: 'members',
        header: 'Team Members',
        size: 200,
        Cell: ({ cell }) => {
          const members = cell.getValue<TeamMember[]>();
          return (
            <ul className="list-disc list-inside text-sm">
              {members.map(member => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        size: 130,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        size: 130,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
      },
      {
        accessorKey: 'schoolsCount',
        header: 'Schools Count',
        size: 120,
      },
      {
        accessorKey: 'schools',
        header: 'Assigned Schools',
        size: 80,
        Cell: ({ cell, row }) => {
          const schools = cell.getValue<string>();
          const count = row.original.schoolsCount;
          
          if (count === 0) {
            return <span className="text-gray-400 text-sm">No schools assigned</span>;
          }
          
          // Show first school and +X more if many schools
          const schoolsList = schools.split(', ');
          const firstSchool = schoolsList[0];
          
          if (schoolsList.length > 1) {
            return (
              <div className="text-sm">
                <span>{firstSchool}</span>
                <span className="ml-1 text-blue-500">
                  +{schoolsList.length - 1} more
                </span>
              </div>
            );
          }
          
          return <span className="text-sm">{schools}</span>;
        },
      },
      {

        header: 'Actions',
        size: 80,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Button
            onClick={() => handleAssignSchools(teams.find(t => t.id === row.original.id) as Team)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Assign Schools
          </Button>
        ),
      },
    ],
    [teams]
  );

  // Configure the Mantine React Table
  const table = useMantineReactTable({
    columns,
    data: tableData,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: 'id', desc: false }],
    },
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
    },
   
  });

  return (
    <div className="p-6  mx-auto">

      <h1 className="text-xl font-bold text-blue-500 py-6">Team Inspection Assignment</h1>


      {teams.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No teams found. Please create teams first.</p>
        </div>
      ) : (
        <MantineReactTable table={table} />
      )}

      {/* School Assignment Modal with Date Pickers */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-500">
                Assign Schools to {currentTeam?.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Date Range Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <DatePicker 
    date={startDate} 
    setDate={(date) => {
      if (date) {
        setStartDate(date);
        // If end date is null or before start date, set it to day after start date
        if (!endDate || date >= endDate) {
          const newEndDate = new Date(date);
          newEndDate.setDate(newEndDate.getDate() + 1);
          setEndDate(newEndDate);
        }
      } else {
        setStartDate(null);
      }
    }} 
    label="Inspection Start Date" 
  />
  <DatePicker 
    date={endDate} 
    setDate={(date) => {
      if (date) {
        // Only allow end dates after start date
        if (startDate && date <= startDate) {
          alert("End date must be after start date");
          return;
        }
        setEndDate(date);
      } else {
        setEndDate(null);
      }
    }} 
    label="Inspection End Date" 
  />
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

            <div className="border rounded-lg overflow-hidden mb-4">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Select</th>
                    <th className="py-2 px-4 text-left">School Name</th>
                    <th className="py-2 px-4 text-left">District</th>
                    <th className="py-2 px-4 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map((school) => (
                    <tr key={school.id} className="border-t hover:bg-blue-50">
                      <td className="py-2 px-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={selectedSchools.includes(school.id)}
                            onChange={() => toggleSchoolSelection(school.id)}
                          />
                        </label>
                      </td>
                      <td className="py-2 px-4 font-medium">{school.name}</td>
                      <td className="py-2 px-4">{school.district}</td>
                      <td className="py-2 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {school.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredSchools.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center text-gray-500">
                        No schools match your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedSchools.length} schools selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignments}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={!startDate || !endDate || selectedSchools.length === 0}
                >
                  Save Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAssignmentPage;