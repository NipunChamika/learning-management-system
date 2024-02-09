import { VStack, Text, Box, HStack, Accordion } from "@chakra-ui/react";
import CourseAccordion from "../../components/Accordion/CourseAccordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

interface LearningMaterial {
  learningMaterialId: number;
  learningMaterialTitle: string;
  learningMaterialType: string;
  learningMaterialResourcePath?: string;
}

interface LearningResponseData {
  learningMaterials: LearningMaterial[];
}

interface Assignment {
  assignmentId: number;
  assignmentTitle: string;
  assignmentResourcePath: string;
  assignmentDescription: string;
  assignmentDueDate: Date;
}

interface AssignmentResponseData {
  assignments: Assignment[];
}

const CourseDashboard = () => {
  const { courseCode } = useParams();
  const location = useLocation();
  const { courseId, courseName } = location.state;

  const [learningMaterials, setLearningMaterials] = useState<
    LearningMaterial[]
  >([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwNzQ2NTk4NywiZXhwIjoxNzA3NDY5NTg3fQ.oQdQZ6G4p_DdOd76qKsL9ZSyxpcOPgtSAY63kSu6ihs",
    },
  };

  useEffect(() => {
    axios
      .get<LearningResponseData>(
        "http://localhost:3000/learning-material/course/" + courseId,
        config
      )
      .then((res) => {
        // console.log(res.data.learningMaterials);
        setLearningMaterials(res.data.learningMaterials);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId]);

  useEffect(() => {
    axios
      .get<AssignmentResponseData>(
        "http://localhost:3000/assignment/course/" + courseId,
        config
      )
      .then((res) => {
        // console.log(res.data.learningMaterials);
        setAssignments(res.data.assignments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId]);

  return (
    <>
      <VStack gap={4}>
        <HStack justify="space-between" w="100%">
          <Text fontSize="30px" fontWeight="500" color="text-color">
            {courseName}
          </Text>
          <Text fontSize="15px" fontWeight="500" color="low-text-color">
            {courseCode}
          </Text>
        </HStack>
        <Box width="100%" h="1px" bgColor="border-color" />
      </VStack>

      <Box mt={6}>
        <Accordion allowMultiple>
          <CourseAccordion
            learningMaterials={learningMaterials.map((learningMaterial) => ({
              id: learningMaterial.learningMaterialId,
              panelTitle: learningMaterial.learningMaterialTitle,
            }))}
          />

          <CourseAccordion
            assignments={assignments.map((assignment) => ({
              id: assignment.assignmentId,
              panelTitle: assignment.assignmentTitle,
              description: assignment.assignmentDescription,
              dueDate: assignment.assignmentDueDate,
            }))}
          />
        </Accordion>
      </Box>
    </>
  );
};

export default CourseDashboard;
