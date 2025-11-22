import {
  listTodo,
  getTodo,
  createTodo,
  updateTodo,
  toggleTodo,
  removeTodo,
} from '../src/services/todos.service.v1';

// Описание тестов: название, функции
describe('todos service', () => {
  // Тест на создание и получение всех задач
  // Название, функция
  test('create and get list todos', () => {
    const todo = createTodo('learn ts', 1);
    expect(todo.id).toBeGreaterThan(0);
    const all = listTodo();
    expect(
      all.some(
        (x) =>
          x.id === todo.id &&
          x.title === todo.title &&
          x.done === todo.done &&
          x.createdAt === todo.createdAt &&
          x.updatedAt === todo.updatedAt &&
          x.categoryId === todo.categoryId,
      ),
    ).toBe(true);
  });

  // Тест на создание и получение данной задачи
  test('create and get todo', () => {
    const todo = createTodo('learn ts', 1);
    expect(todo.id).toBeGreaterThan(0);
    const receivedTodo = getTodo(todo.id);
    expect(typeof receivedTodo !== 'undefined').toBe(true);
    expect(
      receivedTodo?.id === todo.id &&
        receivedTodo.title === todo.title &&
        receivedTodo.done === todo.done &&
        receivedTodo?.createdAt === todo.createdAt &&
        receivedTodo.updatedAt === todo.updatedAt &&
        receivedTodo.categoryId === todo.categoryId,
    ).toBe(true);
  });

  // Тест на получение несуществующей задачи
  test('get non-existent todo', () => {
    const todo = getTodo(0);
    expect(typeof todo === 'undefined').toBe(true);
  });

  // Тест на изменение задачи
  test('update todo', () => {
    const todo = createTodo('initial', 1);
    const initialTodo = Object.assign({}, todo);
    const updated = updateTodo(todo.id, 'changed', 2);
    expect(
      updated?.id === todo.id && updated.title !== initialTodo.title && updated.categoryId === 2,
    ).toBe(true);
  });

  // Тест на изменение несуществующей задачи
  test('update non-existent todo', () => {
    const updatedTodo = updateTodo(0, 'test', 1);
    expect(typeof updatedTodo === 'undefined').toBe(true);
  });

  // Тест на изменение статуса задачи
  test('toggle todo', () => {
    const todo = createTodo('toggle me', 1);
    const toggled = toggleTodo(todo.id);
    // Если объект существует, то обращаемся к done и проверяем значение
    expect(toggled?.done).toBe(true);
  });

  // Тест на изменение статуса несуществующей задачи
  test('toggle non-existent todo', () => {
    const toggled = toggleTodo(0);
    expect(typeof toggled === 'undefined').toBe(true);
  });

  // Тест на удаление задачи
  test('remove todo', () => {
    const todo = createTodo('remove me', 1);
    const initialTodo = Object.assign({}, todo);
    const removed = removeTodo(todo.id);
    const getRemovedTodo = getTodo(initialTodo.id);
    expect(typeof getRemovedTodo === 'undefined').toBe(true);
    expect(typeof removed !== 'undefined').toBe(true);
    expect(
      removed?.id === initialTodo.id &&
        removed.title === initialTodo.title &&
        removed.done === initialTodo.done &&
        removed.createdAt === initialTodo.createdAt &&
        removed.updatedAt === initialTodo.updatedAt &&
        removed.categoryId === initialTodo.categoryId,
    ).toBe(true);
  });

  // Тест на удаление несуществующей задачи
  test('remove non-existent todo', () => {
    const removed = removeTodo(0);
    expect(typeof removed === 'undefined').toBe(true);
  });
});
