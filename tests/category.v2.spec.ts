import { prisma } from '../src/db/prisma';
import {
  listCategories,
  getCategory,
  getCategoryByName,
  createCategory,
  updateCategory,
  removeCategory,
} from '../src/services/category.service.v2';

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.category.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('category service (prisma)', () => {
  test('create and get', async () => {
    const category = await createCategory('testCategory');
    expect(category.id).toBeGreaterThan(0);
    const all = await listCategories();
    expect(all.some((x) => x.id === category.id && x.name === category.name)).toBe(true);
  });

  test('create and get certain category by id', async () => {
    const category = await createCategory('testCategory');
    expect(category.id).toBeGreaterThan(0);
    const certainCategory = await getCategory(category.id);
    expect(typeof certainCategory !== 'undefined').toBe(true);
    expect(certainCategory?.id === category.id && certainCategory.name === category.name).toBe(
      true,
    );
  });

  test('create and get certain category by name', async () => {
    const category = await createCategory('testCategory');
    expect(category.id).toBeGreaterThan(0);
    const certainCategory = await getCategoryByName(category.name);
    expect(typeof certainCategory !== 'undefined').toBe(true);
    expect(certainCategory?.id === category.id && certainCategory.name === category.name).toBe(
      true,
    );
  });

  test('get non-existent category', async () => {
    const category = await getCategory(0);
    expect(category === null).toBe(true);
  });

  test('update category', async () => {
    const category = await createCategory('test');
    const initialCategory = Object.assign({}, category);
    const updatedCategory = await updateCategory(category.id, 'changed');
    expect(typeof updatedCategory !== 'undefined').toBe(true);
    expect(
      updatedCategory?.id === initialCategory?.id &&
        updatedCategory.name !== initialCategory.name &&
        updatedCategory.name === 'changed',
    ).toBe(true);
  });

  test('update non-existent category', async () => {
    const updatedCategory = await updateCategory(0, 'changed');
    expect(updatedCategory === null).toBe(true);
  });

  test('remove category', async () => {
    const category = await createCategory('test');
    const initialCategory = Object.assign({}, category);
    const removed = await removeCategory(category.id);
    const getRemovedCategory = await getCategory(initialCategory.id);
    expect(getRemovedCategory === null).toBe(true);
    expect(typeof removed !== 'undefined').toBe(true);
    expect(removed?.id === initialCategory.id && removed.name === initialCategory.name).toBe(true);
  });

  test('remove non-existent category', async () => {
    const removed = await removeCategory(0);
    expect(removed === null).toBe(true);
  });
});
