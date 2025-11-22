import { prisma } from '../db/prisma';

import { Category } from './category.service.v2';

// Определение типа данных задачи. Смахивает на interface
export type Todo = {
  id: number;
  title: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  category_id: number;
};

// Получение списка задач
async function listTodo() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done,
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    category_id: todo.category_id,
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
    created_at: found.created_at,
    updated_at: found.updated_at,
    category_id: found.category_id,
  };
}

// Создание задачи
async function createTodo(title: Todo['title'], category_id: Category['id']) {
  const todo = (await prisma.todo.create({
    data: {
      title,
      category_id,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    category_id: todo.category_id,
  };
}

// Обновление задачи
async function updateTodo(id: Todo['id'], title: Todo['title'], category_id: Category['id']) {
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
      category_id,
    },
  })) as Todo;
  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    category_id: todo.category_id,
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
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    category_id: todo.category_id,
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
    created_at: todo.created_at,
    updated_at: todo.updated_at,
    category_id: todo.category_id,
  };
}

export { listTodo, getTodo, createTodo, updateTodo, toggleTodo, removeTodo };
