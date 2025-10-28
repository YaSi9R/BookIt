const mongoose = require("mongoose")

const experienceSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  description: String,
  price: Number,
  rating: Number,
  reviews: Number,
  dates: [String],
  times: [String],
  maxSlots: Number,
  bookedSlots: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Experience", experienceSchema)
