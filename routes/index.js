const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");

// Используем маршруты
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
