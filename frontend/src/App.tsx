import { RouterProvider } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
import router from "./routes";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState({ email: "" });
  const [resendTimer, setResendTimer] = useState(60);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [isResetPassword, setResetPassword] = useState(false);
  const [isMenuCollapse, setMenuCollapse] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        passwordResetEmail,
        setPasswordResetEmail,
        resendTimer,
        setResendTimer,
        showResendOtp,
        setShowResendOtp,
        isEmail,
        setEmail,
        sendOtp,
        setSendOtp,
        isResetPassword,
        setResetPassword,
        isMenuCollapse,
        setMenuCollapse,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
