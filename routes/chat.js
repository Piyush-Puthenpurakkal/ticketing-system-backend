const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getMessages, postMessage } = require("../controllers/chatController");

router.use(verifyToken);

router.get("/:ticketId/messages", getMessages);
router.post("/:ticketId/messages", postMessage);

module.exports = router;
