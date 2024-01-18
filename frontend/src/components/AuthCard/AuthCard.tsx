import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  cardTitle: string;
  children: ReactNode;
  footerText?: string;
  onFooterLinkClick?: () => void;
  footerLinkText?: string;
}

const AuthCard = ({
  cardTitle,
  children,
  footerText,
  onFooterLinkClick,
  footerLinkText,
}: Props) => {
  return (
    <>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Card minW="400px">
          <CardHeader
            as="h1"
            fontSize="28px"
            fontWeight="600"
            textAlign="center"
            pb="0"
          >
            {cardTitle}
          </CardHeader>
          <CardBody>{children}</CardBody>
          {footerText && (
            <>
              <Box mx="20px">
                <Divider />
              </Box>
              <Flex
                fontSize="14px"
                py="20px"
                justifyContent="center"
                alignItems="center"
              >
                <Text>{footerText}&nbsp;</Text>
                <Button
                  variant="link"
                  color="#84a9ff"
                  _hover={{ textDecoration: "none", color: "#608fff" }}
                  fontSize="14px"
                  onClick={onFooterLinkClick}
                >
                  {footerLinkText}
                </Button>
              </Flex>
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

export default AuthCard;
