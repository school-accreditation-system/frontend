"use client";
import React from "react";


// Success modal component
const SuccessModal = ({ isOpen, applicationId, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 bg-opacity-50 transition-opacity"></div>
      
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 overflow-hidden transform transition-all">
        {/* Success Icon */}
        <div className="bg-green-500 p-6 flex justify-center">
          <div className="rounded-full bg-white p-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-500" 
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
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-2">Application Successful!</h3>
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-3">
              Your TVET trade application has been successfully submitted.
            </p>
            <p className="text-gray-600">
              We have sent a confirmation email with your application details.
            </p>
            
            {/* Application ID */}
            <div className="mt-6 mb-6 p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-500 mb-1">Application ID</p>
              <p className="font-mono font-bold text-lg">{applicationId}</p>
              <p className="text-xs text-gray-500 mt-1">
                Please save this ID for future reference
              </p>
            </div>
          </div>
          
          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessModal;