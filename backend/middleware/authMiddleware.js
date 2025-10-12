const adminModel = require("../models/adminModels");
const blackListModel = require("../models/blacklistModels");
const jwt = require("jsonwebtoken");

module.exports.authAdmin = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization?.split(" ")[1]);
  console.log("Token pulled from request:", token);

  if (!token) {
    console.log("No token supplied.");
    return res.status(401).json({ message: "Access denied!" });
  }

  const isOnBlacklist = await blackListModel.findOne({ token });

  if (isOnBlacklist) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified payload:", decoded);
    const user = await adminModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
};
