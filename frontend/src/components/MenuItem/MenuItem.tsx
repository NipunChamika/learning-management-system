import { Box, ComponentWithAs, Icon, IconProps, Text } from "@chakra-ui/react";
import { To, useNavigate } from "react-router-dom";

interface Props {
  navigateTo?: To;
  icon: ComponentWithAs<"svg", IconProps>;
  title: string;
}

const MenuItem = ({ icon, title, navigateTo }: Props) => {
  const navigate = useNavigate();

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
        <Box display="flex" alignItems="center" gap="16px">
          <Icon as={icon} boxSize="26px" />
          <Text fontSize="18px" fontWeight="500">
            {title}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default MenuItem;
