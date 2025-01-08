const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticate = require("../middlewares/authMiddleware"); // Middleware для проверки JWT

// Создать профиль
router.post("/", authenticate, userProfileController.createProfile);

// Обновить профиль
router.put("/", authenticate, userProfileController.upsertProfile);

// Удалить профиль
router.delete("/", authenticate, userProfileController.deleteProfile);

// Получить профиль
router.get("/", authenticate, userProfileController.getProfile);

module.exports = router;
