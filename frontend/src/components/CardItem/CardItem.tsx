import { Card, CardBody, Image, Stack, Text } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
  code: string;
  name: string;
}

const CardItem = ({ src, alt, code, name }: Props) => {
  return (
    <>
      <Card
        m={0}
        p={0}
        borderRadius="8px"
        bg="card-bg"
        cursor="pointer"
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      >
        <Image
          src={src}
          alt={alt}
          borderTopRadius="8px"
          h="180px"
          objectFit="cover"
          width="100%"
        />
        <CardBody>
          <Stack>
            <Text fontSize="15px" color="low-text-color" fontWeight="500">
              {code}
            </Text>
            <Text fontSize="22px" fontWeight="500">
              {name}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default CardItem;
