const { Schema, model } = require("mongoose");

const botSchema = new Schema({
  keywords: [String],
  response: String,
});

module.exports = model("Chatbot", botSchema);
