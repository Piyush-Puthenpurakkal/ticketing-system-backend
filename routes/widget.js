const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getSettings,
  updateSettings,
} = require("../controllers/widgetController");

router.use(verifyToken);

router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;
