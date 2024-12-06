const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Маршруты для авторизации
router.post("/register", authController.register); // Регистрация
router.post("/login", authController.login); // Авторизация
router.post("/reset-password", authController.resetPassword); // Восстановление пароля

module.exports = router;
