const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors"); // Импортируем CORS
const path = require("path"); // Для работы с путями
require("dotenv").config();

const app = express();

// Включаем CORS
app.use(cors());

// Обработка JSON
app.use(express.json());

// Подключение маршрутов
app.use("/api", routes);

// Обеспечиваем доступ к папке с загруженными аватарами
app.use(
  "/uploads/avatars",
  express.static(path.join(__dirname, "uploads/avatars"))
);

// Подключение к базе данных
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Обработка ошибок для некорректных маршрутов
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Обработка ошибок сервера
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
