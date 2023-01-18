import React, { useEffect, useState } from "react";
import TestTile from "./TestTile";
import { Flex } from "@chakra-ui/react";

interface ITest {
  id: number;
  name: string;
  description: string;
}

const Home = () => {
  const [tests, setTests] = useState([] as ITest[]);

  useEffect(() => {
    fetch("http://localhost:5000/tests")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" gap="5">
      {tests.map((test: ITest) => (
        <TestTile key={test.id} test={test} />
      ))}
    </Flex>
  );
};

export default Home;