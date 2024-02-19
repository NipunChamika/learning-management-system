import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface Props {
  schema: ZodType;
  onClose: () => void;
}

const Form = ({ schema, onClose }: Props) => {
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const onSubmit = (data: FormData) => {
    axios
      .post("http://localhost:3000/program", data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.programCode} mb={4}>
          <FormLabel
            htmlFor="programCode"
            color="text-color"
            mb="4px"
            fontSize="16px"
            fontWeight="400"
          >
            Program Code
          </FormLabel>
          <Input {...register("programCode")} id="programCode" />
          <FormErrorMessage>
            {errors.programCode &&
            typeof errors.programCode.message === "string"
              ? errors.programCode?.message
              : null}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.programName} mb={4}>
          <FormLabel
            htmlFor="programName"
            color="text-color"
            mb="4px"
            fontSize="16px"
            fontWeight="400"
          >
            Program Name
          </FormLabel>
          <Input {...register("programName")} id="programName" />
          <FormErrorMessage>
            {errors.programName &&
            typeof errors.programName.message === "string"
              ? errors.programName?.message
              : null}
          </FormErrorMessage>
        </FormControl>
        <Flex justify="end" mb="8px">
          <Button
            type="submit"
            color="text-color"
            borderRadius="8px"
            py="3px"
            fontSize="16px"
            fontWeight="500"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default Form;
