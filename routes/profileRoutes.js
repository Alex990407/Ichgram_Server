const express = require("express");
const router = express.Router();
const {
  getProfile,
  getAuthorizedProfile,
} = require("../controllers/profileController");
const authenticate = require("../middlewares/authMiddleware");

// Маршрут для получения профиля пользователя
router.get("/:userId", getProfile);

// Маршрут для получения авторизованного профиля
router.get("/", authenticate, getAuthorizedProfile);

module.exports = router;
