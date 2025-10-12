// src/Components/AppointmentForm/AppointmentForm.js
import { useState } from "react";
import "./AppointmentForm.css";

export default function AppointmentForm({ doctor, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Patient name is required";
    if (!formData.date) errs.date = "Select a date";
    if (!formData.time) errs.time = "Select a time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.(formData);
    onClose?.();
  };

  return (
    <div className="appt-form">
      <h3>Book Appointment with {doctor?.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </label>

        <label>
          Appointment Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="err">{errors.date}</span>}
        </label>

        <label>
          Appointment Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <span className="err">{errors.time}</span>}
        </label>

        <div className="actions">
          <button type="submit">Confirm</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
