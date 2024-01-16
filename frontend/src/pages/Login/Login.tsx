import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../../validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type LoginFormData = z.infer<typeof loginSchema>;

interface ResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
  };
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    // console.log("Form Data: ", data);

    axios
      .post<ResponseData>("http://localhost:3000/auth/login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Card minW="440px">
          <CardHeader as="h1" fontSize="24px" textAlign="center" pb="0">
            Login
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mb={4}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...register("email")} type="email" id="email" />
                {errors.email && <Text>{errors.email.message}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...register("password")}
                  type="password"
                  id="password"
                />
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl>
              <Button type="submit" colorScheme="blue" mt="5" w="100%">
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Login;
