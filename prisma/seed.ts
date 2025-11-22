import { prisma } from '../src/db/prisma';

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: 'Обычная',
      },
      {
        name: 'Важная',
      },
      {
        name: 'Срочная',
      },
    ],
    skipDuplicates: true,
  });
  await prisma.todo.createMany({
    data: [
      {
        title: 'Сделать домашку',
        categoryId: 1,
      },
    ],
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
