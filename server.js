const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.MONGO_URL;

// Подключение к MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Завершаем процесс в случае ошибки
  });
