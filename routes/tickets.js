const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");
const {
  createTicket,
  getTickets,
  getTicket,
  assignTicket,
  updateStatus,
} = require("../controllers/ticketController");

const requireAdmin = requireRole("admin");

router.use(verifyToken);

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicket);
router.put("/:id/assign", assignTicket);
router.put("/:id/status", updateStatus);

module.exports = router;
