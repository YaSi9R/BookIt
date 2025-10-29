import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ExperienceContext } from "../pages/ExperienceContext"
import logo from "../../assets/logo.jpg"

function Header() {
  const navigate = useNavigate()
  const { searchTerm, handleSearch } = useContext(ExperienceContext)

  return (
    <header className="bg-white border-b border-[#e0e0e0] py-4 px-6">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer font-semibold text-[12px] leading-[1.2]"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="h-[55px] w-[100px]  object-contain"
          />
        </div>

        {/* Search Box */}
        <div className="flex gap-2  sm:w-auto justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-3 py-2 border border-[#ddd] rounded w-[340px] max-sm:w-[180px]  text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            className="bg-[#ffd643] hover:bg-[#ffed4e] text-black font-semibold text-sm px-4 py-2 rounded transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
