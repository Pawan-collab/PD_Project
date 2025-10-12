const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Username must contain no fewer than 3 characters"],
    maxlength: [20, "Username must contain no more than 20 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must contain a minimum of 6 characters"],
    maxlength: [100, "Password must contain a maximum of 100 characters"],
    select: false,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.methods.generateAuthToken = function () {
  const authToken = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return authToken;
};

adminSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
