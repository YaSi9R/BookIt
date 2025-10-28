import React from "react"

import { useNavigate, useLocation } from "react-router-dom"
import "./Confirmation.css"

function Confirmation({ bookingData }) {
  const navigate = useNavigate()
  const location = useLocation()
  const refId = location.state?.refId || bookingData?.refId || "N/A"

  return (
    <main className="confirmation">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>

        <h1>Booking Confirmed</h1>

        <div className="ref-id">
          Ref ID: <strong>{refId}</strong>
        </div>

        <div className="location-badge">Karthikorsk</div>

        <button className="home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </main>
  )
}

export default Confirmation
