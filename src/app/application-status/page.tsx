'use client';
import React, { useState } from 'react';

const AccreditationStatusPage = () => {
  // State for the application ID input
  const [applicationId, setApplicationId] = useState('');
  // State for storing the application status
  const [status, setStatus] = useState(null);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error message
  const [error, setError] = useState('');
  // State for school type selection
  const [schoolType, setSchoolType] = useState('secondary');

  // Mock data for demonstration - in a real app, this would come from an API
  const mockApplications = {
    'SEC123': { type: 'secondary', status: 'Approved', date: '2025-03-15', comments: 'All requirements met' },
    'PRI456': { type: 'primary', status: 'Pending', date: '2025-03-20', comments: 'Waiting for facility inspection' },
    'ORD789': { type: 'ordinary', status: 'Rejected', date: '2025-03-10', comments: 'Insufficient documentation' },
    'TVT101': { type: 'tvet', status: 'Under Review', date: '2025-03-25', comments: 'Staff credentials being verified' }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset states
    setStatus(null);
    setError('');
    
    // Validate input
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const application = mockApplications[applicationId];
      
      if (application) {
        setStatus(application);
      } else {
        setError('Application not found. Please check the ID and try again.');
      }
      
      setIsLoading(false);
    }, 800);
  };

  // Status badge component with color coding
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    
    switch (status) {
      case 'Approved':
        bgColor = 'bg-green-500';
        break;
      case 'Pending':
        bgColor = 'bg-yellow-500';
        break;
      case 'Rejected':
        bgColor = 'bg-red-500';
        break;
      case 'Under Review':
        bgColor = 'bg-blue-500';
        break;
      default:
        bgColor = 'bg-gray-500';
    }
    
    return (
      <span className={`${bgColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-6 px-6">
          <h1 className="text-2xl font-bold text-white">School Accreditation System</h1>
          <p className="text-indigo-100 mt-1">Check your application status</p>
        </div>
        
        <div className="px-6 py-8">
        
          
          {/* Application ID Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="applicationId">
                Application ID
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
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
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Checking...' : 'Check Status'}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </form>
          
          {/* Display Status Results */}
          {status && (
            <div className="mt-8 border rounded-lg overflow-hidden">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Application Status</h3>
                <StatusBadge status={status.status} />
              </div>
              <div className="px-6 py-5 divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Application ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{applicationId}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">School Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{status.type}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{status.date}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Comments</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{status.comments}</dd>
                </div>
                <div className="py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => window.print()}
                    >
                      Print Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Info Panel */}
          {!status && !isLoading && (
            <div className="mt-8 bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    Enter your application ID to check the status of your school accreditation application.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sample IDs for testing */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="font-medium text-gray-900">Sample IDs for Testing:</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Secondary</p>
              <p className="text-sm">SEC123</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Primary</p>
              <p className="text-sm">PRI456</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Ordinary</p>
              <p className="text-sm">ORD789</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
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