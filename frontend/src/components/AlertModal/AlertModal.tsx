import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { RefObject } from "react";

interface Props {
  isOpen: boolean;
  leastDestructiveRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
  alertHeading: string;
  alertBody: string;
  handleClick: () => void;
}

const AlertModal = ({
  isOpen,
  leastDestructiveRef,
  onClose,
  alertHeading,
  alertBody,
  handleClick,
}: Props) => {
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="bg-color">
            <AlertDialogHeader color="text-color">
              {alertHeading}
            </AlertDialogHeader>

            <AlertDialogBody color="text-color">{alertBody}</AlertDialogBody>

            <AlertDialogFooter gap="8px">
              <Button
                ref={leastDestructiveRef}
                onClick={onClose}
                color="text-color"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClick}
                color="danger-text-color"
                _hover={{ bg: "btn-danger", color: "danger-text-hover" }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertModal;
