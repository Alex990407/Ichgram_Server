const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const Post = require("../models/Post");

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Получение данных пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Получение данных профиля
    const profile = await UserProfile.findOne({ userId: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Получение постов пользователя
    const posts = await Post.find({ userId: userId });

    // Формируем ответ
    const profileData = {
      username: user.username,
      fullname: user.fullname,
      avatarUrl: profile.avatarUrl,
      description: profile.description,
      followers: profile.followers || 0,
      following: profile.following || 0,
      posts: posts.map((post) => ({
        id: post._id,
        imageUrl: post.imageUrl,
      })),
    };

    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAuthorizedProfile = async (req, res) => {
  try {
    // Проверка, что пользователь авторизован
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Получение профиля авторизованного пользователя
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Получение дополнительных данных профиля
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Получение постов пользователя
    const posts = await Post.find({ userId: req.user.id });

    // Формируем данные для ответа
    const profileData = {
      username: user.username,
      fullname: user.fullname,
      avatarUrl: profile.avatarUrl,
      description: profile.description,
      followers: profile.followers || 0,
      following: profile.following || 0,
      postsCount: posts.length,
      posts: posts.map((post) => ({
        id: post._id,
        imageUrl: post.imageUrl,
        title: post.title || "", // Если у поста есть заголовок
      })),
    };

    res.status(200).json({ profile: profileData });
  } catch (error) {
    console.error("Error fetching authorized profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
