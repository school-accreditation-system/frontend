"use client"
import Table from "@/components/inspection-plan/_components/Table";
import React, { useState, useEffect } from "react";

// Sample inspection data
const INSPECTIONS_DATA = [
  {
    id: 1,
    teamName: "Kayonza",
    inspectionDate: "2023-10-01",
    inspectionType: "Annual",
    inspectionStatus: "Completed",
  },
  {
    id: 2,
    teamName: "Rubavi",
    inspectionDate: "2023-10-15",
    inspectionType: "Follow-up",
    inspectionStatus: "Pending",
  },
  {
    id: 3,
    teamName: "Gasabo",
    inspectionDate: "2023-11-05",
    inspectionType: "Special",
    inspectionStatus: "In Progress",
  },
  {
    id: 4,
    teamName: "Nyarugenge",
    inspectionDate: "2023-11-20",
    inspectionType: "Annual",
    inspectionStatus: "Scheduled",
  },
  {
    id: 5,
    teamName: "Nyaruguru",
    inspectionDate: "2023-12-03",
    inspectionType: "Follow-up",
    inspectionStatus: "Completed",
  },
];

const page = () => {

  const [data, setData] = useState(INSPECTIONS_DATA);
  
  useEffect(() => {

    setData(INSPECTIONS_DATA);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Inspections</h1>
      {data ? <Table data={data} /> : <p>Loading inspection data...</p>}
    </div>
  );
};

export default page;