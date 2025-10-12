const projectService = require("../services/projectServices");

module.exports.createProjects = async (req, res) => {
  try {
    const project = await projectService.createProjects(req.body);
    res.status(201).json({ sucess: true, data: project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const project = await projectService.getAllProjects();
    res.status(200).json({ sucess: true, data: project });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const project = await projectService.getActiveProject(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ sucess: false, message: "Project record not found" });
    }
    res.status(200).json({ sucess: true, data: project });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ sucess: false, message: "Project record not found" });
    }
    res.status(200).json({ sucess: true, data: updated });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const deleted = await projectService.deleteProject(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Project record not found" });
    }
    res.status(200).json({ success: true, message: "Project removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.toggleProjectVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const updated = await projectService.toggleProjectVisibility(id, isActive);
    if (!updated) {
      return res.status(400).json({ message: "Project record not found" });
    }
    res.status(200).json({
      message: "Project visibility updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getActiveProject = async (req, res) => {
  try {
    const activeProjects = await projectService.getActiveProject();
    res.status(200).json({ sucess: true, data: activeProjects });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};
