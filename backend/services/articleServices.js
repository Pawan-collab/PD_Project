const ArticleModel = require("../models/article.model");

module.exports.createArticle = async (articleData) => {
  const article = new ArticleModel(articleData);
  await article.save();
  return article;
};

module.exports.getAllArticles = async () => {
  const articles = await ArticleModel.find()
    .sort({ published_at: -1, createdAt: -1 });
  return articles;
};

module.exports.getPublishedArticles = async () => {
  const articles = await ArticleModel.find({ status: "published" })
    .sort({ published_at: -1 });
  return articles;
};

module.exports.getArticlesByCategory = async (category) => {
  const articles = await ArticleModel.find({
    status: "published",
    category,
  }).sort({ published_at: -1 });
  return articles;
};

module.exports.getRecentArticles = async (limit = 5) => {
  const articles = await ArticleModel.find({ status: "published" })
    .sort({ published_at: -1 })
    .limit(parseInt(limit));
  return articles;
};

module.exports.getFeaturedArticles = async () => {
  const articles = await ArticleModel.find({
    status: "published",
    is_featured: true,
  }).sort({ published_at: -1 });
  return articles;
};

module.exports.getArticleById = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

module.exports.getArticleBySlug = async (slug) => {
  const article = await ArticleModel.findOne({ slug });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

module.exports.updateArticle = async (id, articleData) => {
  const article = await ArticleModel.findByIdAndUpdate(id, articleData, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

module.exports.deleteArticle = async (id) => {
  const article = await ArticleModel.findByIdAndDelete(id);
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

module.exports.incrementArticleViews = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw new Error("Article not found");
  }
  await article.incrementViews();
  return article;
};

module.exports.likeArticle = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw new Error("Article not found");
  }
  await article.incrementLikes();
  return article;
};

module.exports.unlikeArticle = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw new Error("Article not found");
  }
  await article.decrementLikes();
  return article;
};

module.exports.searchArticles = async (query) => {
  const articles = await ArticleModel.find({
    $text: { $search: query },
    status: "published",
  }).sort({ score: { $meta: "textScore" } });
  return articles;
};
