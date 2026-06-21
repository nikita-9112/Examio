const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createPurchase } = require("../controllers/purchaseController");
const router = express.Router();


router.post("/create",protect, createPurchase);

module.exports = router;