"use client";

import { NavBar } from '@/components/navigation/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Settings,
  Upload,
  User
} from "lucide-react";

const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar/>
      <div className="container mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your school information and track your accreditation application
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <div className="p-2 sm:p-3 bg-blue-100 text-blue-700 rounded-lg">
                <Building size={24} className="sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-semibold truncate">Sample School Name</h2>
                <p className="text-xs sm:text-sm text-gray-500">ID: SCH-2023-0042 • Kigali, Rwanda</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="px-2 py-1 sm:px-3 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                Accreditation Pending
              </span>
              <span className="px-2 py-1 sm:px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                Secondary School
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 overflow-x-auto">
              <TabsTrigger value="overview" className="whitespace-nowrap text-xs sm:text-sm">
                <CheckCircle size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" /> 
                <span className="truncate">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="whitespace-nowrap text-xs sm:text-sm">
                <User size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" /> 
                <span className="truncate">School Profile</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="whitespace-nowrap text-xs sm:text-sm">
                <FileText size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" /> 
                <span className="truncate">Applications</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="whitespace-nowrap text-xs sm:text-sm">
                <Upload size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" /> 
                <span className="truncate">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="whitespace-nowrap text-xs sm:text-sm">
                <Settings size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" /> 
                <span className="truncate">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                  <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Clock size={16} className="sm:w-[18px] sm:h-[18px]" /> Application Status
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Documentation</span>
                      <span className="text-xs sm:text-sm font-medium text-green-600">Completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div className="bg-green-500 h-1.5 sm:h-2 rounded-full w-full"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Self Assessment</span>
                      <span className="text-xs sm:text-sm font-medium text-amber-600">In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div className="bg-amber-500 h-1.5 sm:h-2 rounded-full w-3/4"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Site Inspection</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-600">Pending</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div className="bg-gray-400 h-1.5 sm:h-2 rounded-full w-0"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Final Review</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-600">Pending</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div className="bg-gray-400 h-1.5 sm:h-2 rounded-full w-0"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                  <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" /> Upcoming Events
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-md">
                      <div className="p-1.5 sm:p-2 bg-blue-100 text-blue-700 rounded-md flex-shrink-0">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm">Self-Assessment Deadline</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">April 25, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-md">
                      <div className="p-1.5 sm:p-2 bg-green-100 text-green-700 rounded-md flex-shrink-0">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm">Site Inspection Scheduled</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">May 10, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" /> Required Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-amber-50 border border-amber-100 rounded-md">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                      <div className="p-1 sm:p-1.5 bg-amber-100 text-amber-700 rounded-md flex-shrink-0">
                        <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-amber-800">Complete self-assessment form</p>
                    </div>
                    <button className="w-full sm:w-auto px-2 sm:px-3 py-1 bg-white text-amber-700 border border-amber-200 rounded-md text-xs font-medium hover:bg-amber-50">
                      Complete Now
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                      <div className="p-1 sm:p-1.5 bg-blue-100 text-blue-700 rounded-md flex-shrink-0">
                        <Upload size={12} className="sm:w-3.5 sm:h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-blue-800">Upload facility safety certificates</p>
                    </div>
                    <button className="w-full sm:w-auto px-2 sm:px-3 py-1 bg-white text-blue-700 border border-blue-200 rounded-md text-xs font-medium hover:bg-blue-50">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="pt-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">School Profile Information</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Update your school s key information and details here.
                </p>
                {children}
              </div>
            </TabsContent>
            
            
            <TabsContent value="applications" className="pt-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Accreditation Applications</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white p-3 sm:p-4 rounded-md border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm">General Secondary Accreditation</h4>
                        <p className="text-[10px] sm:text-xs text-gray-500">Submitted: March 15, 2025</p>
                      </div>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-amber-100 text-amber-700 rounded-full self-start sm:self-auto">
                        In Review
                      </span>
                    </div>
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5">
                        <div className="bg-amber-500 h-1 sm:h-1.5 rounded-full w-1/2"></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] sm:text-xs text-gray-500">Submitted</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">Under Review</span>
                        <span className="text-[10px] sm:text-xs text-gray-500">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Documents & Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-md border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-blue-50 text-blue-600 rounded-md flex-shrink-0">
                        <FileText size={16} className="sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm truncate">School Registration Certificate</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Uploaded: Feb 10, 2025</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <Settings size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-md border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-green-50 text-green-600 rounded-md flex-shrink-0">
                        <FileText size={16} className="sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm truncate">Safety Compliance Report</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Uploaded: Mar 5, 2025</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <Settings size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">Account Settings</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Manage your school account settings and preferences.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Layout