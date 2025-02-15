const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

// Регистрация нового пользователя
exports.register = async (data) => {
  console.log(data);
  try {
    const { username, email, password, fullName } = data;

    console.log("Received data:", { username, email, fullName });

    // Проверяем, существует ли пользователь с таким email или username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.error("User already exists with email or username:", {
        email,
        username,
      });
      throw new Error("User with this email or username already exists.");
    }

    console.log("No existing user found, proceeding to create a new one.");

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    // Создаём нового пользователя
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullname: fullName,
    });

    // Сохраняем пользователя в базе данных
    const savedUser = await newUser.save();
    console.log("New user created successfully:", savedUser);

    // Создаём профиль пользователя
    const newUserProfile = new UserProfile({
      userId: savedUser._id, // Привязка к только что созданному пользователю
      username: savedUser.username, // Имя пользователя
      description: "", // Пустое описание
      avatarUrl: "", // Пустая ссылка на аватар
      website: "", // Пустая ссылка на вебсайт
      followers: 0,
      following: 0,
    });

    // Сохраняем профиль в базе данных
    const savedUserProfile = await newUserProfile.save();
    console.log("User profile created successfully:", savedUserProfile);

    return savedUser; // Возвращаем только информацию о пользователе
  } catch (err) {
    console.error("Error during registration:", err.message);
    throw err; // Передаем ошибку дальше для обработки на уровне контроллера
  }
};

// Авторизация пользователя
exports.login = async (data) => {
  const { email, password } = data;

  // Проверяем наличие пользователя
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Проверяем пароль
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Генерируем JWT токен
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Токен будет действителен 1 час
  );

  return { token, user };
};

// Восстановление пароля
exports.resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User with this email does not exist.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();
};
