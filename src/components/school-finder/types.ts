import { SchoolDTO, School as SchoolType} from "@/hooks/useSchool";

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
  selectedSchool: SchoolType;
}

export interface SchoolFinderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSchoolSelect: (school: School) => void;

  title?: string;
  description?: string;
}

export interface SchoolSearchStepProps {
  onSchoolSelect: (school: SchoolDTO) => void;
  onStartVerification: (email: string, school: SchoolDTO) => void;
  closeDialog?: () => void;
}

export interface VerifyOtpStepProps {
  email: string;
  onVerify: (school: School) => void;
  selectedSchool: School;
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
  qualification:
    | "Diploma A2"
    | "Associate Degree"
    | "Bachelor's Degree"
    | "Master's Degree"
    | "PhD";
  telephone: string;
}

export interface VerificationStepProps {
  email: string;
  school: SchoolDTO;
  onVerificationComplete: (otp: string) => void;
  onBack: () => void;
}

// Using SchoolDTO from our hooks instead of duplicating the type
export type School = SchoolDTO;
