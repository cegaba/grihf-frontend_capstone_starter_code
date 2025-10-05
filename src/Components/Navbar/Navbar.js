// src/Components/Navbar/Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  // Example click handler (if you need it later for a mobile menu)
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Navbar button clicked");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Primary">
      <div className="nav-container">
        <Link to="/" className="brand" aria-label="StayHealthy Home">
          StayHealthy
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" className="nav-link">
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav-link">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>

        {
        <button className="primary-btn" onClick={handleClick}>
          Book now
        </button> }
      </div>
    </nav>
  );
}
