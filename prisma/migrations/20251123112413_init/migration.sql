/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `title` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
