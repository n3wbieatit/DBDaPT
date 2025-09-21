export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

// Последовательность
let sequence = 1;
// Список (словарь?) задач
const store = new Map<number, Todo>();

// Получение массива задач
export function listTodos(): Todo[] {
  return Array.from(store.values());
}

// Создание задачи
export function createTodo(title: string): Todo {
  const todo: Todo = { id: sequence++, title, done: false };
  store.set(todo.id, todo);
  return todo;
}

// Изменение статуса задачи
export function toggleTodo(id: number): Todo | null {
  // Получение задачи
  const todo = store.get(id);
  // Если задачи нет, то возвращаем null
  if (!todo) return null;
  // Изменение статуса на противоположный
  todo.done = !todo.done;
  // Сохранение
  store.set(id, todo);
  return todo;
}

// Удаление задачи
export function removeTodo(id: number): boolean {
  return store.delete(id);
}
