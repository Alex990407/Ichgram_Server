const express = require("express");
const router = express.Router();
const {
  getExplorePosts,
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost,
  likePost,
  getPostById,
} = require("../controllers/postController");
const authenticate = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Эндпоинт для получения постов для Explore (публичный)
router.get("/explore", getExplorePosts);

// Эндпоинт для получения всех постов (публичный)
router.get("/", getAllPosts);

// Эндпоинт для получения постов конкретного пользователя (публичный)
router.get("/user/:userId", getUserPosts);

// Эндпоинт для создания нового поста (защищённый)
router.post("/create", authenticate, upload.single("image"), createPost);

// Эндпоинт для удаления поста (защищённый)
router.delete("/:postId", authenticate, deletePost);

// Эндпоинт для лайка поста (защищённый)
router.post("/:postId/like", authenticate, likePost);

// Эндпоинт для получения данных конкретного поста (публичный)
router.get("/:postId", getPostById);

// Получить все посты пользователя
router.get("/user/:userId", authenticate, postController.getUserPosts);

module.exports = router;
