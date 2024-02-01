import { Box, Text } from "@chakra-ui/react";

const Profile = () => {
  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          Profile
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>
    </>
  );
};

export default Profile;
