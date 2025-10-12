const feedbackModel = require("../models/feedbackModels");

module.exports.createFeedback = async (feedbackData) => {
  const doc = new feedbackModel(feedbackData);
  await doc.save();
  return doc;
};

module.exports.getAllFeedbacks = async () => {
  const feedbacks = await feedbackModel.find().sort({ submitted_at: -1 });
  return feedbacks;
};

module.exports.getRecentFeedbacks = async (limit = 5) => {
  const feedbacks = await feedbackModel
    .find()
    .sort({ submitted_at: -1 })
    .limit(limit);
  return feedbacks;
};

module.exports.deleteFeedback = async (id) => {
  const feedback = await feedbackModel.findByIdAndDelete(id);
  if (!feedback) {
    throw new Error("Feedback record not found");
  }
  return feedback;
};

module.exports.getFeedbackById = async (id) => {
  const feedback = await feedbackModel.findById(id);
  if (!feedback) {
    throw new Error("Feedback record not found");
  }
  return feedback;
};

module.exports.updateFeedback = async (id, feedbackData) => {
  const updated = await feedbackModel.findByIdAndUpdate(id, feedbackData, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    throw new Error("Feedback record not found");
  }
  return updated;
};

module.exports.getFeedbacksByName = async (name) => {
  return await feedbackModel
    .find({
      name: { $regex: name, $options: "i" },
    })
    .sort({ submitted_at: -1 });
};

module.exports.getFeedbacksByCompany = async (company) => {
  return await feedbackModel
    .find({
      company_name: { $regex: company, $options: "i" },
    })
    .sort({ submitted_at: -1 });
};

module.exports.toogleFeedbackApproval = async (id, is_approved) => {
  const updated = await feedbackModel.findByIdAndUpdate(
    id,
    { is_approved },
    { new: true }
  );
  return updated;
};

module.exports.getApprovedFeedbacks = async () => {
  const approved = await feedbackModel
    .find({ is_approved: true })
    .sort({ submitted_at: -1 });
  return approved;
};
