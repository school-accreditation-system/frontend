import { useCallback } from "react";

export interface UseStaffSummaryProps {
  maleTotalTeachers: number | string;
  femaleTotalTeachers: number | string;
  maleAssistantTeachers: number | string;
  femaleAssistantTeachers: number | string;
}

export const useStaffSummary = ({
  maleTotalTeachers = 0,
  femaleTotalTeachers = 0,
  maleAssistantTeachers = 0,
  femaleAssistantTeachers = 0
}: UseStaffSummaryProps) => {
  
  // Parse values to ensure we're working with numbers
  const parsedMaleTotal = typeof maleTotalTeachers === 'string' 
    ? parseInt(maleTotalTeachers, 10) || 0 
    : maleTotalTeachers;
  
  const parsedFemaleTotal = typeof femaleTotalTeachers === 'string' 
    ? parseInt(femaleTotalTeachers, 10) || 0 
    : femaleTotalTeachers;
  
  const parsedMaleAssistant = typeof maleAssistantTeachers === 'string' 
    ? parseInt(maleAssistantTeachers, 10) || 0 
    : maleAssistantTeachers;
  
  const parsedFemaleAssistant = typeof femaleAssistantTeachers === 'string' 
    ? parseInt(femaleAssistantTeachers, 10) || 0 
    : femaleAssistantTeachers;

  // Calculate total teachers
  const calculateTotalTeachers = useCallback(() => {
    return parsedMaleTotal + parsedFemaleTotal;
  }, [parsedMaleTotal, parsedFemaleTotal]);

  // Calculate total assistant teachers
  const calculateTotalAssistantTeachers = useCallback(() => {
    return parsedMaleAssistant + parsedFemaleAssistant;
  }, [parsedMaleAssistant, parsedFemaleAssistant]);

  return {
    totalTeachers: calculateTotalTeachers(),
    maleTeachers: parsedMaleTotal,
    femaleTeachers: parsedFemaleTotal,
    assistantTeachers: calculateTotalAssistantTeachers()
  };
}; 