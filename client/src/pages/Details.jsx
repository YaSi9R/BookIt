import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

function Details({ setBookingData }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [experience, setExperience] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  // static time slots
  const timeSlots = [
    { time: "07:00 am", left: 4, soldOut: false },
    { time: "09:00 am", left: 2, soldOut: false },
    { time: "11:00 am", left: 5, soldOut: false },
    { time: "01:00 pm", left: 0, soldOut: true },
  ]

  useEffect(() => {
    fetchExperienceDetails()
  }, [id])

  const fetchExperienceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/experiences/${id}`)
      const data = await response.json()
      setExperience(data)
      setSelectedDate(data.dates[0])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching experience:", error)
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (!selectedTime) return
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

  if (loading)
    return <div className="text-center py-10 text-gray-700">Loading details...</div>
  if (!experience)
    return <div className="text-center py-10 text-red-600">Experience not found</div>

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.08)
  const total = subtotal + taxes

  return (
    <main className="max-w-[1200px] mx-auto p-6">
      {/* Back Button */}
      <button
        className="flex items-center justify-center mb-6 text-gray-700 font-semibold text-lg hover:text-yellow-600 transition"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft className="mr-2" /> Details
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        {/* LEFT SIDE */}
        <div>
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.name}
            className="w-full h-[400px] object-cover rounded-lg mb-6 md:h-[400px] sm:h-[300px]"
          />

          <h1 className="text-[24px] font-semibold pb-3">{experience.name}</h1>
          <p className="text-[16px] text-gray-600 leading-relaxed pb-2">{experience.description}</p>

          {/* DATE SECTION */}
          <div className="mb-6">
            <h3 className="text-[18px] font-semibold mb-3">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {experience.dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-2 border rounded text-sm transition-all ${
                    selectedDate === date
                      ? "bg-yellow-400 border-yellow-400 font-semibold"
                      : "bg-white border-gray-300 hover:border-yellow-400 text-[#838383]"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* TIME SECTION */}
          <div className="mb-6">
            <h3 className="text-[18px] font-semibold mb-3">Choose time</h3>
            <div className="flex flex-wrap gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={slot.soldOut}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`flex items-center justify-between w-[120px] sm:w-[140px] px-3 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                    slot.soldOut
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : selectedTime === slot.time
                      ? "bg-yellow-400 border-yellow-400 font-semibold"
                      : "bg-white border-gray-300 hover:border-yellow-400 text-[#838383]"
                  }`}
                >
                  <span>{slot.time}</span>
                  <span
                    className={`text-[12px] ${
                      slot.soldOut ? "text-gray-600" : "text-orange-500"
                    }`}
                  >
                    {slot.soldOut ? "Sold out" : `${slot.left} left`}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">All times are in IST (GMT +5:30)</p>
          </div>

          {/* ABOUT SECTION */}
          <div className="mb-6">
            <h3 className="text-[18px] font-semibold mb-3">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-[#EEEEEE] h-[34px] pt-1 pl-1">
              Septic routes, trained guides, and safety briefing. Minimum age 10.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#EFEFEF] flex flex-col p-5 rounded-lg shadow-md sticky top-5 h-fit">
          <div className="flex justify-between mb-3 text-sm text-[#656565] ">
            <span>Starts at</span>
            <span className="font-semibold">₹{experience.price}</span>
          </div>

          {/* QUANTITY SECTION */}
          <div className="flex justify-between items-center text-[#656565] text-sm h-[20px] mb-3">
            <label className="text-sm">Quantity</label>
            <div className="flex items-center gap-[2px]  rounded-sm  h-[20px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-4 h-[16px] flex items-center justify-center border border-gray-300 text-[10px] leading-none"
              >
                −
              </button>
              <span className="w-[16px] text-center text-[11px] leading-none">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-4 h-[16px] flex items-center justify-center border border-gray-300 text-[10px] leading-none "
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-3 text-[#656565]">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm mb-3 text-[#656565]">
            <span>Taxes</span>
            <span>₹{taxes}</span>
          </div>
          <div className="w-full bg-[#D9D9D9] h-[2px]"></div>

          <div className="flex justify-between font-semibold text-base my-4 ">
            <span>Total</span>
            <span className="text-red-600">₹{total}</span>
          </div>

          {/* ✅ Confirm Button (turns yellow when time selected) */}
          <button
            disabled={!selectedTime}
            onClick={handleConfirm}
            className={`w-full py-3 rounded font-semibold transition-all duration-300 ${
              selectedTime
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </main>
  )
}

export default Details
