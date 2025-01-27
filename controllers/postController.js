const mongoose = require("mongoose");
const postService = require("../services/postService");

exports.getExplorePosts = async (req, res) => {
  try {
    const posts = await postService.getExplorePosts();
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching explore posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(
      req.user.id,
      req.body,
      req.file
    );
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await postService.getUserPosts(userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await postService.deletePost(postId, req.user.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }

    console.log("like!");

    const post = await postService.likePost(postId, req.user.id);

    console.log(post.likes);
    res.status(200).json({
      message: post.likes.includes(req.user.id)
        ? "Post liked successfully"
        : "Post unliked successfully",
      post,
    });
  } catch (error) {
    if (error.message === "Post not found") {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
