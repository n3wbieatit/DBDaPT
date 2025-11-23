import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.category.deleteMany();
  await prisma.todo.deleteMany();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categories = await prisma.category.upsert({
    create: {
      name: 'Обычная',
    },
    update: {},
    where: {
      name: 'Обычная',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
