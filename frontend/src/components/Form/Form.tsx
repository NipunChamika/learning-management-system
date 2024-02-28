import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

type FormControlProps<T> = {
  labelName: string;
  htmlFor: Path<T>;
  inputType?: HTMLInputTypeAttribute;
  isTextarea?: boolean;
};

interface Props<T extends FieldValues> {
  schema: ZodType<any, any, any>;
  labels: FormControlProps<T>[];
  onSubmit: SubmitHandler<T>;
  children?: ReactNode;
  defaultValues?: Partial<T>;
}

const Form = <T extends FieldValues>({
  schema,
  labels,
  onSubmit,
  children,
  defaultValues,
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

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
            {label.isTextarea ? (
              <Textarea {...register(label.htmlFor)} id={label.htmlFor} />
            ) : (
              <Input
                {...register(label.htmlFor)}
                id={label.htmlFor}
                type={label.inputType || "text"}
              />
            )}
            <FormErrorMessage mt="1px">
              {errors[label.htmlFor] &&
                getErrorMessage(errors[label.htmlFor]?.message)}
            </FormErrorMessage>
          </FormControl>
        ))}
        {children || (
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
        )}
      </form>
    </>
  );
};

export default Form;
