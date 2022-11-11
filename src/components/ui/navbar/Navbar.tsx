import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar-title">
        <h1>Yet Another Exam Tester</h1>
      </div>
      <div id="navbar-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/add-test/">Add Test</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar