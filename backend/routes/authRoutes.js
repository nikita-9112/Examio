const express = require("express");

const router = express.Router();

const {register, login,getMe, forgotPassword,resetPassword, googleLogin} = require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");


router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/google", googleLogin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
