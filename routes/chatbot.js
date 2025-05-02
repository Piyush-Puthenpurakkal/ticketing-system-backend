const express = require("express");
const router = express.Router();
const { replyToUser } = require("../controllers/chatbotController");

router.post("/", replyToUser);

module.exports = router;
