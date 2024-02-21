import { z } from "zod";
import { useUserContext } from "../context/UserContext";
import { addProgramSchema } from "../validation/validation";

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

export const getRole = () => {
  let role;
  const { user } = useUserContext();

  if (user?.role === "ADMIN") role = "ADMIN";

  return role;
};
