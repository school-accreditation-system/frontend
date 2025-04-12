// src/types/assessment.ts
export interface AssessmentOption {
  id: string;
  name: string;
  scare: number;
  scareWeight: number;
}

export interface AssessmentIndicator {
  id: string;
  name: string;
  indicatorNumber: string;
  standaryType: "INDICATOR";
  standard: AssessmentStandard;
  options: AssessmentOption[] | null;
}

export interface AssessmentStandard {
  id: string;
  name: string;
  indicatorNumber: string;
  standaryType: "CRITERIA" | "AREA";
  standard: AssessmentStandard | null;
  options: any | null;
}
