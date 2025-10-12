const express = require("express");
const { body } = require("express-validator");
const projectController = require("../controllers/projectControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authAdmin,
  [
    body("icon")
      .isString()
      .notEmpty()
      .isIn([
        "Brain",
        "Zap",
        "MessageSquare",
        "Lightbulb",
        "Cog",
        "Shield",
        "Globe",
        "Users",
      ])
      .withMessage("Unrecognized icon name"),

    body("company_name")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 300 })
      .withMessage("Company name should be 1–300 characters"),

    body("title")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title should be 3–100 characters"),

    body("description")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description should be 10–2000 characters"),

    body("duration")
      .isString()
      .notEmpty()
      .isIn([
        "1 Month",
        "2 Month",
        "3 Month",
        "4 Month",
        "5 Month",
        "6 Month",
        "7 Month",
        "8 Month",
        "9 Month",
        "10 Month",
        "11 Month",
        "1 Year",
        "1 and Half Year",
        "2 Years",
      ])
      .withMessage("Invalid time duration selected"),

    body("team_size")
      .isString()
      .notEmpty()
      .isIn([
        "1 specialists",
        "2 specialists",
        "3 specialists",
        "4 specialists",
        "5 specialists",
        "6 specialists",
        "7 specialists",
        "8 specialists",
        "9 specialists",
        "10 specialists",
        "11 specialists",
        "12 specialists",
        "13 specialists",
        "14 specialists",
        "15 specialists",
        "16 specialists",
        "17 specialists",
        "18 specialists",
        "19 specialists",
        "20 specialists",
      ])
      .withMessage("Invalid team size selected"),

    body("key_results")
      .optional()
      .isArray()
      .withMessage("key_results should be an array of strings"),

    body("technologies_used")
      .optional()
      .isArray()
      .withMessage("technologies_used should be an array of strings"),

    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"])
      .withMessage("Badge value is not valid"),

    body("color")
      .isString()
      .notEmpty()
      .isIn(["primary", "secondary", "accent"])
      .withMessage("Color selection is invalid"),

    body("process")
      .isString()
      .notEmpty()
      .isIn(["Completed", "Ongoing"])
      .withMessage("Please choose a valid process"),

    body("date")
      .optional()
      .isArray()
      .withMessage("Date must be an array of strings"),

    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive should be a boolean"),
  ],
  projectController.createProjects
);

router.get("/", projectController.getAllProjects);
router.get("/active", projectController.getActiveProject);
router.get("/:id", projectController.getProjectById);

router.put(
  "/:id",
  authMiddleware.authAdmin,
  [
    body("icon")
      .optional()
      .isString()
      .isIn([
        "Brain",
        "Zap",
        "MessageSquare",
        "Lightbulb",
        "Cog",
        "Shield",
        "Globe",
        "Users",
      ]),

    body("company_name").optional().isString().isLength({ min: 1, max: 300 }),

    body("title").optional().isString().isLength({ min: 3, max: 100 }),

    body("description").optional().isString().isLength({ min: 10, max: 2000 }),

    body("duration")
      .optional()
      .isString()
      .isIn([
        "1 Month",
        "2 Month",
        "3 Month",
        "4 Month",
        "5 Month",
        "6 Month",
        "7 Month",
        "8 Month",
        "9 Month",
        "10 Month",
        "11 Month",
        "1 Year",
        "1 and Half Year",
        "2 Years",
      ]),

    body("team_size")
      .optional()
      .isString()
      .isIn([
        "1 specialists",
        "2 specialists",
        "3 specialists",
        "4 specialists",
        "5 specialists",
        "6 specialists",
        "7 specialists",
        "8 specialists",
        "9 specialists",
        "10 specialists",
        "11 specialists",
        "12 specialists",
        "13 specialists",
        "14 specialists",
        "15 specialists",
        "16 specialists",
        "17 specialists",
        "18 specialists",
        "19 specialists",
        "20 specialists",
      ]),

    body("key_results").optional().isArray(),

    body("technologies_used").optional().isArray(),

    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"]),

    body("color")
      .optional()
      .isString()
      .isIn(["primary", "secondary", "accent"]),

    body("process").optional().isString().isIn(["Completed", "Ongoing"]),

    body("date")
      .optional()
      .isArray()
      .withMessage("Date must be an array of strings"),

    body("isActive").optional().isBoolean(),
  ],
  projectController.updateProject
);

router.delete(
  "/:id",
  authMiddleware.authAdmin,
  projectController.deleteProject
);

router.patch(
  "/:id/visibility",
  authMiddleware.authAdmin,
  projectController.toggleProjectVisibility
);

module.exports = router;
