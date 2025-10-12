const evtCtrl = require("../controllers/eventregistrationControllers");
const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const PHONE_REGEX = /^[0-9+\-\s()]{7,}$/;

router.post(
  "/create",
  [
    body("eventTitle")
      .notEmpty()
      .withMessage("Event title is mandatory")
      .isLength({ min: 1, max: 200 })
      .withMessage("Event title must not exceed 200 characters"),

    body("fullName")
      .notEmpty()
      .withMessage("Full name is mandatory")
      .isLength({ min: 2, max: 120 })
      .withMessage("Full name must be 2–120 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is mandatory")
      .isEmail()
      .withMessage("Provide a valid email address"),

    body("phone")
      .optional({ nullable: true })
      .custom((v) => v === "" || PHONE_REGEX.test(v))
      .withMessage("Please supply a valid contact number"),

    body("company")
      .optional()
      .isLength({ max: 160 })
      .withMessage("Company must not exceed 160 characters"),

    body("location")
      .optional()
      .isLength({ max: 160 })
      .withMessage("Location must not exceed 160 characters"),

    body("address")
      .optional()
      .isLength({ max: 240 })
      .withMessage("Address must not exceed 240 characters"),

    body("message")
      .optional()
      .isLength({ max: 50000 })
      .withMessage("Message must not exceed 50,000 characters"),

    body("consent")
      .custom((v) => v === true)
      .withMessage("Consent is required to continue"),
  ],
  evtCtrl.createRegistration
);

router.get("/", evtCtrl.getAllRegistrations);
router.get("/count", evtCtrl.getRegistrationCount);
router.get("/search", evtCtrl.searchRegistrations);
router.get("/recent", evtCtrl.getRecentRegistrations);
router.get("/stats/location", evtCtrl.getEventStatsByLocation);
router.get("/stats/company", evtCtrl.getEventStatsByCompany);
router.get("/trend/daily", evtCtrl.getDailySignupTrend);
router.get("/paginated", evtCtrl.listPaginated);

router.get("/by-event/:eventTitle", evtCtrl.getRegistrationsByEvent);
router.get("/by-key/:eventKey", evtCtrl.getRegistrationsByKey);
router.get("/by-email/:eventTitle/:email", evtCtrl.getRegistrationByEmailForEvent);

router.get("/:id", evtCtrl.getRegistrationById);
router.patch("/:id", auth.authAdmin, evtCtrl.updateRegistration);
router.delete("/:id", auth.authAdmin, evtCtrl.deleteRegistration);

module.exports = router;