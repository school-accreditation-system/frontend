'use client';
import React, { useState } from 'react';

const CertificateVerificationPage = () => {
  // State for the certificate ID input
  const [certificateId, setCertificateId] = useState('');
  // State for storing the certificate details
  const [certificate, setCertificate] = useState(null);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error message
  const [error, setError] = useState('');
  // State for verification method
  const [verificationMethod, setVerificationMethod] = useState('id');

  // Mock data for demonstration - in a real app, this would come from an API
  const mockCertificates = {
    'CERT-SEC-2025-001': {
      institutionName: 'Excellence Secondary School',
      certificateType: 'Full Accreditation',
      issuedDate: '2025-01-15',
      expiryDate: '2030-01-14',
      level: 'Secondary',
      address: '123 Education Avenue, Capital City',
      director: 'Dr. Jane Smith',
      status: 'Valid',
      verificationQR: 'https://example.com/qr/CERT-SEC-2025-001'
    },
    'CERT-PRI-2025-002': {
      institutionName: 'Bright Future Primary School',
      certificateType: 'Provisional Accreditation',
      issuedDate: '2025-02-10',
      expiryDate: '2027-02-09',
      level: 'Primary',
      address: '456 Learning Street, Education District',
      director: 'Prof. John Doe',
      status: 'Valid',
      verificationQR: 'https://example.com/qr/CERT-PRI-2025-002'
    },
    'CERT-TVT-2024-003': {
      institutionName: 'Technical Skills Institute',
      certificateType: 'Full Accreditation',
      issuedDate: '2024-11-20',
      expiryDate: '2029-11-19',
      level: 'TVET',
      address: '789 Vocational Road, Industrial Zone',
      director: 'Dr. Robert Johnson',
      status: 'Valid',
      verificationQR: 'https://example.com/qr/CERT-TVT-2024-003'
    },
    'CERT-ORD-2023-004': {
      institutionName: 'Community Ordinary School',
      certificateType: 'Full Accreditation',
      issuedDate: '2023-09-05',
      expiryDate: '2023-09-04',
      level: 'Ordinary',
      address: '101 Community Lane, Rural District',
      director: 'Ms. Sarah Williams',
      status: 'Expired',
      verificationQR: 'https://example.com/qr/CERT-ORD-2023-004'
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset states
    setCertificate(null);
    setError('');
    
    // Validate input
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    // Show loading state
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const foundCertificate = mockCertificates[certificateId];
      
      if (foundCertificate) {
        setCertificate(foundCertificate);
      } else {
        setError('Certificate not found. Please check the ID and try again.');
      }
      
      setIsLoading(false);
    }, 800);
  };

  // Function to handle file upload for QR code
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setCertificate(null);

    // In a real application, you would process the QR code image here
    // For this demo, we'll just simulate finding a certificate after a delay
    setTimeout(() => {
      // Randomly select a certificate for demonstration
      const certificateIds = Object.keys(mockCertificates);
      const randomId = certificateIds[Math.floor(Math.random() * certificateIds.length)];
      setCertificate(mockCertificates[randomId]);
      setCertificateId(randomId);
      setIsLoading(false);
    }, 1500);
  };

  // Status badge component with color coding
  const StatusBadge = ({ status }) => {
    const colorClass = status === 'Valid' ? 'bg-green-500' : 'bg-red-500';
    
    return (
      <span className={`${colorClass} text-white px-3 py-1 rounded-full text-sm font-medium`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-600 py-6 px-6">
          <h1 className="text-2xl font-bold text-white">Certificate Verification</h1>
          <p className="text-green-100 mt-1">Verify the authenticity of school accreditation certificates</p>
        </div>
        
        <div className="px-6 py-8">
          {/* Verification Method Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Verification Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  verificationMethod === 'id'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setVerificationMethod('id')}
              >
                Certificate ID
              </button>
              <button
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  verificationMethod === 'qr'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setVerificationMethod('qr')}
              >
                QR Code Scan
              </button>
            </div>
          </div>
          
          {/* Certificate ID Form */}
          {verificationMethod === 'id' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certificateId">
                  Certificate ID
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="certificateId"
                    className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2 border"
                    placeholder="Enter certificate ID (e.g., CERT-SEC-2025-001)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </form>
          )}
          
          {/* QR Code Upload Form */}
          {verificationMethod === 'qr' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload QR Code Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="qr-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="qr-upload"
                        name="qr-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isLoading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {isLoading && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">Processing QR code...</p>
                </div>
              )}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          )}
          
          {/* Display Certificate Results */}
          {certificate && (
            <div className="mt-8 border rounded-lg overflow-hidden">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Certificate Information</h3>
                <StatusBadge status={certificate.status} />
              </div>
              <div className="px-6 py-5 divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Institution Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.institutionName}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Certificate Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.certificateType}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Level</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.level}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Issued Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.issuedDate}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Expiry Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.expiryDate}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.address}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Director</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificate.director}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{certificateId}</dd>
                </div>
                <div className="py-4">
                  <div className="flex justify-end space-x-3">
                    <a
                      href="#"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                    >
                      Print Verification
                    </a>
                    <a
                      href="#"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Info Panel */}
          {!certificate && !isLoading && (
            <div className="mt-8 bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    Enter a certificate ID or upload a QR code to verify the authenticity of a school accreditation certificate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sample IDs for Testing */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="font-medium text-gray-900">Sample Certificate IDs for Testing:</h3>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Secondary (Valid)</p>
              <p className="text-sm">CERT-SEC-2025-001</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Primary (Provisional)</p>
              <p className="text-sm">CERT-PRI-2025-002</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">TVET (Valid)</p>
              <p className="text-sm">CERT-TVT-2024-003</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs font-medium text-gray-500">Ordinary (Expired)</p>
              <p className="text-sm">CERT-ORD-2023-004</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerificationPage;