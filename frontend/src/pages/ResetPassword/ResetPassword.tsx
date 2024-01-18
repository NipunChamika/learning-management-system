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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../validation/validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const PasswordReset = () => {
  const { passwordResetEmail } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [showResendOtp, setShowResendOtp] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowResendOtp(true);
    }
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    const { confirmNewPassword, ...otherData } = data;
    const payload = {
      ...otherData,
      email: passwordResetEmail.email,
    };

    axios
      .post("http://localhost:3000/user/reset-password", payload)
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpResend = () => {
    axios
      .post("http://localhost:3000/user/forgot-password", passwordResetEmail)
      .then((res) => {
        setShowResendOtp(false);
        setTimer(60);
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
            Reset Password
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.otp} mb={4}>
                <FormLabel
                  htmlFor="otp"
                  textColor="slategrey"
                  mb={0}
                  fontSize="14"
                  fontWeight="400"
                >
                  OTP
                </FormLabel>
                <Input {...register("otp")} id="otp" />
                <FormErrorMessage mt="1px">
                  {errors.otp && errors.otp.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.newPassword} mb={4}>
                <FormLabel
                  htmlFor="newPassword"
                  textColor="slategrey"
                  mb={0}
                  fontSize="14"
                  fontWeight="400"
                >
                  New Password
                </FormLabel>
                <Input {...register("newPassword")} id="newPassword" />
                <FormErrorMessage mt="1px">
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.confirmNewPassword}>
                <FormLabel
                  htmlFor="confirmNewPassword"
                  textColor="slategrey"
                  mb={0}
                  fontSize="14"
                  fontWeight="400"
                >
                  Confirm New Password
                </FormLabel>
                <Input
                  {...register("confirmNewPassword")}
                  id="confirmNewPassword"
                />
                <FormErrorMessage mt="1px">
                  {errors.confirmNewPassword &&
                    errors.confirmNewPassword.message}
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
                mb={4}
              >
                Reset Password
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
            <Text>Didn't receive the code?&nbsp;</Text>
            {showResendOtp ? (
              <Button
                variant="link"
                color="#84a9ff"
                _hover={{ textDecoration: "none", color: "#608fff" }}
                fontSize="14px"
                onClick={handleOtpResend}
              >
                Resend OTP
              </Button>
            ) : (
              <Text>Resend OTP in {timer}s</Text>
            )}
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default PasswordReset;
