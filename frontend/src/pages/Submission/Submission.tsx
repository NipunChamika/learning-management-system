import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Submission = () => {
  const location = useLocation();

  const { title, description } = location.state;

  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          {title} Submission
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      <VStack
        align="stretch"
        border="1px"
        borderRadius="8px"
        borderColor="border-color"
      >
        <Text
          borderRadius="8px"
          bg="card-bg"
          py="20px"
          px="24px"
          fontSize="22px"
          fontWeight="500"
          color="text-color"
          borderBottom="1px"
          borderBottomColor="border-color"
        >
          Assignment Content
        </Text>
        <VStack
          align="stretch"
          spacing="40px"
          py="48px"
          px="64px"
          borderBottomRadius="8px"
        >
          <Text>{description}</Text>
          <HStack spacing="16px" h="auto">
            <HStack
              border="1px"
              borderRadius="10px"
              borderColor="border-color"
              w="465px"
            >
              <Box
                bg="card-bg"
                fontSize="16px"
                fontWeight="400"
                px="34px"
                py="16px"
                borderLeftRadius="10px"
                cursor="pointer"
              >
                Choose File
              </Box>
              <Flex />
            </HStack>
            <Box
              bg="btn-bg"
              px="32px"
              py="16px"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="400"
              color="menu-hover-text"
              cursor="pointer"
              _hover={{ bg: "btn-hover-bg" }}
            >
              Submit
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Submission;
