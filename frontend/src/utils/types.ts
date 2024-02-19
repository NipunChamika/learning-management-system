import { useUserContext } from "../context/UserContext";

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

export const getRole = () => {
  let role;
  const { user } = useUserContext();

  if (user?.role === "ADMIN") role = "ADMIN";

  return role;
};
