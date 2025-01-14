const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticate = require("../middlewares/authMiddleware"); // Middleware для проверки JWT
const upload = require("../middlewares/uploadMiddleware");

// Создать профиль
router.post("/", authenticate, userProfileController.createProfile);

// Обновить профиль
router.put("/", authenticate, userProfileController.upsertProfile);

// Удалить профиль
router.delete("/", authenticate, userProfileController.deleteProfile);

// Получить профиль
router.get("/", authenticate, userProfileController.getProfile);

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userProfileController.uploadAvatar
);

module.exports = router;
