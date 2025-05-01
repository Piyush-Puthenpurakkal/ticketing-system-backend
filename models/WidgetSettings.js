const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    headerColor: { type: String, default: "#33475B" },
    bgColor: { type: String, default: "#EEEEEE" },
    messages: {
      type: [String],
      default: ["How can I help you?", "Ask me anything!"],
    },
    welcomeMsg: {
      type: String,
      default: "👋 Want to chat about Hubly? I'm a chatbot here to help you.",
    },
    intro: {
      name: String,
      phone: String,
      email: String,
    },
    missedTimer: {
      h: String,
      m: String,
      s: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WidgetSettings", widgetSchema);
