import { Box, Icon, Image, Text } from "@chakra-ui/react";
import profile from "../../assets/profile.svg";
import programs from "../../assets/programs.svg";
import courses from "../../assets/courses.svg";
import signout from "../../assets/signout.svg";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        // bg="gold"
        display="flex"
        flexDirection="column"
        borderRight="1px"
        borderColor="#F4F4F4"
        // alignItems="center"
      >
        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="#F4F4F4"
          cursor="pointer"
          _hover={{
            bgColor: "#317CEC",
            color: "white",
            borderColor: "#317CEC",
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
            <Text fontSize="18px">Profile</Text>
          </Box>
        </Box>

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="#F4F4F4"
          cursor="pointer"
          _hover={{
            bgColor: "#317CEC",
            color: "white",
            borderColor: "#317CEC",
            ".programsIcon": { filter: "brightness(0) invert(1)" },
          }}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={programs}
              alt="Programs Icon"
              boxSize="26px"
              className="programsIcon"
            />
            <Text fontSize="18px">Programs</Text>
          </Box>
        </Box>

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="#F4F4F4"
          cursor="pointer"
          _hover={{
            bgColor: "#317CEC",
            color: "white",
            borderColor: "#317CEC",
            ".coursesIcon": { filter: "brightness(0) invert(1)" },
          }}
        >
          <Box display="flex" alignItems="center" gap="16px">
            <Image
              src={courses}
              alt="Courses Icon"
              boxSize="26px"
              className="coursesIcon"
            />
            <Text fontSize="18px">Courses</Text>
          </Box>
        </Box>

        <Box
          py="24px"
          px="32px"
          borderBottom="1px"
          borderColor="#F4F4F4"
          cursor="pointer"
          _hover={{
            bgColor: "#317CEC",
            color: "white",
            borderColor: "#317CEC",
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
            <Text fontSize="18px">Sign Out</Text>
          </Box>
        </Box>
        {/* <Box py="24px" px="32px" borderBottom="1px" borderColor="#F4F4F4">
          <Box display="flex" alignItems="center" gap="16px">
            <Image as={Icon} src={profile} alt="Profile Icon" boxSize="26px" />
            <Text fontSize="18px">Profile</Text>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default MenuBar;
