import React, { useMemo, useState } from "react";
import "./ReviewForm.css";

/**
 * Reviews list with “Click Here” buttons that open a simple feedback form.
 * - Matches the sample screenshot: columns & two demo rows.
 * - After submit, the row shows "Yes" under "Review Given" and the button disables.
 * - You can replace the demo data with real data later.
 */
export default function ReviewForm() {
  // Demo list to match the screenshot
  const initialRows = useMemo(
    () => [
      { id: 1, name: "Dr. John Doe", specialty: "Cardiology" },
      { id: 2, name: "Dr. Jane Smith", specialty: "Dermatology" },
    ],
    []
  );

  const [rows] = useState(initialRows);
  const [given, setGiven] = useState({}); // { [rowId]: true }
  const [openRow, setOpenRow] = useState(null); // rowId currently being reviewed
  const [form, setForm] = useState({ rating: "", text: "" });

  const startFeedback = (rowId) => {
    setOpenRow(rowId);
    setForm({ rating: "", text: "" });
  };

  const cancelFeedback = () => {
    setOpenRow(null);
    setForm({ rating: "", text: "" });
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!form.rating || !form.text.trim()) return;
    setGiven((g) => ({ ...g, [openRow]: true }));
    setOpenRow(null);
  };

  return (
    <div className="reviews-page">
      <h2 className="reviews-title">Reviews</h2>

      <div className="reviews-table">
        <div className="reviews-header">
          <div>Serial Number</div>
          <div>Doctor Name</div>
          <div>Doctor Speciality</div>
          <div>Provide feedback</div>
          <div>Review Given</div>
        </div>

        {rows.map((r, idx) => (
          <div className="reviews-row" key={r.id}>
            <div>{idx + 1}</div>
            <div className="doctor-link">{r.name}</div>
            <div>{r.specialty}</div>
            <div>
              <button
                className="btn-primary"
                onClick={() => startFeedback(r.id)}
                disabled={!!given[r.id]}
              >
                Click Here
              </button>
            </div>
            <div className="review-given">
              {given[r.id] ? "Yes" : "No"}
            </div>
          </div>
        ))}
      </div>

      {/* Inline modal/panel for feedback */}
      {openRow !== null && (
        <div className="rf-backdrop" onClick={cancelFeedback}>
          <div
            className="rf-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="rf-title">Provide Feedback</h3>
            <form onSubmit={submitFeedback} className="rf-form">
              <label className="rf-label">
                Rating (1–5)
                <input
                  className="rf-input"
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: e.target.value }))
                  }
                  required
                />
              </label>

              <label className="rf-label">
                Review
                <textarea
                  className="rf-textarea"
                  rows={4}
                  placeholder="Write your feedback..."
                  value={form.text}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, text: e.target.value }))
                  }
                  required
                />
              </label>

              <div className="rf-actions">
                <button type="button" className="btn-ghost" onClick={cancelFeedback}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
