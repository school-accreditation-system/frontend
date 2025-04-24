'use client';

import { SummaryCard } from './SummaryCard';
import { useStaffSummary } from '../hooks/useStaffSummary';

interface StaffSummaryProps {
  maleTotalTeachers: number | string;
  femaleTotalTeachers: number | string;
  maleAssistantTeachers: number | string;
  femaleAssistantTeachers: number | string;
}

export const StaffSummary = ({
  maleTotalTeachers,
  femaleTotalTeachers,
  maleAssistantTeachers,
  femaleAssistantTeachers
}: StaffSummaryProps) => {
  const { 
    totalTeachers, 
    maleTeachers, 
    femaleTeachers, 
    assistantTeachers 
  } = useStaffSummary({
    maleTotalTeachers,
    femaleTotalTeachers,
    maleAssistantTeachers,
    femaleAssistantTeachers
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
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
            className="text-blue-600"
          >
            <circle cx="12" cy="6" r="4"/>
            <path d="M20 17.5c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5S6.03 13 11 13s9 2.015 9 4.5z"/>
          </svg>
        </div>
        <h3 className="text-xl font-medium">Staff Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Teachers" 
          count={totalTeachers} 
          textColor="text-gray-800"
        />
        
        <SummaryCard 
          title="Male Teachers" 
          count={maleTeachers} 
          textColor="text-blue-600"
        />
        
        <SummaryCard 
          title="Female Teachers" 
          count={femaleTeachers} 
          textColor="text-pink-600"
        />
        
        <SummaryCard 
          title="Assistant Teachers" 
          count={assistantTeachers} 
          textColor="text-green-600"
        />
      </div>
    </div>
  );
}; 