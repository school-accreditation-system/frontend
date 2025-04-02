import { z } from "zod";

// Basic Info Schema
export const basicInfoSchema = z.object({
  schoolName: z.string().min(3, { message: "School name is required" }).max(100, { message: "School name should be less than 100 characters" }),
  schoolCode: z.string().min(1, { message: "School code is required" }).max(10, { message: "School code should be less than 10 characters" }),
  schoolEmail: z.string().email({ message: "Please enter a valid email" }).max(100, { message: "School email should be less than 100 characters" }),
  status: z.enum(["public", "private", "Government Aided"], { 
    required_error: "Status is required" 
  }),
  typeOfSchool: z.enum(["TVET", "General Education"], { 
    required_error: "Type of school is required" 
  }),
  schoolOwner: z.string().min(1, { message: "School owner is required" }).max(100, { message: "School owner should be less than 100 characters" }),
  contact: z.string().min(10, { message: "Contact should be at least 10 digits" }).max(10, { message: "Contact should 10 digits" }),
  accommodationStatus: z.enum(["day", "boarding", "mixed"], { 
    required_error: "Accommodation status is required" 
  }),
  yearOfEstablishment: z.string().min(4, { message: "Year is required" }).max(4, { message: "Year should be 4 digits" }).max(4, { message: "Year should be 4 digits" })
});

// Location Details Schema
export const locationDetailsSchema = z.object({
  village: z.string().min(1, { message: "Village is required" }),
  cell: z.string().min(1, { message: "Cell is required" }),
  sector: z.string().min(1, { message: "Sector is required" }),
  district: z.string().min(1, { message: "District is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  latitude: z.string().min(1, { message: "Latitude is required" }).max(10, { message: "Latitude should be less than 10 characters" }),
  longitude: z.string().min(1, { message: "Longitude is required" }).max(10, { message: "Longitude should be less than 10 characters" })
});

// Head Teacher Schema
export const headTeacherSchema = z.object({
  htName: z.string().min(3, { message: "Head teacher name is required" }),
  qualification: z.string().min(2, { message: "Qualification is required" }),
  telephone: z.string().min(10, { message: "Telephone should be at least 10 digits" }).max(10, { message: "Telephone should be 10 digits" })
});

// Teaching Staff Schema
const teachingStaffBaseSchema = z.object({
  maleTotalTeachers: z.preprocess(
    // First preprocess to handle empty strings and convert to number
    (val) => {
      if (val === "" || val === null || val === undefined) return 0;
      const parsed = Number(val);
      return isNaN(parsed) ? 0 : parsed;
    },
    // Then validate as a number
    z.number().int().min(0, { message: "Value must be a positive number" }).max(10000, { message: "Value must be less than 10000" })
  ),
  femaleTotalTeachers: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return 0;
      const parsed = Number(val);
      return isNaN(parsed) ? 0 : parsed;
    },
    z.number().int().min(0, { message: "Value must be a positive number" }).max(10000, { message: "Value must be less than 10000" })
  ),
  maleAssistantTeachers: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return 0;
      const parsed = Number(val);
      return isNaN(parsed) ? 0 : parsed;
    },
    z.number().int().min(0, { message: "Value must be a positive number" }).max(10000, { message: "Value must be less than 10000" })
  ),
  femaleAssistantTeachers: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return 0;
      const parsed = Number(val);
      return isNaN(parsed) ? 0 : parsed;
    },
    z.number().int().min(0, { message: "Value must be a positive number" }).max(10000, { message: "Value must be less than 10000" })
  )
});

// Teaching Staff Schema
export const teachingStaffSchema = teachingStaffBaseSchema
  .refine(
    data => {
      const totalTeachers = data.maleTotalTeachers + data.femaleTotalTeachers;
      const totalAssistantTeachers = data.maleAssistantTeachers + data.femaleAssistantTeachers;
      return totalAssistantTeachers <= totalTeachers;
    },
    {
      message: "Total assistant teachers cannot exceed total teachers",
      path: ["maleAssistantTeachers"]
    }
  )
  .refine(
    data => {
      return data.femaleAssistantTeachers <= data.femaleTotalTeachers;
    },
    {
      message: "Female assistant teachers cannot exceed total female teachers",
      path: ["femaleAssistantTeachers"]
    }
  )
  .refine(
    data => {
      return data.maleAssistantTeachers <= data.maleTotalTeachers;
    },
    {
      message: "Male assistant teachers cannot exceed total male teachers",
      path: ["maleAssistantTeachers"]
    }
  );

// Supporting Staff Schema
export const supportingStaffSchema = z.object({
  cleaners: z.coerce.number().int().min(0, { message: "Value must be a positive number" }),
  watchmen: z.coerce.number().int().min(0, { message: "Value must be a positive number" }),
  schoolCooks: z.coerce.number().int().min(0, { message: "Value must be a positive number" }),
  storekeeper: z.coerce.number().int().min(0, { message: "Value must be a positive number" }),
  drivers: z.coerce.number().int().min(0, { message: "Value must be a positive number" }),
  otherSupportingStaff: z.string().optional()
});

// Student Information Schema
export const studentInfoSchema = z.object({
  numBoys: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numGirls: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numStudentsWithSEN: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" })
});

// Infrastructure Schema
export const infrastructureSchema = z.object({
  numClassrooms: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numLatrines: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numKitchens: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numDiningHalls: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numLibraries: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numSmartClassrooms: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numComputerLabs: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numAdminOffices: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numMultipurposeHalls: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" }),
  numAcademicStaffRooms: z.string()
    .refine(val => !isNaN(parseInt(val, 10)), { message: "Must be a valid number" })
    .refine(val => parseInt(val, 10) >= 0, { message: "Must be a positive number" })
});

// Combined Schema for all steps
export const schoolIdentificationSchema = z.object({
  ...basicInfoSchema.shape,
  ...locationDetailsSchema.shape,
  ...studentInfoSchema.shape,
  ...teachingStaffBaseSchema.shape,
  ...supportingStaffSchema.shape,
  ...infrastructureSchema.shape
});

// Types derived from schemas
export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type LocationDetailsFormValues = z.infer<typeof locationDetailsSchema>;
export type HeadTeacherFormValues = z.infer<typeof headTeacherSchema>;
export type StudentInfoFormValues = z.infer<typeof studentInfoSchema>;
export type TeachingStaffFormValues = z.infer<typeof teachingStaffSchema>;
export type SupportingStaffFormValues = z.infer<typeof supportingStaffSchema>;
export type SchoolIdentificationFormValues = z.infer<typeof schoolIdentificationSchema>;
export type InfrastructureFormValues = z.infer<typeof infrastructureSchema>; 