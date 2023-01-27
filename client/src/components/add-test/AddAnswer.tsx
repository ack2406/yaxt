import { Field, FieldArray } from "formik";
import React from "react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { AddAnswerProps } from "../../types/Props";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  Textarea,
  VStack
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";


import DeleteDialog from "./DeleteDialog";

import { CloseProps } from "../../types/Props";

const AddAnswer = ({ indexQuestion, question }: AddAnswerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseConfirm = ({ remove, indexQuestion }: CloseProps) => {
    onClose();
    remove(indexQuestion);
  };

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  const color = "blackAlpha.100";
  const colorButton = "blackAlpha.100";
  const colorButtonHover = "whiteAlpha.200";

  const bg = "gray.700";
  const button = "blackAlpha.100";
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
                      indexQuestion={indexAnswer}
                      bodyText={`Czy na pewno chcesz usunąć odpowiedź ${
                        indexAnswer + 1
                      }?`}
                      headerText={`Odpowiedź ${
                        indexAnswer + 1
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
                      name={`questions.${indexQuestion}.answers.${indexAnswer}.isCorrect`}
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
