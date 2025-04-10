"use client";
import React, { useState, useEffect } from 'react';

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

const page = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedSchools, setAssignedSchools] = useState({});
  const [selectedSchools, setSelectedSchools] = useState([]);

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

  // Open modal for school assignment
  const handleAssignSchools = (team) => {
    setCurrentTeam(team);
    // Initialize selected schools with any already assigned to this team
    setSelectedSchools(assignedSchools[team.id] || []);
    setShowModal(true);
  };

  // Toggle school selection
  const toggleSchoolSelection = (schoolId) => {
    setSelectedSchools(prev => {
      if (prev.includes(schoolId)) {
        return prev.filter(id => id !== schoolId);
      } else {
        return [...prev, schoolId];
      }
    });
  };

  // Save school assignments
  const handleSaveAssignments = () => {
    // Update assigned schools
    const updatedAssignments = {
      ...assignedSchools,
      [currentTeam.id]: selectedSchools
    };
    
    // Save to localStorage
    localStorage.setItem('assignedSchools', JSON.stringify(updatedAssignments));
    setAssignedSchools(updatedAssignments);
    
    // Close modal
    setShowModal(false);
    setCurrentTeam(null);
  };

  // Get school names for display
  const getSchoolNamesByIds = (schoolIds) => {
    return schoolIds
      .map(id => schoolsData.find(school => school.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">Team Inspection Assignment</h1>
      
      {teams.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No teams found. Please create teams first.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Team ID</th>
                <th className="py-3 px-4 text-left">Team Name</th>
                <th className="py-3 px-4 text-left">Members</th>
                <th className="py-3 px-4 text-left">StartDate</th>
                <th className="py-3 px-4 text-left">EndDate</th>
                <th className="py-3 px-4 text-left">Assigned Schools</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{team.id}</td>
                  <td className="py-3 px-4 font-medium">{team.name}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc list-inside text-sm">
                      {team.members.map(member => (
                        <li key={member.id}>{member.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 text-sm">{formatDate(team.createdAt)}</td>
                  <td className="py-3 px-4 text-sm">20/09/2025</td>
                  <td className="py-3 px-4">
                    {assignedSchools[team.id]?.length > 0 ? (
                      <span className="text-sm">
                        {getSchoolNamesByIds(assignedSchools[team.id])}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">No schools assigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleAssignSchools(team)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Assign Schools
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* School Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
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

export default page;