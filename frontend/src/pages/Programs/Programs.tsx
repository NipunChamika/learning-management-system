import { Box, SimpleGrid, Text } from "@chakra-ui/react";
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

interface Program {
  programId: number;
  programName: string;
  programCode: string;
}

interface ResponseData {
  programs: Program[];
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwNzIwMzgyNSwiZXhwIjoxNzA3MjA3NDI1fQ.RCgX6fwU0R3t2zcKvJGzDIDi_sE0iibBkDc_XoncjhI",
    },
  };

  // TODO: Dynamically pass the studentId to the get request

  useEffect(() => {
    axios
      .get<ResponseData>("http://localhost:3000/program/student/3", config)
      .then((res) => {
        console.log(res.data);
        setPrograms(res.data.programs);
        console.log(programs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (programId: number) => {
    navigate("/courses", { state: { programId } });
  };

  return (
    <>
      <Box mb="24px">
        <Text fontSize="30px" fontWeight="500" color="text-color">
          Programs
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" mt="16px" />
      </Box>

      <SimpleGrid columns={3} spacing={30} minChildWidth="275px">
        {programs.map((program) => (
          <CardItem
            key={program.programId}
            src={Program1}
            alt={`Course ${program.programId}`}
            code={program.programCode}
            name={program.programName}
            navigateTo={() => handleNavigate(program.programId)}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Programs;
