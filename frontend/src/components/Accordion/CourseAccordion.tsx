import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PdfIcon } from "../../icons/PdfIcon";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { AssignmentItemIcon } from "../../icons/AssignmentItemIcon";
import { LearningMaterialIcon } from "../../icons/LearningMaterialIcon";
import { AssignmentIcon } from "../../icons/AssignmentIcon";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { AddIcon } from "../../icons/AddIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";

type LearningMaterial = {
  id: number;
  panelTitle: string;
  materialType: string;
  resourcePath: string;
};

type LearningMaterialForPost = {
  materialId: number;
  learningMaterialTitle: string;
  materialType: string;
  resourcePath: string;
};

type Assignment = {
  id: number;
  panelTitle: string;
  resourcePath: string;
  dueDate: string;
  description: string;
};

type AssignmentForPost = {
  assignmentId: number;
  assignmentTitle: string;
  resourcePath: string;
  dueDate: string;
  description: string;
};

interface Props {
  learningMaterials?: LearningMaterial[];
  assignments?: Assignment[];
  handleAdd?: () => void;
  handleUpdateMaterial?: (material: LearningMaterialForPost) => void;
  handleUpdateAssignment?: (assignment: AssignmentForPost) => void;
}

const CourseAccordion = ({
  learningMaterials,
  assignments,
  handleAdd,
  handleUpdateMaterial,
  handleUpdateAssignment,
}: Props) => {
  const { user } = useUserContext();

  const date = (dueDate: string) => {
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

  const navigate = useNavigate();

  const handleNavigate = (id: number, title: string, description: string) => {
    navigate(`${id}`, { state: { title, description } });
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
                {user?.role === "ADMIN" ? (
                  <ButtonGroup isAttached variant="outline" size="sm">
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      borderColor="border-color"
                      onClick={() =>
                        handleUpdateMaterial &&
                        handleUpdateMaterial({
                          materialId: material.id,
                          learningMaterialTitle: material.panelTitle,
                          materialType: material.materialType,
                          resourcePath: material.resourcePath,
                        })
                      }
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      borderColor="border-color"
                      // onClick={handleDeleteMaterial}
                    />
                  </ButtonGroup>
                ) : (
                  <DownloadIcon boxSize="24px" />
                )}
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
                <VStack align="stretch" spacing="16px" w="100%">
                  <Flex
                    flex="1"
                    gap="8px"
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <AssignmentItemIcon boxSize="35px" />
                      <Box>
                        <Text
                          fontSize="20px"
                          fontWeight="400"
                          cursor="pointer"
                          _hover={{ textDecor: "underline" }}
                          onClick={() =>
                            handleNavigate(
                              assignment.id,
                              assignment.panelTitle,
                              assignment.description
                            )
                          }
                        >
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
                    </HStack>
                    <ButtonGroup isAttached variant="outline" size="sm">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        borderColor="border-color"
                        onClick={() =>
                          handleUpdateAssignment &&
                          handleUpdateAssignment({
                            assignmentId: assignment.id,
                            assignmentTitle: assignment.panelTitle,
                            resourcePath: assignment.resourcePath,
                            description: assignment.description,
                            dueDate: assignment.dueDate,
                          })
                        }
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        borderColor="border-color"
                        // onClick={handleDelete}
                      />
                    </ButtonGroup>
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
          {user?.role === "ADMIN" && (
            <Flex mt="-20px">
              <Button
                leftIcon={<AddIcon />}
                color="text-color"
                onClick={handleAdd}
              >
                Add
              </Button>
            </Flex>
          )}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};

export default CourseAccordion;
