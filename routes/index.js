const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");

// Подключаем маршруты
router.use("/auth", authRoutes);

module.exports = router;
