import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile/Profile";
import Programs from "./pages/Programs/Programs";
import Login from "./pages/Login/Login";
import EmailEntry from "./pages/EmailEntry/EmailEntry";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Courses from "./pages/Courses/Courses";
import CourseDashboard from "./pages/CourseDashboard/CourseDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Profile /> },
      { path: "programs", element: <Programs /> },
      { path: "programs/:programCode", element: <Courses /> },
      {
        path: "programs/:programCode/:courseCode",
        element: <CourseDashboard />,
      },
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
