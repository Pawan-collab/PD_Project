const postService = require('../services/postServices');
const { validationResult } = require('express-validator');

module.exports.createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const postData = req.body;
        const newPost = await postService.createPost(postData);
        return res.status(201).json({
            message: "Post saved successfully",
            post: {
                title: newPost.title,
                category: newPost.category,
                content: newPost.content,
                image_url: newPost.image_url,
                created_at: newPost.created_at,
                published: newPost.published,
            },
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getRecentPosts = async (req, res) => {
    const { limit } = req.query;
    try {
        const posts = await postService.getRecentPosts(limit);
        return res.status(200).json({
            message: "Recent posts fetched successfully",
            posts,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await postService.deletePost(id);
        return res.status(200).json({
            message: "Post removed successfully",
            post: deletedPost,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        return res.status(200).json({
            message: "Post fetched successfully",
            post,
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const postData = req.body;

    try {
        const updatedPost = await postService.updatePost(id, postData);
        return res.status(200).json({
            message: "Post modified successfully",
            post: {
                title: updatedPost.title,
                category: updatedPost.category,
                content: updatedPost.content,
                image_url: updatedPost.image_url,
                created_at: updatedPost.created_at,
                published: updatedPost.published,
            },
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
