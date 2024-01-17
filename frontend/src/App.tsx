import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { UserContext } from "./context/UserContext";
import { useState } from "react";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
  ]);

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
