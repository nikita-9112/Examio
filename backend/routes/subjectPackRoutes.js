const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { createSubjectPack, getAllSubjectPacks, getSingleSubjectPack, addPaperToPack, deletePaperFromPack, updateSubjectPack, deleteSubjectPack } = require("../controllers/subjectPactController");

router.get("/",getAllSubjectPacks);
router.get("/:id",getSingleSubjectPack);
router.post("/", protect,adminOnly, createSubjectPack);
router.put("/:id", protect, adminOnly, updateSubjectPack);
router.delete("/:id",protect,adminOnly, deleteSubjectPack);


router.post("/:id/papers",protect,adminOnly,addPaperToPack);
router.delete("/:packId/papers/:paperId",protect, adminOnly, deletePaperFromPack);

module.exports = router;