const UserProfile = require("../models/UserProfile");

// Создать профиль
const createUserProfile = async (userId, profileData) => {
  const profile = new UserProfile({ userId, ...profileData });
  return await profile.save();
};

// Обновить или создать профиль
const upsertUserProfile = async (userId, updates) => {
  return await UserProfile.findOneAndUpdate(
    { userId },
    { $set: updates },
    { new: true, upsert: true } // `upsert: true` создаёт документ, если его нет
  );
};

// Удалить профиль
const deleteUserProfile = async (userId) => {
  return await UserProfile.findOneAndDelete({ userId });
};

// Получить профиль
const getUserProfile = async (userId) => {
  return await UserProfile.findOne({ userId }).populate("userId", "email"); // Пополняем данные пользователя, если нужно
};

module.exports = {
  createUserProfile,
  upsertUserProfile, // Добавили новый метод
  deleteUserProfile,
  getUserProfile,
};
