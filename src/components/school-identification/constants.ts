import { BasicInfoForm } from "./steps/BasicInfoForm";
import { LocationDetailsForm } from "./steps/LocationDetailsForm";
import { HeadTeacherForm } from "./steps/HeadTeacherForm";
import { StudentInfoForm } from "./steps/StudentInfoForm";
import { TeachingStaffForm } from "./steps/TeachingStaffForm";
import { SupportingStaffForm } from "./steps/SupportingStaffForm";
import { InfrastructureForm } from "./steps/InfrastructureForm";
import { SummaryForm } from "./steps/SummaryForm";
import { 
  basicInfoSchema, 
  locationDetailsSchema,
  headTeacherSchema,
  studentInfoSchema,
  teachingStaffSchema, 
  supportingStaffSchema,
  infrastructureSchema 
} from "./types/schema";
import { Step } from "./types/step";

export const IDENTIFICATION_STEPS: Step[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Provide general information about your school',
    component: BasicInfoForm,
    validationSchema: basicInfoSchema,
  },
  {
    id: 'location-details',
    title: 'Location Details',
    description: 'Provide information about the school location',
    component: LocationDetailsForm,
    validationSchema: locationDetailsSchema,
  },
  {
    id: 'head-teacher',
    title: 'Head Teacher',
    description: 'Information about the school head teacher',
    component: HeadTeacherForm,
    validationSchema: headTeacherSchema,
  },
  {
    id: 'student-info',
    title: 'Student Information',
    description: 'Information about students enrolled in the school',
    component: StudentInfoForm,
    validationSchema: studentInfoSchema,
  },
  {
    id: 'teaching-staff',
    title: 'Teaching Staff',
    description: 'Information about teaching personnel',
    component: TeachingStaffForm,
    validationSchema: teachingStaffSchema,
  },
  {
    id: 'supporting-staff',
    title: 'Supporting Staff',
    description: 'Information about non-teaching personnel',
    component: SupportingStaffForm,
    validationSchema: supportingStaffSchema,
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Information about school facilities and infrastructure',
    component: InfrastructureForm,
    validationSchema: infrastructureSchema,
  },
  {
    id: 'summary',
    title: 'Summary',
    description: 'Review and submit information',
    component: SummaryForm,
  },
]; 