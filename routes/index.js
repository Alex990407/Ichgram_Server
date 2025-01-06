const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const postRoutes = require("./postRoutes");

// Используем маршруты
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/posts", postRoutes);

module.exports = router;
