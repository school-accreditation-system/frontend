"use client";
import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  // State for different settings sections
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    appName: 'School Inspection System',
    language: 'en',
    darkMode: false,
    notificationsEnabled: true,
    autoSave: true
  });
  
  const [userSettings, setUserSettings] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '0788123456',
    role: 'Administrator',
    twoFactorAuth: false
  });
  
  const [inspectionSettings, setInspectionSettings] = useState({
    maxTeamSize: 3,
    inspectionPeriod: 'monthly',
    reportTemplate: 'standard',
    requirePhotos: true,
    allowOfflineInspections: true
  });
  
  const [reportSettings, setReportSettings] = useState({
    includePhotos: true,
    autoGenerateReport: true,
    signatureRequired: true,
    emailOnCompletion: true,
    reportFormat: 'pdf'
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        // Load general settings
        const savedGeneralSettings = localStorage.getItem('generalSettings');
        if (savedGeneralSettings) {
          setGeneralSettings(JSON.parse(savedGeneralSettings));
        }
        
        // Load user settings
        const savedUserSettings = localStorage.getItem('userSettings');
        if (savedUserSettings) {
          setUserSettings(JSON.parse(savedUserSettings));
        }
        
        // Load inspection settings
        const savedInspectionSettings = localStorage.getItem('inspectionSettings');
        if (savedInspectionSettings) {
          setInspectionSettings(JSON.parse(savedInspectionSettings));
        }
        
        // Load report settings
        const savedReportSettings = localStorage.getItem('reportSettings');
        if (savedReportSettings) {
          setReportSettings(JSON.parse(savedReportSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettings = (settingType, values) => {
    try {
      localStorage.setItem(`${settingType}Settings`, JSON.stringify(values));
      showNotification(`${settingType.charAt(0).toUpperCase() + settingType.slice(1)} settings saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${settingType} settings:`, error);
      showNotification(`Error saving settings. Please try again.`, 'error');
    }
  };

  // Handle form submission for general settings
  const handleGeneralSettingsSubmit = (e) => {
    e.preventDefault();
    saveSettings('general', generalSettings);
  };
  
  // Handle form submission for user settings
  const handleUserSettingsSubmit = (e) => {
    e.preventDefault();
    saveSettings('user', userSettings);
  };
  
  // Handle form submission for inspection settings
  const handleInspectionSettingsSubmit = (e) => {
    e.preventDefault();
    saveSettings('inspection', inspectionSettings);
  };
  
  // Handle form submission for report settings
  const handleReportSettingsSubmit = (e) => {
    e.preventDefault();
    saveSettings('report', reportSettings);
  };

  // Notification system
  const [notification, setNotification] = useState({ message: '', type: '' });
  
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // Helper for handling input changes
  const handleInputChange = (setter, field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">Application Settings</h1>
      
      {/* Notification */}
      {notification.message && (
        <div className={`mb-4 p-3 rounded-md ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Settings Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'general' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'user' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('user')}
          >
            User Profile
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'inspection' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('inspection')}
          >
            Inspection
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'report' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('report')}
          >
            Reports
          </button>
        </div>
        
        {/* Settings Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <form onSubmit={handleGeneralSettingsSubmit}>
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={generalSettings.appName}
                    onChange={(e) => handleInputChange(setGeneralSettings, 'appName', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={generalSettings.language}
                    onChange={(e) => handleInputChange(setGeneralSettings, 'language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="rw">Kinyarwanda</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkMode"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={generalSettings.darkMode}
                    onChange={(e) => handleInputChange(setGeneralSettings, 'darkMode', e.target.checked)}
                  />
                  <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                    Dark Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={generalSettings.notificationsEnabled}
                    onChange={(e) => handleInputChange(setGeneralSettings, 'notificationsEnabled', e.target.checked)}
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                    Enable Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoSave"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={generalSettings.autoSave}
                    onChange={(e) => handleInputChange(setGeneralSettings, 'autoSave', e.target.checked)}
                  />
                  <label htmlFor="autoSave" className="ml-2 block text-sm text-gray-700">
                    Auto-save Data
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500"
                >
                  Save General Settings
                </button>
              </div>
            </form>
          )}
          
          {/* User Profile Settings */}
          {activeTab === 'user' && (
            <form onSubmit={handleUserSettingsSubmit}>
              <h2 className="text-lg font-semibold mb-4">User Profile Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userSettings.name}
                    onChange={(e) => handleInputChange(setUserSettings, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userSettings.email}
                    onChange={(e) => handleInputChange(setUserSettings, 'email', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userSettings.phone}
                    onChange={(e) => handleInputChange(setUserSettings, 'phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userSettings.role}
                    onChange={(e) => handleInputChange(setUserSettings, 'role', e.target.value)}
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Inspector">Inspector</option>
                    <option value="Manager">Manager</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="twoFactor"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={userSettings.twoFactorAuth}
                    onChange={(e) => handleInputChange(setUserSettings, 'twoFactorAuth', e.target.checked)}
                  />
                  <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500"
                >
                  Save User Settings
                </button>
              </div>
            </form>
          )}
          
          {/* Inspection Settings */}
          {activeTab === 'inspection' && (
            <form onSubmit={handleInspectionSettingsSubmit}>
              <h2 className="text-lg font-semibold mb-4">Inspection Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={inspectionSettings.maxTeamSize}
                    onChange={(e) => handleInputChange(setInspectionSettings, 'maxTeamSize', parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inspection Period
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={inspectionSettings.inspectionPeriod}
                    onChange={(e) => handleInputChange(setInspectionSettings, 'inspectionPeriod', e.target.value)}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report Template
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={inspectionSettings.reportTemplate}
                    onChange={(e) => handleInputChange(setInspectionSettings, 'reportTemplate', e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="detailed">Detailed</option>
                    <option value="minimal">Minimal</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requirePhotos"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={inspectionSettings.requirePhotos}
                    onChange={(e) => handleInputChange(setInspectionSettings, 'requirePhotos', e.target.checked)}
                  />
                  <label htmlFor="requirePhotos" className="ml-2 block text-sm text-gray-700">
                    Require Photos for Inspections
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowOffline"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={inspectionSettings.allowOfflineInspections}
                    onChange={(e) => handleInputChange(setInspectionSettings, 'allowOfflineInspections', e.target.checked)}
                  />
                  <label htmlFor="allowOffline" className="ml-2 block text-sm text-gray-700">
                    Allow Offline Inspections
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500"
                >
                  Save Inspection Settings
                </button>
              </div>
            </form>
          )}
          
          {/* Report Settings */}
          {activeTab === 'report' && (
            <form onSubmit={handleReportSettingsSubmit}>
              <h2 className="text-lg font-semibold mb-4">Report Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includePhotos"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={reportSettings.includePhotos}
                    onChange={(e) => handleInputChange(setReportSettings, 'includePhotos', e.target.checked)}
                  />
                  <label htmlFor="includePhotos" className="ml-2 block text-sm text-gray-700">
                    Include Photos in Reports
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoReport"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={reportSettings.autoGenerateReport}
                    onChange={(e) => handleInputChange(setReportSettings, 'autoGenerateReport', e.target.checked)}
                  />
                  <label htmlFor="autoReport" className="ml-2 block text-sm text-gray-700">
                    Auto-Generate Reports
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="signature"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={reportSettings.signatureRequired}
                    onChange={(e) => handleInputChange(setReportSettings, 'signatureRequired', e.target.checked)}
                  />
                  <label htmlFor="signature" className="ml-2 block text-sm text-gray-700">
                    Require Digital Signature
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailReport"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                    checked={reportSettings.emailOnCompletion}
                    onChange={(e) => handleInputChange(setReportSettings, 'emailOnCompletion', e.target.checked)}
                  />
                  <label htmlFor="emailReport" className="ml-2 block text-sm text-gray-700">
                    Email Report on Completion
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report Format
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={reportSettings.reportFormat}
                    onChange={(e) => handleInputChange(setReportSettings, 'reportFormat', e.target.value)}
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX</option>
                    <option value="html">HTML</option>
                    <option value="xlsx">Excel</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500"
                >
                  Save Report Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;