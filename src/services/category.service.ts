type Category = {
  id: number;
  name: string;
};

let seq: number = 1;

const store = new Map<Category['id'], Category>();

store.set(1, {
  id: 1,
  name: 'Тест1',
});

store.set(2, {
  id: 2,
  name: 'Тест2',
});

// Получение массива категорий
function listCategories(): Category[] {
  return Array.from(store.values());
}

// Получение конкретной категории
function getCategory(id: Category['id']): Category | undefined {
  return store.get(id);
}

// Создание категории
function createCategory(name: Category['name']): Category {
  const category: Category = {
    id: seq++,
    name,
  };
  store.set(category.id, category);
  return category;
}

// Обновление категории
function updateCategory(id: Category['id'], name: Category['name']): Category | undefined {
  const category = store.get(id);
  if (category) {
    category.name = name;
    store.set(id, category);
  }
  return category;
}

// Удаление категории
function removeCategory(id: Category['id']): Category | undefined {
  const category = store.get(id);
  store.delete(id);
  return category;
}

export { Category, listCategories, getCategory, createCategory, updateCategory, removeCategory };
