// Определение типа данных задачи. Смахивает на interface
export type Todo = {
  id: number;
  title: string;
  done: boolean;
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
function createTodo(title: Todo['title']): Todo {
  const todo: Todo = {
    id: sequence++,
    title,
    done: false,
  };
  store.set(todo.id, todo);
  return todo;
}

// Обновление задачи
function updateTodo(id: Todo['id'], title: Todo['title']): Todo | undefined {
  const todo = store.get(id);
  if (todo) {
    todo.title = title;
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
