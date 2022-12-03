import React, { useEffect } from "react";
import TestTile from "./TestTile";
import "./home.scss";

interface Test {
  id: number;
  name: string;
  description: string;
}

const Home = () => {
  const [tests, setTests] = React.useState([] as Test[]);

  useEffect(() => {
    fetch("http://localhost:8000/sets")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <div id="tests">
      {tests.map((test: Test) => (
        <TestTile key={test.id} test={test} />
      ))}
    </div>
  );
};

export default Home;
