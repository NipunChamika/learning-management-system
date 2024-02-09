import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PdfIcon } from "../../icons/PdfIcon";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { AssignmentItemIcon } from "../../icons/AssignmentItemIcon";
import { LearningMaterialIcon } from "../../icons/LearningMaterialIcon";
import { AssignmentIcon } from "../../icons/AssignmentIcon";

type LearningMaterial = {
  id: number;
  panelTitle: string;
};

type Assignment = {
  id: number;
  panelTitle: string;
  dueDate: Date;
  description: string;
};

interface Props {
  learningMaterials?: LearningMaterial[];
  assignments?: Assignment[];
}

const CourseAccordion = ({ learningMaterials, assignments }: Props) => {
  const date = (dueDate: Date) => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    const formattedDate = formatter.format(new Date(dueDate));

    return formattedDate;
  };

  return (
    <>
      <AccordionItem
        border="1px"
        borderColor="border-color"
        borderRadius="8px"
        mb="30px"
      >
        <h2>
          <AccordionButton
            px="24px"
            py="20px"
            bg="bg-default"
            borderRadius="8px"
            borderColor="border-color"
            _expanded={{ borderBottom: "1px", borderColor: "border-color" }}
            fontSize="22px"
            fontWeight="500"
          >
            <Flex flex="1" textAlign="left" alignItems="center" gap="12px">
              <Icon
                as={learningMaterials ? LearningMaterialIcon : AssignmentIcon}
                boxSize="56px"
              />
              <Text>
                {learningMaterials ? "Learning Materials" : "Assignments"}
              </Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px="64px" pt="48px">
          {learningMaterials &&
            learningMaterials.map((material) => (
              <HStack
                key={material.id}
                align="center"
                borderBottom="1px"
                borderColor="border-color"
                pb="16px"
                mb="40px"
              >
                <Flex flex="1" gap="8px" align="center">
                  <PdfIcon boxSize="35px" />
                  <Text fontSize="16px" fontWeight="400">
                    {material.panelTitle}
                  </Text>
                </Flex>
                <DownloadIcon boxSize="24px" />
              </HStack>
            ))}
          {assignments &&
            assignments.map((assignment) => (
              <HStack
                key={assignment.id}
                align="center"
                borderBottom="1px"
                borderColor="border-color"
                pb="16px"
                mb="40px"
              >
                <VStack align="stretch" spacing="16px">
                  <Flex flex="1" gap="8px" align="center">
                    <AssignmentItemIcon boxSize="35px" />
                    <Box>
                      <Text fontSize="20px" fontWeight="400">
                        {assignment.panelTitle}
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight="400"
                        color="date-time-color"
                      >
                        {`Due date: ${date(assignment.dueDate)}`}
                      </Text>
                    </Box>
                  </Flex>
                  <Text
                    fontSize="16px"
                    fontWeight="300"
                    color="paragraph-color"
                  >
                    {assignment.description}
                  </Text>
                </VStack>
              </HStack>
            ))}
          {(learningMaterials?.length === 0 || assignments?.length === 0) && (
            <>
              <Text
                mb="30px"
                fontSize="16px"
                color="low-text-color"
                textAlign="center"
              >
                No content available.
              </Text>
            </>
          )}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default CourseAccordion;
