exports.replyToUser = (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Invalid message format." });
  }

  const text = message.toLowerCase();
  let reply = "I'm not sure how to help with that yet.";

  if (text.includes("price")) {
    reply = "Our pricing starts at $199/month.";
  } else if (text.includes("hello") || text.includes("hi")) {
    reply = "Hey there! 👋 How can I assist you today?";
  } else if (text.includes("features")) {
    reply =
      "Hubly helps you manage leads, automate marketing, and track sales!";
  } else if (text.includes("support")) {
    reply = "You can reach our support team 24/7 through the dashboard chat.";
  } else if (text.includes("bye")) {
    reply = "Goodbye! Let me know if you have any more questions.";
  }

  res.json({ reply });
};
