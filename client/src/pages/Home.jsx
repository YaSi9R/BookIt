import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ExperienceContext } from "../pages/ExperienceContext"
import "./Home.css"

function Home() {
  const navigate = useNavigate()
  const { filteredExperiences, loading } = useContext(ExperienceContext)

  if (loading) return <div className="loading">Loading experiences...</div>

  return (
    <main className="home">
      <div className="experiences-grid">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((exp) => (
            <div key={exp._id} className="experience-card">
              <div className="card-image">
                <img src={exp.image || "/placeholder.svg"} alt={exp.name} />
                <div className="card-badge">{exp.location}</div>
              </div>
              <div className="card-content">
                <h3>{exp.name}</h3>
                <p className="description">{exp.description}</p>
                <div className="card-footer">
                  <div className="price-section">
                    <span className="price">From ₹{exp.price}</span>
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/details/${exp._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No experiences found.</p>
        )}
      </div>
    </main>
  )
}

export default Home
