"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for the dashboard
const inspectionData = [
  { month: "Jan", completed: 45, scheduled: 50, issues: 12 },
  { month: "Feb", completed: 52, scheduled: 60, issues: 18 },
  { month: "Mar", completed: 48, scheduled: 50, issues: 10 },
  { month: "Apr", completed: 60, scheduled: 65, issues: 15 },
  { month: "May", completed: 58, scheduled: 60, issues: 13 },
  { month: "Jun", completed: 70, scheduled: 75, issues: 20 },
  { month: "Jul", completed: 55, scheduled: 65, issues: 17 },
  { month: "Aug", completed: 63, scheduled: 65, issues: 14 },
  { month: "Sep", completed: 62, scheduled: 70, issues: 16 },
  { month: "Oct", completed: 72, scheduled: 75, issues: 19 },
  { month: "Nov", completed: 65, scheduled: 70, issues: 15 },
  { month: "Dec", completed: 50, scheduled: 60, issues: 13 },
];

// Current year stats
const currentYearStats = {
  totalInspections: 700,
  pendingInspections: 45,
  completedInspections: 655,
  totalSchools: 213,
  highRiskSchools: 32,
  mediumRiskSchools: 78,
  lowRiskSchools: 103,
  activeTeams: 24,
};

const DashboardPage = () => {
  const [chartPeriod, setChartPeriod] = useState("yearly");

  // Filter data based on selected period
  const getFilteredChartData = () => {
    if (chartPeriod === "quarterly") {
      return inspectionData.filter((_, index) => index % 3 === 0);
    }
    if (chartPeriod === "last6months") {
      return inspectionData.slice(6);
    }
    return inspectionData; // yearly - show all data
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Inspection Dashboard
      </h1>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Inspections</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentYearStats.totalInspections}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 font-medium">+8.2%</span>
            <span className="text-gray-500 ml-1">from last year</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentYearStats.completedInspections}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 font-medium">
              {Math.round(
                (currentYearStats.completedInspections /
                  currentYearStats.totalInspections) *
                  100
              )}
              %
            </span>
            <span className="text-gray-500 ml-1">completion rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentYearStats.pendingInspections}
              </h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-500 font-medium">
              {currentYearStats.pendingInspections}
            </span>
            <span className="text-gray-500 ml-1">inspections to complete</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">High Risk Schools</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentYearStats.highRiskSchools}
              </h3>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-500 font-medium">
              {Math.round(
                (currentYearStats.highRiskSchools /
                  currentYearStats.totalSchools) *
                  100
              )}
              %
            </span>
            <span className="text-gray-500 ml-1">of all schools</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Inspection Trends
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartPeriod("yearly")}
              className={`px-3 py-1 text-sm rounded-full ${
                chartPeriod === "yearly"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setChartPeriod("quarterly")}
              className={`px-3 py-1 text-sm rounded-full ${
                chartPeriod === "quarterly"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setChartPeriod("last6months")}
              className={`px-3 py-1 text-sm rounded-full ${
                chartPeriod === "last6months"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Last 6 Months
            </button>
          </div>
        </div>

        <div className="h-[60vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getFilteredChartData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="scheduled"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
              <Line type="monotone" dataKey="issues" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
