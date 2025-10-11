import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} from '../src/services/category.service';

describe('category service', () => {
  // Тест на создание и получение задач
  test('create and get', () => {
    const category = createCategory('testCategory');
    expect(category.id).toBeGreaterThan(0);
    const all = listCategories();
    expect(all.some((x) => x.id === category.id && x.name === category.name)).toBe(true);
  });

  // Тест на создание и получение конкретной задачи
  test('create and get certain category', () => {
    const category = createCategory('testCategory');
    expect(category.id).toBeGreaterThan(0);
    const certainCategory = getCategory(category.id);
    expect(typeof certainCategory !== 'undefined').toBe(true);
    expect(certainCategory?.id === category.id && certainCategory.name === category.name).toBe(
      true,
    );
  });

  // Тест на получение несуществующей категории
  test('get non-existent category', () => {
    const category = getCategory(0);
    expect(typeof category === 'undefined').toBe(true);
  });

  // Тест на обновление категории
  test('update category', () => {
    const category = createCategory('test');
    const initialCategory = Object.assign({}, category);
    const updatedCategory = updateCategory(category.id, 'changed');
    expect(typeof updateCategory !== 'undefined').toBe(true);
    expect(
      updatedCategory?.id === initialCategory?.id &&
        updatedCategory.name !== initialCategory.name &&
        updatedCategory.name === 'changed',
    ).toBe(true);
  });

  // Тест на обновление несуществующей категории
  test('update non-existent category', () => {
    const updatedCategory = updateCategory(0, 'changed');
    expect(typeof updatedCategory === 'undefined').toBe(true);
  });

  // Тест на удаление категории
  test('remove category', () => {
    const category = createCategory('test');
    const initialCategory = Object.assign({}, category);
    const removed = removeCategory(category.id);
    const getRemovedCategory = getCategory(initialCategory.id);
    expect(typeof getRemovedCategory === 'undefined').toBe(true);
    expect(typeof removed !== 'undefined').toBe(true);
    expect(removed?.id === initialCategory.id && removed.name === initialCategory.name).toBe(true);
  });

  // Тест на удаление несуществующей категории
  test('remove non-existent category', () => {
    const removed = removeCategory(0);
    expect(typeof removed === 'undefined').toBe(true);
  });
});
