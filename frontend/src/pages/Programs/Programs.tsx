import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { AddIcon } from "../../icons/AddIcon";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { addProgramSchema } from "../../validation/validation";
import Form from "../../components/Form/Form";

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
  const { user } = useUserContext();

  const [programs, setPrograms] = useState<Program[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // TODO: Dynamically pass the studentId to the get request

  useEffect(() => {
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
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (programId: number, programCode: string) => {
    // navigate(`${programId}`);
    navigate(`${programCode}`, { state: { programId } });
  };

  return (
    <>
      <Box mb="24px">
        <Flex color="text-color" align="center" justify="space-between">
          <Text fontSize="30px" fontWeight="500">
            Programs
          </Text>
          {/* {user?.role === "ADMIN" && <AddIcon boxSize="26px" />} */}
          {user?.role === "ADMIN" && (
            <Button leftIcon={<AddIcon />} color="text-color" onClick={onOpen}>
              Add
            </Button>
          )}
        </Flex>
        <Box width="100%" h="1px" bgColor="border-color" mt="16px" />
      </Box>

      <ModalDialog isOpen={isOpen} onClose={onClose}>
        <Form
          schema={addProgramSchema}
          onClose={onClose}
          labels={[
            { labelName: "Program Code", htmlFor: "programCode" },
            { labelName: "Program Name", htmlFor: "programName" },
          ]}
        />
      </ModalDialog>

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
                navigateTo: () =>
                  handleNavigate(program.programId, program.programCode),
              })}
            />
          ))}
      </SimpleGrid>
    </>
  );
};

export default Programs;
