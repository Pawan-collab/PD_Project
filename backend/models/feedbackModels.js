const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must contain at least 3 characters"],
      maxlength: [50, "Name must contain no more than 50 characters"],
    },
    company_name: {
      type: String,
      required: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [30, "Company name must be no more than 30 characters"],
    },
    job_title: {
      type: String,
      required: true,
      minlength: [2, "Job title must be at least 2 characters"],
      maxlength: [30, "Job title must be no more than 30 characters"],
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "Rating must be a minimum of 0"],
      max: [5, "Rating must be a maximum of 5"],
    },
    comment: {
      type: String,
      required: true,
      minlength: [10, "Feedback must be at least 10 characters long"],
      maxlength: [500, "Feedback must be no longer than 500 characters"],
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("Feedback", feedbackSchema);
module.exports = feedbackModel;
