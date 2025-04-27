"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data - in a real application, this would come from your API/database
const inspectionData = [
  { month: 'Jan', completed: 5, pending: 2, total: 7 },
  { month: 'Feb', completed: 8, pending: 3, total: 11 },
  { month: 'Mar', completed: 12, pending: 4, total: 16 },
  { month: 'Apr', completed: 9, pending: 2, total: 11 },
  { month: 'May', completed: 7, pending: 5, total: 12 },
  { month: 'Jun', completed: 14, pending: 1, total: 15 },
];

const schoolTypes = [
  { name: 'Science', value: 8 },
  { name: 'MPC', value: 5 },
  { name: 'Liberal Arts', value: 4 },
  { name: 'Technical', value: 6 },
  { name: 'International', value: 3 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardPage = () => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [totalInspections, setTotalInspections] = useState(0);
  const [completedInspections, setCompletedInspections] = useState(0);
  const [pendingInspections, setPendingInspections] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    // Simulate loading team data
    // In a real app, you would fetch this from API or localStorage
    const loadTeamData = () => {
      try {
        // Mock data for demonstration
        const team = {
          id: 1,
          name: "Team Nyanza",
          members: [
            { id: 1, name: "Tuyishime Aline" },
            { id: 2, name: "Uwase Marie" },
            { id: 3, name: "Mukashyaka Diane" },
          ],
          createdAt: "2023-01-15"
        };
        
        setCurrentTeam(team);
        
        // Calculate statistics from inspection data
        const total = inspectionData.reduce((sum, item) => sum + item.total, 0);
        const completed = inspectionData.reduce((sum, item) => sum + item.completed, 0);
        const pending = inspectionData.reduce((sum, item) => sum + item.pending, 0);
        
        setTotalInspections(total);
        setCompletedInspections(completed);
        setPendingInspections(pending);
        setAverageScore(85.7); // Mock average score
      } catch (error) {
        console.error('Error loading team data:', error);
      }
    };

    loadTeamData();
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-500 text-center">Inspector Dashboard</h1>
      
      {/* Team Information */}
      {currentTeam && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Team Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Team Name:</p>
              <p className="font-medium">{currentTeam.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Members:</p>
              <ul className="list-disc list-inside">
                {currentTeam.members.map(member => (
                  <li key={member.id} className="text-sm">{member.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Since:</p>
              <p className="text-sm">
                {new Date(currentTeam.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Inspections */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Inspections</h3>
          <p className="text-3xl font-bold text-blue-600">{totalInspections}</p>
          <p className="text-green-500 text-sm">All assigned school inspections</p>
        </div>
        
        {/* Completed */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{completedInspections}</p>
          <p className="text-green-500 text-sm">{Math.round((completedInspections/totalInspections)*100)}% completion rate</p>
        </div>
        
        {/* Pending */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
          <p className="text-3xl font-bold text-orange-500">{pendingInspections}</p>
          <p className="text-orange-500 text-sm">Scheduled for completion</p>
        </div>
        
        {/* Average Score */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Average Score</h3>
          <p className="text-3xl font-bold text-blue-600">{averageScore}%</p>
          <p className="text-blue-500 text-sm">Across all inspections</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inspections Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Inspections Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inspectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#2563eb" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pending" stroke="#ea580c" />
                <Line type="monotone" dataKey="total" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* School Types Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">School Types Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {schoolTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Inspections */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Inspections</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">School Name</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Score</th>
                <th className="py-2 px-4 text-left">Inspector</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4 font-medium">College Saint Andre</td>
                <td className="py-2 px-4">June 10, 2023</td>
                <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                <td className="py-2 px-4">92%</td>
                <td className="py-2 px-4">John Doe</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4 font-medium">Lycée de Kigali</td>
                <td className="py-2 px-4">June 8, 2023</td>
                <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                <td className="py-2 px-4">88%</td>
                <td className="py-2 px-4">Jane Smith</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4 font-medium">FAWE Girls School</td>
                <td className="py-2 px-4">June 15, 2023</td>
                <td className="py-2 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Pending</span></td>
                <td className="py-2 px-4">-</td>
                <td className="py-2 px-4">Robert Johnson</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4 font-medium">Green Hills Academy</td>
                <td className="py-2 px-4">June 5, 2023</td>
                <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                <td className="py-2 px-4">95%</td>
                <td className="py-2 px-4">John Doe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;