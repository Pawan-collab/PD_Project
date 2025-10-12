const e = require("express"); 
const mongoose = require("mongoose");

const contactReqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must contain no fewer than 3 characters"],
    maxlength: [30, "Name must contain no more than 30 characters"],
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  company_name: {
    type: String,
    required: true,
    unique: false,
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [30, "Company name must be no more than 30 characters"],
  },
  country: {
    type: String,
    required: true,
    minlength: [2, "Country must be at least 2 characters"],
    maxlength: [30, "Country must be no more than 30 characters"],
  },
  job_title: {
    type: String,
    required: true,
    minlength: [4, "Job title must be at least 4 characters"],
    maxlength: [30, "Job title must be no more than 30 characters"],
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
        minlength: [10, "Message must be a minimum of 10 characters"],
        maxlength: [50000, "Message must be a maximum of 50000 characters"],
      },
      submitted_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const contactModel = mongoose.model("Contact", contactReqSchema);
module.exports = contactModel;
