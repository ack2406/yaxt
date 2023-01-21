import React from "react";
import { FieldArray, Formik, useFormik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditQuestion from "./EditQuestion";

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
    Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface IAnswer {
  id: number | null;
  content: string;
  is_correct: boolean;
}

interface IQuestion {
  id: number | null;
  content: string;
  answers: IAnswer[];
}

interface ITest {
  id: number | null;
  name: string;
  description: string;
  questions: IQuestion[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const EditTest = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const button = useColorModeValue("blackAlpha.100", "blackAlpha.100");

  const [testSubmitted, setTestSubmitted] = useState(false);
  const [test, setTest] = useState({} as ITest);

  const { id } = useParams();

  useEffect(() => {
    fetch(API_URL + `/tests/${id}`)
      .then((response) => response.json())
      .then((data) => setTest(data));
  }, []);

  return (
    <Flex align="center" justify="center">
      <Box w={{ base: "95%", md: "50%", lg: "33%" }}>
        <Formik
          initialValues={test}
          onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" align="flex-end">
                {testSubmitted ? (
                  <Alert status="success" borderRadius="md" mb="5">
                    <AlertIcon />
                    Test został zaktualizowany!
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

                <EditQuestion />

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

export default EditTest;
