import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text
} from "@chakra-ui/react";
import { Answer, Question } from "../../types/Basic";
import { TestTileProps } from "../../types/Props";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const TestTile = ({ test }: TestTileProps) => {
  const getTest = () => {
    // get test from database
    return fetch(API_URL + `/tests/${test._id}`)
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
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    // remove all answers
    answers &&
      answers.forEach((answer: Answer) => {
        fetch(API_URL + `/answers/${answer._id}`, requestOptions);
      });

    // remove all questions
    questions &&
      questions.forEach((question: Question) => {
        fetch(API_URL + `/questions/${question._id}`, requestOptions);
      });

    // remove test
    fetch(API_URL + `/tests/${test._id}`, requestOptions);

    // refresh page
    window.location.reload();
  };

  return (
    <LinkBox
      w={{ base: "95%", md: "50%", lg: "33%" }}
      p="5"
      borderWidth="1px"
      rounded="md"
      boxShadow="sm"
      bg="gray.700"
      _hover={{
        bg: "gray.600",
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
            icon={<DeleteIcon />}
            onClick={removeTest}
            colorScheme="red"
          />
        </Box>
      </HStack>
    </LinkBox>
  );
};

export default TestTile;
