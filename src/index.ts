import { buildApp } from './app';
import { connectDB, disconnectDB } from './db/prisma';

// Задание порта приложения из .env файла. Если порт не задан, то используется порт 3000
const port = Number(process.env.PORT ?? 3000);
const app = buildApp();

// Функция запуска приложения
async function start() {
  // Подключение к базе данных
  await connectDB();
  // Затем запуск сервера
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

// Запуск приложения с уловом ошибки
start().catch(async (error) => {
  console.error('Error starting server:', error);
  await disconnectDB();
  // Обозначение базового завершения
  process.exit(1);
});

// Функция аварийной остановки приложения
async function stop() {
  await disconnectDB();
  // Обозначение аварийной остановки
  process.exit(0);
}

// Обозначения в случае аварийной остановки
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
