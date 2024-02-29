import {
  VStack,
  Text,
  Box,
  HStack,
  Accordion,
  useDisclosure,
} from "@chakra-ui/react";
import CourseAccordion from "../../components/Accordion/CourseAccordion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import Form from "../../components/Form/Form";
import {
  addAssignmentSchema,
  addMaterialSchema,
  updateAssignmentSchema,
  updateMaterialSchema,
} from "../../validation/validation";
import {
  AddAssignmentFormData,
  AddMaterialFormData,
  UpdateAssignmentFormData,
  UpdateMaterialFormData,
} from "../../utils/types";
import AlertModal from "../../components/AlertModal/AlertModal";
import PathBreadcrumb from "../../components/PathBreadcrumb/PathBreadcrumb";

interface LearningMaterial {
  learningMaterialId: number;
  learningMaterialTitle: string;
  learningMaterialType: string;
  learningMaterialResourcePath?: string;
}

type LearningMaterialForPost = {
  materialId: number;
  learningMaterialTitle: string;
  materialType: string;
  resourcePath: string;
};

interface LearningResponseData {
  learningMaterials: LearningMaterial[];
}

interface Assignment {
  assignmentId: number;
  assignmentTitle: string;
  assignmentResourcePath: string;
  assignmentDescription: string;
  assignmentDueDate: string;
}

type AssignmentForPost = {
  assignmentId: number;
  assignmentTitle: string;
  resourcePath: string;
  description: string;
  dueDate: string;
};

interface AssignmentResponseData {
  assignments: Assignment[];
}

const CourseDashboard = () => {
  const { programId, courseId } = useParams();
  const location = useLocation();
  const { courseCode, courseName } = location.state;

  const [learningMaterials, setLearningMaterials] = useState<
    LearningMaterial[]
  >([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpenModal, setOpenModal } = useUserContext();

  const [isModalType, setModalType] = useState<"material" | "assignment">(
    "material"
  );

  const [selectedMaterial, setSelectedMaterial] =
    useState<LearningMaterialForPost>();

  const [selectedAssignment, setSelectedAssignment] =
    useState<AssignmentForPost>();

  const cancelRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchLearningMaterials = () => {
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
  };

  useEffect(() => {
    fetchLearningMaterials();
  }, [courseId]);

  const fetchAssignments = () => {
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
  };

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const handleAddMaterial = () => {
    setModalType("material");
    setOpenModal("add");
    onOpen();
  };

  const handleAddAssignment = () => {
    setModalType("assignment");
    setOpenModal("add");
    onOpen();
  };

  const handleUpdateMaterial = (selectedMaterial: LearningMaterialForPost) => {
    setModalType("material");
    setOpenModal("edit");
    setSelectedMaterial(selectedMaterial);
    onOpen();
  };

  const handleUpdateAssignment = (selectedAssignment: AssignmentForPost) => {
    setModalType("assignment");
    setOpenModal("edit");
    setSelectedAssignment(selectedAssignment);
    onOpen();
  };

  const handleDeleteMaterial = (selectedMaterial: LearningMaterialForPost) => {
    setModalType("material");
    setOpenModal("delete");
    setSelectedMaterial(selectedMaterial);
    onOpen();
  };

  const handleDeleteAssignment = (selectedAssignment: AssignmentForPost) => {
    setModalType("assignment");
    setOpenModal("delete");
    setSelectedAssignment(selectedAssignment);
    onOpen();
  };

  const onAddMaterial = (data: AddMaterialFormData) => {
    axios
      .post(`http://localhost:3000/learning-material/${courseId}`, data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchLearningMaterials();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("Material added");
  };

  const onAddAssignment = (data: AddAssignmentFormData) => {
    axios
      .post(`http://localhost:3000/assignment/${courseId}`, data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchAssignments();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("Assignment added");
  };

  const onUpdateMaterial = (data: UpdateMaterialFormData) => {
    axios
      .patch(
        `http://localhost:3000/learning-material/${selectedMaterial?.materialId}`,
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchLearningMaterials();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateAssignment = (data: UpdateAssignmentFormData) => {
    const formattedDueDate = `${data.dueDate}:00Z`;

    axios
      .patch(
        `http://localhost:3000/assignment/${selectedAssignment?.assignmentId}`,
        { ...data, dueDate: formattedDueDate },
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchAssignments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formattedDueDate = selectedAssignment?.dueDate.slice(0, 16);

  const onDeleteMaterial = () => {
    axios
      .delete(
        `http://localhost:3000/learning-material/${selectedMaterial?.materialId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchLearningMaterials();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteAssignment = () => {
    axios
      .delete(
        `http://localhost:3000/assignment/${selectedAssignment?.assignmentId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchAssignments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <VStack gap={4}>
        <PathBreadcrumb
          paths={[
            { pathName: "Programs", pathTo: `/programs` },
            { pathName: "Courses", pathTo: `/programs/${programId}` },
            {
              pathName: "Dashboard",
              pathTo: `/programs/${programId}/${courseId}`,
              isCurrentPage: true,
            },
          ]}
        />
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

      {isOpenModal === "add" && isModalType === "material" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Add Program"
        >
          <Form
            schema={addMaterialSchema}
            labels={[
              {
                labelName: "Learning Material Title",
                htmlFor: "learningMaterialTitle",
              },
              { labelName: "File Type", htmlFor: "materialType" },
              { labelName: "Resource Path", htmlFor: "resourcePath" },
            ]}
            onSubmit={onAddMaterial}
          />
        </ModalDialog>
      )}

      {isOpenModal === "add" && isModalType === "assignment" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Add Assignment"
        >
          <Form
            schema={addAssignmentSchema}
            labels={[
              {
                labelName: "Assignment Title",
                htmlFor: "assignmentTitle",
              },
              { labelName: "Resource Path", htmlFor: "resourcePath" },
              {
                labelName: "Description",
                htmlFor: "description",
                isTextarea: true,
              },
              {
                labelName: "Due Date",
                htmlFor: "dueDate",
                inputType: "datetime-local",
              },
            ]}
            onSubmit={onAddAssignment}
          />
        </ModalDialog>
      )}

      {isOpenModal === "edit" && isModalType === "material" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Update Program"
        >
          <Form
            schema={updateMaterialSchema}
            labels={[
              {
                labelName: "Learning Material Title",
                htmlFor: "learningMaterialTitle",
              },
              { labelName: "File Type", htmlFor: "materialType" },
              { labelName: "Resource Path", htmlFor: "resourcePath" },
            ]}
            onSubmit={onUpdateMaterial}
            defaultValues={selectedMaterial}
          />
        </ModalDialog>
      )}

      {isOpenModal === "edit" && isModalType === "assignment" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Update Assignment"
        >
          <Form
            schema={updateAssignmentSchema}
            labels={[
              {
                labelName: "Assignment Title",
                htmlFor: "assignmentTitle",
              },
              { labelName: "Resource Path", htmlFor: "resourcePath" },
              {
                labelName: "Description",
                htmlFor: "description",
                isTextarea: true,
              },
              {
                labelName: "Due Date",
                htmlFor: "dueDate",
                inputType: "datetime-local",
              },
            ]}
            onSubmit={onUpdateAssignment}
            defaultValues={{ ...selectedAssignment, dueDate: formattedDueDate }}
          />
        </ModalDialog>
      )}

      {isOpenModal === "delete" && isModalType === "material" && (
        <AlertModal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Delete Learning Material"
          alertBody="Are you sure you want to delete this learning material?"
          handleClick={onDeleteMaterial}
        />
      )}

      {isOpenModal === "delete" && isModalType === "assignment" && (
        <AlertModal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Delete Assignment"
          alertBody="Are you sure you want to delete this assignment?"
          handleClick={onDeleteAssignment}
        />
      )}

      <Box mt={6}>
        <Accordion allowMultiple>
          <CourseAccordion
            learningMaterials={learningMaterials.map((learningMaterial) => ({
              id: learningMaterial.learningMaterialId,
              panelTitle: learningMaterial.learningMaterialTitle,
              materialType: learningMaterial.learningMaterialType,
              resourcePath: learningMaterial.learningMaterialResourcePath || "",
            }))}
            handleAdd={handleAddMaterial}
            handleUpdateMaterial={handleUpdateMaterial}
            handleDeleteMaterial={handleDeleteMaterial}
          />

          <CourseAccordion
            assignments={assignments.map((assignment) => ({
              id: assignment.assignmentId,
              panelTitle: assignment.assignmentTitle,
              resourcePath: assignment.assignmentResourcePath,
              description: assignment.assignmentDescription,
              dueDate: assignment.assignmentDueDate,
            }))}
            handleAdd={handleAddAssignment}
            handleUpdateAssignment={handleUpdateAssignment}
            handleDeleteAssignment={handleDeleteAssignment}
          />
        </Accordion>
      </Box>
    </>
  );
};

export default CourseDashboard;
