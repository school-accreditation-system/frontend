import { useCallback } from "react";

export interface UseStudentSummaryProps {
  numBoys: number | string;
  numGirls: number | string;
  numStudentsWithSEN: number | string;
}

export const useStudentSummary = ({
  numBoys = 0,
  numGirls = 0,
  numStudentsWithSEN = 0
}: UseStudentSummaryProps) => {
  
  // Parse values to ensure we're working with numbers
  const parsedBoys = typeof numBoys === 'string' 
    ? parseInt(numBoys, 10) || 0 
    : numBoys;
  
  const parsedGirls = typeof numGirls === 'string' 
    ? parseInt(numGirls, 10) || 0 
    : numGirls;
  
  const parsedSEN = typeof numStudentsWithSEN === 'string' 
    ? parseInt(numStudentsWithSEN, 10) || 0 
    : numStudentsWithSEN;

  // Calculate total students
  const calculateTotalStudents = useCallback(() => {
    return parsedBoys + parsedGirls;
  }, [parsedBoys, parsedGirls]);

  return {
    totalStudents: calculateTotalStudents(),
    boys: parsedBoys,
    girls: parsedGirls,
    studentsWithSEN: parsedSEN
  };
}; 