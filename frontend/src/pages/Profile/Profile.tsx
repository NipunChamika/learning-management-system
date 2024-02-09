import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { DefaultProfileIcon } from "../../icons/DefaultProfileIcon";
import { EditIcon } from "../../icons/EditIcon";

const Profile = () => {
  const userInfo = [
    { label: "Full Name", value: "" },
    { label: "Email", value: "" },
    { label: "Gender", value: "Male" },
    { label: "Date of Birth", value: "" },
    { label: "Education Level", value: "" },
    { label: "Phone Number", value: "123456789" },
  ];

  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          Profile
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      <Flex gap="64px">
        <Box pos="relative">
          <DefaultProfileIcon boxSize="194px" />
          <Box
            display="flex"
            bg="bg-default"
            color="menu-active-bg"
            _hover={{
              bg: "menu-hover-bg",
              color: "menu-hover-text",
              cursor: "pointer",
            }}
            boxSize="40px"
            border="1px"
            borderRadius="50%"
            borderColor="menu-hover-border"
            alignItems="center"
            justifyContent="center"
            pos="absolute"
            top="5%"
            right="2%"
          >
            <EditIcon boxSize="24px" />
          </Box>
        </Box>
        <VStack
          spacing="24px"
          align="stretch"
          fontWeight="500"
          color="text-color"
        >
          <Text fontSize="22px">Information</Text>
          <Flex gap="34px" fontSize="16px">
            <VStack spacing="16px" align="stretch">
              {userInfo.map((user) => (
                <Text key={user.label}>{user.label}</Text>
              ))}
            </VStack>
            <VStack spacing="16px" align="stretch">
              {userInfo.map((user) => (
                <Text key={user.label}>:</Text>
              ))}
            </VStack>
            <VStack spacing="16px" align="stretch" fontWeight="400">
              {userInfo.map((user) => (
                <Text key={user.label}>{user.value}</Text>
              ))}
            </VStack>
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default Profile;
