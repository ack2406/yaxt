import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Textarea,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  IconButton,
  AlertDialog,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Answer, Question } from "../../types/Basic";
import { TestTileProps } from "../../types/Props";

interface IAnswer {
  id: number | null;
  content: string;
  is_correct: boolean;
}

const TestTile = ({ test }: TestTileProps) => {
  const getTest = () => {
    // get test from database
    return fetch(`http://localhost:5000/tests/${test.id}`)
      .then((response) => response.json())
      .then((data) => data);
  };

  // create function that removes test with all its questions and answers
  const removeTest = async () => {
    const fullTest = await getTest();
    const questions = fullTest.questions;
    const answers = questions.map((question: Question) => question.answers)[0];

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "authorization": 'Bearer ' + localStorage.getItem('token') },
    };

    // // remove all answers
    answers &&
      answers.forEach((answer: IAnswer) => {
        fetch(`http://localhost:5000/answers/${answer.id}`, requestOptions);
      });

    // // remove all questions
    questions &&
      questions.forEach((question: IQuestion) => {
        fetch(`http://localhost:5000/questions/${question.id}`, requestOptions);
      });

    // // remove test

    fetch(`http://localhost:5000/tests/${test.id}`, requestOptions);

    // // refresh page
    window.location.reload();
  };

  return (
    <LinkBox
      w={{ base: "95%", md: "50%", lg: "33%" }}
      p="5"
      borderWidth="1px"
      rounded="md"
      boxShadow={"sm"}
      bg={useColorModeValue("gray.100", "gray.700")}
      _hover={{
        bg: useColorModeValue("gray.200", "gray.600"),
        transform: "translateY(-2px)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <HStack justify="space-between">
        <Box>
          <Heading size="md" my="2">
            <LinkOverlay href={`/edit-test/${test._id}`}>
              {test.title}
            </LinkOverlay>
          </Heading>
          <Text mb="3">{test.description}</Text>
        </Box>
        <Box>
          <IconButton
            aria-label="Delete test"
            icon={<DeleteIcon/>}
            onClick={removeTest}
            colorScheme="red"
          />
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default TestTile;
