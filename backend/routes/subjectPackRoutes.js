const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { createSubjectPack, getAllSubjectPacks, getSingleSubjectPack, addPaperToPack, deletePaperFromPack, updateSubjectPack } = require("../controllers/subjectPactController");

router.get("/",getAllSubjectPacks);
router.get("/:id",getSingleSubjectPack);
router.post("/", protect,adminOnly, createSubjectPack);
router.post("/:id/papers",protect,adminOnly,addPaperToPack);
router.delete("/:packId/papers/:paperId",protect, adminOnly, deletePaperFromPack);
router.put("/:id", protect, adminOnly, updateSubjectPack);

module.exports = router;