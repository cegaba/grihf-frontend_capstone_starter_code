import React, { useEffect, useState, useMemo } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

export default function InstantConsultation() {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(Array.isArray(data) ? data : []);
        const param = (searchParams.get("speciality") || "").trim();
        if (param) {
          setSearchText(param);
          setIsSearched(true);
        } else {
          setIsSearched(false);
        }
      })
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, [searchParams]);

  const filteredDoctors = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return [];
    return doctors.filter((d) => (d.speciality || "").toLowerCase().includes(q));
  }, [doctors, searchText]);

  const handleSearch = (text) => {
    const q = (text || "").trim();
    setSearchText(q);
    setIsSearched(Boolean(q));
  };

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />
        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available{" "}
                {searchParams.get("location") || ""}
              </h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            <p style={{ marginTop: 16, color: "#6b7280" }}>
              Start by searching a specialty (e.g., “Dermatology”).
            </p>
          )}
        </div>
      </div>
    </center>
  );
}
