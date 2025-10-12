const mongoose = require("mongoose");

const PHONE_REGEX = /^[0-9+\-\s()]{7,}$/;

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[‐–—−-]+/g, "-") 
    .replace(/\s+/g, " ")      
    .trim();
}

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventKey: {
      type: String,
      index: true,
    },
    eventTitle: {
      type: String,
      required: [true, "Event title is mandatory"],
      trim: true,
      minlength: [1, "Event title is required"],
      maxlength: [200, "Event title must not exceed 200 characters"],
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is mandatory"],
      trim: true,
      minlength: [2, "Please enter your full name"],
      maxlength: [120, "Name must not exceed 120 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (v === undefined || v === null || v === "") return true;
          return PHONE_REGEX.test(v);
        },
        message: "Provide a valid contact number",
      },
    },
    company: {
      type: String,
      trim: true,
      maxlength: [160, "Company name must not exceed 160 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [160, "Location must not exceed 160 characters"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [240, "Address must not exceed 240 characters"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [50000, "Message cannot exceed 50,000 characters"],
    },
    consent: {
      type: Boolean,
      required: [true, "Consent is mandatory"],
      validate: {
        validator: (v) => v === true,
        message: "You must provide consent to continue",
      },
    },

    emailSent: {
      type: Boolean,
      default: false,
      index: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
      index: true,
    },
    ip: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

eventRegistrationSchema.pre("save", function (next) {
  if (this.isModified("eventTitle") || !this.eventKey) {
    this.eventKey = slugify(this.eventTitle);
  }
  if (typeof this.email === "string") {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

eventRegistrationSchema.index({ eventKey: 1, email: 1 }, { unique: true });

const EventRegistration =
  mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", eventRegistrationSchema);

module.exports = EventRegistration;
module.exports._slugify = slugify;