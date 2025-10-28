import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ExperienceContext } from "../pages/ExperienceContext"
import "./Header.css"

function Header() {
  const navigate = useNavigate()
  const { searchTerm, handleSearch } = useContext(ExperienceContext)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">📍</span>
          <span className="logo-text">
            Highway
            <br />
            delite
          </span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>
    </header>
  )
}

export default Header
