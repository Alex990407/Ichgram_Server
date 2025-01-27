const authService = require("../services/authService");

// Регистрация
exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error.message);

    if (error.message === "User with this email or username already exists.") {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: error.message || "Registration failed." });
  }
};

// Авторизация
exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

// Восстановление пароля
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    await authService.resetPassword(email, newPassword);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
