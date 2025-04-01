import { z } from "zod";

// Schema for school search
export const schoolSchema = z.object({
  schoolName: z.string().min(3, { message: "School name must be at least 3 characters" })
});

// Schema for staff email
export const staffSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

// Schema for OTP verification
export const otpSchema = z.object({
  otp: z.string()
    .min(6, { message: "Verification code must be 6 digits" })
    .max(6, { message: "Verification code must be 6 digits" })
    .regex(/^\d+$/, { message: "Verification code must contain only numbers" })
});

// Schema for staff login
export const staffLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

// Schema for staff signup
export const staffSignupSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^\+?[0-9\s\-()]+$/, { message: "Please enter a valid phone number" }),
//   department: z
//     .string()
//     .min(1, { message: "Please select a department" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Types for the schema
export type StaffLoginValues = z.infer<typeof staffLoginSchema>;
export type StaffSignupValues = z.infer<typeof staffSignupSchema>;

export type SchoolFormValues = z.infer<typeof schoolSchema>;
export type StaffFormValues = z.infer<typeof staffSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
