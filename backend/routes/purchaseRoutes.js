const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createPurchase, markPurchaseCompleted, markPurchaseFailed, getMyPurchases, checkPurchaseAccess, getFullPaper, getProtectedPaper, createRazorpayOrder, verifyPayment } = require("../controllers/purchaseController");
const hasPackAccess = require("../middleware/hasPackAccess");
const router = express.Router();


router.post("/create",protect, createPurchase);
router.put("/complete",protect, markPurchaseCompleted);
router.put("/failed",protect, markPurchaseFailed);
router.get("/my-purchases",protect, getMyPurchases);
router.get("/access/:subjectPackId",protect,checkPurchaseAccess);
router.get("/full-papers/:subjectPackId", protect, hasPackAccess, getFullPaper);
router.get("/paper/:subjectPackId/:paperId", protect,hasPackAccess, getProtectedPaper);


router.post(
  "/create-order",
  protect,
  createRazorpayOrder
);

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);

module.exports = router;