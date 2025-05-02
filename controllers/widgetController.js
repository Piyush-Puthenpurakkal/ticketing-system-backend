const WidgetSettings = require("../models/WidgetSettings");

exports.getSettings = async (req, res) => {
  try {
    let settings = await WidgetSettings.findOne();
    if (!settings) {
      settings = await WidgetSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    console.error("Error in getSettings:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updated = await WidgetSettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (err) {
    console.error("Error in updateSettings:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
