import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { addSubmissionSchema } from "../../validation/validation";
import { AddSubmissionFormData } from "../../utils/types";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";

const Submission = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const { title, description } = location.state;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [file, setFile] = useState<FileList | null>(null);

  const {
    register,
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

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(
        `http://localhost:3000/submission/${id}/${user?.indexNo}`,
        formData,
        config
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

    // if (data.file !== undefined) {
    //   console.log(data.file[0].name);
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    setFile(files);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack>
            <HStack
              border="1px"
              borderRadius="10px"
              borderColor="border-color"
              // w="465px"
            >
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
                {...register("file")}
                type="file"
                hidden
                onChange={handleChange}
              />
              <Box borderRightRadius="10px" w="256px">
                {file && <Text>{file[0].name}</Text>}
              </Box>
              {file && (
                <Box
                  bg="card-bg"
                  // fontSize="16px"
                  fontWeight="400"
                  px="34px"
                  py="16px"
                  borderRightRadius="10px"
                  // alignSelf="end"
                  _hover={{ cursor: "pointer" }}
                >
                  <DeleteIcon />
                </Box>
              )}
            </HStack>
            <Button type="submit">Submit</Button>
          </HStack>
          {errors.file && <Text color="red">{errors.file.message}</Text>}
        </form>
      </VStack>
    </>
  );
};

export default Submission;
