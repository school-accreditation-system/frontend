/* eslint-disable max-lines */
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Sample inspection data - in a real app, you would fetch this from an API
const SAMPLE_INSPECTION = {
  id: 3,
  teamName: "Team Gamma",
  inspectionDate: "2023-11-05",
  completedDate: "2023-11-07",
  inspectionType: "Special",
  inspectionStatus: "Completed",
  school: {
    id: 4,
    name: "Groupe Scolaire Officiel de Butare",
    district: "Huye",
    type: "Liberal Arts",
    address: "123 Education Avenue, Huye District",
    contactPerson: "Emmanuel Ndayisaba",
    contactPhone: "+250 78 123 4567"
  },
  inspectors: [
    { id: 5, name: "Alice Mugisha", role: "Lead Inspector" },
    { id: 8, name: "Jean Paul Habimana", role: "Technical Inspector" },
    { id: 12, name: "Marie Claire Uwamahoro", role: "Education Specialist" }
  ],
  categories: [
    {
      name: "Infrastructure",
      score: 85,
      comments: "Buildings are generally in good condition. The school needs minor repairs to the roof of the science block.",
      recommendations: "Schedule maintenance for the science block roof before the rainy season."
    },
    {
      name: "Teaching Quality",
      score: 92,
      comments: "High standard of teaching observed across most subjects. Teachers are well-prepared and engaging.",
      recommendations: "Consider peer teaching opportunities to share best practices."
    },
    {
      name: "Learning Materials",
      score: 78,
      comments: "Adequate textbooks for most subjects, but library resources are outdated. Science lab equipment is insufficient.",
      recommendations: "Update library with current materials and invest in additional lab equipment."
    },
    {
      name: "Administration",
      score: 88,
      comments: "Well-organized administrative processes. Records are properly maintained and accessible.",
      recommendations: "Implement digital record-keeping system for improved efficiency."
    }
  ],
  overallScore: 85.75,
  notes: "The school shows significant improvement from the previous inspection. Administration and teaching quality are particular strengths. Focus areas for improvement include updating learning materials and maintaining infrastructure.",
  followUpRequired: true,
  followUpDate: "2024-05-10"
};

const InspectionDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the specific inspection by ID
    // const fetchInspection = async () => {
    //   try {
    //     const response = await fetch(`/api/inspections/${params.id}`);
    //     const data = await response.json();
    //     setInspection(data);
    //   } catch (error) {
    //     console.error("Error fetching inspection details:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setInspection(SAMPLE_INSPECTION);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [params]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Inspection not found. The requested inspection may have been deleted or does not exist.</p>
          <button 
            onClick={() => router.back()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Inspection #{inspection.id}
          </h1>
          <p className="text-gray-600">
            {inspection.school.name} • {formatDate(inspection.inspectionDate)}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          {inspection.inspectionStatus !== 'Completed' && (
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Inspection
            </button>
          )}
        </div>
      </div>

      {/* Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Status</h2>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(inspection.inspectionStatus)}`}>
              {inspection.inspectionStatus}
            </span>
            {inspection.inspectionStatus === 'Completed' && (
              <span className="ml-2 text-gray-600">
                on {formatDate(inspection.completedDate)}
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Type</h2>
          <p className="text-xl font-medium">{inspection.inspectionType}</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Overall Score</h2>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-blue-600">{inspection.overallScore}%</span>
            <span className="ml-2 text-gray-500 text-sm pb-1">
              {inspection.overallScore >= 90 ? 'Excellent' : 
               inspection.overallScore >= 80 ? 'Good' :
               inspection.overallScore >= 70 ? 'Satisfactory' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - School & Team Information */}
        <div className="lg:col-span-1">
          {/* School Information */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">School Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{inspection.school.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p>{inspection.school.district}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p>{inspection.school.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>{inspection.school.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p>{inspection.school.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Phone</p>
                <p>{inspection.school.contactPhone}</p>
              </div>
            </div>
          </div>
          
          {/* Inspection Team */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inspection Team</h2>
            <p className="text-gray-600 mb-3">Team: <span className="font-medium">{inspection.teamName}</span></p>
            <div className="space-y-4">
              {inspection.inspectors.map(inspector => (
                <div key={inspector.id} className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {inspector.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{inspector.name}</p>
                    <p className="text-sm text-gray-600">{inspector.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Follow-Up Information */}
          {inspection.followUpRequired && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Follow-Up Required</h2>
              <p className="text-yellow-800 mb-2">
                A follow-up inspection has been scheduled.
              </p>
              <p className="font-medium">
                Date: {formatDate(inspection.followUpDate)}
              </p>
            </div>
          )}
        </div>
        
        {/* Right Column - Assessment Categories & Notes */}
        <div className="lg:col-span-2">
          {/* Assessment Categories */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment Categories</h2>
            
            <div className="space-y-6">
              {inspection.categories.map((category, index) => (
                <div key={index} className="border-b pb-5 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <span className="text-xl font-bold text-blue-700">{category.score}</span>
                      </div>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Observations</h4>
                      <p className="text-gray-700">{category.comments}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Recommendations</h4>
                      <p className="text-gray-700">{category.recommendations}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notes</h2>
            <p className="text-gray-700 whitespace-pre-line">{inspection.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetailPage;