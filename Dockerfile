# Используем официальное Node.js изображение
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Экспонируем порт, на котором работает приложение
EXPOSE 3003

# Запускаем приложение
CMD ["npm", "start"]
