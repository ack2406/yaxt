import React, { useEffect } from 'react'
import TestTile from './TestTile'
import './home.scss'

const Home = () => {
  const [tests, setTests] = React.useState([])

  useEffect(() => {
    fetch('http://localhost:8000/sets')
      .then(response => response.json())
      .then(data => setTests(data))
  }, [])
  

  return (
    <div id="home">
      <div id="tests">
        {tests.map((test: any) => (
          <TestTile key={test.id} test={test} />
        ))}
      </div>
    </div>
  )
}

export default Home