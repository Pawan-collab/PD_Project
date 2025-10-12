const feedbackService = require("../services/feedbackServices");
const { validationResult } = require("express-validator");

module.exports.createFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const feedbackData = req.body;
    const newFeedback = await feedbackService.createFeedback(feedbackData);
    return res.status(201).json({
      message: "Feedback saved successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRecentFeedbacks = async (req, res) => {
  const { limit } = req.query;
  try {
    const feedbacks = await feedbackService.getRecentFeedbacks(limit);
    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeedback = await feedbackService.deleteFeedback(id);
    return res.status(200).json({
      message: "Feedback removed successfully",
      feedback: deletedFeedback,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await feedbackService.getFeedbackById(id);
    return res.status(200).json({ feedback });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.updateFeedback = async (req, res) => {
  const { id } = req.params;
  const feedbackData = req.body;
  try {
    const updatedFeedback = await feedbackService.updateFeedback(id, feedbackData);
    return res.status(200).json({
      message: "Feedback modified successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports.getFeedbacksByName = async (req, res) => {
  const { name } = req.params;
  try {
    const feedbacks = await feedbackService.getFeedbacksByName(name);
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getFeedbacksByCompany = async (req, res) => {
  const { company } = req.params;
  try {
    const feedbacks = await feedbackService.getFeedbacksByCompany(company);
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toogleFeedbackApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body;

    const updated = await feedbackService.toogleFeedbackApproval(id, is_approved);

    if (!updated) {
      return res.status(400).json({ message: "Feedback record not found" });
    }

    res.status(200).json({
      message: "Feedback approval status changed successfully",
      updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getApprovedFeedbacks = async (req, res) => {
  try {
    const approvedFeedbacks = await feedbackService.getApprovedFeedbacks();
    res.status(200).json({ feedbacks: approvedFeedbacks });
  } catch (error) {
    console.error("Encountered error while fetching approved feedbacks:", error);
    res.status(500).json({ message: "Unable to retrieve approved feedbacks" });
  }
};
