import React from "react";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

interface ITest {
  id: number;
  name: string;
  description: string;
}

interface ITestTileProps {
  test: ITest;
}

const TestTile = ({ test }: ITestTileProps) => {
  return (
    <LinkBox
      w={{ base: "95%", md: "50%", lg: "33%"}}
      p="5"
      borderWidth="1px"
      rounded="md"
      boxShadow={"sm"}
      bg={useColorModeValue("gray.100", "gray.700")}
      _hover={{
        bg: useColorModeValue("gray.200", "gray.600"),
        transform: 'translateY(-2px)',
        transitionDuration: '0.2s',
        transitionTimingFunction: "ease-in-out"
      }}

    >
      <Heading size="md" my="2">
        <LinkOverlay href={`/test/${test.id}`}>{test.name}</LinkOverlay>
      </Heading>
      <Text mb="3">{test.description}</Text>
    </LinkBox>
  );
};

export default TestTile;
