import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile/Profile";
import Programs from "./pages/Programs/Programs";
import Login from "./pages/Login/Login";
import EmailEntry from "./pages/EmailEntry/EmailEntry";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Courses from "./pages/Courses/Courses";
import CourseDashboard from "./pages/CourseDashboard/CourseDashboard";
import Submission from "./pages/Submission/Submission";
import Missing from "./pages/Missing/Missing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Profile /> },
      { path: "programs", element: <Programs /> },
      { path: "programs/:programCode", element: <Courses /> },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "programs/:programCode/:courseCode",
        element: <CourseDashboard />,
      },
      {
        path: "programs/:programCode/:courseCode/:id",
        element: <Submission />,
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
  {
    path: "*",
    element: <Missing />,
  },
]);

export default router;
