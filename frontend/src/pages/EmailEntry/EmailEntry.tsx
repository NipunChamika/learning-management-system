import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { emailSchema } from "../../validation/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type EmailEntryFormData = z.infer<typeof emailSchema>;

const EmailEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailEntryFormData>({ resolver: zodResolver(emailSchema) });

  const navigate = useNavigate();

  const onSubmit = (data: EmailEntryFormData) => {
    axios
      .post("http://localhost:3000/user/forgot-password", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            Email Verification
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email} mb={4}>
                <FormLabel
                  htmlFor="email"
                  textColor="slategrey"
                  mb={0}
                  fontSize="14"
                  fontWeight="400"
                >
                  Email
                </FormLabel>
                <Input
                  {...register("email")}
                  id="email"
                  // errorBorderColor="#c00"
                />
                <FormErrorMessage mt="1px">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                borderRadius={50}
                py="3px"
                mt="5"
                w="100%"
                fontSize="16px"
                fontWeight="600"
                onClick={() => navigate("/password-reset")}
              >
                Next
              </Button>
            </form>
          </CardBody>
          <Box mx="20px">
            <Divider />
          </Box>
          <Flex
            fontSize="14px"
            py="20px"
            justifyContent="center"
            alignItems="center"
          >
            <Text>Remember the password?&nbsp;</Text>
            <Button
              variant="link"
              color="#84a9ff"
              _hover={{ textDecoration: "none", color: "#608fff" }}
              fontSize="14px"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default EmailEntry;
