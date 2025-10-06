// Sign_Up.js — connects Sign Up form to backend
import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export default function SignUp() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Error / feedback
  const [showErr, setShowErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Submit handler
  const register = async (e) => {
    e.preventDefault();
    setShowErr("");

    // quick front-end guard
    if (!name || !email || !password || !phone) {
      setShowErr("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const json = await res.json();

      if (json.authtoken) {
        // persist session info
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        // go home and refresh so Navbar re-renders as logged-in
        navigate("/");
        window.location.reload();
      } else {
        // backend may return {errors:[{msg:...}]} or {error:"..."}
        if (json.errors && Array.isArray(json.errors)) {
          setShowErr(json.errors.map((e) => e.msg).join(" "));
        } else if (json.error) {
          setShowErr(json.error); // e.g., "Email already exists"
        } else {
          setShowErr("Sign up failed. Please try again.");
        }
      }
    } catch (err) {
      setShowErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap" style={{ marginTop: "5%" }}>
      <h1>Sign Up</h1>

      <form className="form" onSubmit={register} noValidate>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        {/* If email already exists, backend will send an error we show below */}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {showErr && <p className="error">{showErr}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <Link to="/login">
            <button type="button" className="secondary">Already have an account?</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
