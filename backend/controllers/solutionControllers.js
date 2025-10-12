const solutionService = require("../services/solutionServices");

module.exports.createSolution = async (req, res) => {
  try {
    const solution = await solutionService.createSolution(req.body);
    res.status(201).json({ success: true, data: solution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getAllSolutions = async (req, res) => {
  try {
    const solutions = await solutionService.getAllSolutions();
    res.status(200).json({ success: true, data: solutions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getSolutionById = async (req, res) => {
  try {
    const solution = await solutionService.getSolutionById(req.params.id);
    if (!solution) {
      return res
        .status(404)
        .json({ success: false, message: "Solution record not found" });
    }
    res.status(200).json({ success: true, data: solution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.updateSolution = async (req, res) => {
  try {
    const updated = await solutionService.updateSolution(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Solution record not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deleteSolution = async (req, res) => {
  try {
    const deleted = await solutionService.deleteSolution(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Solution record not found" });
    }
    res.status(200).json({ success: true, message: "Solution removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const updated = await solutionService.toggleSolutionVisibility(
      id,
      isActive
    );
    console.log(`Updated solution document: ${updated}`);

    if (!updated) {
      return res.status(400).json({ message: "Solution record not found" });
    }

    res.status(200).json({
      message: "Solution visibility updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Error while updating visibility:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getActiveSolutions = async (req, res) => {
  try {
    const activeSolutions = await solutionService.getActiveSolutions();
    res.status(200).json({ success: true, data: activeSolutions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
