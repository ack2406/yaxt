import React, { useEffect } from "react";
import TestTile from "./TestTile";

import { Flex } from "@chakra-ui/react";
import { Test } from "../../types/Basic";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const EditTests = () => {
  const [tests, setTests] = React.useState([] as Test[]);

  useEffect(() => {
    fetch(API_URL + "/tests")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" gap="5">
      {tests.map((test: Test) => (
        <TestTile key={test._id} test={test} />
      ))}
    </Flex>
  );
};

export default EditTests;
