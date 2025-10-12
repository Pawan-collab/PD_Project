const Gallery = require("../models/galleryModels");

module.exports.createGallery = async (data) => {
  const gallery = new Gallery(data);
  await gallery.save();
  return gallery;
};

module.exports.getAllGalleries = async () => {
  return await Gallery.find().sort({ date: -1 });
};

module.exports.getRecentGalleries = async (limit = 5) => {
  return await Gallery.find().sort({ date: -1 }).limit(limit);
};

module.exports.getGalleryById = async (id) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) throw new Error("Gallery record not found");
  return gallery;
};

module.exports.updateGallery = async (id, data) => {
  const gallery = await Gallery.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!gallery) throw new Error("Gallery record not found");
  return gallery;
};

module.exports.deleteGallery = async (id) => {
  const gallery = await Gallery.findByIdAndDelete(id);
  if (!gallery) throw new Error("Gallery record not found");
  return gallery;
};
