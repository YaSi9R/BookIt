const express = require("express")
const router = express.Router()
const Experience = require("../models/Experience")

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find()
    res.json(experiences)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET experience by ID
router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
    if (!experience) return res.status(404).json({ error: "Experience not found" })
    res.json(experience)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
