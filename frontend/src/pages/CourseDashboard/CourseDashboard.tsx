import { VStack, Text, Box, HStack, Accordion } from "@chakra-ui/react";
import CourseAccordion from "../../components/Accordion/CourseAccordion";

const CourseDashboard = () => {
  return (
    <>
      <VStack gap={4}>
        <HStack justify="space-between" w="100%">
          <Text fontSize="30px" fontWeight="500" color="text-color">
            Course Name
          </Text>
          <Text fontSize="15px" fontWeight="500" color="low-text-color">
            Course Code
          </Text>
        </HStack>
        <Box width="100%" h="1px" bgColor="border-color" />
      </VStack>

      <Box mt={6}>
        <Accordion allowMultiple>
          <CourseAccordion
            learningMaterials={[
              { id: 1, panelTitle: "Week01_OOP.pdf" },
              { id: 2, panelTitle: "Week02_OOP.pdf" },
            ]}
          />

          <CourseAccordion
            assignments={[
              {
                id: 1,
                panelTitle: "Coursework 1 Submission",
                dueDate: "07/02/2024, 13.00",
              },
              {
                id: 1,
                panelTitle: "Coursework 2 Submission",
                dueDate: "20/03/2024, 13.00",
              },
            ]}
          />
        </Accordion>
      </Box>
    </>
  );
};

export default CourseDashboard;
