const TeamMember = require("../models/TeamMember");
const User = require("../models/User");

exports.listTeam = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user.role === "admin") {
      const members = await TeamMember.find({ createdBy: userId })
        .populate("user", "firstName lastName email phone role")
        .sort("createdAt");
      return res.json(members);
    } else {
      const myMembership = await TeamMember.findOne({ user: userId });
      if (!myMembership) return res.json([]);

      const team = await TeamMember.find({ createdBy: myMembership.createdBy })
        .populate("user", "firstName lastName email phone role")
        .sort("createdAt");
      return res.json(team);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) return res.status(404).json({ msg: "User not found" });

    const duplicate = await TeamMember.findOne({
      user: existingUser._id,
      createdBy: req.user._id,
    });
    if (duplicate)
      return res.status(400).json({ msg: "Member already exists" });

    const member = await TeamMember.create({
      name: `${existingUser.firstName} ${existingUser.lastName}`,
      email: existingUser.email,
      role,
      user: existingUser._id,
      createdBy: req.user._id,
    });
    await member.populate("user", "firstName lastName email phone role");
    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const update = { role };

    if (userId) {
      const newUser = await User.findById(userId);
      if (!newUser) return res.status(404).json({ msg: "User not found" });
      update.user = newUser._id;
      update.name = `${newUser.firstName} ${newUser.lastName}`;
      update.email = newUser.email;
    }

    const upd = await TeamMember.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      update,
      { new: true }
    ).populate("user", "firstName lastName email phone role");

    if (!upd) return res.status(404).json({ msg: "Member not found" });
    res.json(upd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ msg: "Member not found" });

    const isSelf =
      member.user && member.user.toString() === req.user._id.toString();
    if (req.user.role !== "admin" && !isSelf) {
      return res
        .status(403)
        .json({
          msg: "Forbidden: only admins or yourself can remove this member",
        });
    }

    await member.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
