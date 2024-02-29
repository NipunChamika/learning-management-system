import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
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
  isSelect?: boolean;
  selectOptions?: { value: string; label: string }[];
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

  const [show, setShow] = useState<{ [key: string]: boolean }>({});

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    } else if (error && typeof error.message === "string") {
      return error.message;
    } else {
      return "An error occurred";
    }
  };

  const toggleShowPassword = (field: string) => {
    setShow((prevState) => ({ ...prevState, [field]: !prevState[field] }));
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
            ) : label.isSelect ? (
              <Select
                {...register(label.htmlFor)}
                id={label.htmlFor}
                placeholder="Select role"
              >
                {label.selectOptions?.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : label.inputType === "password" ? (
              <InputGroup>
                <Input
                  {...register(label.htmlFor)}
                  type={show[label.htmlFor] ? "text" : "password"}
                  id={label.htmlFor}
                  // focusBorderColor="pink.400"
                />
                <InputRightElement>
                  <IconButton
                    variant="none"
                    textColor="slategrey"
                    aria-label="Show password"
                    icon={show[label.htmlFor] ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => toggleShowPassword(label.htmlFor)}
                  />
                </InputRightElement>
              </InputGroup>
            ) : (
              <Input
                {...register(label.htmlFor)}
                id={label.htmlFor}
                type={label.inputType || "text"}
              />
            )}
            {/* {label.isSelect && (
              <Select {...register(label.htmlFor)} id={label.htmlFor}>
                {label.selectOptions?.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )} */}
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
