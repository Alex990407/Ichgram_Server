const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

// Получить случайные посты или популярные
exports.getExplorePosts = async (req, res) => {
  try {
    // Выборка случайных постов (ограничение 20)
    const posts = await Post.aggregate([{ $sample: { size: 20 } }]);

    // Формируем данные для ответа
    const postData = posts.map((post) => ({
      id: post._id,
      imageUrl: post.imageUrl,
    }));

    res.status(200).json({ posts: postData });
  } catch (error) {
    console.error("Error fetching explore posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
