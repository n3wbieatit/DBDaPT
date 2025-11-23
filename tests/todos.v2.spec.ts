import { prisma } from '../src/db/prisma';
import { getCategoryByName } from '../src/services/category.service.v2';
import {
  listTodo,
  getTodo,
  createTodo,
  updateTodo,
  removeTodo,
  toggleTodo,
} from '../src/services/todos.service.v2';

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.todo.deleteMany();
  await prisma.category.deleteMany();
  await prisma.category.create({
    data: {
      name: 'Обычная',
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('todos service (prisma)', () => {
  test('create and get list todos', async () => {
    const category = await getCategoryByName('Обычная');
    if (!category) {
      return;
    }
    const todo = await createTodo('testTodo', category.id);
    expect(todo.id).toBeGreaterThan(0);
    const all = await listTodo();
    expect(
      all.some(
        (x) =>
          x.id === todo.id &&
          x.title === todo.title &&
          x.category_id === todo.category_id &&
          x.done === todo.done,
      ),
    ).toBe(true);
  });

  test('create and get todo', async () => {
    const category = await getCategoryByName('Обычная');
    if (!category) {
      return;
    }
    const todo = await createTodo('testTodo', category.id);
    expect(todo.id).toBeGreaterThan(0);
    const receivedTodo = await getTodo(todo.id);
    expect(typeof receivedTodo !== 'undefined').toBe(true);
    expect(
      receivedTodo?.id === todo.id &&
        receivedTodo.title === todo.title &&
        receivedTodo.category_id === todo.category_id &&
        receivedTodo.done === todo.done,
    ).toBe(true);
  });

  test('get non-existent todo', async () => {
    const todo = await getTodo(0);
    expect(todo === null).toBe(true);
  });

  test('update todo', async () => {
    const category = await getCategoryByName('Обычная');
    if (!category) {
      return;
    }
    const todo = await createTodo('testTodo', category.id);
    const initialTodo = Object.assign({}, todo);
    const updatedTodo = await updateTodo(todo.id, 'changed', category.id);
    expect(
      updatedTodo?.id === todo.id &&
        updatedTodo.title !== initialTodo.title &&
        updatedTodo.category_id === todo.category_id,
    ).toBe(true);
  });

  test('update non-existent todo', async () => {
    const updatedTodo = await updateTodo(0, 'changed', 1);
    expect(updatedTodo === null).toBe(true);
  });

  test('toggle todo', async () => {
    const category = await getCategoryByName('Обычная');
    if (!category) {
      return;
    }
    const todo = await createTodo('toggle me', category.id);
    const toggled = await toggleTodo(todo.id);
    expect(toggled?.done).toBe(true);
  });

  test('toggle non-existent todo', async () => {
    const toggled = await toggleTodo(0);
    expect(toggled === null).toBe(true);
  });

  test('remove todo', async () => {
    const category = await getCategoryByName('Обычная');
    if (!category) {
      return;
    }
    const todo = await createTodo('testTodo', category.id);
    const initialTodo = Object.assign({}, todo);
    const removed = await removeTodo(todo.id);
    const getRemovedTodo = await getTodo(initialTodo.id);
    expect(getRemovedTodo === null).toBe(true);
    expect(removed !== null).toBe(true);
    expect(
      removed?.id === initialTodo.id &&
        removed.title === initialTodo.title &&
        removed.done === initialTodo.done &&
        removed.category_id === initialTodo.category_id,
    ).toBe(true);
  });

  test('remove non-existent todo', async () => {
    const removed = await removeTodo(0);
    expect(removed === null).toBe(true);
  });
});
