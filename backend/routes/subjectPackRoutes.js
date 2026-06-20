const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { createSubjectPack, getAllSubjectPacks, getSingleSubjectPack } = require("../controllers/subjectPactController");

router.get("/",getAllSubjectPacks);
router.get("/:id",getSingleSubjectPack);
router.post("/", protect,adminOnly, createSubjectPack);

module.exports = router;