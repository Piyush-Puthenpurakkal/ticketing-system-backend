const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");

router.use(verifyToken);

router.get("/:email", async (req, res) => {
  try {
    const u = await User.findOne({
      email: req.params.email.toLowerCase(),
    }).select("firstName lastName email phone role");
    if (!u) return res.status(404).json({ msg: "User not found" });
    res.json(u);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
