const Chat = require("../models/Chat");

exports.getMessages = async (req, res) => {
  try {
    let chat = await Chat.findOne({ ticket: req.params.ticketId });
    if (!chat) {
      chat = await Chat.create({ ticket: req.params.ticketId, messages: [] });
    }
    res.json(chat.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { sender, text } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { ticket: req.params.ticketId },
      { $push: { messages: { sender, text } } },
      { new: true, upsert: true }
    );
    res.status(201).json(chat.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
