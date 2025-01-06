const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Получаем сам токен из "Bearer <token>"

  try {
    // Проверяем токен с использованием секрета
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Добавляем информацию о пользователе из токена в запрос
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
