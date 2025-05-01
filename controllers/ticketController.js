const Ticket = require("../models/Ticket");
const User = require("../models/User");
const TeamMember = require("../models/TeamMember");

exports.createTicket = async (req, res) => {
  try {
    const { title, message } = req.body;
    let assignedTo = req.user._id;

    if (req.user.role === "member") {
      const admin = await User.findOne({ role: "admin" }).sort("createdAt");
      if (admin) assignedTo = admin._id;
    }

    const ticket = await Ticket.create({
      title,
      message,
      user: req.user._id,
      assignedTo,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error("CreateTicket error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;

    const baseFilter = {};
    if (status) baseFilter.status = status;
    if (search) {
      baseFilter.$or = [
        { title: new RegExp(search, "i") },
        { message: new RegExp(search, "i") },
      ];
    }

    let filter = baseFilter;
    if (req.user.role === "member") {
      filter = {
        $and: [
          baseFilter,
          {
            $or: [{ user: req.user._id }, { assignedTo: req.user._id }],
          },
        ],
      };
    }

    const tickets = await Ticket.find(filter)
      .populate("user", "firstName lastName email phone role")
      .populate("assignedTo", "firstName lastName email phone role")
      .sort("-createdAt");

    res.json(tickets);
  } catch (err) {
    console.error("GetTickets error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "firstName lastName email phone role")
      .populate("assignedTo", "firstName lastName email phone role");

    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    console.error("GetTicket error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.assignTicket = async (req, res) => {
  try {
    const { userId } = req.body;

    if (req.user.role !== "admin") {
      const myMembership = await TeamMember.findOne({ user: req.user._id });
      if (!myMembership) {
        return res
          .status(403)
          .json({ msg: "Forbidden: you’re not part of any team" });
      }

      const team = await TeamMember.find({
        createdBy: myMembership.createdBy,
      });
      const validIds = team.map((m) => m.user.toString());

      if (!validIds.includes(userId)) {
        return res
          .status(403)
          .json({ msg: "Forbidden: can only assign within your team" });
      }
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    console.error("AssignTicket error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["resolved", "unresolved"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    if (
      req.user.role !== "admin" &&
      ticket.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ msg: "Forbidden: only admins or assignees can update status" });
    }

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error("UpdateStatus error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
