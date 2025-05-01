const WidgetSettings = require("../models/WidgetSettings");

exports.getSettings = async (req, res) => {
  try {
    let w = await WidgetSettings.findOne({ user: req.user._id });
    if (!w) {
      w = await WidgetSettings.create({ user: req.user._id });
    }
    res.json(w);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updated = await WidgetSettings.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
