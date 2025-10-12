const mongoose = require("mongoose");
const solutionSchema = new mongoose.Schema(
  {
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
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
    isActive: { type: Boolean, default: false },

    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const solutionModel = mongoose.model("solution", solutionSchema);
module.exports = solutionModel;
