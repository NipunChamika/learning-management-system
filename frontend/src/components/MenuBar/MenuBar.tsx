import { Box, Button, Image, Text, VStack, Icon } from "@chakra-ui/react";
import profile from "../../assets/profile.svg";
import programs from "../../assets/programs.svg";
import courses from "../../assets/courses.svg";
import signout from "../../assets/signout.svg";
import { useNavigate } from "react-router-dom";

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
            ".profileIcon": { filter: "brightness(0) invert(1)" },
          }}
          onClick={() => navigate("/profile")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={profile}
              alt="Profile Icon"
              boxSize="26px"
              className="profileIcon"
            />
            {/* <Icon as={ProfileIcon} /> */}
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
            ".programsIcon": { filter: "brightness(0) invert(1)" },
          }}
          onClick={() => navigate("/")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={programs}
              alt="Programs Icon"
              boxSize="26px"
              className="programsIcon"
            />
            {/* <Icon as={ProgramsIcon} /> */}
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
            ".coursesIcon": { filter: "brightness(0) invert(1)" },
          }}
          onClick={() => navigate("/courses")}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={courses}
              alt="Courses Icon"
              boxSize="26px"
              className="coursesIcon"
            />
            {/* <Icon as={CoursesIcon} boxSize="26px" /> */}
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
            ".signOutIcon": { filter: "brightness(0) invert(1)" },
          }}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={signout}
              alt="Sign Out Icon"
              boxSize="26px"
              className="signOutIcon"
            />
            {/* <Icon as={SignoutIcon} boxSize="26px" /> */}
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
