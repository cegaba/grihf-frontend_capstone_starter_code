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

/**
 * doctor: { _id, name, specialty, experienceYears, rating, imageUrl }
 */
export default function DoctorCard({ doctor, onBook }) {
  const {
    name = "Dr. Jane Doe",
    specialty = "Dentist",
    experienceYears = 0,
    rating = 4,
    imageUrl,
  } = doctor || {};

  return (
    <div className="doctor-card">
      <div className="doctor-card__body">
        <img
          className="doctor-card__avatar"
          src={imageUrl || "https://via.placeholder.com/96x96.png?text=Dr"}
          alt={`${name} avatar`}
        />

        <h3 className="doctor-card__name">{name}</h3>
        <p className="doctor-card__specialty">{specialty}</p>

        <p className="doctor-card__experience">
          <strong>{experienceYears}</strong> years experience
        </p>

        <p className="doctor-card__ratings">
          <span className="label">Ratings:</span> <Stars value={rating} />
        </p>
      </div>

      {/* BLUE FOOTER per lab */}
      <button className="book-footer" onClick={() => onBook?.(doctor)}>
        Book Appointment
        <br />
        <span className="sub">No Booking Fee</span>
      </button>
    </div>
  );
}
