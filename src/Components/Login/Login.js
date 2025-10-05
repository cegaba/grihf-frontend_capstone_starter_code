import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (ev) => setForm({ ...form, [ev.target.name]: ev.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login OK (client validation passed)");
      // TODO: call API_URL + /auth/login
    }
  };

  return (
    <main className="form-wrap">
      <h1>Log in</h1>
      <form className="form" onSubmit={onSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email" value={form.email}
          onChange={onChange} placeholder="you@example.com" required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password" name="password" type="password" value={form.password}
          onChange={onChange} placeholder="••••••••" required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="actions">
          <button type="submit">Log in</button>
        </div>
      </form>
    </main>
  );
}
