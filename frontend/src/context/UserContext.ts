import { createContext, useContext } from "react";

interface UserContextInterface {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  passwordResetEmail: { email: string };
  setPasswordResetEmail: (passwordResetEmail: { email: string }) => void;
}

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error("useUserContext must be used with a UserContext");
  }

  return userContext;
}
