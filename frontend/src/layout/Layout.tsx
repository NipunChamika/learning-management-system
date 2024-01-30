import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Box } from "@chakra-ui/react";
import MenuBar from "../components/MenuBar/MenuBar";

const Layout = () => {
  const { isLoggedIn } = useUserContext();

  const navigate = useNavigate();
  const [isCheckingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [isLoggedIn]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <NavBar />
      <Outlet />
      <Footer /> */}

      <NavBar />
      <Box display="flex">
        <Box w="25%">
          <MenuBar />
        </Box>
        <Box w="100%">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
