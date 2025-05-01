const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getStats } = require("../controllers/analyticsController");

router.use(verifyToken);

router.get("/tickets", getStats);

module.exports = router;
