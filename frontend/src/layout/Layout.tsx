import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const Layout = () => {
  const { isLoggedIn } = useUserContext();

  const navigate = useNavigate();
  const [isCheckingAuth, setCheckingAuth] = useState(true);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     setCheckingAuth(false);
  //   }
  // }, [isLoggedIn]);

  // if (isCheckingAuth) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
