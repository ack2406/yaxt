import React, { useEffect } from "react";
import TestTile from "./TestTile";

interface ITest {
  id: number;
  name: string;
  description: string;
}

const EditTests = () => {
  const [tests, setTests] = React.useState([] as ITest[]);

  useEffect(() => {
    fetch("http://localhost:5000/tests")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <div className="tests">
      {tests.map((test: ITest) => (
        <TestTile key={test.id} test={test} />
      ))}
    </div>
  );
};

export default EditTests;
