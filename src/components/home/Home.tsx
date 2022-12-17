import React, { useEffect } from "react";
import TestTile from "./TestTile";
import "./home.scss";

interface ITest {
  id: number;
  name: string;
  description: string;
}

const Home = () => {
  const [tests, setTests] = React.useState([] as ITest[]);

  useEffect(() => {
    fetch("http://sobke.duckdns.org:8000/sets")
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

export default Home;
