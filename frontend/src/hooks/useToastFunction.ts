import { useToast } from "@chakra-ui/react";

type toastFunctionParams = {
  title: string;
  description?: string;
  status: "info" | "warning" | "error" | "success" | "loading";
  duration?: number;
};

const useToastFunction = () => {
  const toast = useToast();

  const toastFunction = ({
    title,
    description,
    status,
    duration = 3000,
  }: toastFunctionParams) => {
    toast.closeAll();

    toast({
      title: title,
      description: description,
      status: status,
      variant: "left-accent",
      position: "top",
      duration: duration,
      isClosable: true,
    });
  };

  return toastFunction;
};

export default useToastFunction;
