const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  refId: String,
  fullName: String,
  email: String,
  experienceId: String,
  experienceName: String,
  date: String,
  time: String,
  quantity: Number,
  subtotal: Number,
  taxes: Number,
  total: Number,
  promoCode: String,
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Booking", bookingSchema)
