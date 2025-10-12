const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const evtController = require("../controllers/eventControllers");
const { singleUpload } = require("../multer/configMulter");
const auth = require("../middleware/authMiddleware");

router.post(
  "/create",
  singleUpload({ subdir: "events" }),
  [
    body("kind")
      .isIn(["upcoming", "past"])
      .withMessage("Event kind must be either 'upcoming' or 'past'"),

    body("title")
      .isString()
      .isLength({ min: 5, max: 150 })
      .withMessage("Title must be between five (5) and 150 characters"),

    body("type")
      .isString()
      .notEmpty()
      .withMessage("Event type is mandatory"),

    body("date")
      .isString()
      .notEmpty()
      .withMessage("Event date is mandatory"),

    body("location")
      .isString()
      .notEmpty()
      .withMessage("Location is required"),

    body("description")
      .isString()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be 10–2000 characters long"),

    body("status")
      .optional()
      .isIn(["confirmed", "hosting", "tentative"]),

    body("published")
      .optional()
      .isBoolean(),

    body("featured")
      .optional()
      .isBoolean(),

    body("order")
      .optional()
      .isNumeric(),
  ],
  auth.authAdmin,
  evtController.createEvent
);

router.get("/", auth.authAdmin, evtController.getAllEvents);
router.get("/recent/upcoming", evtController.getRecentUpcomingEvents);
router.get("/recent/past", evtController.getRecentPastEvents);
router.get("/:id", auth.authAdmin, evtController.getEventById);

router.put(
  "/:id",
  singleUpload({ subdir: "events" }),
  [
    body("title")
      .optional()
      .isString()
      .isLength({ min: 5, max: 150 }),

    body("type")
      .optional()
      .isString(),

    body("date")
      .optional()
      .isString(),

    body("time")
      .optional()
      .isString(),

    body("location")
      .optional()
      .isString(),

    body("description")
      .optional()
      .isString()
      .isLength({ min: 10, max: 2000 }),

    body("status")
      .optional()
      .isIn(["confirmed", "hosting", "tentative"]),

    body("published")
      .optional()
      .isBoolean(),

    body("featured")
      .optional()
      .isBoolean(),

    body("order")
      .optional()
      .isNumeric(),

    body("kind")
      .optional()
      .isIn(["upcoming", "past"]),
  ],
  auth.authAdmin,
  evtController.updateEvent
);

router.delete("/:id", auth.authAdmin, evtController.deleteEvent);

module.exports = router;