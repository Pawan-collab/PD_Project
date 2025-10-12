const ChatbotResponse = require("../models/chatbotModels");

module.exports.getChatbotReply = async (userMessage) => {
  const normalized = String(userMessage || "").toLowerCase();
  const records = await ChatbotResponse.find();

  for (const doc of records) {
    if (doc.keywords?.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return doc.response;
    }
  }

  return "Interesting query! Please visit our Solutions page or contact our team for more details.";
};
