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
import Users from "./pages/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Profile /> },
      { path: "programs", element: <Programs /> },
      { path: "users", element: <Users /> },
      { path: "programs/:programId", element: <Courses /> },
      // {
      //   path: "courses",
      //   element: <Courses />,
      // },
      {
        path: "programs/:programId/:courseId",
        element: <CourseDashboard />,
      },
      {
        path: "programs/:programId/:courseId/:id",
        element: <Submission />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
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
