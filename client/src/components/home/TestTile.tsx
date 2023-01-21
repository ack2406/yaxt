import { Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { TestTileProps } from "../../types/Other";

const TestTile = ({ test }: TestTileProps) => {
  return (
    <LinkBox
      w={{ base: "95%", md: "50%", lg: "33%" }}
      p="5"
      borderWidth="1px"
      rounded="md"
      boxShadow={"sm"}
      bg="gray.700"
      _hover={{
        bg: "gray.600",
        transform: "translateY(-2px)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <Heading size="md" my="2">
        <LinkOverlay href={`/solve-test/${test._id}`}>{test.title}</LinkOverlay>
      </Heading>
      <Text mb="3">{test.description}</Text>
    </LinkBox>
  );
};

export default TestTile;
