'use client';

import { SummaryCard } from './SummaryCard';

interface InfrastructureSummaryProps {
  numClassrooms: number | string;
  numLatrines: number | string;
  numKitchens: number | string;
  numDiningHalls: number | string;
  numLibraries: number | string;
  numSmartClassrooms: number | string;
  numComputerLabs: number | string;
  numAdminOffices: number | string;
  numMultipurposeHalls: number | string;
  numAcademicStaffRooms: number | string;
}

export const InfrastructureSummary = ({
  numClassrooms = 0,
  numLatrines = 0,
  numKitchens = 0,
  numDiningHalls = 0,
  numLibraries = 0,
  numSmartClassrooms = 0,
  numComputerLabs = 0,
  numAdminOffices = 0,
  numMultipurposeHalls = 0,
  numAcademicStaffRooms = 0
}: InfrastructureSummaryProps) => {
  // Parse values to ensure we're working with numbers
  const parseValue = (value: number | string) => {
    if (typeof value === 'string') {
      return parseInt(value, 10) || 0;
    }
    return value;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-teal-100 p-2 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-teal-600"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-medium">Infrastructure Summary</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard 
          title="Classrooms" 
          count={parseValue(numClassrooms)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Latrines/Toilets" 
          count={parseValue(numLatrines)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Kitchens" 
          count={parseValue(numKitchens)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Dining Halls" 
          count={parseValue(numDiningHalls)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Libraries" 
          count={parseValue(numLibraries)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Smart Classrooms" 
          count={parseValue(numSmartClassrooms)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Computer Labs" 
          count={parseValue(numComputerLabs)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Admin Offices" 
          count={parseValue(numAdminOffices)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Multipurpose Halls" 
          count={parseValue(numMultipurposeHalls)} 
          textColor="text-teal-600"
        />
        
        <SummaryCard 
          title="Staff Rooms" 
          count={parseValue(numAcademicStaffRooms)} 
          textColor="text-teal-600"
        />
      </div>
    </div>
  );
}; 