import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";
import Course1 from "../../assets/Program3.png";

interface Course {
  courseId: number;
  courseName: string;
  courseCode: string;
}

interface ResponseData {
  courses: Course[];
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const location = useLocation();

  const { programId } = location.state;

  useEffect(() => {
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwNzI3NjMwNywiZXhwIjoxNzA3Mjc5OTA3fQ.9BHiLD2OX6PlMhJ4f5VFvljEeTsmAGhruy-z4nfeOGk",
      },
    };

    axios
      .get<ResponseData>(
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
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (courseCode: string) => {
    // TODO: Navigate to Course Page with courseId
    navigate(`/courses/${courseCode}`);
  };

  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          Courses
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      <SimpleGrid columns={3} spacing={30} minChildWidth="275px">
        {courses.map((course) => (
          <CardItem
            key={course.courseId}
            src={Course1}
            alt={`Course ${course.courseId}`}
            code={course.courseCode}
            name={course.courseName}
            navigateTo={() => handleNavigate(course.courseCode)}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Courses;
