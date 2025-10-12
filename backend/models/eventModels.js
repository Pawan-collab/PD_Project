const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      required: true,
      enum: ["upcoming", "past"],
      default: "upcoming",
    },
    title: {
      type: String,
      required: true,
      minlength: [5, "Event title must contain at least 5 characters"],
      maxlength: [150, "Event title must contain no more than 150 characters"],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [2000, "Description must be no longer than 2000 characters"],
      trim: true,
    },

    audience: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["confirmed", "hosting", "tentative"],
      default: "confirmed",
    },
    topics: {
      type: [String],
      default: [],
    },

    outcome: {
      type: String,
      trim: true,
      default: "",
    },

    published: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);