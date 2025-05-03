import * as z from "zod";
export const schoolRegistrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "School name must be at least 3 characters")
    .max(255, "School name should be less than 255 characters"),
  province: z.string().trim().min(1, { message: "Province is required" }),
  district: z.string().trim().min(1, { message: "District is required" }),
  sector: z.string().trim().min(1, { message: "Sector is required" }),
  cell: z.string().trim().min(1, { message: "Cell is required" }),
  schoolShortName: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, { message: "School short name is required" })
    .max(10, { message: "School short name should be 10 characters" })
    .optional(),
  village: z.string().trim().min(1, { message: "Village is required" }),
  // email: z.string().trim().email('Please enter a valid email address'),
  // phone: z.string().trim().min(10, 'Please enter a valid phone number'),
  htFirstName: z
    .string()
    .trim()
    .min(3, { message: "Head teacher first name is required" })
    .max(255, "Head teacher first name should be less than 255 characters"),
  htLastName: z
    .string()
    .trim()
    .min(3, { message: "Head teacher last name is required" })
    .max(255, "Head teacher last name should be less than 255 characters"),
  htEmail: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, "Head teacher email should be less than 255 characters"),
  qualification: z.enum(
    [
      "Diploma A2",
      "Associate Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
    ],
    {
      required_error: "Qualification is required",
    }
  ),
  htPhone: z
    .string()
    .trim()
    .min(10, { message: "Telephone should be at least 10 digits" })
    .max(10, { message: "Telephone should be 10 digits" }),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Gender is required",
  }),
});

export type SchoolRegistrationFormData = z.infer<
  typeof schoolRegistrationSchema
>;
