const adminCtrl = require("../controllers/adminControllers");
const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be a minimum of three (3) characters"),

    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least six (6) characters long"),
  ],
  adminCtrl.createAdmin
);

router.post(
  "/login",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain six (6) or more characters"),

    body("email")
      .if(body("username").not().exists())
      .notEmpty()
      .withMessage("Email is required when a username is not supplied")
      .isEmail()
      .withMessage("Email address format is invalid"),

    body("username")
      .if(body("email").not().exists())
      .notEmpty()
      .withMessage("Username is required when an email is not provided")
      .isLength({ min: 3 })
      .withMessage("Username needs at least three (3) characters"),

    body("email"), // keep as-is (no-op) to preserve original behavior
  ],
  adminCtrl.loginAdmin
);

router.get("/profile", auth.authAdmin, adminCtrl.getAdminProfile);

router.get("/logout", auth.authAdmin, adminCtrl.logoutAdmin);

module.exports = router;
