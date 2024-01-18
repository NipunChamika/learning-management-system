import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
import Layout from "./layout/Layout";
import EmailEntry from "./pages/EmailEntry/EmailEntry";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ index: true, element: <Home /> }],
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
      path: "/password-reset",
      element: <PasswordReset />,
    },
  ]);

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
