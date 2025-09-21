import { Router } from 'express';

const router = Router();

// Запрос GET на получение состояния сервиса
router.get('/', (_request, response) => {
  response.json({ status: 'ok', time: new Date().toISOString() });
});

// Экспорт роутера
// Отличие обычного экспорта от default: https://stackoverflow.com/questions/33305954/typescript-export-vs-default-export
export default router;
