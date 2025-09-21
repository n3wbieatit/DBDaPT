import { createTodo, listTodos, toggleTodo, removeTodo } from '../src/services/todos.service';

// Описание тестов: название, функции
describe('todos service', () => {
  // Тест на создание и получение задач
  // Название, функция
  test('create and list', () => {
    const todo = createTodo('learn ts');
    expect(todo.id).toBeGreaterThan(0);
    const all = listTodos();
    expect(all.some((x) => x.id === todo.id && x.title === 'learn ts' && x.done === false)).toBe(
      true,
    );
  });

  // Тест на изменение статуса задачи
  test('toogle', () => {
    const todo = createTodo('toogle me');
    const toggled = toggleTodo(todo.id);
    // Если объект существует, то обращаемся к done и проверяем значение
    expect(toggled?.done).toBe(true);
  });

  // Тест на удаление задачи
  test('remove', () => {
    const todo = createTodo('remove me');
    const ok = removeTodo(todo.id);
    expect(ok).toBe(true);
  });
});
