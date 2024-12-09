const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors"); // Импортируем CORS
require("dotenv").config();

const app = express();

// Включаем CORS
app.use(cors());

// Обработка JSON
app.use(express.json());

// Подключение маршрутов
app.use("/api", routes);

// Подключение к базе данных
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
