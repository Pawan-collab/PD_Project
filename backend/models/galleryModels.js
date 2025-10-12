const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [120, "Title must contain no more than 120 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Conference",
        "Client_Visit",
        "Internal_Event",
        "Demo",
        "Recognition",
        "Partnership",
        "Keynote",
        "Milestone",
        "Office_Launch",
      ],
      default: "Conference",
    },
    content: {
      type: String,
      required: true,
      minlength: [10, "Content must be a minimum of 10 characters"],
      maxlength: [2000, "Content must be a maximum of 2000 characters"],
      trim: true,
    },
    media_type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    image_filename: {
      type: String,
      required: true,
      trim: true,
    },
    image_path: {
      type: String,
      required: true,
      trim: true,
    },
    image_mime: {
      type: String,
      trim: true,
    },
    image_size: {
      type: Number,
      min: 0,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      maxlength: 120,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
