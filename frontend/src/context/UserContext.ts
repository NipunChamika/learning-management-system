import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface UserContextInterface {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  passwordResetEmail: { email: string };
  setPasswordResetEmail: (passwordResetEmail: { email: string }) => void;
  resendTimer: number;
  setResendTimer: Dispatch<SetStateAction<number>>;
  showResendOtp: boolean;
  setShowResendOtp: (showResendOtp: boolean) => void;
  resetPassword: boolean;
  setResetPassword: (resetPassword: boolean) => void;
  sendOtp: boolean;
  setSendOtp: (sendOtp: boolean) => void;
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
