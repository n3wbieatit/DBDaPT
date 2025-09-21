import { Router } from 'express';
import { createTodo, listTodos, removeTodo, toggleTodo } from '../services/todos.service';

const router = Router();

// Запрос GET на получение задач
router.get('/', (_request, response) => {
  response.json(listTodos());
});

// Запрос POST на создание задачи
router.post('/', (request, response) => {
  // Получение title из тела запроса
  const { title } = request.body ?? {};
  // Если title не передан или не соответствует типу string, то возвращаем ошибку
  if (typeof title !== 'string' || !title.trim()) {
    return response.status(400).json({ error: 'title is required' });
  }
  // Создание задачи
  const todo = createTodo(title.trim());
  // Возвращение созданной задачи
  response.status(201).json(todo);
});

// Запрос POST на изменение статуса задачи по маршруту /todos/:id/toogle
router.post('/:id/toogle', (request, response) => {
  // Получение id задачи из запроса
  const id = Number(request.params.id);
  // Если число бесконечно, то возвращаем ошибку
  if (!Number.isFinite(id)) return response.status(400).json({ error: 'invalid id' });

  // Изменение статуса задачи
  const todo = toggleTodo(id);
  // Если задача не найдена, то возвращаем ошибку
  if (!todo) return response.status(404).json({ error: 'not found' });
  // Возвращение задачи
  response.json(todo);
});

// Запрос DELETE на удаление задачи по маршруту /todos/:id
router.delete('/:id', (request, response) => {
  // Получение id задачи из запроса
  const id = Number(request.params.id);
  // Если число бесконечно, то возвращаем ошибку
  if (!Number.isFinite(id)) return response.status(400).json({ error: 'invalid id' });

  // Удаление задачи
  const ok = removeTodo(id);
  // Если удаление не удалось, то возвращаем ошибку
  if (!ok) return response.status(404).json({ error: 'not found' });
  // Возвращение пустого ответа
  response.status(204).send();
});

export default router;
