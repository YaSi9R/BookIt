import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./Details.css"

function Details({ setBookingData }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [experience, setExperience] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperienceDetails()
  }, [id])

  const fetchExperienceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/experiences/${id}`)
      const data = await response.json()
      setExperience(data)
      setSelectedDate(data.dates[0])
      setSelectedTime(data.times[0])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching experience:", error)
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    const subtotal = experience.price * quantity
    const taxes = Math.round(subtotal * 0.08)

    setBookingData({
      experienceId: experience._id,
      experienceName: experience.name,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total: subtotal + taxes,
      image: experience.image,
    })

    navigate("/checkout")
  }

  if (loading) return <div className="loading">Loading details...</div>
  if (!experience) return <div className="error">Experience not found</div>

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.08)
  const total = subtotal + taxes

  return (
    <main className="details">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Details
      </button>

      <div className="details-container">
        <div className="details-left">
          <img src={experience.image || "/placeholder.svg"} alt={experience.name} className="detail-image" />
          <h1>{experience.name}</h1>
          <p className="description">{experience.description}</p>

          <div className="date-section">
            <h3>Choose date</h3>
            <div className="date-buttons">
              {experience.dates.map((date) => (
                <button
                  key={date}
                  className={`date-btn ${selectedDate === date ? "active" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="time-section">
            <h3>Choose time</h3>
            <div className="time-buttons">
              {experience.times.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? "active" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="time-note">All times are in IST (GMT +5:30)</p>
          </div>

          <div className="about-section">
            <h3>About</h3>
            <p>Septic routes, trained guides, and safety briefing. Minimum age 10.</p>
          </div>
        </div>

        <div className="details-right">
          <div className="price-card">
            <div className="price-row">
              <span>Starts at</span>
              <span className="price">₹{experience.price}</span>
            </div>

            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="price-row">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <div className="total-row">
              <span>Total</span>
              <span className="total-price">₹{total}</span>
            </div>

            <button className="confirm-btn" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Details
