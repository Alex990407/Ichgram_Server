const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

// Получить случайные посты или популярные
exports.getExplorePosts = async (req, res) => {
  try {
    // Выборка случайных постов (ограничение 200)
    const posts = await Post.aggregate([{ $sample: { size: 200 } }]);

    // Формируем данные для ответа
    const postData = posts.map((post) => ({
      id: post._id,
      imageUrl: post.imageUrl,
      title: post.title, // Добавлено поле title
    }));

    res.status(200).json({ posts: postData });
  } catch (error) {
    console.error("Error fetching explore posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newPost = new Post({
      userId: req.user.id,
      imageUrl: `/uploads/avatars/${req.file.filename}`,
      title: title || "",
    });

    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => ({
      id: post._id,
      username: post.userId.username,
      userAvatar: post.userId.avatar,
      imageUrl: post.imageUrl,
      title: post.title,
      likes: post.likes.length,
      comments: post.comments || [],
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post || post.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("userId", "username avatar") // Подгружаем данные автора поста
      .populate("comments.userId", "username avatar"); // Подгружаем данные пользователей, оставивших комментарии

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      id: post._id,
      username: post.userId.username,
      userAvatar: post.userId.avatar,
      imageUrl: post.imageUrl,
      title: post.title,
      likes: post.likes.length,
      comments: post.comments.map((comment) => ({
        id: comment._id,
        text: comment.text,
        username: comment.userId.username,
        userAvatar: comment.userId.avatar,
        createdAt: comment.createdAt,
      })),
      createdAt: post.createdAt,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }

  // Получить все посты конкретного пользователя
  exports.getUserPosts = async (req, res) => {
    const { userId } = req.params;
    try {
      const posts = await Post.find({ userId }).sort({ createdAt: -1 }); // Найти посты по userId
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch user posts" });
    }
  };
};
