const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const postRoutes = require("./postRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const commentRoutes = require("./commentRoutes");

// Используем маршруты
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/posts", postRoutes);
router.use("/profiles", userProfileRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
