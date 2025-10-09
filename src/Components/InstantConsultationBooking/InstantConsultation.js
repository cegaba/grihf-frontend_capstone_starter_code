import { useState } from "react";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC"; // same folder (./)
import DoctorCard from "../DoctorCard/DoctorCard"; // sibling folder (..)
import "./InstantConsultation.css";

const MOCK_DOCTORS = [
  {
    _id: "d1",
    name: "Dr. Emily Carter",
    specialty: "Cardiology",
    experienceYears: 12,
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300",
  },
  {
    _id: "d2",
    name: "Dr. Miguel Alvarez",
    specialty: "Dermatology",
    experienceYears: 8,
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300",
  },
  {
    _id: "d3",
    name: "Dr. Priya Nair",
    specialty: "Pediatrics",
    experienceYears: 10,
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
  },
];

export default function InstantConsultation() {
  const [doctors] = useState(MOCK_DOCTORS);
  const handleBook = (doc) => alert(`Booking started for ${doc.name}`);

  return (
    <main className="ic-page">
      <FindDoctorSearchIC />

      <div className="ic-header">
        <h2>{doctors.length} doctors available in</h2>
        <p className="ic-subtitle">
          Book appointments with minimum wait-time &amp; verified doctor details
        </p>
      </div>

      <div className="cards-grid">
        {doctors.map((d) => (
          <DoctorCard key={d._id} doctor={d} onBook={handleBook} />
        ))}
      </div>
    </main>
  );
}
