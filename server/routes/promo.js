const express = require("express")
const router = express.Router()

const promoCodes = {
  SAVE10: { discount: 0.1, type: "percentage" },
  FLAT100: { discount: 100, type: "flat" },
  SAVE20: { discount: 0.2, type: "percentage" },
  KARTHIK50: { discount: 50, type: "flat" },
}

// POST validate promo code
router.post("/validate", (req, res) => {
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: "Promo code is required" })
  }

  const promo = promoCodes[code.toUpperCase()]

  if (promo) {
    res.json({ valid: true, discount: promo.discount, type: promo.type })
  } else {
    res.json({ valid: false, error: "Invalid promo code" })
  }
})

module.exports = router
