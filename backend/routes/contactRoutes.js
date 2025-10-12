const contactController = require("../controllers/contactControllers");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is mandatory")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must be 3-20 characters in length"),

    body("email")
      .notEmpty()
      .withMessage("Email is mandatory")
      .isEmail()
      .withMessage("Provide a valid email address"),

    body("phone")
      .notEmpty()
      .withMessage("Phone number is mandatory")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly ten (10) digits"),

    body("company_name")
      .notEmpty()
      .withMessage("Company name is mandatory")
      .isLength({ min: 2, max: 30 })
      .withMessage("Company name must be 2–30 characters"),

    body("country")
      .notEmpty()
      .withMessage("Country is mandatory")
      .isLength({ min: 2, max: 30 })
      .withMessage("Country must be 2–30 characters"),

    body("job_title")
      .notEmpty()
      .withMessage("Job title is mandatory")
      .isLength({ min: 2, max: 30 })
      .withMessage("Job title must be 2–30 characters"),

    body("message")
      .notEmpty()
      .withMessage("Message is mandatory")
      .isLength({ min: 10, max: 50000 })
      .withMessage("Message must be between 10 and 50,000 characters"),
  ],
  contactController.createContact
);

router.get("/", contactController.getAllContacts);
router.get("/count", contactController.getContactCount);
router.get("/search", contactController.searchContacts);
router.get("/email/:email", contactController.getContactByEmail);
router.get("/name/:name", contactController.getContactByName);
router.get("/phone/:phone", contactController.getContactByPhone);
router.get("/company/:company_name", contactController.getContactByCompanyName);
router.get("/job/:job_title", contactController.getContactByJobTitle);
router.get("/country/:country", contactController.getContactByCountry);
router.get("/recent", contactController.getRecentContacts);
router.get("/stats", contactController.getContactStats);
router.get("/:id", contactController.getContactById);

router.put("/:id", authMiddleware.authAdmin, contactController.updateContact);
router.delete("/:id", authMiddleware.authAdmin, contactController.deleteContact);

module.exports = router;
