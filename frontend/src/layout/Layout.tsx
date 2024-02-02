import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Box, Show } from "@chakra-ui/react";
import MenuBar from "../components/MenuBar/MenuBar";

const Layout = () => {
  const { isLoggedIn, isMenuCollapse } = useUserContext();

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
      <Box display="flex" flexDirection="column" h="100vh">
        <NavBar />
        <Box display="flex" flex="1" overflow="hidden">
          <Show above="lg">
            <Box
              w={isMenuCollapse ? "7%" : "20%"}
              // w="20%"
              h="100%"
              overflowY="auto"
              bgColor="bg-color"
              borderRight="1px"
              borderColor="border-color"
            >
              <MenuBar />
            </Box>
          </Show>
          <Box flex="1" p="24px" bgColor="bg-default" pos="relative">
            <Box
              flex="1"
              p="36px"
              bgColor="bg-color"
              h="100%"
              overflowY="auto"
              borderRadius="8px"
            >
              <Outlet />
            </Box>
            {/* <Box pos="absolute" bottom="0" right="0" left="0" w="100%">
              <Footer />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
