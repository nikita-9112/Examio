const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { createSubjectPack } = require("../controllers/subjectPactController");

router.post("/", protect,adminOnly, createSubjectPack);

module.exports = router;