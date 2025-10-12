const express = require("express");
const { body } = require("express-validator");
const solutionController = require("../controllers/solutionControllers");
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
    body("title")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title should be 3–100 characters long"),
    body("description")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description should be 10–2000 characters"),
    body("features")
      .isArray()
      .optional()
      .withMessage("Features should be an array of strings"),
    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"])
      .withMessage("Badge value is invalid"),
    body("color")
      .isString()
      .notEmpty()
      .isIn(["primary", "secondary", "accent"])
      .withMessage("Color selection is invalid"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive should be a boolean"),
  ],
  solutionController.createSolution
);

router.get("/", solutionController.getAllSolutions);
router.get("/active", solutionController.getActiveSolutions);

router.get("/:id", solutionController.getSolutionById);

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
    body("title").optional().isString().isLength({ min: 3, max: 100 }),
    body("description").optional().isString().isLength({ min: 10, max: 2000 }),
    body("features").optional().isArray(),
    body("badge")
      .optional()
      .isString()
      .isIn(["", "Popular", "Featured", "New", "Enterprise"]),
    body("color")
      .optional()
      .isString()
      .isIn(["primary", "secondary", "accent"]),
    body("isActive").optional().isBoolean(),
  ],
  solutionController.updateSolution
);

router.delete(
  "/:id",
  authMiddleware.authAdmin,
  solutionController.deleteSolution
);

router.patch(
  "/:id/visibility",
  authMiddleware.authAdmin,
  solutionController.toggleVisibility
);

module.exports = router;
