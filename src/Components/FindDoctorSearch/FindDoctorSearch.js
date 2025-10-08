// src/Components/FindDoctorSearch/FindDoctorSearch.js
import React, { useEffect, useRef, useState } from "react";
import "./FindDoctorSearch.css";

const SPECIALTIES = [
  "Dermatology",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
  "ENT",
  "Psychiatry",
  "Gastroenterology",
];

export default function FindDoctorSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(SPECIALTIES);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Filter list as the user types
  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(
      SPECIALTIES.filter((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  // Call parent onSearch whenever query changes
  useEffect(() => {
    if (onSearch) onSearch(query);
  }, [query, onSearch]);

  // onBlur hiding (click outside)
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => setOpen(true);
  const handleBlur = () => {
    // We hide via “click outside” listener above; keeping this for spec completeness
    // setOpen(false);
  };

  const handleSelect = (value) => {
    setQuery(value);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="docsearch-wrap" ref={wrapperRef}>
      <label htmlFor="docsearch" className="docsearch-label">
        Find a doctor and Consult instantly
      </label>

      <div className="docsearch-inputrow">
        <input
          id="docsearch"
          ref={inputRef}
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="docsearch-input"
          aria-autocomplete="list"
          aria-expanded={open}
          autoComplete="off"
        />
        <button
          className="docsearch-btn"
          type="button"
          onClick={() => onSearch?.(query)}
        >
          Search
        </button>
      </div>

      {open && (
        <ul className="docsearch-dropdown" role="listbox">
          {filtered.length ? (
            filtered.map((s) => (
              <li
                key={s}
                role="option"
                tabIndex={0}
                className="docsearch-item"
                onMouseDown={() => handleSelect(s)}      // mousedown so blur doesn’t hide before click
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelect(s);
                }}
              >
                {s}
              </li>
            ))
          ) : (
            <li className="docsearch-empty">No specialties found</li>
          )}
        </ul>
      )}

      <p className="docsearch-hint">
        Start by searching a specialty (e.g., “Dermatology”).
      </p>
    </div>
  );
}
