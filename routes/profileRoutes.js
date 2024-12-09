const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController");

// Маршрут для получения профиля пользователя
router.get("/:userId", getProfile);

module.exports = router;
