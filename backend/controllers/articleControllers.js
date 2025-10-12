const articleService = require('../services/articleServices');
const { validationResult } = require('express-validator');

module.exports.createArticle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const articleData = req.body;
        const newArticle = await articleService.createArticle(articleData);
        return res.status(201).json({
            message: "Article created successfully",
            article: newArticle,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        return res.status(200).json({
            message: "Articles fetched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getPublishedArticles = async (req, res) => {
    try {
        const articles = await articleService.getPublishedArticles();
        return res.status(200).json({
            message: "Published articles fetched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getArticlesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const articles = await articleService.getArticlesByCategory(category);
        return res.status(200).json({
            message: "Articles fetched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getRecentArticles = async (req, res) => {
    const { limit } = req.query;
    try {
        const articles = await articleService.getRecentArticles(limit);
        return res.status(200).json({
            message: "Recent articles fetched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getFeaturedArticles = async (req, res) => {
    try {
        const articles = await articleService.getFeaturedArticles();
        return res.status(200).json({
            message: "Featured articles fetched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await articleService.getArticleById(id);
        return res.status(200).json({
            message: "Article fetched successfully",
            article,
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports.getArticleBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const article = await articleService.getArticleBySlug(slug);
        return res.status(200).json({
            message: "Article fetched successfully",
            article,
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports.updateArticle = async (req, res) => {
    const { id} = req.params;
    const articleData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const updatedArticle = await articleService.updateArticle(id, articleData);
        return res.status(200).json({
            message: "Article updated successfully",
            article: updatedArticle,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await articleService.deleteArticle(id);
        return res.status(200).json({
            message: "Article deleted successfully",
            article: deletedArticle,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.incrementArticleViews = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await articleService.incrementArticleViews(id);
        return res.status(200).json({
            message: "Views incremented successfully",
            article,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.likeArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await articleService.likeArticle(id);
        return res.status(200).json({
            message: "Article liked successfully",
            article,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.unlikeArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await articleService.unlikeArticle(id);
        return res.status(200).json({
            message: "Article unliked successfully",
            article,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.searchArticles = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: "Search query is required" });
    }
    try {
        const articles = await articleService.searchArticles(q);
        return res.status(200).json({
            message: "Articles searched successfully",
            articles,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
