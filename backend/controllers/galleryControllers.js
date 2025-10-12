const { validationResult } = require("express-validator");
const galleryService = require("../services/galleryServices");

module.exports.createGallery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const file = req.file;
    const { imageUrl, media_type } = req.body;

    // Check if either file or imageUrl is provided
    if (!file && !imageUrl) {
      return res.status(400).json({ error: "An image file or media URL is required" });
    }

    let galleryData = { ...req.body };

    // If file is uploaded, use file data
    if (file) {
      galleryData.image_filename = file.filename;
      galleryData.image_path = file.path;
      galleryData.image_mime = file.mimetype;
      galleryData.image_size = file.size;
      galleryData.media_type = 'image';
    }
    // If imageUrl is provided, use it directly
    else if (imageUrl) {
      galleryData.image_filename = imageUrl.split('/').pop() || 'external-media';
      galleryData.image_path = imageUrl; // Store URL as path
      galleryData.media_type = media_type || 'image';
      galleryData.image_mime = media_type === 'video' ? 'video/youtube' : 'image/external';
      galleryData.image_size = 0;
    }

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
    const { imageUrl, media_type } = req.body;
    let updateData = { ...req.body };

    // If file is uploaded, use file data
    if (file) {
      updateData.image_filename = file.filename;
      updateData.image_path = file.path;
      updateData.image_mime = file.mimetype;
      updateData.image_size = file.size;
      updateData.media_type = 'image';
    }
    // If imageUrl is provided, use it directly
    else if (imageUrl) {
      updateData.image_filename = imageUrl.split('/').pop() || 'external-media';
      updateData.image_path = imageUrl; // Store URL as path
      updateData.media_type = media_type || 'image';
      updateData.image_mime = media_type === 'video' ? 'video/youtube' : 'image/external';
      updateData.image_size = 0;
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
