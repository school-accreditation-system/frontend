"use client";
import { useState,,useEffect } from "react";
import { handlePrintCertificate } from "../verify-certificate/_components/printCertificate";

const AccreditationStatusPage = () => {
  // State for the application ID input
  const [applicationId, setApplicationId] = useState("");
  // State for storing the application status
  const [status, setStatus] = useState(null);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error message
  const [error, setError] = useState("");
  // State for school type selection

  // Load inspections from localStorage on component mount
  useEffect(() => {
    try {
      const savedInspections = localStorage.getItem("inspections");
      if (savedInspections) {
        const parsedInspections = JSON.parse(savedInspections);
        setInspections(parsedInspections);
        console.log("Loaded inspections:", parsedInspections);
      } else {
        console.log("No inspections found in localStorage");
      }
    } catch (error) {
      console.error("Error loading inspections from localStorage:", error);
    }
  }, []);

  // Function to map inspection status to a user-friendly status
  const mapStatusToDisplay = (inspectionStatus, approved) => {
    if (approved) return "Approved";

    switch (inspectionStatus?.toLowerCase()) {
      case "completed":
        return "Completed - Pending Approval";
      case "submitted":
        return "Under Review";
      case "in progress":
        return "In Progress";
      default:
        return inspectionStatus || "Pending";
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset states
    setStatus(null);
    setError("");

    // Validate input
    if (!applicationId.trim()) {
      setError("Please enter an application ID");
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Search in the inspections from localStorage
    setTimeout(() => {
      const foundInspection = inspections.find(
        (inspection) =>
          inspection.applicationId === applicationId ||
          // Fallback to case-insensitive search
          inspection.applicationId?.toLowerCase() ===
            applicationId.toLowerCase()
      );

      if (foundInspection) {
        // Found inspection in localStorage
        const mappedStatus = {
          type: foundInspection.type || "Not specified",
          status: mapStatusToDisplay(
            foundInspection.status,
            foundInspection.approved
          ),
          date:
            foundInspection.updatedAt || new Date().toISOString().split("T")[0],
          comments:
            foundInspection.comments ||
            (foundInspection.submittedTo
              ? `Submitted to ${foundInspection.submittedTo.toUpperCase()}`
              : "Under review by NESA staff"),
          ranking: foundInspection.ranking || null,
          score: foundInspection.score || null,
          schoolName: foundInspection.name,
          district: foundInspection.district,
          approved: foundInspection.approved,
          // Include original data for reference
          original: foundInspection,
        };

        setStatus(mappedStatus);
      } else {
        // Fallback to mock data for demonstration
        const mockApplication = mockApplications[applicationId];

        if (mockApplication) {
          setStatus(mockApplication);
        } else {
          setError("Application not found. Please check the ID and try again.");
        }
      }

      setIsLoading(false);
    }, 800);
  };

  // Mock data for demonstration - fallback if not found in localStorage
  const mockApplications = {
    SEC123: {
      type: "secondary",
      status: "Approved",
      date: "2025-03-15",
      comments: "All requirements met",
    },
    PRI456: {
      type: "primary",
      status: "Pending",
      date: "2025-03-20",
      comments: "Waiting for facility inspection",
    },
    ORD789: {
      type: "ordinary",
      status: "Rejected",
      date: "2025-03-10",
      comments: "Insufficient documentation",
    },
    TVT101: {
      type: "tvet",
      status: "Under Review",
      date: "2025-03-25",
      comments: "Staff credentials being verified",
    },
  };

  // Status badge component with color coding
  const StatusBadge = ({ status }) => {
    let bgColor = "";

    switch (status) {
      case "Approved":
        bgColor = "bg-green-500";
        break;
      case "Pending":
      case "In Progress":
        bgColor = "bg-yellow-500";
        break;
      case "Rejected":
        bgColor = "bg-red-500";
        break;
      case "Under Review":
      case "Completed - Pending Approval":
        bgColor = "bg-primary";
        break;
      default:
        bgColor = "bg-gray-500";
    }

    return (
      <span
        className={`${bgColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
      >
        {status}
      </span>
    );
  };

  // if(isLoading) return <h1>{generateQrCode()}</h1>

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-4 flex flex-col gap-4 cursor-default">
      <div className="max-w-3xl mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary p-4">
          <h1 className="text-2xl font-bold text-white">
            School Accreditation System
          </h1>
          <p className="text-indigo-100 text-lg">
            Check your application status
          </p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Application ID Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label
              className="block text-gray-700 text-base font-bold"
              htmlFor="applicationId"
            >
              Application ID
            </label>
            <div>
              <div className="flex gap-2 rounded-md">
                <input
                  type="text"
                  id="applicationId"
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                  placeholder="Enter your application ID"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md text-white bg-primary hover:hover:bg-primary/90 hover:cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="h-5 w-5 border-2 rounded-full border-t-transparent animate-spin" />
                  ) : (
                    "Check Status"
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </form>

          {/* Display Status Results */}
          {status && (
            <div className="border rounded-lg overflow-hidden">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Status
                </h3>
                <StatusBadge status={status.status} />
              </div>
              <div className="px-6 divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    School Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {status.schoolName || "Not available"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Application ID
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {applicationId}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    School Type
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                    {status.type}
                  </dd>
                </div>
                {status.district && (
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      District
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {status.district}
                    </dd>
                  </div>
                )}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Last Updated
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {status.date}
                  </dd>
                </div>
                {status.ranking && (
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Ranking
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {status.ranking}
                      {status.score && ` (Score: ${status.score})`}
                    </dd>
                  </div>
                )}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Comments
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {status.comments}
                  </dd>
                </div>
                {status.status === "Approved" && (
                  <div className="flex justify-end py-4">
                    <button
                      type="button"
                      className="flex justify-center items-center h-9 px-4 text-sm font-medium rounded-md text-white bg-primary hover:hover:bg-primary/90 hover:cursor-pointer"
                      onClick={() =>
                        handlePrintCertificate({
                          logo: "/nesalogo-removebg.png",
                          sealImage: "/accredited-logo.jpg",
                          waterMark: "/nesa-logo.png",
                          schoolName: "Ecole Primaire et Maternelle LADIVINE",
                          schoolType: "Primary Level Education",
                          issuerName: "Names...",
                          issuerPosition: "Director General",
                          validFromDate: "April 2025",
                          validToDate: "31st August 2026",
                          certificateNumber: "NESA/2025/0001",
                        })
                      }
                    >
                      Print Status
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info Panel */}
          {!status && !isLoading && (
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-primary">
                  Enter your application ID to check the status of your school
                  accreditation application.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sample IDs for testing */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden w-full">
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-medium text-gray-900">Sample IDs for Testing:</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-xs font-medium text-gray-500">Secondary</p>
              <p className="text-sm">SEC123</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-xs font-medium text-gray-500">Primary</p>
              <p className="text-sm">PRI456</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-xs font-medium text-gray-500">Ordinary</p>
              <p className="text-sm">ORD789</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <p className="text-xs font-medium text-gray-500">TVET</p>
              <p className="text-sm">TVT101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationStatusPage;
