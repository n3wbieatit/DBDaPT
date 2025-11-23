import { Router } from 'express';

import {
  listCategories,
  getCategory,
  getCategoryByName,
  createCategory,
  updateCategory,
  removeCategory,
} from '../services/category.service.v2';

const router = Router();

// Запрос на получение категорий
router.get('/', async (_req, res) => {
  res.json({ list: await listCategories() });
});

// Запрос на получение конкретной категории
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'Id must be a number' });
  }
  const category = await getCategory(Number(id));
  if (!category) {
    res.status(404).json({ message: 'Category not found' });
  }
  res.status(201).json({ category });
});

// Запрос на создание категории
router.post('/', async (req, res) => {
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
  if (name.trim().length > 32) {
    res.status(400).json({ message: 'Name must be less than 32 characters' });
  }
  const found = await getCategoryByName(name.trim());
  if (found) {
    res.status(400).json({ message: 'Category already exists' });
  }
  const category = await createCategory(name.trim());
  res.json({ category });
});

// Запрос на обновление категории
router.put('/:id', async (req, res) => {
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
  if (name.trim().length > 32) {
    res.status(400).json({ message: 'Name must be less than 32 characters' });
  }
  const category = await getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const found = await getCategoryByName(name);
  if (found) {
    res.status(400).json({ message: 'Category already exists' });
  }
  const updatedCategory = await updateCategory(Number(id), name.trim());
  return res.json({ category: updatedCategory });
});

router.patch('/:id', async (req, res) => {
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
  if (name.trim().length > 32) {
    res.status(400).json({ message: 'Name must be less than 32 characters' });
  }
  const category = await getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const found = await getCategoryByName(name);
  if (found) {
    res.status(400).json({ message: 'Category already exists' });
  }
  const updatedCategory = await updateCategory(Number(id), name.trim());
  return res.json({ category: updatedCategory });
});

// Запрос на удаление категории
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  const category = await getCategory(Number(id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const deletedCategory = await removeCategory(Number(id));
  return res.json({ category: deletedCategory });
});

export default router;
