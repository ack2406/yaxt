import React from "react";
import { Link } from "react-router-dom";

interface ITest {
  id: number;
  name: string;
  description: string;
}

interface ITestTileProps {
  test: ITest;
}

const TestTile = ({ test }: ITestTileProps) => {
  return (
    <Link to={`/test/${test.id}`}>
      <div className="test-tile">
        <div className="test-tile-title">{test.name}</div>
        <div className="test-tile-description">{test.description}</div>
      </div>
    </Link>
  );
};

export default TestTile;
