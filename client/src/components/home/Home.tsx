import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Test } from "../../types/Basic";
import TestTile from "./TestTile";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Home = () => {
  const [tests, setTests] = useState([] as Test[]);

  useEffect(() => {
    fetch(API_URL + "/tests")
      .then((response) => response.json())
      .then((data) => setTests(data.tests));
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" gap="5">
      {tests.map((test: Test) => (
        <TestTile key={test._id} test={test} />
      ))}
    </Flex>
  );
};

export default Home;
