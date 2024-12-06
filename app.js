const express = require("express");
require("dotenv").config();
const routes = require("./routes"); // Подключаем маршруты

const app = express();

app.use(express.json()); // Для обработки JSON запросов

// Используем маршруты
app.use("/api", routes);

module.exports = app;
