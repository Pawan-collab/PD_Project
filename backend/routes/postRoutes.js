const postController = require("../controllers/postControllers");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("title")
      .isString()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title should be 3–100 characters long"),
    body("category")
      .isString()
      .notEmpty()
      .isLength({ min: 2, max: 50 })
      .withMessage("Category must be within 2–50 characters"),
    body("content")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Content should be 10–2000 characters"),
    body("image_url")
      .notEmpty()
      .withMessage("Image URL is mandatory")
      .isURL()
      .withMessage("Image URL must be a valid link"),

    body("published")
      .isBoolean()
      .withMessage("Published must be a true/false value"),
  ],
  authMiddleware.authAdmin,
  postController.createPost
);

router.get("/", postController.getAllPosts);
router.get("/recent", postController.getRecentPosts);
router.delete("/:id", authMiddleware.authAdmin, postController.deletePost);
router.get("/:id", postController.getPostById);

router.put(
  "/:id",
  [
    body("title")
      .notEmpty()
      .optional()
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Title should be 3–100 characters long"),
    body("category")
      .notEmpty()
      .isString()
      .optional()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("Category must be within 2–50 characters"),
    body("content")
      .notEmpty()
      .optional()
      .isString()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Content should be 10–2000 characters"),
    body("image_url")
      .notEmpty()
      .optional()
      .withMessage("Image URL must be a valid link"),
    body("published")
      .notEmpty()
      .optional()
      .isBoolean()
      .withMessage("Published must be a true/false value"),
  ],
  authMiddleware.authAdmin,
  postController.updatePost
);

module.exports = router;
