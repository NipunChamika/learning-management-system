import { Box, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../../icons/ProfileIcon";
import { CoursesIcon } from "../../icons/CoursesIcon";
import { ProgramsIcon } from "../../icons/ProgramsIcon";
import { SignoutIcon } from "../../icons/SignoutIcon";

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <VStack bgColor="bg-color" alignItems="stretch" spacing={0}>
        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="border-color"
          cursor="pointer"
          _hover={{
            bgColor: "menu-hover-bg",
            color: "menu-hover-text",
            borderColor: "menu-hover-border",
            // ".profileIcon": { filter: "brightness(0) invert(1)" },
          }}
          onClick={() => navigate("/profile")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            {/* <Image
              src={profile}
              alt="Profile Icon"
              boxSize="26px"
              className="profileIcon"
            /> */}
            {/* <Icon as={ProfileIcon} /> */}
            <ProfileIcon boxSize="26px" />
            <Text fontSize="18px" fontWeight="500">
              Profile
            </Text>
          </Box>
        </Box>

        {/* <Button
          leftIcon={
            <Image
              src={profile}
              alt="Profile Icon"
              boxSize="26px"
              className="profileIcon"
              mr={4}
              gap={0}
            />
          }
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="#F4F4F4"
          _hover={{
            bgColor: "#317CEC",
            color: "white",
            borderColor: "#317CEC",
            ".profileIcon": { filter: "brightness(0) invert(1)" },
          }}
          onClick={() => navigate("/")}
          borderRadius={0}
          fontSize="18px"
          justifyContent="start"
        >
          Profile
        </Button> */}

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="border-color"
          cursor="pointer"
          _hover={{
            bgColor: "menu-hover-bg",
            color: "menu-hover-text",
            borderColor: "menu-hover-border",
          }}
          onClick={() => navigate("/")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <ProgramsIcon boxSize="26px" />
            <Text fontSize="18px" fontWeight="500">
              Programs
            </Text>
          </Box>
        </Box>

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="border-color"
          cursor="pointer"
          _hover={{
            bgColor: "menu-hover-bg",
            color: "menu-hover-text",
            borderColor: "menu-hover-border",
          }}
          onClick={() => navigate("/courses")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <CoursesIcon boxSize="26px" />
            <Text fontSize="18px" fontWeight="500">
              Courses
            </Text>
          </Box>
        </Box>

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="border-color"
          cursor="pointer"
          _hover={{
            bgColor: "menu-hover-bg",
            color: "menu-hover-text",
            borderColor: "menu-hover-border",
          }}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <SignoutIcon boxSize="26px" />
            <Text fontSize="18px" fontWeight="500">
              Sign Out
            </Text>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default MenuBar;
