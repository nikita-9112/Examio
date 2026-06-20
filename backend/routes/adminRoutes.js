
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/adminControllers");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/dashboard",protect,adminOnly, getDashboard);

module.exports = router;