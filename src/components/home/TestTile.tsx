import React from "react";
import { Link } from "react-router-dom";

interface Test {
  id: number;
  name: string;
  description: string;
}

interface TestTileProps {
  test: Test;
}

const TestTile = ({ test }: TestTileProps) => {
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
