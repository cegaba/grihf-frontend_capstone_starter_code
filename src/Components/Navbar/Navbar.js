// src/Components/Navbar/Navbar.js

// 1. Import useState from React and your new ProfileCard component
import React, { useState } from "react"; 
import { NavLink } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard"; // Make sure this path is correct
import "./Navbar.css";

export default function Navbar() {
  const authed = !!sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email") || "";
  const displayName = email ? email.split("@")[0] : "";

  // 2. Add state to manage the dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="nav-bar">
      <div className="nav-left">
        <NavLink to="/" className="brand">StayHealthy</NavLink>
      </div>

      <nav className="nav-center">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/instant-consultation">Instant</NavLink>
        <NavLink to="/booking">Booking</NavLink>
      </nav>

      <div className="nav-right">
        {authed ? (
          <>
            {/* 3. Wrap the user chip in a container and add the dropdown logic */}
            <div className="user-menu-container">
              <span className="user-chip" onClick={toggleDropdown}>
                @{displayName}
              </span>
              {/* This line conditionally renders the ProfileCard */}
              {isDropdownVisible && <ProfileCard />}
            </div>
            <button className="primary">Logout</button>
          </>
        ) : (
          <NavLink to="/appointments">
            <button className="primary">Book now</button>
          </NavLink>
        )}
      </div>
    </header>
  );
}