const mongoose = require("mongoose")
require("dotenv").config()

const Experience = require("../models/Experience")

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
    bookedSlots: 0,
  },
  {
    name: "Nandi Hills Sunrise",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&h=300&fit=crop",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Watch the sunrise from the hills with an expert guide.",
    price: 899,
    rating: 4.9,
    reviews: 512,
    dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    times: ["05:00 am", "05:30 am", "06:00 am", "06:30 am"],
    maxSlots: 15,
    bookedSlots: 0,
  },
  {
    name: "Coffee Trail",
    location: "Coorg",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Explore coffee plantations with an expert guide.",
    price: 1299,
    rating: 4.7,
    reviews: 189,
    dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    times: ["08:00 am", "10:00 am", "12:00 pm", "2:00 pm"],
    maxSlots: 8,
    bookedSlots: 0,
  },
  {
    name: "Boat Cruise",
    location: "Sundarban",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Enjoy a scenic boat cruise through mangroves.",
    price: 999,
    rating: 4.6,
    reviews: 324,
    dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    times: ["06:00 am", "09:00 am", "12:00 pm", "3:00 pm"],
    maxSlots: 20,
    bookedSlots: 0,
  },
  {
    name: "Bunjee Jumping",
    location: "Manali",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included. Experience the thrill of bungee jumping.",
    price: 999,
    rating: 4.9,
    reviews: 456,
    dates: ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"],
    times: ["08:00 am", "10:00 am", "12:00 pm", "2:00 pm"],
    maxSlots: 5,
    bookedSlots: 0,
  },
]

async function seedDatabase() {
  try {
    const mongooseOptions = {
      ssl: true,
      retryWrites: true,
      w: "majority",
    }

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
    console.log("Connected to MongoDB")

    // Clear existing experiences
    await Experience.deleteMany({})
    console.log("Cleared existing experiences")

    // Insert new experiences
    const result = await Experience.insertMany(experiences)
    console.log(`${result.length} experiences added to database`)

    await mongoose.connection.close()
    console.log("Database connection closed")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
