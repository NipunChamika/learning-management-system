import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";
import Course1 from "../../assets/Program3.png";
import { useUserContext } from "../../context/UserContext";
import { Meta } from "../../utils/types";

interface Course {
  courseId: number;
  courseName: string;
  courseCode: string;
  programId: number;
}

interface ResponseDataStudent {
  courses: Course[];
}

interface ResponseDataAdmin {
  data: Course[];
  meta: Meta;
}

const Courses = () => {
  const { user } = useUserContext();

  // const { programId } = useParams();
  const location = useLocation();
  const { programId } = location.state || {};

  const [courses, setCourses] = useState<Course[]>([]);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    if (user?.role === "STUDENT" && programId) {
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
    }

    if (user?.role === "ADMIN") {
      axios
        .get<ResponseDataAdmin>(
          "http://localhost:3000/course?page=1&limit=10",
          config
        )
        .then((res) => {
          console.log(res.data);
          setCourses(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [programId]);

  const navigate = useNavigate();

  const handleNavigate = (
    courseId: number,
    courseCode: string,
    courseName: string
  ) => {
    // navigate(`${courseId}`);
    if (user?.role === "STUDENT") {
      navigate(`${courseCode}`, { state: { courseId, courseName } });
    }
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
    </>
  );
};

export default Courses;
