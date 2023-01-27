import { Field, FieldArray } from "formik";
import React from "react";

import AddAnswer from "./AddAnswer";

import {
  Box,
  Button,
  FormControl,
  Heading,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useDisclosure } from "@chakra-ui/react";

import DeleteDialog from "./DeleteDialog";

import { Question } from "../../types/Basic";
import { CloseProps } from "../../types/Props";

const AddQuestion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseConfirm = ({ remove, indexQuestion }: CloseProps) => {
    onClose();
    remove(indexQuestion);
  };

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const color = "gray.700";
  const colorButton = "gray.700";
  const colorButtonHover = "whiteAlpha.300";

  const bg = "gray.700";
  const button = "blackAlpha.100";

  return (
    <Box w="100%">
      <FieldArray name="questions">
        {({ push, remove, form }) => {
          const { values: valueQuestions } = form;
          const { questions } = valueQuestions;

          return (
            <Box>
              {questions.map((question: Question, indexQuestion: number) => (
                <VStack
                  key={indexQuestion}
                  spacing={4}
                  align="flex-start"
                  bg={color}
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  boxShadow="sm"
                  mt="8"
                >
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb="5"
                  >
                    <Heading size="md">Pytanie {indexQuestion + 1}</Heading>

                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onOpen();
                      }}
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
                      bodyText={`Czy na pewno chcesz usunąć pytanie ${
                        indexQuestion + 1
                      }?`}
                      headerText={`Pytanie ${
                        indexQuestion + 1
                      } zostanie usunięte.`}
                    />
                  </FormControl>
                  <FormControl pb="5" borderBottom="1px" borderColor="gray.600">
                    <Field
                      as={Textarea}
                      bg={button}
                      resize="none"
                      height="90"
                      name={`questions.${indexQuestion}.content`}
                      type="text"
                      placeholder="Treść Pytania, np. Ile wynosi pole trójkąta o podstawie 5 m i wysokości 10 m?"
                    />
                  </FormControl>

                  <AddAnswer
                    question={question}
                    indexQuestion={indexQuestion}
                  />
                </VStack>
              ))}
              <Button
                bg={colorButton}
                size="lg"
                p="5"
                borderWidth="1px"
                rounded="md"
                boxShadow="sm"
                mt="8"
                w="100%"
                _hover={{
                  bg: colorButtonHover,
                }}
                onClick={() =>
                  push({
                    content: "",
                    answers: [{ content: "", isCorrect: false }],
                  })
                }
              >
                <AddIcon mr="2" />
                Dodaj Pytanie
              </Button>
            </Box>
          );
        }}
      </FieldArray>
    </Box>
  );
};

export default AddQuestion;
