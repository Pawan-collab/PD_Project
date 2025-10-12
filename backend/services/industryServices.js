const Industry = require("../models/industryModels");

module.exports.createIndustry = async (data) => {
  const industry = new Industry(data);
  return await industry.save();
};

module.exports.getAllIndustries = async () => {
  return await Industry.find().sort({ name: 1 });
};

module.exports.getActiveIndustries = async () => {
  return await Industry.find({ isActive: true }).sort({ name: 1 });
};

module.exports.toggleIndustryVisibility = async (id, isActive) => {
  return await Industry.findByIdAndUpdate(id, { isActive }, { new: true });
};

module.exports.updateIndustry = async (id, data) => {
  const update = {};
  if (typeof data.name !== "undefined") update.name = data.name;
  if (typeof data.isActive !== "undefined") update.isActive = data.isActive;

  return await Industry.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true, runValidators: true }
  );
};

module.exports.deleteIndustry = async (id) => {
  return await Industry.findByIdAndDelete(id);
};
