import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"


function Checkout({ bookingData, setBookingData }) {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [discountType, setDiscountType] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!bookingData) {
    return (
      <div className="text-center text-red-500 font-semibold mt-8">
        No booking data. Please select an experience first.
      </div>
    )
  }

  const applyPromo = async () => {
    if (!promoCode) return

    try {
      const response = await fetch("http://localhost:5000/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      })
      const data = await response.json()

      if (data.valid) {
        setDiscount(data.discount)
        setDiscountType(data.type)
      } else {
        alert("Invalid promo code")
      }
    } catch (error) {
      console.error("Error validating promo:", error)
    }
  }

  const calculateTotal = () => {
    let total = bookingData.total
    if (discountType === "percentage") {
      total = total - total * discount
    } else if (discountType === "flat") {
      total = total - discount
    }
    return Math.max(0, total)
  }

  const handlePayment = async () => {
    if (!fullName || !email || !agreed) {
      alert("Please fill all fields and agree to terms")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          experienceId: bookingData.experienceId,
          date: bookingData.date,
          time: bookingData.time,
          quantity: bookingData.quantity,
          subtotal: bookingData.subtotal,
          taxes: bookingData.taxes,
          total: calculateTotal(),
          promoCode,
          discount:
            discountType === "percentage"
              ? bookingData.total * discount
              : discount,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setBookingData({ ...bookingData, refId: data.refId })
        navigate("/confirmation", { state: { refId: data.refId } })
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("Error creating booking")
    } finally {
      setLoading(false)
    }
  }

  const finalTotal = calculateTotal()

  return (
    <main className="max-w-[1200px] mx-auto p-6">
      <button
        className="flex items-center justify-center text-[16px] font-semibold text-gray-800 mb-6 hover:text-gray-600 transition"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft className="mr-2" /> Checkout
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8">
        {/* Left Section */}
        <div>
          <div className="bg-[#EFEFEF] p-6 rounded-lg shadow-md">
            <div className="mb-4 flex max-sm:flex-col gap-6">
              <div className="w-1/2 max-sm:w-[220px]">
                <label className="block text-sm text-[#5B5B5B] mb-2">Full name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 bg-[#DDDDDD] text-[#727272] rounded-l px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="w-1/2 max-sm:w-[220px]">
                <label className="block text-sm text-[#5B5B5B] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border bg-[#DDDDDD] text-[#727272] border-gray-300 rounded-r px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>


            <div className="mb-4 ">

            </div>

            <div className="flex gap-2 my-4">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border bg-[#DDDDDD] text-[#727272] border-gray-300 rounded px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                className="bg-gray-800 text-white font-semibold text-sm px-4 py-3 rounded hover:bg-gray-600 transition"
                onClick={applyPromo}
              >
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-yellow-400"
              />
              <label
                htmlFor="terms"
                className="text-[13px] cursor-pointer text-[#5B5B5B]"
              >
                I agree to the terms and safety policy
              </label>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className="bg-white p-5 rounded-lg shadow-md sticky top-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#656565]">Experience</span>
                <span className="text-[#161616] text-[16px]">{bookingData.experienceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Date</span>
                <span className="text-[#161616] text-[16px]">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Time</span>
                <span className="text-[#161616]  text-[16px]">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Qty</span>
                <span className="text-[#161616] text-[16px]">{bookingData.quantity}</span>
              </div>



              <div className="flex justify-between">
                <span className="text-[#656565]">Subtotal</span>
                <span className="text-[#161616] text-[16px]">₹{bookingData.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565]">Taxes</span>
                <span className="text-[#161616] text-[16px]">₹{bookingData.taxes}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>
                    -₹
                    {discountType === "percentage"
                      ? Math.round(bookingData.total * discount)
                      : discount}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-semibold text-base mt-4 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span className="text-red-600">₹{finalTotal}</span>
            </div>

            <button
              className="w-full bg-yellow-400 hover:bg-yellow-300 font-semibold py-3 rounded mt-4 transition disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
