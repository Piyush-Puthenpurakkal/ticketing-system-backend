const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");
const {
  listTeam,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/teamController");

const requireAdmin = requireRole("admin");

router.use(verifyToken);

router.get("/", listTeam);
router.post("/", requireAdmin, addMember);
router.put("/:id", requireAdmin, updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
