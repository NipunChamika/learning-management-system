import {
  Box,
  ComponentWithAs,
  Flex,
  Icon,
  IconProps,
  Text,
} from "@chakra-ui/react";
import { To, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

interface Props {
  navigateTo?: To;
  icon: ComponentWithAs<"svg", IconProps>;
  title: string;
}

const MenuItem = ({ icon, title, navigateTo }: Props) => {
  const navigate = useNavigate();
  const { isMenuCollapse } = useUserContext();

  const handleClick = () => {
    navigateTo && navigate(navigateTo);
  };

  return (
    <>
      <Box
        py="24px"
        px="32px"
        borderBottom="1px"
        borderColor="border-color"
        cursor="pointer"
        color="text-color"
        _hover={{
          bgColor: "menu-hover-bg",
          color: "menu-hover-text",
          borderColor: "menu-hover-border",
        }}
        onClick={handleClick}
      >
        <Flex
          display="flex"
          alignItems="center"
          gap="16px"
          justifyContent={isMenuCollapse ? "center" : "flex-start"}
        >
          <Icon as={icon} boxSize="26px" />
          <Text
            display={!isMenuCollapse ? "flex" : "none"}
            fontSize="18px"
            fontWeight="500"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {title}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default MenuItem;
