/* eslint-disable max-lines */
"use client";
import { Table } from "@/components/Table/Table";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data - in a real application, this would come from your API/database
const inspectionData = [
  { month: "Jan", completed: 5, pending: 2, total: 7 },
  { month: "Feb", completed: 8, pending: 3, total: 11 },
  { month: "Mar", completed: 12, pending: 4, total: 16 },
  { month: "Apr", completed: 9, pending: 2, total: 11 },
  { month: "May", completed: 7, pending: 5, total: 12 },
  { month: "Jun", completed: 14, pending: 1, total: 15 },
];

const schoolTypes = [
  { name: "Science", value: 8 },
  { name: "MPC", value: 5 },
  { name: "Liberal Arts", value: 4 },
  { name: "Technical", value: 6 },
  { name: "International", value: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
          name: "Inspection Team Alpha",
          members: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Robert Johnson" },
          ],
          createdAt: "2023-01-15",
        };

        setCurrentTeam(team);

        // Calculate statistics from inspection data
        const total = inspectionData.reduce((sum, item) => sum + item.total, 0);
        const completed = inspectionData.reduce(
          (sum, item) => sum + item.completed,
          0
        );
        const pending = inspectionData.reduce(
          (sum, item) => sum + item.pending,
          0
        );

        setTotalInspections(total);
        setCompletedInspections(completed);
        setPendingInspections(pending);
        setAverageScore(85.7); // Mock average score
      } catch (error) {
        console.error("Error loading team data:", error);
      }
    };

    loadTeamData();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Add recent inspections data structure
  const recentInspections = [
    {
      schoolName: "College Saint Andre",
      date: "June 10, 2023",
      status: "Completed",
      score: "92%",
      inspector: "John Doe",
    },
    {
      schoolName: "Lycée de Kigali",
      date: "June 8, 2023",
      status: "Completed",
      score: "88%",
      inspector: "Jane Smith",
    },
    {
      schoolName: "FAWE Girls School",
      date: "June 15, 2023",
      status: "Pending",
      score: "-",
      inspector: "Robert Johnson",
    },
    {
      schoolName: "Green Hills Academy",
      date: "June 5, 2023",
      status: "Completed",
      score: "95%",
      inspector: "John Doe",
    },
  ];

  // Define columns for the recent inspections table
  const recentInspectionsColumns = useMemo(
    () => [
      {
        key: "schoolName",
        header: "School Name",
        render: (value: string) => <span className="font-medium">{value}</span>,
      },
      {
        key: "date",
        header: "Date",
      },
      {
        key: "status",
        header: "Status",
        render: (value: string) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              value === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: "score",
        header: "Score",
      },
      {
        key: "inspector",
        header: "Inspector",
      },
    ],
    []
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary text-center">
        Inspector Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Inspections */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Inspections
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalInspections}</p>
          <p className="text-green-500 text-sm">
            All assigned school inspections
          </p>
        </div>

        {/* Completed */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {completedInspections}
          </p>
          <p className="text-green-500 text-sm">
            {Math.round((completedInspections / totalInspections) * 100)}%
            completion rate
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
          <p className="text-3xl font-bold text-orange-500">
            {pendingInspections}
          </p>
          <p className="text-orange-500 text-sm">Scheduled for completion</p>
        </div>

        {/* Average Score */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Average Score</h3>
          <p className="text-3xl font-bold text-blue-600">{averageScore}%</p>
          <p className="text-primary text-sm">Across all inspections</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inspections Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Inspections Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={inspectionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#2563eb"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="pending" stroke="#ea580c" />
                <Line type="monotone" dataKey="total" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* School Types Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            School Types Distribution
          </h3>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Inspections
        </h3>
        <Table
          data={recentInspections}
          columns={recentInspectionsColumns}
          emptyStateMessage="No recent inspections found"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
