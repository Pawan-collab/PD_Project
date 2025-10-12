const { validationResult } = require("express-validator");
const galleryService = require("../services/galleryServices");

module.exports.createGallery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "An image file is required" });
    }

    const galleryData = {
      ...req.body,
      image_filename: file.filename,
      image_path: file.path,
      image_mime: file.mimetype,
      image_size: file.size,
    };

    const newGallery = await galleryService.createGallery(galleryData);

    res.status(201).json({
      message: "Gallery item saved successfully",
      gallery: newGallery,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getAllGalleries();
    res.status(200).json({ message: "Galleries fetched", galleries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getRecentGalleries = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const galleries = await galleryService.getRecentGalleries(limit);
    res.status(200).json({ message: "Recent galleries fetched", galleries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await galleryService.getGalleryById(req.params.id);
    res.status(200).json({ message: "Gallery fetched", gallery });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports.updateGallery = async (req, res) => {
  try {
    const file = req.file;
    let updateData = { ...req.body };

    if (file) {
      updateData.image_filename = file.filename;
      updateData.image_path = file.path;
      updateData.image_mime = file.mimetype;
      updateData.image_size = file.size;
    }

    const updatedGallery = await galleryService.updateGallery(req.params.id, updateData);

    res.status(200).json({
      message: "Gallery entry updated successfully",
      gallery: updatedGallery,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await galleryService.deleteGallery(req.params.id);
    res.status(200).json({ message: "Gallery removed", gallery: deletedGallery });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
