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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
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
import useToastFunction from "../../hooks/useToastFunction";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const PasswordReset = () => {
  const { passwordResetEmail, isEmail, sendOtp, setSendOtp, setResetPassword } =
    useUserContext();

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
  const toastFunction = useToastFunction();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowResendOtp(true);
    }
  }, [timer]);

  useEffect(() => {
    if (!isEmail) {
      navigate("/email");
    }
  }, [isEmail]);

  useEffect(() => {
    console.log("state: ", sendOtp);

    if (sendOtp) {
      toastFunction({
        title: "OTP Sent",
        description: "An OTP has been sent to your email",
        status: "success",
      });
    }
    setSendOtp(false);
  }, [sendOtp]);

  const onSubmit = (data: ResetPasswordFormData) => {
    const { confirmNewPassword, ...otherData } = data;
    const payload = {
      ...otherData,
      email: passwordResetEmail.email,
    };

    axios
      .post("http://localhost:3000/user/reset-password", payload)
      .then((res) => {
        setResetPassword(true);
        navigate("/login");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.code === 410) {
          toastFunction({
            title: "OTP Expired",
            description: "Please try again",
            status: "error",
          });
        } else if (error.response.data.code === 404) {
          toastFunction({
            title: "Invalid OTP",
            description: "Please enter a valid OTP",
            status: "error",
          });
        } else if (error.code === "ERR_NETWORK") {
          toastFunction({
            title: "Server Error",
            description: "Please try again later",
            status: "error",
          });
        } else {
          toastFunction({
            title: "Error",
            description: "Password reset failed",
            status: "error",
          });
        }
      });
  };

  const handleOtpResend = () => {
    axios
      .post("http://localhost:3000/user/forgot-password", passwordResetEmail)
      .then((res) => {
        setShowResendOtp(false);
        setTimer(60);
        setSendOtp(true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          toastFunction({
            title: "Server Error",
            status: "error",
            description: "Please try again later.",
          });
        } else {
          toastFunction({ title: "Bad Request", status: "error" });
        }
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
                <Input
                  {...register("otp", {
                    onChange: (e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      e.target.value = numericValue;
                    },
                    maxLength: 4,
                  })}
                  id="otp"
                  maxLength={4}
                  inputMode="numeric" // Mobile keyboards default to numeric input
                />
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
                <InputGroup>
                  <Input
                    {...register("newPassword")}
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="none"
                      textColor="slategrey"
                      aria-label="Show password"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
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
                <InputGroup>
                  <Input
                    {...register("confirmNewPassword")}
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="none"
                      textColor="slategrey"
                      aria-label="Show confirm password"
                      icon={
                        showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </InputRightElement>
                </InputGroup>
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
