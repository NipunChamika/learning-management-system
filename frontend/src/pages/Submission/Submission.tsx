import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { addSubmissionSchema } from "../../validation/validation";
import { AddSubmissionFormData } from "../../utils/types";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

const Submission = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const { title, description } = location.state;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");

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

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <VStack
        align="stretch"
        spacing="40px"
        py="48px"
        px="64px"
        borderBottomRadius="8px"
      >
        <Text>{description}</Text>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                id="file"
                type="file"
                onChange={(e) => onChange(e.target.files)}
              />
            )}
          />
          {errors.file && <Text color="red">{errors.file.message}</Text>}
          <Button type="submit" colorScheme="blue" mt={4}>
            Submit
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default Submission;
