const articleController = require("../controllers/articleControllers");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Validation middleware for creating articles
const createArticleValidation = [
  body("title")
    .isString()
    .notEmpty()
    .isLength({ min: 5, max: 150 })
    .withMessage("Title must be 5-150 characters"),
  body("summary")
    .isString()
    .notEmpty()
    .isLength({ min: 30, max: 300 })
    .withMessage("Summary must be 30-300 characters"),
  body("content")
    .isString()
    .notEmpty()
    .isLength({ min: 100 })
    .withMessage("Content must be at least 100 characters"),
  body("category")
    .isString()
    .notEmpty()
    .isIn([
      "Industry Insights",
      "Technical Guide",
      "Business Strategy",
      "AI Ethics",
      "Workplace Innovation",
      "Healthcare AI",
      "Leadership",
    ])
    .withMessage("Invalid category"),
  body("author_name")
    .isString()
    .notEmpty()
    .isLength({ min: 2, max: 60 })
    .withMessage("Author name must be 2-60 characters"),
  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Status must be draft, published, or archived"),
  body("tags")
    .optional()
    .isArray({ max: 8 })
    .withMessage("Tags must be an array with max 8 items"),
  body("is_featured")
    .optional()
    .isBoolean()
    .withMessage("is_featured must be a boolean"),
  body("seo_title")
    .optional()
    .isString()
    .isLength({ max: 70 })
    .withMessage("SEO title must be max 70 characters"),
  body("seo_description")
    .optional()
    .isString()
    .isLength({ max: 160 })
    .withMessage("SEO description must be max 160 characters"),
];

// Validation middleware for updating articles
const updateArticleValidation = [
  body("title")
    .optional()
    .isString()
    .isLength({ min: 5, max: 150 })
    .withMessage("Title must be 5-150 characters"),
  body("summary")
    .optional()
    .isString()
    .isLength({ min: 30, max: 300 })
    .withMessage("Summary must be 30-300 characters"),
  body("content")
    .optional()
    .isString()
    .isLength({ min: 100 })
    .withMessage("Content must be at least 100 characters"),
  body("category")
    .optional()
    .isString()
    .isIn([
      "Industry Insights",
      "Technical Guide",
      "Business Strategy",
      "AI Ethics",
      "Workplace Innovation",
      "Healthcare AI",
      "Leadership",
    ])
    .withMessage("Invalid category"),
  body("author_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 60 })
    .withMessage("Author name must be 2-60 characters"),
  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Status must be draft, published, or archived"),
  body("tags")
    .optional()
    .isArray({ max: 8 })
    .withMessage("Tags must be an array with max 8 items"),
  body("is_featured")
    .optional()
    .isBoolean()
    .withMessage("is_featured must be a boolean"),
  body("seo_title")
    .optional()
    .isString()
    .isLength({ max: 70 })
    .withMessage("SEO title must be max 70 characters"),
  body("seo_description")
    .optional()
    .isString()
    .isLength({ max: 160 })
    .withMessage("SEO description must be max 160 characters"),
];

// Public routes
router.get("/", articleController.getAllArticles);
router.get("/published", articleController.getPublishedArticles);
router.get("/featured", articleController.getFeaturedArticles);
router.get("/recent", articleController.getRecentArticles);
router.get("/search", articleController.searchArticles);
router.get("/category/:category", articleController.getArticlesByCategory);
router.get("/slug/:slug", articleController.getArticleBySlug);
router.get("/:id", articleController.getArticleById);

// Protected routes (Admin only)
router.post(
  "/create",
  createArticleValidation,
  authMiddleware.authAdmin,
  articleController.createArticle
);

router.put(
  "/:id",
  updateArticleValidation,
  authMiddleware.authAdmin,
  articleController.updateArticle
);

router.delete(
  "/:id",
  authMiddleware.authAdmin,
  articleController.deleteArticle
);

// Engagement routes
router.post("/:id/view", articleController.incrementArticleViews);
router.post("/:id/like", articleController.likeArticle);
router.post("/:id/unlike", articleController.unlikeArticle);

module.exports = router;
