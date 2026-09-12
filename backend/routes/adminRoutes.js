
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getDashboard, getDashboardStats } = require("../controllers/adminControllers");
const adminOnly = require("../middleware/adminMiddleware");
const { getAllSubjectPacksforAdmin, getSingleSubjectPackForAdmin } = require("../controllers/subjectPactController");
const { getProtectedPaper } = require("../controllers/purchaseController");

router.get("/dashboard",protect,adminOnly, getDashboard);
router.get("/dashboard/stats", protect, adminOnly, getDashboardStats);


router.get("/subject-packs",protect, adminOnly, getAllSubjectPacksforAdmin);
router.get("/subject-pack/:id",protect,adminOnly, getSingleSubjectPackForAdmin);
router.get("/paper/:subjectPackId/:paperId", protect, adminOnly, getProtectedPaper);

module.exports = router;