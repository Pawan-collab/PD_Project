const express = require("express");
const router = express.Router();
const { handleChatbotMessage: handleBotMessage } = require("../controllers/chatbotControllers");

router.post("/assist", handleBotMessage);

module.exports = router;
