import { prisma } from '../db/prisma';

import { Category } from './category.service';

// Определение типа данных задачи. Смахивает на interface
export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
};

// Получение списка задач
async function listTodo() {
  const todos = (await prisma.todo.findMany({
    orderBy: {
      id: 'asc',
    },
  })) as Todo[];
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    categoryId: todo.categoryId,
  }));
}

// Получение конкретной задачи
async function getTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!found) {
    return null;
  }
  return {
    id: found.id,
    title: found.title,
    done: found.done,
    createdAt: found.createdAt,
    updatedAt: found.updatedAt,
    categoryId: found.categoryId,
  };
}

// Создание задачи
async function createTodo(title: Todo['title'], categoryId: Category['id']) {
  const todo = (await prisma.todo.create({
    data: {
      title,
      categoryId,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    categoryId: todo.categoryId,
  };
}

// Обновление задачи
async function updateTodo(id: Todo['id'], title: Todo['title'], categoryId: Category['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!found) {
    return null;
  }
  const todo = (await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      categoryId,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    categoryId: todo.categoryId,
  };
}

// Изменение статуса задачи
async function toggleTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!found) {
    return null;
  }
  const todo = (await prisma.todo.update({
    where: {
      id,
    },
    data: {
      done: !found.done,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    categoryId: todo.categoryId,
  };
}

// Удаление задачи
async function removeTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!found) {
    return null;
  }
  const todo = (await prisma.todo.delete({
    where: {
      id,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    categoryId: todo.categoryId,
  };
}

export { listTodo, getTodo, createTodo, updateTodo, toggleTodo, removeTodo };
