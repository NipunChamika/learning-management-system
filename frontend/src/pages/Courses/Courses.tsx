import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwNzE0Mjk0MSwiZXhwIjoxNzA3MTQ2NTQxfQ.j4WmwmhgFVVm2s_Bt5QSzbb89gWDJwZKx69YZLGl_64",
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

  const handleNavigate = () => {
    // TODO: Navigate to Course Page with courseId
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
            navigateTo={() => handleNavigate()}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Courses;
