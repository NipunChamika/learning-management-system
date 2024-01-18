import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../../validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

type LoginFormData = z.infer<typeof loginSchema>;

interface ResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
  };
}

const Login = () => {
  const { setLoggedIn } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    // console.log("Form Data: ", data);

    axios
      .post<ResponseData>("http://localhost:3000/auth/login", data)
      .then((res) => {
        console.log(res.data);
        setLoggedIn(true);
        navigate("/");
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleVisibility = () => setShow(!show);

  return (
    <>
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Card minW="400px">
          <CardHeader
            as="h1"
            fontSize="28"
            fontWeight="600"
            textAlign="center"
            pb="0"
          >
            Login
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
              <FormControl isInvalid={!!errors.password}>
                <FormLabel
                  htmlFor="password"
                  textColor="slategrey"
                  mb={0}
                  fontSize="14"
                  fontWeight="400"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    id="password"
                    fontSize="14px"
                    // focusBorderColor="pink.400"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="none"
                      textColor="slategrey"
                      aria-label="Show password"
                      icon={show ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={handleVisibility}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage mt="1px">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Box display="flex" alignItems="center" justifyContent="end">
                <Button
                  variant="link"
                  color="#84a9ff"
                  fontSize="12px"
                  _hover={{ textDecoration: "none", color: "#608fff" }}
                  pt="20px"
                  onClick={() => navigate("/email")}
                >
                  Forgot password?
                </Button>
              </Box>
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
                Login
              </Button>
            </form>
          </CardBody>
          <Box mx="20px">
            <Divider />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            py="20px"
          >
            <Text fontSize="14px">Need an account?&nbsp;</Text>
            <Button
              as="a"
              href="#"
              variant="link"
              color="#84a9ff"
              _hover={{ textDecoration: "none", color: "#608fff" }}
              fontSize="14px"
            >
              Sign Up
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Login;
