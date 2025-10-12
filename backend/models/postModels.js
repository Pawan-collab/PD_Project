const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title requires a minimum of 3 characters"],
    maxlength: [100, "Title must contain no more than 100 characters"],
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Success_story",
      "Event",
      "Article",
      "Solution_details",
      "Past_works",
    ],
    default: "Article",
  },
  content: {
    type: String,
    required: true,
    minlength: [10, "Content must be at least 10 characters in length"],
    maxlength: [2000, "Content must be no longer than 2000 characters"],
  },
  image_url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Please provide a valid image URL",
    },
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
