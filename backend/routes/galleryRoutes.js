const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const galleryController = require("../controllers/galleryControllers");
const { singleUpload } = require("../multer/configMulter");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/create",
  singleUpload({ subdir: "gallery", fieldName: "image" }),
  [
    body("title")
      .isString()
      .isLength({ min: 3, max: 120 })
      .withMessage("Title must be 3–120 characters long"),
    body("category")
      .isString()
      .notEmpty()
      .withMessage("Category is mandatory"),
    body("content")
      .isString()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Content should be 10–2000 characters"),
    body("date")
      .isISO8601()
      .withMessage("A valid date is required"),
    body("published").optional().isBoolean(),
    body("featured").optional().isBoolean(),
  ],
  authMiddleware.authAdmin,
  galleryController.createGallery
);

router.get("/", galleryController.getAllGalleries);
router.get("/recent", galleryController.getRecentGalleries);
router.get("/:id", galleryController.getGalleryById);

router.put(
  "/:id",
  singleUpload({ subdir: "gallery", fieldName: "image" }),
  [
    body("title").optional().isString().isLength({ min: 3, max: 120 }),
    body("category").optional().isString(),
    body("content").optional().isString().isLength({ min: 10, max: 2000 }),
    body("date").optional().isISO8601(),
    body("published").optional().isBoolean(),
    body("featured").optional().isBoolean(),
  ],
  authMiddleware.authAdmin,
  galleryController.updateGallery
);

router.delete("/:id", authMiddleware.authAdmin, galleryController.deleteGallery);

module.exports = router;
