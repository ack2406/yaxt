import React from "react";
import { useEffect } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";

interface IAnswer {
  id: number;
  content: string;
  is_correct: boolean;
}

interface IQuestion {
  id: number;
  content: string;
  answers: IAnswer[];
}

interface IAnswerClasses {
  [key: number]: string;
}

interface IQuestionProps {
  question: IQuestion;
  validateAnswer: (question: IQuestion, answer: IAnswer) => void;
}

const Question = ({ question, validateAnswer }: IQuestionProps) => {
  const [active, setActive] = React.useState(true);

  const [answerClasses, setAnswerClasses] = React.useState(
    [] as IAnswerClasses[]
  );

  React.useEffect(() => {
    setAnswerClasses((answerClasses) => {
      question.answers.forEach((answer) => {
        answerClasses[answer.id] = "";
      });
      return answerClasses;
    });
  }, []);

  const clickAnswer = (answer: IAnswer) => {
    if (active) {
      setActive(false);

      validateAnswer(question, answer);

      setAnswerClasses((answerClasses) => {
        answerClasses[answer.id] = "selected";
        return answerClasses;
      });

      question.answers.forEach((otherAnswer) => {
        setAnswerClasses((answerClasses) => {
          if (otherAnswer.is_correct) {
            answerClasses[otherAnswer.id] = "correct";
          } else if (otherAnswer.id === answer.id) {
            answerClasses[otherAnswer.id] = "incorrect";
          } else {
            answerClasses[otherAnswer.id] = "grayed-out";
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
            key={answer.id}
            onClick={() => clickAnswer(answer)}

            


            bg={
              answerClasses && answerClasses[answer.id] == "correct"
                ? useColorModeValue("green.200", "green.600")
                : answerClasses && answerClasses[answer.id] == "incorrect"
                ? useColorModeValue("red.200", "red.600")
                : answerClasses && answerClasses[answer.id] == "grayed-out"
                ? useColorModeValue("whiteAlpha.300", "blackAlpha.300")
                : useColorModeValue("gray.200", "gray.800")
            }

            color={
              answerClasses && answerClasses[answer.id] == "grayed-out"
                ? useColorModeValue("gray.500", "gray.400")
                : useColorModeValue("black", "white")
            }

            transition= {
              answerClasses && answerClasses[answer.id] == ""
                ? "background-color 0.2s ease-in-out, color 0.2s ease-in-out"
                : "none"
            }

            p={2}
            borderRadius="md"
            cursor={
              answerClasses && answerClasses[answer.id] != ""
                ? "default"
                : "pointer"
            }
            borderWidth={2}
            borderColor={
              answerClasses && answerClasses[answer.id] == "correct"
              ? useColorModeValue("green.400", "green.800")
              : answerClasses && answerClasses[answer.id] == "incorrect"
              ? useColorModeValue("red.400", "red.800")
              : answerClasses && answerClasses[answer.id] == "grayed-out"
              ? useColorModeValue("gray.200", "gray.700")
              : useColorModeValue("gray.200", "gray.700")
            }
            _hover={{
              
              bg:
              answerClasses && answerClasses[answer.id] == "correct"
                ? useColorModeValue("green.200", "green.600")
                : answerClasses && answerClasses[answer.id] == "incorrect"
                ? useColorModeValue("red.200", "red.600")
                : answerClasses && answerClasses[answer.id] == "grayed-out"
                ? useColorModeValue("whiteAlpha.300", "blackAlpha.300")
                : useColorModeValue("gray.300", "gray.900")
            }}
          >
            {answer.content}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default Question;
