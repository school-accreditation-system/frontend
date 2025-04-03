export interface AccreditationField {
  id: string;
  name: string;
  color?: string;
}

export interface SchoolBase {
  id: string;
  name: string;
  address?: string;
  province?: string;
  district?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface AccreditedSchool extends SchoolBase {
  accreditationFields?: AccreditationField[];
  accreditationStatus?: string;
  lastAccreditationDate?: string;
  nextReviewDate?: string;
}

export interface AccreditedSchoolDTO {
  schoolName: string;
  schoolEmail: string | null;
  schoolPhoneNumber: string | null;
  accrediateDate: string;
  combinationShortName: string;
}

export interface ProcessedSchool {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  combinations: Array<{
    name: string;
    accrediatationDate: string;
    fullName: string;
  }>;
}
