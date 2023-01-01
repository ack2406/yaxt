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

interface IValues {
  values: {
    name: string;
    description: string;
    questions: {
      content: string;
      answers: {
        content: string;
        is_correct: boolean;
      }[];
    }[];
  };
}

const AddTest = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const button = useColorModeValue("blackAlpha.100", "blackAlpha.100");


  const initialValues = {
    name: "",
    description: "",
    questions: [
      {
        content: "",
        answers: [
          {
            content: "",
            is_correct: false,
          },
          {
            content: "",
            is_correct: false,
          },
        ],
      },
    ],
  };

  const onSubmit = ({ values }: IValues) => {
    alert(JSON.stringify(values, null, 2));
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     name: values.name,
    //     description: values.description,
    //     picture_path: "",
    //   }),
    // };
    // fetch("http://localhost:5000/tests", requestOptions)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     values.questions.forEach((question) => {
    //       const requestOptions = {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //         body: JSON.stringify({
    //           content: question.content,
    //           picture_path: "",
    //         }),
    //       };
    //       fetch(
    //         `http://localhost:5000/tests/${res.id}/questions`,
    //         requestOptions
    //       )
    //         .then((res) => res.json())
    //         .then((res) => {
    //           question.answers.forEach((answer) => {
    //             const requestOptions = {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 authorization: "Bearer " + localStorage.getItem("token"),
    //               },
    //               body: JSON.stringify({
    //                 content: answer.content,
    //                 is_correct: answer.is_correct,
    //                 question_id: res.id,
    //               }),
    //             };
    //             fetch(
    //               `http://localhost:5000/questions/${res.id}/answers`,
    //               requestOptions
    //             );
    //           });
    //         });
    //     });
    //   });
  };



  return (
    <Flex align="center" justify="center">
      <Box w={{ base: "95%", md: "50%", lg: "33%" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit({ values })}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" align="flex-end">
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
                    <FormLabel htmlFor="name">Nazwa Testu</FormLabel>
                    <Field
                      bg={button}
                      as={Input}
                      name="name"
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

                <Button size="lg" mt="10" mb="40" type="submit" colorScheme="blue">
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
