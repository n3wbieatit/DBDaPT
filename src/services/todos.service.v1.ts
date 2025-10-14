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

// Последовательность
let sequence = 1;
// Хеш-таблица задач
const store = new Map<Todo['id'], Todo>();

// Получение списка задач
function listTodo(): Todo[] {
  return Array.from(store.values());
}

// Получение конкретной задачи
function getTodo(id: Todo['id']): Todo | undefined {
  return store.get(id);
}

// Создание задачи
function createTodo(title: Todo['title'], categoryId: Category['id']): Todo {
  const todo: Todo = {
    id: sequence++,
    title,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categoryId,
  };
  store.set(todo.id, todo);
  return todo;
}

// Обновление задачи
function updateTodo(
  id: Todo['id'],
  title: Todo['title'],
  categoryId: Category['id'],
): Todo | undefined {
  const todo = store.get(id);
  if (todo) {
    todo.title = title;
    todo.updatedAt = new Date().toISOString();
    todo.categoryId = categoryId;
    store.set(id, todo);
  }
  return todo;
}

// Изменение статуса задачи
function toggleTodo(id: Todo['id']): Todo | undefined {
  // Получение задачи
  const todo = store.get(id);
  // Если задачи нет, то возвращаем null
  if (todo) {
    // Изменение статуса на противоположный
    todo.done = !todo.done;
    todo.updatedAt = new Date().toISOString();
    // Сохранение
    store.set(id, todo);
  }
  return todo;
}

// Удаление задачи
function removeTodo(id: Todo['id']): Todo | undefined {
  const todo = store.get(id);
  // delete удаляет элемент и возвращает bool-результат выполнения
  store.delete(id);
  return todo;
}

export { listTodo, getTodo, createTodo, updateTodo, toggleTodo, removeTodo };
