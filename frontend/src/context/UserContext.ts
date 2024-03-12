import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { User } from "../utils/types";

interface UserContextInterface {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  passwordResetEmail: { email: string };
  setPasswordResetEmail: (passwordResetEmail: { email: string }) => void;
  resendTimer: number;
  setResendTimer: Dispatch<SetStateAction<number>>;
  showResendOtp: boolean;
  setShowResendOtp: (showResendOtp: boolean) => void;
  isEmail: boolean;
  setEmail: (isEmail: boolean) => void;
  sendOtp: boolean;
  setSendOtp: (sendOtp: boolean) => void;
  isResetPassword: boolean;
  setResetPassword: (isResetPassword: boolean) => void;
  isMenuCollapse: boolean;
  setMenuCollapse: (isMenuCollapse: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  isOpenModal: "add" | "edit" | "delete" | "reset";
  setOpenModal: (isOpenModal: "add" | "edit" | "delete" | "reset") => void;
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
