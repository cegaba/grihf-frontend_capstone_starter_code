// src/Components/DoctorCard/DoctorCard.js
import { useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import "./DoctorCard.css";

function Stars({ value = 0, outOf = 5 }) {
  const full = Math.round(value);
  return (
    <span className="dc-stars" aria-label={`Rating ${value} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => (
        <span key={i} className={i < full ? "star filled" : "star"}>★</span>
      ))}
    </span>
  );
}

export default function DoctorCard({ doctor }) {
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null); // { name, date, time }

  const handleBookClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleConfirm = (data) => {
    // data = { name, date, time } from AppointmentForm
    setAppointment(data);
    setShowForm(false);
    alert(`Booked with ${doctor.name} on ${data.date} at ${data.time} for ${data.name}`);
  };

  const handleCancel = () => {
    const ok = window.confirm("Cancel this appointment?");
    if (ok) {
      setAppointment(null);
      setShowForm(false);
      alert("Appointment cancelled.");
    }
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card__body">
        <img
          className="doctor-card__avatar"
          src={doctor.imageUrl || "https://via.placeholder.com/96x96.png?text=Dr"}
          alt={`${doctor.name} avatar`}
        />
        <h3 className="doctor-card__name">{doctor.name}</h3>
        <p className="doctor-card__specialty">{doctor.specialty}</p>
        <p className="doctor-card__experience">
          {doctor.experienceYears} years experience
        </p>
        <p className="doctor-card__ratings">
          <span className="label">Ratings:</span> <Stars value={doctor.rating || 4} />
        </p>

        {/* If an appointment exists, show a small summary */}
        {appointment && (
          <div className="appt-summary" role="status" aria-live="polite">
            <strong>Appointment:</strong> {appointment.date} at {appointment.time}
            <br />
            <span className="appt-name">Patient: {appointment.name}</span>
          </div>
        )}
      </div>

      {/* Required by lab: options container with Book/Cancel controls */}
      <div className="doctor-card-options-container">
        {/* STATE: no booking yet, no form visible */}
        {!appointment && !showForm && (
          <button className="btn btn-primary" onClick={handleBookClick}>
            Book Appointment
            <div className="btn-sub">No Booking Fee</div>
          </button>
        )}

        {/* STATE: form visible (booking in progress) */}
        {showForm && (
          <div className="options-form-wrap">
            <AppointmentForm
              doctor={doctor}
              onClose={handleCloseForm}
              onSubmit={handleConfirm}
            />
          </div>
        )}

        {/* STATE: booked → allow cancellation */}
        {appointment && !showForm && (
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel Appointment
          </button>
        )}
      </div>
    </div>
  );
}
