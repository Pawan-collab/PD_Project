const solutionModel = require("../models/solutionModels");

module.exports.createSolution = async (data) => {
  const doc = new solutionModel(data);
  return await doc.save();
};

module.exports.getAllSolutions = async () => {
  return await solutionModel.find().sort({ createdAt: -1 });
};

module.exports.getSolutionById = async (id) => {
  return await solutionModel.findById(id);
};

module.exports.updateSolution = async (id, data) => {
  return await solutionModel.findByIdAndUpdate(id, data, { new: true });
};

module.exports.deleteSolution = async (id) => {
  return await solutionModel.findByIdAndDelete(id);
};

module.exports.toggleSolutionVisibility = async (id, isActive) => {
  const updated = await solutionModel.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );
  return updated;
};

module.exports.getActiveSolutions = async () => {
  return await solutionModel.find({ isActive: true }).sort({ createdAt: -1 });
};
