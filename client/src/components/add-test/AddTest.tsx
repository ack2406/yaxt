import React from "react";
import { FieldArray, Formik, useFormik, Field, Form } from "formik";

import AddQuestion from "./AddQuestion";

import { Textarea, useColorModeValue } from "@chakra-ui/react";

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
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import * as Yup from "yup";

import { useState } from "react";

import { Values } from "../../types/Other";

const AddTest = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const button = useColorModeValue("blackAlpha.100", "blackAlpha.100");

  const [testSubmitted, setTestSubmitted] = useState(false);


  const initialValues = {
    title: "",
    description: "",
    questions: [
      {
        content: "",
        answers: [
          {
            content: "",
            isCorrect: false,
          },
          {
            content: "",
            isCorrect: false,
          },
        ],
      },
    ],
  };

  const onSubmit = ({ values }: Values) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        image: "",
      }),
    };
    fetch("http://localhost:5000/tests", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        values.questions.forEach((question) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              content: question.content,
              image: "",
              test: res.test._id,
            }),
          };
          fetch(
            `http://localhost:5000/tests/${res.id}/questions`,
            requestOptions
          )
            .then((res) => res.json())
            .then((res) => {
              question.answers.forEach((answer) => {
                const requestOptions = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  body: JSON.stringify({
                    content: answer.content,
                    isCorrect: answer.isCorrect || false,
                    question: res.question._id,
                  }),
                };
                fetch(
                  `http://localhost:5000/questions/${res.id}/answers`,
                  requestOptions
                );
              });
            });
        });
      });
  };

  return (
    <Flex align="center" justify="center">
      <Box w={{ base: "95%", md: "50%", lg: "33%" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit({ values })}
          enableReinitialize

        >
          {({ handleSubmit,  }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" align="flex-end">
                {testSubmitted ? (
                  <Alert status="success" borderRadius="md" mb="5">
                    <AlertIcon />
                    Test został dodany!
                  </Alert>
                ) : (
                  <></>
                )}

                <VStack
                  spacing={4}
                  align="flex-start"
                  bg={bg}
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  boxShadow="sm"
                  w="100%"
                >
                  <FormControl>
                    <FormLabel htmlFor="title">Nazwa Testu</FormLabel>
                    <Field
                      bg={button}
                      as={Input}
                      name="title"
                      type="text"
                      placeholder="np. Kolos z Analizy Matematycznej 2018"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="description">Opis Testu</FormLabel>
                    <Field
                      bg={button}
                      as={Textarea}
                      name="description"
                      type="text"
                      resize="none"
                      height="90"
                      placeholder="np. Przykładowe kolokwium udostępnione przez prowadzącego"
                    />
                  </FormControl>
                </VStack>

                <AddQuestion />

                <Button
                  size="lg"
                  mt="10"
                  mb="40"
                  type="submit"
                  colorScheme="blue"
                  onClick={() => {
                    window.scrollTo(0, 0);

                    setTestSubmitted(true);

                  }}
                >
                  Stwórz
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default AddTest;
