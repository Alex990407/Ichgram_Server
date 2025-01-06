const express = require("express");
const router = express.Router();
const {
  getExplorePosts,
  createPost,
  likePost,
} = require("../controllers/postController");
const authenticate = require("../middlewares/authMiddleware");

// Эндпоинт для получения постов для Explore (публичный)
router.get("/explore", getExplorePosts);

// Эндпоинт для создания нового поста (защищённый)
router.post("/", authenticate, createPost);

// Эндпоинт для лайка поста (защищённый)
router.post("/:postId/like", authenticate, likePost);

module.exports = router;
