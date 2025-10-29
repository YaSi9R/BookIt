import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Confirmation({ bookingData }) {
  const navigate = useNavigate()
  const location = useLocation()
  const refId = location.state?.refId || bookingData?.refId || "N/A"

  return (
    <main className="flex justify-center  mt-[60px] min-h-[80vh] p-6">
      <div className="text-center relative">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-6">
          ✓
        </div>

        {/* Heading */}
        <h1 className="text-[30px] font-semibold text-[#161616] mb-4">
          Booking Confirmed
        </h1>

        {/* Reference ID */}
        <div className="text-base text-gray-600 mb-8">
          Ref ID:{" "}
          <strong className="font-semibold text-gray-800">{refId}</strong>
        </div>

       

        {/* Back Button */}
        <button
          className="border-2 text-[#656565] bg-[#E3E3E3] hover:bg-pink-600 hover:text-white px-8 py-3 rounded font-semibold text-sm transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </main>
  )
}

export default Confirmation
