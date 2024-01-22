import { Box, IconButton, Image } from "@chakra-ui/react";
import logo from "./../../assets/logo.png";
import profile from "./../../assets/profile.png";
import { SettingsIcon } from "@chakra-ui/icons";

const NavBar = () => {
  return (
    <>
      <Box
        // bg="coral"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="6"
      >
        <Image src={logo} alt="Logo" boxSize="80px" />
        <Box display="flex" alignItems="center" justifyContent="center" gap="4">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="2"
          >
            <Image src={profile} alt="Profile" boxSize="40px" />
            <Box>Nipun</Box>
          </Box>
          <Box>
            <IconButton
              icon={<SettingsIcon />}
              aria-label="Settings"
              isRound={true}
              fontSize="20"
              boxSize="40px"
              variant="none"
              color="#757575"
              _hover={{ bgColor: "#f9f6fd" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
