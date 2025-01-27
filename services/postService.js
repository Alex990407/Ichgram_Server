const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

// Получить посты для Explore
exports.getExplorePosts = async () => {
  const posts = await Post.aggregate([{ $sample: { size: 200 } }]);
  return posts.map((post) => ({
    id: post._id,
    imageUrl: post.imageUrl,
    title: post.title,
  }));
};

// Создать новый пост
exports.createPost = async (userId, postData, file) => {
  if (!file) {
    throw new Error("Image is required");
  }

  const newPost = new Post({
    userId,
    imageUrl: `/uploads/avatars/${file.filename}`,
    title: postData.title || "",
  });

  return await newPost.save();
};

// Получить все посты
exports.getAllPosts = async () => {
  try {
    // Находим все посты, включая информацию о userId
    const posts = await Post.find()
      .populate("userId", "username avatar") // Подгружаем username и avatar
      .sort({ createdAt: -1 }); // Сортируем по дате создания

    // Формируем данные постов, включая данные профиля пользователя
    const postsWithUserDetails = await Promise.all(
      posts.map(async (post) => {
        // Находим дополнительные данные пользователя в UserProfile
        const userProfile = await UserProfile.findOne({
          userId: post.userId._id,
        });

        return {
          id: post._id,
          username: post.userId.username,
          userAvatar: userProfile.avatarUrl,
          userId: userProfile._id,
          imageUrl: post.imageUrl,
          title: post.title,
          likes: post.likes.length,
          comments: post.comments || [],
        };
      })
    );

    return postsWithUserDetails;
  } catch (error) {
    console.error("Error fetching posts with user details:", error);
    throw new Error("Failed to fetch posts");
  }
};

// Получить посты конкретного пользователя
exports.getUserPosts = async (userId) => {
  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  const userProfile = await UserProfile.findOne({ userId });

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return {
    user: {
      username: userProfile.username,
      avatarUrl: userProfile.avatarUrl,
      description: userProfile.description,
    },
    posts,
  };
};

// Удалить пост
exports.deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post || post.userId.toString() !== userId) {
    throw new Error("Unauthorized to delete this post");
  }

  await Post.findByIdAndDelete(postId);
};

// Лайкнуть пост
exports.likePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Проверяем, есть ли лайк от этого пользователя
  const likeIndex = post.likes.indexOf(userId);

  if (likeIndex !== -1) {
    // Убираем лайк, если пользователь уже лайкнул
    post.likes.splice(likeIndex, 1);
  } else {
    // Добавляем лайк, если его нет
    post.likes.push(userId);
  }

  // Сохраняем обновленный пост
  await post.save();

  return post;
};

// Получить пост по ID
exports.getPostById = async (postId) => {
  const post = await Post.findById(postId)
    .populate("userId", "username avatar")
    .populate("comments.userId", "username avatar");

  if (!post) {
    throw new Error("Post not found");
  }

  return {
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
  };
};
