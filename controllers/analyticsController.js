const Ticket = require("../models/Ticket");

exports.getStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const resolved = await Ticket.countDocuments({ status: "resolved" });
    const unresolved = total - resolved;

    const resolvedDocs = await Ticket.find({ status: "resolved" }).select(
      "createdAt updatedAt"
    );
    const totalHours = resolvedDocs.reduce((sum, t) => {
      return sum + (t.updatedAt - t.createdAt) / (1000 * 60 * 60);
    }, 0);
    const avgResolution = resolvedDocs.length
      ? totalHours / resolvedDocs.length
      : 0;

    res.json({
      total,
      resolved,
      unresolved,
      avgResolution: avgResolution.toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
