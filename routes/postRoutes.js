const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticate = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Эндпоинт для получения постов для Explore (публичный)
router.get("/explore", postController.getExplorePosts);

// Эндпоинт для получения всех постов (публичный)
router.get("/", postController.getAllPosts);

// Эндпоинт для получения постов конкретного пользователя (публичный)
router.get("/user/:userId", postController.getUserPosts);

// Эндпоинт для создания нового поста (защищённый)
router.post(
  "/create",
  authenticate,
  upload.single("image"),
  postController.createPost
);

// Эндпоинт для удаления поста (защищённый)
router.delete("/:postId", authenticate, postController.deletePost);

// Эндпоинт для лайка поста (защищённый)
router.post("/:postId/like", authenticate, postController.likePost);

// Эндпоинт для получения данных конкретного поста (публичный)
router.get("/:postId", postController.getPostById);

// Получить все посты пользователя
router.get("/user/:userId", authenticate, postController.getUserPosts);

module.exports = router;
