import React from "react";
import { Field, FieldArray } from "formik";

import AddAnswer from "./AddAnswer";

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

import { useColorModeValue } from "@chakra-ui/react";

import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

import { AlertDialog, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import DeleteDialog from "./DeleteDialog";

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

interface ICloseProps {
  remove: <T>(index: number) => T | undefined;
  indexQuestion: number;
}

const AddQuestion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseConfirm = ({ remove, indexQuestion }: ICloseProps) => {
    onClose();
    remove(indexQuestion);
  };

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const color = useColorModeValue("gray.100", "gray.700");
  const colorButton = useColorModeValue("gray.200", "gray.700");
  const colorButtonHover = useColorModeValue("gray.100", "whiteAlpha.300");

  const bg = useColorModeValue("gray.100", "gray.700");
  const button = useColorModeValue("blackAlpha.100", "blackAlpha.100");

  return (
    <Box w="100%">
      <FieldArray name="questions">
        {({ push, remove, form }) => {
          const { values: valueQuestions } = form;
          const { questions } = valueQuestions;

          return (
            <Box>
              {questions.map((question: IQuestion, indexQuestion: number) => (
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
                      bodyText={`Czy na pewno chcesz usunąć pytanie ${indexQuestion + 1}?`}
                      headerText={`Pytanie ${indexQuestion + 1} zostanie usunięte.`}
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
                    answers: [{ content: "", is_correct: false }],
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
