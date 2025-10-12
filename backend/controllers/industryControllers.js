const industryService = require("../services/industryServices");

module.exports.createIndustry = async (req, res) => {
  try {
    const industry = await industryService.createIndustry(req.body);
    res.status(201).json({ success: true, data: industry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getAllIndustries = async (req, res) => {
  try {
    const industries = await industryService.getAllIndustries();
    res.status(200).json({ success: true, data: industries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getActiveIndustries = async (req, res) => {
  try {
    const industries = await industryService.getActiveIndustries();
    res.status(200).json({ success: true, data: industries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.toggleIndustryVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updated = await industryService.toggleIndustryVisibility(id, isActive);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Industry record not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await industryService.updateIndustry(id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Industry record not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Industry name is already in use" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deleteIndustry = async (req, res) => {
  try {
    const deleted = await industryService.deleteIndustry(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Industry record not found" });
    }
    res.status(200).json({ success: true, message: "Industry removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
