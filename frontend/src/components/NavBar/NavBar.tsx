import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import logo from "./../../assets/logo.svg";
import dark from "../../assets/dark.svg";
import settings from "../../assets/settings.svg";

const NavBar = () => {
  return (
    <>
      <Box
        // bg="coral"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="40px"
        py="24px"
        borderBottom="1px"
        borderColor="#F4F4F4"
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
          <Box>
            <IconButton
              icon={<Image src={dark} alt="Dark Mode" />}
              aria-label="Dark Mode"
              variant="ghost"
              isRound={true}
              _hover={{ bgColor: "#f9f6fd" }}
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
