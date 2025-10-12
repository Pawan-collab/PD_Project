const { getChatbotReply } = require("../services/chatbotServices");

module.exports.handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "A message is required." });
    }

    const reply = await getChatbotReply(message);
    return res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Chatbot handler error:", err);
    return res.status(500).json({ error: "Server encountered an error." });
  }
};
