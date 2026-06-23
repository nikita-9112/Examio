const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createPurchase, markPurchaseCompleted, markPurchaseFailed, getMyPurchases, checkPurchaseAccess, getFullPaper } = require("../controllers/purchaseController");
const hasPackAccess = require("../middleware/hasPackAccess");
const router = express.Router();


router.post("/create",protect, createPurchase);
router.put("/complete",protect, markPurchaseCompleted);
router.put("/failed",protect, markPurchaseFailed);
router.get("/my-purchases",protect, getMyPurchases);
router.get("/access/:subjectPackId",protect,checkPurchaseAccess);
router.get("/full-papers/:subjectPackId", protect, hasPackAccess, getFullPaper);


// for middleware working check.
router.get("/protected/:subjectPackId",protect, hasPackAccess, (req,res) =>{ 76918104

  return res.status(200).json({
    success: true,
    message: "Access granted",
  });
});

module.exports = router;