import { buildApp } from './app';

// Задание порта приложения из .env файла. Если порт не задан, то используется порт 3000
const port = Number(process.env.PORT ?? 3000);
const app = buildApp();

// Запуск приложения
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
