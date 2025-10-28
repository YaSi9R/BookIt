const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")

// POST create booking
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      experienceId,
      experienceName,
      date,
      time,
      quantity,
      subtotal,
      taxes,
      total,
      promoCode,
      discount,
    } = req.body

    // Validation
    if (!fullName || !email || !experienceId || !date || !time || !quantity) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Generate reference ID
    const refId =
      "HUF" +
      Math.random().toString(36).substr(2, 6).toUpperCase() +
      Math.random().toString(36).substr(2, 2).toUpperCase()

    const booking = new Booking({
      refId,
      fullName,
      email,
      experienceId,
      experienceName,
      date,
      time,
      quantity,
      subtotal,
      taxes,
      total,
      promoCode: promoCode || "",
      discount: discount || 0,
    })

    await booking.save()
    res.json({ success: true, refId, booking })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET booking by ref ID
router.get("/:refId", async (req, res) => {
  try {
    const booking = await Booking.findOne({ refId: req.params.refId })
    if (!booking) return res.status(404).json({ error: "Booking not found" })
    res.json(booking)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
