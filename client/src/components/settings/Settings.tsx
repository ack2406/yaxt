import {
  Box,
  Button,
  Flex, FormLabel,
  Input
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

const API_URL = import.meta.env.VITE_API_URL;

const Settings = () => {
  const [alert, setAlert] = useState("");

  return (
    <Flex direction="column" align="center" justify="center">
      <Box w={{ base: "95%", md: "50%", lg: "33%" }}>
        {alert === "error" && (
          <ErrorAlert/>
        )}
        {alert === "success" && (
          <SuccessAlert/>
        )}
        <Formik
          initialValues={{ token: localStorage.token || "" }}
          onSubmit={(values) => {
            fetch(API_URL + "/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + values.token,
              },
              body: JSON.stringify(values),
            }).then((res) => {
              if (res.status === 200) {
                localStorage.token = values.token;
                setAlert("success");
              } else {
                setAlert("error");
              }
            });
          }}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Flex direction="column" align="center" justify="center" paddingTop="5">
                <Box
                  bg="gray.700"
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  boxShadow="sm"
                  w="100%"
                >
                  <FormLabel px="6" htmlFor="description">Token</FormLabel>
                  <Flex
                    gap="5"
                    px="10"
                  >
                    <Field
                      name="token"
                      as={Input}
                      bg="blackAlpha.100"
                      p="2"
                      value={values.token}
                      onChange={handleChange}
                    />
                    <Button px="4" type="submit">Zatwierdź</Button>
                  </Flex>
                </Box>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Settings;
