const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    enum: [
      "Brain",
      "Zap",
      "MessageSquare",
      "Lightbulb",
      "Cog",
      "Shield",
      "Globe",
      "Users",
    ],
  },

  company_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },

  duration: {
    type: String,
    required: true,
    enum: [
      "1 Month",
      "2 Month",
      "3 Month",
      "4 Month",
      "5 Month",
      "6 Month",
      "7 Month",
      "8 Month",
      "9 Month",
      "10 Month",
      "11 Month",
      "1 Year",
      "1 and Half Year",
      "2 Years",
    ],
  },

  team_size: {
    type: String,
    required: true,
    enum: [
      "1 specialists",
      "2 specialists",
      "3 specialists",
      "4 specialists",
      "5 specialists",
      "6 specialists",
      "7 specialists",
      "8 specialists",
      "9 specialists",
      "10 specialists",
      "11 specialists",
      "12 specialists",
      "13 specialists",
      "14 specialists",
      "15 specialists",
      "16 specialists",
      "17 specialists",
      "18 specialists",
      "19 specialists",
      "20 specialists",
    ],
  },

  key_results: {
    type: [String],
    default: [],
  },

  technologies_used: {
    type: [String],
    default: [],
  },

  badge: {
    type: String,
    enum: ["", "Popular", "Featured", "New", "Enterprise"],
    default: "",
  },

  color: {
    type: String,
    enum: ["primary", "secondary", "accent"],
    default: "primary",
  },

  process: {
    type: String,
    enum: ["Completed", "Ongoing"],
    default: "Completed",
  },

  date: {
    type: [String],
    default: "",
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const projectModel = mongoose.model("Projects", projectSchema);
module.exports = projectModel;
