import React, { createContext, useState, useEffect } from "react"

export const ExperienceContext = createContext()

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([])
  const [filteredExperiences, setFilteredExperiences] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/experiences")
      const data = await response.json()
      setExperiences(data)
      setFilteredExperiences(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching experiences:", error)
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    const filtered = experiences.filter(
      (exp) =>
        exp.name.toLowerCase().includes(value.toLowerCase()) ||
        exp.location.toLowerCase().includes(value.toLowerCase()) ||
        exp.description.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredExperiences(filtered)
  }

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        filteredExperiences,
        searchTerm,
        handleSearch,
        loading,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}
