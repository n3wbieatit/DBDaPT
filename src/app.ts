import { config } from 'dotenv';
import express from 'express';

import healthRouter from './routes/health.router';
import todoRouter from './routes/todos.router';

// Получение переменных из .env
config();

// Конфигурация приложения, доступная для импорта
export function buildApp() {
  // Использование express
  const app = express();
  // Использование json
  app.use(express.json());

  // Маршруты (routes)
  app.use('/health', healthRouter);
  app.use('/todo', todoRouter);

  // 404
  app.use((_req, res) => {
    // Задание статуса ответа 404 и отправка в виде json
    res.status(404).json({ message: 'Not found' });
  });

  // Ошибки
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: express.NextFunction,
    ) => {
      console.error(err);
      // Задание статуса ответа 500 и отправка в виде json
      res.status(500).json({ message: 'Internal server error' });
    },
  );

  return app;
}
