const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createPurchase, markPurchaseCompleted, markPurchaseFailed, getMyPurchases } = require("../controllers/purchaseController");
const router = express.Router();


router.post("/create",protect, createPurchase);
router.put("/complete",protect, markPurchaseCompleted);
router.put("/failed",protect, markPurchaseFailed);
router.get("/my-purchases",protect, getMyPurchases);

module.exports = router;