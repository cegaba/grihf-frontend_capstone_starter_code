// src/Components/Navbar/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const authed = !!sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email") || "";
  const displayName = email ? email.split("@")[0] : "";

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
      </nav>

      <div className="nav-right">
        {authed ? (
          <>
            <span className="user-chip">@{displayName}</span>
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
