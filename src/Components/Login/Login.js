import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css"; // keep or reuse your Sign_Up.css styles if you prefer

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // If already logged in, redirect home
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        // show Logout + @name in Navbar
        navigate("/");
        window.location.reload();
      } else {
        if (json.errors && Array.isArray(json.errors)) {
          setErr(json.errors.map((e) => e.msg).join(" "));
        } else if (json.error) {
          setErr(json.error);
        } else {
          setErr("Login failed. Please try again.");
        }
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap" style={{ marginTop: "5%" }}>
      <h1>Login</h1>

      <div style={{ fontSize: 14, marginBottom: 12 }}>
        New here?{" "}
        <Link to="/signup" style={{ color: "#2563eb", fontWeight: 600 }}>
          Sign Up
        </Link>
      </div>

      <form className="form" onSubmit={login} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {err && <p className="error">{err}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
