import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";


import { QuestionProps } from "../../types/Props";
import { Answer } from "../../types/Basic";

interface IAnswerClasses {
  [key: number]: string;
}

const SolveTestQuestion = ({ question, validateAnswer }: QuestionProps) => {
  const [active, setActive] = React.useState(true);

  const [answerClasses, setAnswerClasses] = React.useState(
    [] as IAnswerClasses[]
  );

  React.useEffect(() => {
    setAnswerClasses((answerClasses) => {
      question.answers.forEach((answer) => {
        answerClasses[answer._id] = "";
      });
      return answerClasses;
    });
  }, []);

  const clickAnswer = (answer: Answer) => {
    if (active) {
      setActive(false);

      validateAnswer(question, answer);

      setAnswerClasses((answerClasses) => {
        answerClasses[answer._id] = "selected";
        return answerClasses;
      });

      question.answers.forEach((otherAnswer) => {
        setAnswerClasses((answerClasses) => {
          if (otherAnswer.isCorrect) {
            answerClasses[otherAnswer._id] = "correct";
          } else if (otherAnswer._id === answer._id) {
            answerClasses[otherAnswer._id] = "incorrect";
          } else {
            answerClasses[otherAnswer._id] = "grayed-out";
          }

          return answerClasses;
        });
      });
    }
  };

  return (
    <Box>
      <Text
        bg={useColorModeValue("gray.200", "gray.800")}
        p={2}
        my={7}
        borderRadius="md"
      >
        {question.content}
      </Text>
      <Flex flexDirection="column" gap="2">
        {question.answers.map((answer) => (
          <Text
            key={answer._id}
            onClick={() => clickAnswer(answer)}
            bg={
              answerClasses && answerClasses[answer._id] == "correct"
                ? useColorModeValue("green.200", "green.600")
                : answerClasses && answerClasses[answer._id] == "incorrect"
                ? useColorModeValue("red.200", "red.600")
                : answerClasses && answerClasses[answer._id] == "grayed-out"
                ? useColorModeValue("whiteAlpha.300", "blackAlpha.300")
                : useColorModeValue("gray.200", "gray.800")
            }
            color={
              answerClasses && answerClasses[answer._id] == "grayed-out"
                ? useColorModeValue("gray.500", "gray.400")
                : useColorModeValue("black", "white")
            }
            transition={
              answerClasses && answerClasses[answer._id] == ""
                ? "background-color 0.2s ease-in-out, color 0.2s ease-in-out"
                : "none"
            }
            p={2}
            borderRadius="md"
            cursor={
              answerClasses && answerClasses[answer._id] != ""
                ? "default"
                : "pointer"
            }
            borderWidth={2}
            borderColor={
              answerClasses && answerClasses[answer._id] == "correct"
                ? useColorModeValue("green.400", "green.800")
                : answerClasses && answerClasses[answer._id] == "incorrect"
                ? useColorModeValue("red.400", "red.800")
                : answerClasses && answerClasses[answer._id] == "grayed-out"
                ? useColorModeValue("gray.200", "gray.700")
                : useColorModeValue("gray.200", "gray.700")
            }
            _hover={{
              bg:
                answerClasses && answerClasses[answer._id] == "correct"
                  ? useColorModeValue("green.200", "green.600")
                  : answerClasses && answerClasses[answer._id] == "incorrect"
                  ? useColorModeValue("red.200", "red.600")
                  : answerClasses && answerClasses[answer._id] == "grayed-out"
                  ? useColorModeValue("whiteAlpha.300", "blackAlpha.300")
                  : useColorModeValue("gray.300", "gray.900"),
            }}
          >
            {answer.content}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default SolveTestQuestion;
