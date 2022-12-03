import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar-title">
        <a href="/">Yet Another Exam Tester</a>
      </div>
      <div id="navbar-links">
          <a href="/">Home</a>
          <a href="/add-test/">Add Test</a>
      </div>
    </div>
  )
}

export default Navbar