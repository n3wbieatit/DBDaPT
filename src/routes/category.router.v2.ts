import { Router } from 'express';

import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} from '../services/category.service.v1';

const router = Router();

// Запрос на получение категорий
router.get('/', (_req, res) => {
  res.json(listCategories());
});

// Запрос на получение конкретной категории
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'Id must be a number' });
  }
  const category = getCategory(Number(id));
  if (!category) {
    res.status(404).json({ message: 'Category not found' });
  }
  res.json({ category });
});

// Запрос на создание категории
router.post('/', (req, res) => {
  const { name } = req.body ?? {};
  if (!name) {
    res.status(400).json({ message: 'Category is required' });
  }
  if (typeof name !== 'string') {
    res.status(400).json({ message: 'Category must be a string' });
  }
  if (name.trim().length === 0) {
    res.status(400).json({ message: 'Name cannot be empty' });
  }
  const category = createCategory(name.trim());
  res.json({ category });
});

// Запрос на обновление категории
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'Id must be a number' });
  }
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Category is required' });
  }
  if (typeof name !== 'string') {
    res.status(400).json({ message: 'Category must be a string' });
  }
  if (name.trim().length === 0) {
    res.status(400).json({ message: 'Name cannot be empty' });
  }
  const category = getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const updatedCategory = updateCategory(Number(id), name.trim());
  return res.json({ category: updatedCategory });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category is required' });
  }
  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Category must be a string' });
  }
  if (name.trim().length === 0) {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }
  const category = getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const updatedCategory = updateCategory(Number(id), name.trim());
  return res.json({ category: updatedCategory });
});

// Запрос на удаление категории
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const category = getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const deletedCategory = removeCategory(Number(id));
  return res.json({ category: deletedCategory });
});

export default router;
