import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z
  .object({
    otp: z
      .string()
      .min(1, { message: "OTP is required" })
      .length(4, { message: "OTP must be of 4 digits" })
      .regex(/^\d{4}$/, { message: "OTP must be a 4 digit number" }),
    newPassword: z
      .string()
      .min(1, { message: "New password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Confirm new password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const addProgramSchema = z.object({
  programCode: z.string().min(1, { message: "Program code is required" }),
  programName: z.string().min(1, { message: "Program name is required" }),
});

export const addCourseSchema = z.object({
  courseCode: z.string().min(1, { message: "Course code is required" }),
  courseName: z.string().min(1, { message: "Course name is required" }),
});

export const updateProgramSchema = z.object({
  programCode: z.string().optional(),
  programName: z.string().optional(),
});

export const updateCourseSchema = z.object({
  courseCode: z.string().optional(),
  courseName: z.string().optional(),
});

export const addMaterialSchema = z.object({
  learningMaterialTitle: z
    .string()
    .min(1, { message: "Learning material title is required" }),
  materialType: z.string().min(1, { message: "File type is required" }),
  resourcePath: z.string().min(1, { message: "Resource path is required" }),
});
