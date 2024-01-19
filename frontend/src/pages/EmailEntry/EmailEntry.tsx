import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { z } from "zod";
import { emailSchema } from "../../validation/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard/AuthCard";
import { useUserContext } from "../../context/UserContext";

type EmailEntryFormData = z.infer<typeof emailSchema>;

const EmailEntry = () => {
  const { setPasswordResetEmail, setResetPassword } = useUserContext();

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
        setResetPassword(true);
        navigate("/reset-password");
        setPasswordResetEmail(data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="#f4f7fe"
      >
        <AuthCard
          cardTitle="Email Verfication"
          footerText="Remember the password?"
          footerLinkText="Log in"
          onFooterLinkClick={() => navigate("/login")}
        >
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
            >
              Next
            </Button>
          </form>
        </AuthCard>
      </Box>
    </>
  );
};

export default EmailEntry;
