import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import AuthCard from "../../components/AuthCard/AuthCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../../validation/validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

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

  return (
    <>
      <AuthCard cardTitle="Reset Password">
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
              {...register("otp")}
              id="otp"
              // errorBorderColor="#c00"
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
            <Input
              {...register("newPassword")}
              id="newPassword"
              // errorBorderColor="#c00"
            />
            <FormErrorMessage mt="1px">
              {errors.newPassword && errors.newPassword.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmNewPassword} mb={4}>
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
              // errorBorderColor="#c00"
            />
            <FormErrorMessage mt="1px">
              {errors.confirmNewPassword && errors.confirmNewPassword.message}
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
      </AuthCard>
    </>
  );
};

export default PasswordReset;
