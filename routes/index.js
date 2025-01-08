const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
// const postRoutes = require("./postRoutes");
const userProfileRoutes = require("./userProfileRoutes");

// Используем маршруты
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
// router.use("/posts", postRoutes);
router.use("/profiles", userProfileRoutes);

module.exports = router;
