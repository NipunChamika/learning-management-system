import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { addSubmissionSchema } from "../../validation/validation";
import { AddSubmissionFormData } from "../../utils/types";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";

const Submission = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const { title, description } = location.state;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [file, setFile] = useState<FileList | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSubmissionFormData>({
    resolver: zodResolver(addSubmissionSchema),
  });

  const onSubmit = (data: AddSubmissionFormData) => {
    const formData = new FormData();

    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }

    const multipartConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(
        `http://localhost:3000/submission/${id}/${user?.indexNo}`,
        formData,
        multipartConfig
      )
      .then((res) => {
        console.log(res.data);
        console.log("Submitted");
        reset();
        setFile(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          {title} Submission
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      <VStack
        align="stretch"
        spacing="40px"
        py="48px"
        px="64px"
        borderBottomRadius="8px"
      >
        <Text>{description}</Text>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <HStack spacing="16px" h="auto">
            <HStack
              border="1px"
              borderRadius="10px"
              borderColor="border-color"
              w="465px"
            >
              <Controller
                name="file"
                control={control}
                render={({ field: { onChange } }) => (
                  <>
                    <Box
                      as="label"
                      htmlFor="file"
                      bg="card-bg"
                      fontSize="16px"
                      fontWeight="400"
                      px="34px"
                      py="16px"
                      borderLeftRadius="10px"
                      cursor="pointer"
                    >
                      Choose File
                    </Box>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => onChange(setFile(e.target.files))}
                      display="none"
                    />
                  </>
                )}
              />
              <Flex />
            </HStack>
            <Button
              type="submit"
              bg="btn-bg"
              px="32px"
              py="16px"
              borderRadius="8px"
              fontSize="16px"
              fontWeight="400"
              color="menu-hover-text"
              _hover={{ bg: "btn-hover-bg" }}
            >
              Submit
            </Button>
          </HStack>
          {errors.file && <Text color="red">{errors.file.message}</Text>}
        </form>
      </VStack>
    </>
  );
};

export default Submission;
