const adminModel = require("../models/adminModels");
const blackListModel = require("../models/blacklistModels");
const adminServices = require("../services/adminServices");
const { validationResult } = require("express-validator");

module.exports.createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const created = await adminServices.createAdmin({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: "Administrator account created successfully",
      admin: {
        id: created._id,
        username: created.username,
        email: created.email,
        created_at: created.created_at,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  let account;
  if (email) {
    account = await adminModel.findOne({ email }).select("+password");
  } else if (username) {
    account = await adminModel.findOne({ username }).select("+password");
  } else {
    return res
      .status(400)
      .json({ message: "Please supply either an email address or a username" });
  }

  if (!account) {
    return res
      .status(401)
      .json({ message: "Invalid credentials (username/email/password)" });
  }

  const matches = await account.comparePassword(password);
  if (!matches) {
    return res
      .status(401)
      .json({ message: "Invalid credentials (username/email/password)" });
  }

  const token = account.generateAuthToken();
  res.cookie("token", token);
  return res.status(201).json({ token, admin: account });
};

module.exports.getAdminProfile = async (req, res) => {
  return res.status(200).json({ admin: req.admin });
};

module.exports.logoutAdmin = async (req, res) => {
  res.clearCookie("token");
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  await blackListModel.create({ token });
  return res.status(201).json({ message: "Logged out successfully" });
};
