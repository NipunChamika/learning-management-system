import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "../../icons/AddIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import Form from "../../components/Form/Form";
import { addUserSchema, updateUserSchema } from "../../validation/validation";
import AlertModal from "../../components/AlertModal/AlertModal";
import { AddUserFormData, UpdateUserFormData } from "../../utils/types";
import { ResetPassword } from "../../icons/ResetPassword";

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: "ADMIN" | "STUDENT";
// }

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "STUDENT";
  password: string;
  confirmPassword: string;
}

interface UsersResponseData {
  data: User[];
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { isOpenModal, setOpenModal } = useUserContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const cancelRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchUsers = () => {
    axios
      .get<UsersResponseData>(
        `http://localhost:3000/user?page=1&limit=10`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setOpenModal("add");
    onOpen();
  };

  const handleUpdateUser = (selectedUser: User) => {
    setOpenModal("edit");
    setSelectedUser(selectedUser);
    onOpen();
  };

  const handleDeleteUser = (selectedUser: User) => {
    setOpenModal("delete");
    setSelectedUser(selectedUser);
    onOpen();
  };

  const handleResetPassword = (selectedUser: User) => {
    setOpenModal("reset");
    setSelectedUser(selectedUser);
    onOpen();
  };

  const onAddUser = (data: AddUserFormData) => {
    axios
      .post(`http://localhost:3000/user`, data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateUser = (data: UpdateUserFormData) => {
    axios
      .patch(`http://localhost:3000/user/${selectedUser?.id}`, data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteUser = () => {
    axios
      .delete(`http://localhost:3000/user/${selectedUser?.id}`, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onResetPassword = () => {
    const data = {
      email: selectedUser?.email,
    };

    axios
      .patch(`http://localhost:3000/user/update-password`, data, config)
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
      <Box mb="24px">
        <Flex color="text-color" align="center" justify="space-between">
          <Text fontSize="30px" fontWeight="500">
            Users
          </Text>
          <Button
            leftIcon={<AddIcon />}
            color="text-color"
            onClick={handleAddUser}
          >
            Add
          </Button>
        </Flex>
        <Box width="100%" h="1px" bgColor="border-color" mt="16px" />
      </Box>

      {isOpenModal === "add" && (
        <ModalDialog isOpen={isOpen} onClose={onClose} modalHeading="Add User">
          <Form
            schema={addUserSchema}
            labels={[
              { labelName: "First Name", htmlFor: "firstName" },
              { labelName: "Last Name", htmlFor: "lastName" },
              { labelName: "Email", htmlFor: "email" },
              {
                labelName: "Role",
                htmlFor: "role",
                isSelect: true,
                selectOptions: [
                  { value: "ADMIN", label: "ADMIN" },
                  { value: "STUDENT", label: "STUDENT" },
                ],
              },
            ]}
            onSubmit={onAddUser}
          />
        </ModalDialog>
      )}

      {isOpenModal === "edit" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Update User"
        >
          <Form
            schema={updateUserSchema}
            labels={[
              { labelName: "First Name", htmlFor: "firstName" },
              { labelName: "Last Name", htmlFor: "lastName" },
              { labelName: "Email", htmlFor: "email" },
              {
                labelName: "Role",
                htmlFor: "role",
                isSelect: true,
                selectOptions: [
                  { value: "ADMIN", label: "ADMIN" },
                  { value: "STUDENT", label: "STUDENT" },
                ],
              },
            ]}
            onSubmit={onUpdateUser}
            defaultValues={{
              firstName: selectedUser?.firstName,
              lastName: selectedUser?.lastName,
              email: selectedUser?.email,
              role: selectedUser?.role,
            }}
          />
        </ModalDialog>
      )}

      {isOpenModal === "delete" && (
        <AlertModal
          deleteAlert
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Delete User"
          alertBody="Are you sure you want to delete this user?"
          handleClick={onDeleteUser}
          buttonTitle="Delete"
        />
      )}

      {isOpenModal === "reset" && (
        <AlertModal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Reset Password"
          alertBody="Are you sure you want to reset the password of this user?"
          handleClick={onResetPassword}
          buttonTitle="Reset"
        />
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderColor="border-color">First Name</Th>
              <Th borderColor="border-color">Last Name</Th>
              <Th borderColor="border-color">Email</Th>
              <Th borderColor="border-color">Role</Th>
              <Th borderColor="border-color">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, i) => (
              <Tr key={i} color="text-color">
                <Td borderColor="border-color">{user.firstName}</Td>
                <Td borderColor="border-color">{user.lastName}</Td>
                <Td borderColor="border-color">{user.email}</Td>
                <Td borderColor="border-color">{user.role}</Td>
                <Td borderColor="border-color">
                  <Flex align="center" gap="16px">
                    <ButtonGroup isAttached variant="outline" size="sm">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        borderColor="border-color"
                        onClick={() => handleUpdateUser(user)}
                      />
                      <IconButton
                        aria-label="Reset"
                        icon={<ResetPassword />}
                        borderColor="border-color"
                        onClick={() => handleResetPassword(user)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        borderColor="border-color"
                        onClick={() => handleDeleteUser(user)}
                      />
                    </ButtonGroup>
                    {/* <EditIcon />
                      <DeleteIcon /> */}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
