const projectModel = require("../models/projectModels");

module.exports.createProjects = async (data) => {
  const doc = new projectModel(data);
  return await doc.save();
};

module.exports.getAllProjects = async () => {
  return await projectModel.find().sort({ created_at: -1 });
};

module.exports.getProjectById = async (id) => {
  return await projectModel.findById(id);
};

module.exports.updateProject = async (id, data) => {
  return await projectModel.findByIdAndUpdate(id, data, { new: true });
};

module.exports.deleteProject = async (id) => {
  return await projectModel.findByIdAndDelete(id);
};

module.exports.toggleProjectVisibility = async (id, isActive) => {
  const updated = await projectModel.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );
  return updated;
};

module.exports.getActiveProject = async () => {
  return await projectModel.find({ isActive: true }).sort({ created_at: -1 });
};
