const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const authenticate = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Новый маршрут для получения аватара
router.get("/avatar", authenticate, userProfileController.getAvatar);

router.get(
  "/avatar/:userId",
  authenticate,
  userProfileController.getAvatarByUserId
);

// Создать профиль
router.post("/", authenticate, userProfileController.createProfile);

// Обновить профиль
router.put("/", authenticate, userProfileController.upsertProfile);

// Удалить профиль
router.delete("/", authenticate, userProfileController.deleteProfile);

router.get("/:userId", userProfileController.getProfileById);

// Получить профиль
router.get("/", authenticate, userProfileController.getProfile);

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  userProfileController.uploadAvatar
);

module.exports = router;
