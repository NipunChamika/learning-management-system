import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  SimpleGrid,
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
import CardItem from "../../components/CardItem/CardItem";
import Program1 from "../../assets/Program1.png";
// import Program2 from "../../assets/Program2.png";
// import Program3 from "../../assets/Program3.png";
// import Program4 from "../../assets/Program4.png";
// import Program5 from "../../assets/Program5.png";
// import Program6 from "../../assets/Program6.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { AddIcon } from "../../icons/AddIcon";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import {
  addProgramSchema,
  updateProgramSchema,
} from "../../validation/validation";
import Form from "../../components/Form/Form";
import { AddProgramFormData, UpdateProgramFormData } from "../../utils/types";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import AlertModal from "../../components/AlertModal/AlertModal";

type Program = {
  programId: number;
  programName: string;
  programCode: string;
};

interface ResponseDataStudent {
  programs: Program[];
}

interface ResponseDataAdmin {
  data: Program[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}

const Programs = () => {
  const { user, isOpenModal, setOpenModal } = useUserContext();

  const [programs, setPrograms] = useState<Program[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const cancelRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // TODO: Dynamically pass the studentId to the get request

  const fetchPrograms = () => {
    if (user?.role === "STUDENT") {
      axios
        .get<ResponseDataStudent>(
          `http://localhost:3000/program/student/${user?.studentId}`,
          config
        )
        .then((res) => {
          console.log(res.data);
          setPrograms(res.data.programs);
          console.log("I'm a STUDENT");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (user?.role === "ADMIN") {
      axios
        .get<ResponseDataAdmin>(
          `http://localhost:3000/program?page=1&limit=10`,
          config
        )
        .then((res) => {
          console.log(res.data);
          setPrograms(res.data.data);
          console.log("I'm an ADMIN");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (programId: number) => {
    // navigate(`${programId}`);
    navigate(`${programId}`);
  };

  const handleAddProgram = () => {
    setOpenModal("add");
    onOpen();
  };

  const handleUpdateProgram = (selectedProgram: Program) => {
    setOpenModal("edit");
    setSelectedProgram(selectedProgram);
    onOpen();
  };

  const handleDeleteProgram = (program: Program) => {
    setOpenModal("delete");
    setSelectedProgram(program);
    onOpen();
  };

  const onAddProgram = (data: AddProgramFormData) => {
    axios
      .post("http://localhost:3000/program", data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchPrograms();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateProgram = (data: UpdateProgramFormData) => {
    axios
      .patch(
        `http://localhost:3000/program/${selectedProgram?.programId}`,
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchPrograms();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteProgram = () => {
    axios
      .delete(
        `http://localhost:3000/program/${selectedProgram?.programId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchPrograms();
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box mb="24px">
        <Flex color="text-color" align="center" justify="space-between">
          <Text fontSize="30px" fontWeight="500">
            Programs
          </Text>
          {user?.role === "ADMIN" && (
            <Button
              leftIcon={<AddIcon />}
              color="text-color"
              onClick={handleAddProgram}
            >
              Add
            </Button>
          )}
        </Flex>
        <Box width="100%" h="1px" bgColor="border-color" mt="16px" />
      </Box>

      {isOpenModal === "add" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Add Program"
        >
          <Form
            schema={addProgramSchema}
            labels={[
              { labelName: "Program Code", htmlFor: "programCode" },
              { labelName: "Program Name", htmlFor: "programName" },
            ]}
            onSubmit={onAddProgram}
          />
        </ModalDialog>
      )}

      {isOpenModal === "edit" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Update Program"
        >
          <Form
            schema={updateProgramSchema}
            labels={[
              { labelName: "Program Code", htmlFor: "programCode" },
              { labelName: "Program Name", htmlFor: "programName" },
            ]}
            onSubmit={onUpdateProgram}
            defaultValues={{
              programCode: selectedProgram?.programCode,
              programName: selectedProgram?.programName,
            }}
          />
        </ModalDialog>
      )}

      {isOpenModal === "delete" && (
        <AlertModal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Delete Program"
          alertBody="Are you sure you want to delete this program?"
          handleClick={onDeleteProgram}
        />
      )}

      {user?.role === "STUDENT" ? (
        <SimpleGrid columns={3} spacing={30} minChildWidth="275px">
          {Array.isArray(programs) &&
            programs.map((program) => (
              <CardItem
                key={program.programCode}
                src={Program1}
                alt={`Course ${program.programId}`}
                code={program.programCode}
                name={program.programName}
                {...(user?.role === "STUDENT" && {
                  navigateTo: () => handleNavigate(program.programId),
                })}
              />
            ))}
        </SimpleGrid>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor="border-color">Program Code</Th>
                <Th borderColor="border-color">Program Name</Th>
                <Th borderColor="border-color">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {programs.map((program, i) => (
                <Tr key={i} color="text-color">
                  <Td borderColor="border-color">{program.programCode}</Td>
                  <Td borderColor="border-color">
                    <Text
                      w="fit-content"
                      _hover={{ textDecor: "underline", cursor: "pointer" }}
                      onClick={() => handleNavigate(program.programId)}
                    >
                      {program.programName}
                    </Text>
                  </Td>
                  <Td borderColor="border-color">
                    <Flex align="center" gap="16px">
                      <ButtonGroup isAttached variant="outline" size="sm">
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          borderColor="border-color"
                          onClick={() => handleUpdateProgram(program)}
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          borderColor="border-color"
                          onClick={() => handleDeleteProgram(program)}
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
      )}
    </>
  );
};

export default Programs;
