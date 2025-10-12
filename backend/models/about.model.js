const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  hero_title: {
    type: String,
    required: true,
    minlength: [5, "Hero title must contain at least 5 characters"],
    maxlength: [100, "Hero title can be at most 100 characters"],
  },

  hero_subtitle: {
    type: String,
    required: true,
    minlength: [10, "Hero subtitle must be a minimum of 10 characters"],
    maxlength: [250, "Hero subtitle must not exceed 250 characters"],
  },

  mission: {
    type: String,
    required: true,
    minlength: [20, "Mission must be at least 20 characters in length"],
    maxlength: [600, "Mission must be no longer than 600 characters"],
  },

  vision: {
    type: String,
    required: true,
    minlength: [20, "Vision must be at least 20 characters in length"],
    maxlength: [600, "Vision must be no longer than 600 characters"],
  },

  values: {
    type: [String],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length <= 10,
      message: "You may list up to 10 core values only",
    },
    default: [],
  },

  team: {
    type: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        bio: { type: String, required: true },
        expertise: { type: [String], default: [] },
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true },
      },
    ],
    default: [],
  },

  cta_title: {
    type: String,
    maxlength: [100, "CTA title can be up to 100 characters"],
  },

  cta_subtitle: {
    type: String,
    maxlength: [200, "CTA subtitle can be up to 200 characters"],
  },

  cta_button_text: {
    type: String,
    maxlength: [40, "CTA button text can be up to 40 characters"],
  },

  cta_button_link: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: "Please provide a valid CTA link URL",
    },
  },

  published: {
    type: Boolean,
    default: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const aboutModel = mongoose.model("About", aboutSchema);
module.exports = aboutModel;
