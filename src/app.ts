import express from 'express';
import { config } from 'dotenv';
import healthRouter from './routes/health.router';
import todosRouter from './routes/todos.router';

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
  app.use('/api/todos', todosRouter);

  // 404
  app.use((_request, response) => {
    // Задание статуса ответа 404 и отправка в виде json
    response.status(404).json({ error: 'Not found' });
  });

  // Ошибки
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (
      err: unknown,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error(err);
      // Задание статуса ответа 500 и отправка в виде json
      response.status(500).json({ error: 'Internal server error' });
    },
  );

  return app;
}
