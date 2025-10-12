const adminModel = require("../models/adminModels");

module.exports.createAdmin = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("Every field must be provided");
  }
  if (password.length < 6) {
    throw new Error("Password must be no fewer than six (6) characters");
  }

  const existingRecord = await adminModel.findOne({
    $or: [
      { username: { $eq: username } },
      { email: { $eq: email } }
    ],
  });

  if (existingRecord) {
    throw new Error("This account already exists; please contact the administrator");
  }

  const hashed = await adminModel.hashPassword(password);

  const newAdmin = new adminModel({
    username,
    email,
    password: hashed,
  });

  await newAdmin.save();
  return newAdmin;
};
