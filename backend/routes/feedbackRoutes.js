const feedbackController = require("../controllers/feedbackControllers");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { toogleFeedbackApproval } = require("../services/feedbackServices");

router.post(
  "/create",
  [
    body("name")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be within 3–50 characters"),
    body("company_name")
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage("Company name must be 2–30 characters long"),
    body("rating")
      .isNumeric()
      .notEmpty()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be an integer from 0 to 5"),
    body("comment")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 500 })
      .withMessage("Feedback should be 10–500 characters"),
  ],
  feedbackController.createFeedback
);

router.get("/", feedbackController.getAllFeedbacks);
router.get("/recent", feedbackController.getRecentFeedbacks);
router.get("/name/:name", feedbackController.getFeedbacksByName);
router.get("/company/:company", feedbackController.getFeedbacksByCompany);
router.get("/approved", feedbackController.getApprovedFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.delete(
  "/:id",
  authMiddleware.authAdmin,
  feedbackController.deleteFeedback
);
router.get("/:id", feedbackController.getFeedbackById);
router.put(
  "/:id",
  [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be within 3–50 characters"),
    body("company_name")
      .optional()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage("Company name must be 2–30 characters long"),
    body("rating")
      .optional()
      .isNumeric()
      .isInt({ min: 0, max: 5 })
      .withMessage("Rating must be an integer from 0 to 5"),
    body("comment")
      .optional()
      .isString()
      .isLength({ min: 10, max: 500 })
      .withMessage("Feedback should be 10–500 characters"),
  ],
  authMiddleware.authAdmin,
  feedbackController.updateFeedback
);
router.patch(
  "/:id/approve",
  authMiddleware.authAdmin,
  feedbackController.toogleFeedbackApproval
);

module.exports = router;