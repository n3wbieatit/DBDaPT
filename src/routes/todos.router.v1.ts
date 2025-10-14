import { Router } from 'express';

import { getCategory } from '../services/category.service';
import {
  listTodo,
  getTodo,
  createTodo,
  updateTodo,
  removeTodo,
  toggleTodo,
} from '../services/todos.service.v1';

const router = Router();

// Запрос GET на получение задач
router.get('/', (_req, res) => {
  res.json(listTodo());
});

// Запрос GET на получение конкретной задачи
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Проверка на число
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const todo = getTodo(Number(id));
  // Проверка на наличие
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  return res.json({ todo });
});

// Запрос POST на создание задачи
router.post('/', (req, res) => {
  // Получение title из тела запроса
  const { title, categoryId } = req.body ?? {};
  // Валидация
  /**
   * Рассматриваемые случаи:
   * - Отсутствие title,
   * - Несоответствие типу string,
   * - Пустой title (содержание),
   */
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }
  if (title.trim().length === 0) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }
  // Создание задачи
  const todo = createTodo(title.trim(), categoryId);
  // Возвращение созданной задачи
  return res.status(201).json({ todo });
});

// Запрос PUT PATCH на обновление задачи
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be number' });
  }
  const { title, categoryId } = req.body ?? {};
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }
  if (title.trim().length === 0) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }
  if (isNaN(Number(categoryId))) {
    return res.status(400).json({ message: 'CategoryId must be a number' });
  }
  const category = getCategory(Number(categoryId));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const todo = getTodo(Number(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const updatedTodo = updateTodo(Number(id), title.trim(), Number(categoryId));
  return res.json({ todo: updatedTodo });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be number' });
  }
  const { title, categoryId } = req.body ?? {};
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }
  if (title.trim().length === 0) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }
  if (isNaN(Number(categoryId))) {
    return res.status(400).json({ message: 'CategoryId must be a number' });
  }
  const category = getCategory(Number(categoryId));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const todo = getTodo(Number(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const updatedTodo = updateTodo(Number(id), title.trim(), Number(categoryId));
  return res.json({ todo: updatedTodo });
});

// Запрос POST на изменение статуса задачи
router.post('/:id/toggle', (req, res) => {
  // Получение id задачи из запроса
  const { id } = req.params;
  // Если число бесконечно, то возвращаем ошибку
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const todo = getTodo(Number(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const toggledTodo = toggleTodo(Number(id));
  return res.json({ todo: toggledTodo });
});

// Запрос DELETE на удаление задачи по маршруту
router.delete('/:id', (req, res) => {
  // Получение id задачи из запроса
  const { id } = req.params;
  // Если число бесконечно, то возвращаем ошибку
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const todo = getTodo(Number(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const deletedTodo = removeTodo(Number(id));
  return res.json({ todo: deletedTodo });
});

export default router;
