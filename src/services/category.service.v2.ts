import { prisma } from '../db/prisma';

type Category = {
  id: number;
  name: string;
};

// Получение массива категорий
async function listCategories() {
  const categories = (await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  })) as Category[];
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}

// Получение конкретной категории
async function getCategory(id: Category['id']) {
  const found = (await prisma.category.findUnique({
    where: {
      id,
    },
  })) as Category | null;
  if (!found) {
    return null;
  }
  return {
    id: found.id,
    name: found.name,
  };
}

// Получение конкретной категории по названию
async function getCategoryByName(name: Category['name']) {
  const found = (await prisma.category.findUnique({
    where: {
      name,
    },
  })) as Category | null;
  if (!found) {
    return null;
  }
  return {
    id: found.id,
    name: found.name,
  };
}

// Создание категории
async function createCategory(name: Category['name']) {
  const category = (await prisma.category.create({
    data: {
      name,
    },
  })) as Category;
  return {
    id: category.id,
    name: category.name,
  };
}

// Обновление категории
async function updateCategory(id: Category['id'], name: Category['name']) {
  const found = (await prisma.category.findUnique({
    where: {
      id,
    },
  })) as Category | null;
  if (!found) {
    return null;
  }
  const category = (await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })) as Category;
  return {
    id: category.id,
    name: category.name,
  };
}

// Удаление категории
async function removeCategory(id: Category['id']) {
  const category = (await prisma.category.findUnique({
    where: {
      id,
    },
  })) as Category | null;
  if (!category) {
    return null;
  }
  await prisma.category.delete({
    where: {
      id,
    },
  });
  return {
    id: category.id,
    name: category.name,
  };
}

export {
  Category,
  listCategories,
  getCategory,
  getCategoryByName,
  createCategory,
  updateCategory,
  removeCategory,
};
