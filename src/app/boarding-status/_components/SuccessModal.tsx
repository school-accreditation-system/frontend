"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const SuccessModal = ({ setShowSuccessModal, selectedSchool }) => {
  const router = useRouter();
  const applicationId = `ORD-${Date.now().toString().slice(-8)}`;

  const handleClose = () => {
    setShowSuccessModal(false);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your Boarding Status application for {selectedSchool?.name} has been submitted successfully.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-500">Application ID</p>
            <p className="text-lg font-semibold">{applicationId}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Please save this application ID for future reference.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleClose}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleGoToDashboard}
              className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;