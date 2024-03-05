import { z } from "zod";
import { useUserContext } from "../context/UserContext";
import {
  addAssignmentSchema,
  addCourseSchema,
  addMaterialSchema,
  addProgramSchema,
  addUserSchema,
  updateAssignmentSchema,
  updateCourseSchema,
  updateMaterialSchema,
  updateProgramSchema,
  updateUserSchema,
} from "../validation/validation";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  studentId?: number;
};

export type Meta = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  skip: number;
};

export type AddProgramFormData = z.infer<typeof addProgramSchema>;

export type UpdateProgramFormData = z.infer<typeof updateProgramSchema>;

export type AddCourseFormData = z.infer<typeof addCourseSchema>;

export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;

export type AddMaterialFormData = z.infer<typeof addMaterialSchema>;

export type AddAssignmentFormData = z.infer<typeof addAssignmentSchema>;

export type UpdateMaterialFormData = z.infer<typeof updateMaterialSchema>;

export type UpdateAssignmentFormData = z.infer<typeof updateAssignmentSchema>;

export type AddUserFormData = z.infer<typeof addUserSchema>;

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export const getRole = () => {
  let role;
  const { user } = useUserContext();

  if (user?.role === "ADMIN") role = "ADMIN";

  return role;
};
