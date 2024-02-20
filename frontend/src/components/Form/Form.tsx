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

type FormControlProps = {
  labelName: string;
  htmlFor: string;
};

interface Props {
  schema: ZodType;
  onClose: () => void;
  labels: FormControlProps[];
}

const Form = ({ schema, onClose, labels }: Props) => {
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

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    } else if (error && typeof error.message === "string") {
      return error.message;
    } else {
      return "An error occurred";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {labels.map((label) => (
          <FormControl
            key={label.htmlFor}
            isInvalid={!!errors[label.htmlFor]}
            mb={4}
          >
            <FormLabel
              htmlFor={label.htmlFor}
              color="text-color"
              mb="4px"
              fontSize="16px"
              fontWeight="400"
            >
              {label.labelName}
            </FormLabel>
            <Input {...register(label.htmlFor)} id={label.htmlFor} />
            <FormErrorMessage>
              {errors[label.htmlFor] &&
                getErrorMessage(errors[label.htmlFor]?.message)}
            </FormErrorMessage>
          </FormControl>
        ))}
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
