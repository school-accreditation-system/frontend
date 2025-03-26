'use client';
import { useStudentSummary } from '../hooks/useStudentSummary';
import { SummaryCard } from './SummaryCard';

interface StudentSummaryProps {
  numBoys: number | string;
  numGirls: number | string;
  numStudentsWithSEN: number | string;
}

export const StudentSummary = ({
  numBoys,
  numGirls,
  numStudentsWithSEN
}: StudentSummaryProps) => {
  const { 
    totalStudents, 
    boys, 
    girls, 
    studentsWithSEN 
  } = useStudentSummary({
    numBoys,
    numGirls,
    numStudentsWithSEN
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg">
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
            className="text-indigo-600"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3 className="text-xl font-medium">Student Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Students" 
          count={totalStudents} 
          textColor="text-gray-800"
        />
        
        <SummaryCard 
          title="Boys" 
          count={boys} 
          textColor="text-blue-600"
        />
        
        <SummaryCard 
          title="Girls" 
          count={girls} 
          textColor="text-pink-600"
        />
        
        <SummaryCard 
          title="Students with SEN" 
          count={studentsWithSEN} 
          textColor="text-purple-600"
        />
      </div>
    </div>
  );
}; 