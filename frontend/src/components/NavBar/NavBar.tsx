import { Box, IconButton, Image, Text, useColorMode } from "@chakra-ui/react";
import logo from "./../../assets/logo.svg";
import darkIcon from "../../assets/dark.svg";
import lightIcon from "../../assets/light.svg";
import settings from "../../assets/settings.svg";
import menu from "../../assets/menu.svg";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Box
        // bg="coral"
        bg="bg-color"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="40px"
        py="24px"
        borderBottom="1px"
        borderColor="border-color"
      >
        <Box display="flex" alignItems="center" gap="10px">
          <Image src={logo} alt="Logo" h="38px" w="50px" />
          <Text fontSize="30px" fontWeight="500">
            La
            <Box as="span" color="#317CEC">
              mko
            </Box>
          </Text>
        </Box>
        <Box display="flex" alignItems="center" gap="24px">
          {/* <Box>
            <IconButton
              icon={<Image src={menu} alt="Dark Mode" />}
              aria-label="Dark Mode"
              variant="ghost"
              isRound={true}
              _hover={{ bgColor: "#f9f6fd" }}
              w="26px"
              h="26px"
              onClick={toggleColorMode}
            /> */}
          {/* <Image src={dark} alt="Logo" w="26px" h="26px" /> */}
          {/* </Box> */}

          <Box>
            <IconButton
              icon={
                <Image
                  src={colorMode === "light" ? darkIcon : lightIcon}
                  alt="Dark Mode"
                />
              }
              aria-label="Dark Mode"
              variant="ghost"
              isRound={true}
              _hover={{ bgColor: "#f9f6fd" }}
              onClick={toggleColorMode}
            />
            {/* <Image src={dark} alt="Logo" w="26px" h="26px" /> */}
          </Box>
          <Box>
            <IconButton
              icon={<Image src={settings} alt="Settings" />}
              aria-label="Settings"
              variant="ghost"
              isRound={true}
              _hover={{ bgColor: "#f9f6fd" }}
            />
            {/* <Image src={settings} alt="Logo" w="26px" h="26px" /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
