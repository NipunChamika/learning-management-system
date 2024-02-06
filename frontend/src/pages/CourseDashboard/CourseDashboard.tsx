import {
  VStack,
  Text,
  Box,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { LearningMaterialIcon } from "../../icons/LearningMaterialIcon";
import { PdfIcon } from "../../icons/PdfIcon";
import { DownloadIcon } from "../../icons/DownloadIcon";

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
          <AccordionItem
            border="1px"
            borderColor="border-color"
            borderRadius="8px"
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
                  <LearningMaterialIcon boxSize="56px" />
                  <Text>Learning Materials</Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px="64px" py="48px">
              <HStack
                align="center"
                borderBottom="1px"
                borderColor="border-color"
                pb="10px"
              >
                <Flex flex="1" gap="8px">
                  <PdfIcon boxSize="24px" />
                  <Text fontSize="16px" fontWeight="400">
                    Week01_OOP.pdf
                  </Text>
                </Flex>
                <DownloadIcon boxSize="24px" />
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default CourseDashboard;
