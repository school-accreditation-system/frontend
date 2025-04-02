export interface School {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  schoolIdentification: boolean;
  selfAssessment: boolean;
  hasOrdinaryLevel?: boolean;
  hasAdvancedLevel?: boolean;
  hasBoardingStatus?: boolean;
}

export interface SchoolFinderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSchoolSelect: (school: School) => void;
  title?: string;
  description?: string;
}

export interface SchoolSearchStepProps {
  onSchoolSelect: (school: School) => void;
  onStartVerification: (email: string, school: School) => void;
  closeDialog: () => void;
}

export interface VerifyOtpStepProps {
  email: string;
  onVerify: (school: School) => void;
  onBack: () => void;
}

export interface SchoolRegistrationFormData {
  name: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  email: string;
  phone: string;
  htName: string;
  htEmail: string;
  qualification: "Diploma A2" | "Associate Degree" | "Bachelor's Degree" | "Master's Degree" | "PhD";
  telephone: string;
} 