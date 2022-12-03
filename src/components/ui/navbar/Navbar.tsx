import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <a href="/">Yet Another Exam Tester</a>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/add-test/">Add Test</a>
      </div>
    </div>
  );
};

export default Navbar;
