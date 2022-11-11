import React from 'react'

const TestTile = ({ test }: any): JSX.Element => {
  return (
    <div className="test-tile">
        <div className="test-tile-title">
            <h2>{test.name}</h2>
        </div>
        <div className="test-tile-description">
            <p>{test.description}</p>
        </div>
    </div>
  )
}

export default TestTile