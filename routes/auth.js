const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  register,
  login,
  getMe,
  updateProfile,
  deleteProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

router.put("/update-profile", verifyToken, updateProfile);
router.delete("/delete-profile", verifyToken, deleteProfile);

module.exports = router;
