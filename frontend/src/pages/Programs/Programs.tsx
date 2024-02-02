import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import CardItem from "../../components/CardItem/CardItem";
import Program1 from "../../assets/Program1.png";
import Program2 from "../../assets/Program2.png";
import Program3 from "../../assets/Program3.png";
import Program4 from "../../assets/Program4.png";
import Program5 from "../../assets/Program5.png";
import Program6 from "../../assets/Program6.png";

const Programs = () => {
  return (
    <>
      <Box>
        <Text fontSize="30px" fontWeight="500" color="text-color">
          Programs
        </Text>
        <Box width="100%" h="1px" bgColor="border-color" my="16px" />
      </Box>

      <SimpleGrid columns={3} spacing={30} minChildWidth="275px">
        <CardItem
          src={Program1}
          alt="Program 1"
          code="PROGRAM CODE"
          name="Program name"
        />
        <CardItem
          src={Program2}
          alt="Program 2"
          code="PROGRAM CODE"
          name="Program name"
        />
        <CardItem
          src={Program3}
          alt="Program 3"
          code="PROGRAM CODE"
          name="Program name"
        />

        <CardItem
          src={Program4}
          alt="Program 4"
          code="PROGRAM CODE"
          name="Program name"
        />
        <CardItem
          src={Program5}
          alt="Program 5"
          code="PROGRAM CODE"
          name="Program name"
        />
        <CardItem
          src={Program6}
          alt="Program 6"
          code="PROGRAM CODE"
          name="Program name"
        />
      </SimpleGrid>

      {/* <Grid templateColumns="repeat(3, 1fr)" bg="gray.900">
        <GridItem></GridItem>
      </Grid> */}
    </>
  );
};

export default Programs;
