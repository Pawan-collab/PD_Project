const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: "24h", // equivalent to 1 day TTL
  },
});

module.exports = mongoose.model("BlackList", blacklistSchema);
