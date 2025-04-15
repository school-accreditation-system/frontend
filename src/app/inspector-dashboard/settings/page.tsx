"use client";
import { useEffect, useState } from 'react';

const SimpleSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [settings, setSettings] = useState({
    // User
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '0788123456',
    role: 'Administrator',
  });

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Get current date
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header with date and title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Profile</h1>
        <span className="text-sm bg-blue-50 text-blue-500 py-1 px-3 rounded-full">{today}</span>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        {/* Profile Info at Top */}
        <div className="bg-blue-50 p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              {settings.name.charAt(0)}
            </div>
            <div className="ml-3">
              <h2 className="font-medium text-blue-600">{settings.name}</h2>
              <p className="text-sm text-blue-400">{settings.role}</p>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {settings.name}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {settings.email}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {settings.phone}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {settings.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSettingsPage;