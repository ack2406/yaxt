import React, { useEffect } from "react";
import TestTile from "./TestTile";

import { Flex } from "@chakra-ui/react";
import { Test } from "../../types/Basic";

interface ITest {
  id: number;
  name: string;
  description: string;
}

const EditTests = () => {
  const [tests, setTests] = React.useState([] as Test[]);

  useEffect(() => {
    fetch("http://localhost:5000/tests")
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
