import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile/Profile";
import Programs from "./pages/Programs/Programs";
import Login from "./pages/Login/Login";
import EmailEntry from "./pages/EmailEntry/EmailEntry";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Programs /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/email",
    element: <EmailEntry />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
