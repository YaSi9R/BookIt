const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookit")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

const experiencesRoute = require("./routes/experiences")
const bookingsRoute = require("./routes/bookings")
const promoRoute = require("./routes/promo")

app.use("/api/experiences", experiencesRoute)
app.use("/api/bookings", bookingsRoute)
app.use("/api/promo", promoRoute)

// Seed data endpoint
app.post("/api/seed", async (req, res) => {
  try {
    const Experience = require("./models/Experience")
    await Experience.deleteMany({})

    const experiences = [
      {
        name: "Kayaking",
        location: "Udupi",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
        price: 999,
        rating: 4.8,
        reviews: 245,
        dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
        times: ["07:00 am", "09:00 am", "11:00 am", "1:00 pm"],
        maxSlots: 10,
        bookedSlots: 3,
      },
      {
        name: "Nandi Hills Sunrise",
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=500&h=300&fit=crop",
        description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        price: 899,
        rating: 4.9,
        reviews: 512,
        dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
        times: ["05:00 am", "06:00 am", "07:00 am"],
        maxSlots: 15,
        bookedSlots: 8,
      },
      {
        name: "Coffee Trail",
        location: "Coorg",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        price: 1299,
        rating: 4.7,
        reviews: 189,
        dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
        times: ["08:00 am", "10:00 am", "2:00 pm"],
        maxSlots: 12,
        bookedSlots: 5,
      },
      {
        name: "Boat Cruise",
        location: "Sundarban",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
        description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        price: 999,
        rating: 4.6,
        reviews: 324,
        dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
        times: ["09:00 am", "2:00 pm", "4:00 pm"],
        maxSlots: 20,
        bookedSlots: 12,
      },
      {
        name: "Bunjee Jumping",
        location: "Manali",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        price: 999,
        rating: 4.8,
        reviews: 456,
        dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
        times: ["10:00 am", "12:00 pm", "3:00 pm"],
        maxSlots: 8,
        bookedSlots: 6,
      },
    ]

    await Experience.insertMany(experiences)
    res.json({ message: "Data seeded successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
