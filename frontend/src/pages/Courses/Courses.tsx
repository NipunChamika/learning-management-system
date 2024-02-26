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
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";
import Course1 from "../../assets/Program3.png";
import { useUserContext } from "../../context/UserContext";
import { AddCourseFormData } from "../../utils/types";
import { AddIcon } from "../../icons/AddIcon";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import Form from "../../components/Form/Form";
import {
  addCourseSchema,
  updateCourseSchema,
} from "../../validation/validation";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import AlertModal from "../../components/AlertModal/AlertModal";

interface Course {
  courseId: number;
  courseName: string;
  courseCode: string;
  programId: number;
}

interface ResponseDataStudent {
  courses: Course[];
}

const Courses = () => {
  const { user, isOpenModal, setOpenModal } = useUserContext();

  // const { programId } = useParams();
  const location = useLocation();
  const { programId } = location.state || {};

  const [courses, setCourses] = useState<Course[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const cancelRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchCourses = () => {
    axios
      .get<ResponseDataStudent>(
        "http://localhost:3000/course/program/" + programId,
        config
      )
      .then((res) => {
        console.log(res.data);
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, [programId]);

  const navigate = useNavigate();

  const handleNavigate = (
    courseId: number,
    courseCode: string,
    courseName: string
  ) => {
    // navigate(`${courseId}`);
    navigate(`${courseCode}`, { state: { courseId, courseName } });
  };

  const handleAddCourse = () => {
    setOpenModal("add");
    onOpen();
  };

  const handleUpdateCourse = (course: Course) => {
    setOpenModal("edit");
    setSelectedCourse(course);
    onOpen();
  };

  const handleDeleteCourse = (course: Course) => {
    setOpenModal("delete");
    setSelectedCourse(course);
    onOpen();
  };

  const onAddCourse = (data: AddCourseFormData) => {
    axios
      .post(`http://localhost:3000/course/${programId}`, data, config)
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateCourse = (data: AddCourseFormData) => {
    axios
      .patch(
        `http://localhost:3000/course/${selectedCourse?.courseId}`,
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteCourse = () => {
    axios
      .delete(
        `http://localhost:3000/course/${selectedCourse?.courseId}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        onClose();
        fetchCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <Flex color="text-color" align="center" justify="space-between">
          <Text fontSize="30px" fontWeight="500">
            Courses
          </Text>
          {user?.role === "ADMIN" && (
            <Button
              leftIcon={<AddIcon />}
              color="text-color"
              onClick={handleAddCourse}
            >
              Add
            </Button>
          )}
        </Flex>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      {isOpenModal === "add" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Add Course"
        >
          <Form
            schema={addCourseSchema}
            labels={[
              { labelName: "Course Code", htmlFor: "courseCode" },
              { labelName: "Course Name", htmlFor: "courseName" },
            ]}
            onSubmit={onAddCourse}
          />
        </ModalDialog>
      )}

      {isOpenModal === "edit" && (
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          modalHeading="Update Course"
        >
          <Form
            schema={updateCourseSchema}
            labels={[
              { labelName: "Course Code", htmlFor: "courseCode" },
              { labelName: "Course Name", htmlFor: "courseName" },
            ]}
            onSubmit={onUpdateCourse}
            defaultValues={{
              courseCode: selectedCourse?.courseCode,
              courseName: selectedCourse?.courseName,
            }}
          />
        </ModalDialog>
      )}

      {isOpenModal === "delete" && (
        <AlertModal
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          alertHeading="Delete Course"
          alertBody="Are you sure you want to delete this course?"
          handleClick={onDeleteCourse}
        />
      )}

      {user?.role === "STUDENT" ? (
        <SimpleGrid columns={3} spacing={30} minChildWidth="275px">
          {courses.map((course) => (
            <CardItem
              key={course.courseCode}
              src={Course1}
              alt={`Course ${course.courseId}`}
              code={course.courseCode}
              name={course.courseName}
              navigateTo={() =>
                handleNavigate(
                  course.courseId,
                  course.courseCode,
                  course.courseName
                )
              }
            />
          ))}
        </SimpleGrid>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderColor="border-color">Course Code</Th>
                <Th borderColor="border-color">Course Name</Th>
                <Th borderColor="border-color">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((course, i) => (
                <Tr key={i} color="text-color">
                  <Td borderColor="border-color">{course.courseCode}</Td>
                  <Td borderColor="border-color">
                    <Text
                      w="fit-content"
                      _hover={{ textDecor: "underline", cursor: "pointer" }}
                      onClick={() =>
                        handleNavigate(
                          course.courseId,
                          course.courseCode,
                          course.courseName
                        )
                      }
                    >
                      {course.courseName}
                    </Text>
                  </Td>
                  <Td borderColor="border-color">
                    <Flex align="center" gap="16px">
                      <ButtonGroup isAttached variant="outline" size="sm">
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          borderColor="border-color"
                          onClick={() => handleUpdateCourse(course)}
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          borderColor="border-color"
                          onClick={() => handleDeleteCourse(course)}
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

export default Courses;
