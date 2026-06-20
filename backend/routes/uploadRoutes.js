const { uploadPdf } = require("../controllers/uploadController");
const adminOnly = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const express  = require("express");
router = express.Router();

router.post("/pdf", protect, adminOnly, upload.single("file"), uploadPdf);

module.exports = router;