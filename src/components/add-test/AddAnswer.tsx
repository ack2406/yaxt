import React from "react";
import { Field, FieldArray } from "formik";

import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

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

interface AddAnswerProps {
  indexQuestion: number;
  question: IQuestion;
}

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
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";

import { AlertDialog } from "@chakra-ui/react";

import DeleteDialog from "./DeleteDialog";

interface ICloseProps {
  remove: <T>(index: number) => T | undefined;
  indexQuestion: number;
}

const AddAnswer = ({ indexQuestion, question }: AddAnswerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseConfirm = ({ remove, indexQuestion }: ICloseProps) => {
    onClose();
    remove(indexQuestion);
  };

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  const color = useColorModeValue("gray.100", "blackAlpha.100");
  const colorButton = useColorModeValue("gray.200", "blackAlpha.100");
  const colorButtonHover = useColorModeValue("gray.100", "whiteAlpha.200");

  const bg = useColorModeValue("gray.100", "gray.700");
  const button = useColorModeValue("blackAlpha.100", "blackAlpha.100");
  return (
    <Box w="100%">
      <FieldArray name={`questions.${indexQuestion}.answers`}>
        {({ push, remove }) => {
          return (
            <Box>
              {question.answers.map((_, indexAnswer: number) => (
                <VStack
                  spacing={4}
                  align="flex-start"
                  bg={bg}
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  boxShadow="sm"
                  mt="5"
                  mb="8"
                  key={indexAnswer}
                >
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Heading size="sm">Odpowiedź {indexAnswer + 1}</Heading>

                    <Button
                      colorScheme="red"
                      onClick={() => onOpen()}
                      size="sm"
                    >
                      <DeleteIcon />
                    </Button>

                    <DeleteDialog
                      isOpen={isOpen}
                      cancelRef={cancelRef}
                      onClose={onClose}
                      onCloseConfirm={onCloseConfirm}
                      remove={remove}
                      indexQuestion={indexQuestion}
                      bodyText={`Czy na pewno chcesz usunąć odpowiedź ${
                        indexQuestion + 1
                      }?`}
                      headerText={`Odpowiedź ${
                        indexQuestion + 1
                      } zostanie usunięta.`}
                    />
                  </FormControl>
                  <FormControl>
                    <Field
                      bg={button}
                      as={Textarea}
                      resize="none"
                      name={`questions.${indexQuestion}.answers.${indexAnswer}.content`}
                      type="text"
                      height="90"
                      placeholder={`Treść odpowiedzi, np. ${
                        (indexAnswer + 1) ** 2
                      } cm²`}
                    />
                  </FormControl>
                  <FormControl>
                    <Field
                      as={Checkbox}
                      name={`questions.${indexQuestion}.answers.${indexAnswer}.is_correct`}
                      type="checkbox"
                      size="md"
                    >
                      Poprawna
                    </Field>
                  </FormControl>
                </VStack>
              ))}
              <Button
                bg={colorButton}
                size="lg"
                p="5"
                borderWidth="1px"
                rounded="md"
                w="100%"
                _hover={{
                  bg: colorButtonHover,
                }}
                onClick={() =>
                  push({
                    content: "",
                    is_correct: false,
                  })
                }
              >
                <AddIcon mr="2" />
                Dodaj odpowiedź
              </Button>
            </Box>
          );
        }}
      </FieldArray>
    </Box>
  );
};

export default AddAnswer;
