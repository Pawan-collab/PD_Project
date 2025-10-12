const postModel = require("../models/postModels");

module.exports.createPost = async (postData) => {
  const postdata = new postModel(postData);
  await postdata.save();
  return postdata;
};

module.exports.getAllPosts = async () => {
  const posts = await postModel.find().sort({ created_at: -1 }).limit(5);
  return posts;
};

module.exports.getRecentPosts = async (limit = 5) => {
  const posts = await postModel.find().sort({ created_at: -1 }).limit(limit);
  return posts;
};

module.exports.deletePost = async (id) => {
  const post = await postModel.findByIdAndDelete(id);
  if (!post) {
    throw new Error("Post record not found");
  }
  return post;
};

module.exports.getPostById = async (id) => {
  const post = await postModel.findById(id);
  if (!post) {
    throw new Error("Post record not found");
  }
  return post;
};

module.exports.updatePost = async (id, postData) => {
  const post = await postModel.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new Error("Post record not found");
  }
  return post;
};
