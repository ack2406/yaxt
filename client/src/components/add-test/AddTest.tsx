import { Field, Formik } from "formik";

import AddQuestion from "./AddQuestion";

import { Textarea } from "@chakra-ui/react";

import {
  Box,
  Button, Flex,
  FormControl,
  FormLabel, Input,
  VStack
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon
} from "@chakra-ui/react";


import { useState } from "react";

import { Values } from "../../types/Other";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const AddTest = () => {
  const bg = "gray.700";
  const button = "blackAlpha.100";

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
    fetch(API_URL + "/tests", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        values.questions.forEach((question) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              content: question.content,
              image: "",
              test: res.test._id,
            }),
          };
          fetch(
            API_URL + `/questions`,
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
                  API_URL + `/answers`,
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
