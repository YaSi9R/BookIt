import React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

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
    return <div className="error">No booking data. Please select an experience first.</div>
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
          discount: discountType === "percentage" ? bookingData.total * discount : discount,
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
    <main className="checkout">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Checkout
      </button>

      <div className="checkout-container">
        <div className="checkout-left">
          <div className="form-section">
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your name" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="promo-section">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="apply-btn" onClick={applyPromo}>
                Apply
              </button>
            </div>

            <div className="terms-check">
              <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <label htmlFor="terms">I agree to the terms and safety policy</label>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="summary-card">
            <div className="summary-item">
              <span>Experience</span>
              <span>{bookingData.experienceName}</span>
            </div>
            <div className="summary-item">
              <span>Date</span>
              <span>{bookingData.date}</span>
            </div>
            <div className="summary-item">
              <span>Time</span>
              <span>{bookingData.time}</span>
            </div>
            <div className="summary-item">
              <span>Qty</span>
              <span>{bookingData.quantity}</span>
            </div>

            <hr />

            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{bookingData.subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Taxes</span>
              <span>₹{bookingData.taxes}</span>
            </div>

            {discount > 0 && (
              <div className="summary-item discount">
                <span>Discount</span>
                <span>-₹{discountType === "percentage" ? Math.round(bookingData.total * discount) : discount}</span>
              </div>
            )}

            <div className="total-section">
              <span>Total</span>
              <span className="total-amount">₹{finalTotal}</span>
            </div>

            <button className="pay-btn" onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
