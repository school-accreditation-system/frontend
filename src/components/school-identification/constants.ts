import { BasicInfoForm } from "./steps/BasicInfoForm";
import { LocationDetailsForm } from "./steps/LocationDetailsForm";
import { HeadTeacherForm } from "./steps/HeadTeacherForm";
import { AdministrativeStaffForm } from "./steps/AdministrativeStaffForm";
import { StudentInfoForm } from "./steps/StudentInfoForm";
import { TeachingStaffForm } from "./steps/TeachingStaffForm";
import { SupportingStaffForm } from "./steps/SupportingStaffForm";
import { InfrastructureForm } from "./steps/InfrastructureForm";
import { SummaryForm } from "./steps/SummaryForm";
import { 
  basicInfoSchema, 
  locationDetailsSchema,
  studentInfoSchema,
  teachingStaffSchema, 
  supportingStaffSchema,
  infrastructureSchema,
  // headTeacherSchema,
  administrativeStaffSchema
} from "./types/schema";
import { Step } from "./types/step";

export interface IdentificationStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  validationSchema: any;
}

export const IDENTIFICATION_STEPS: IdentificationStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Enter general information about the school',
    component: BasicInfoForm,
    validationSchema: basicInfoSchema
  },
  {
    id: 'location-details',
    title: 'Location Details',
    description: 'Provide the school\'s geographical location',
    component: LocationDetailsForm,
    validationSchema: locationDetailsSchema
  },
  // {
  //   id: 'head-teacher',
  //   title: 'Head Teacher',
  //   description: 'Enter details about the school\'s head teacher',
  //   component: HeadTeacherForm,
  //   validationSchema: headTeacherSchema
  // },
  {
    id: 'administrative-staff',
    title: 'Administrative Staff',
    description: 'Enter details about the school\'s administrative staff',
    component: AdministrativeStaffForm,
    validationSchema: administrativeStaffSchema
  },
  {
    id: 'student-info',
    title: 'Student Information',
    description: 'Enter the number of students by gender and special needs',
    component: StudentInfoForm,
    validationSchema: studentInfoSchema
  },
  {
    id: 'teaching-staff',
    title: 'Teaching Staff',
    description: 'Enter details about the school\'s teaching staff',
    component: TeachingStaffForm,
    validationSchema: teachingStaffSchema
  },
  {
    id: 'supporting-staff',
    title: 'Supporting Staff',
    description: 'Enter details about the school\'s supporting staff',
    component: SupportingStaffForm,
    validationSchema: supportingStaffSchema
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Enter details about the school\'s infrastructure',
    component: InfrastructureForm,
    validationSchema: infrastructureSchema
  },
  {
    id: 'summary',
    title: 'Summary',
    description: 'Review and submit information',
    component: SummaryForm,
  },
]; 