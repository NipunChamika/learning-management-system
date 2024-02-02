import { Box, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { DarkIcon } from "../../icons/DarkIcon";
import { LightIcon } from "../../icons/LightIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { Logo } from "../../icons/Logo";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <>
      <Flex
        // bg="coral"
        bg="bg-color"
        justifyContent="space-between"
        alignItems="center"
        px="40px"
        py="24px"
        borderBottom="1px"
        borderColor="border-color"
      >
        <Flex alignItems="center" gap="10px">
          <Logo h="38px" w="50px" color="bg-color" />
          <Text fontSize="30px" fontWeight="500" color="text-color">
            La
            <Box as="span" color="#317CEC">
              mko
            </Box>
          </Text>
        </Flex>
        <Flex alignItems="center" gap="24px">
          <IconButton
            variant="ghost"
            isRound={true}
            _hover={{ bgColor: "#f9f6fd" }}
            aria-label="Color Mode"
            fontSize="26"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <DarkIcon /> : <LightIcon />}
          />
          <IconButton
            variant="ghost"
            isRound={true}
            _hover={{ bgColor: "#f9f6fd" }}
            aria-label="Settings"
            fontSize="26"
            icon={<SettingsIcon />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
