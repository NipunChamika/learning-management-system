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
} from "@chakra-ui/react";
import { AddIcon } from "../../icons/AddIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import axios from "axios";
import { useEffect, useState } from "react";

interface Users {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}

interface UsersResponseData {
  data: Users[];
}

const Users = () => {
  const [users, setUsers] = useState<Users[]>([]);

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
            // onClick={handleAddUser}
          >
            Add
          </Button>
        </Flex>
        <Box width="100%" h="1px" bgColor="border-color" mt="16px" />
      </Box>

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
                        //   onClick={() => handleUpdateProgram(program)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        borderColor="border-color"
                        //   onClick={() => handleDeleteProgram(program)}
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
