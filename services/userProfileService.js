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
    { new: true, upsert: true } // upsert: true создаёт документ, если его нет
  );
};

const getUserProfileById = async (userId) => {
  return await UserProfile.findOne({ userId }).populate(
    "userId",
    "email username"
  );
};

// Удалить профиль
const deleteUserProfile = async (userId) => {
  return await UserProfile.findOneAndDelete({ userId });
};

// Получить профиль
const getUserProfile = async (userId) => {
  const profile = await UserProfile.findOne({ userId: userId }).populate(
    "userId",
    "email"
  );
  return profile;
};

// Получить аватар пользователя
const getUserAvatar = async (userId) => {
  const profile = await UserProfile.findOne(
    { userId },
    { avatarUrl: 1, _id: 0 }
  ); // Выбираем только avatarUrl
  return profile?.avatarUrl || null; // Если профиль не найден, возвращаем null
};

module.exports = {
  createUserProfile,
  upsertUserProfile,
  deleteUserProfile,
  getUserProfile,
  getUserProfileById,
  getUserAvatar,
};
