/*
  Warnings:

  - Added the required column `userId` to the `ConcludedTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OpenedTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConcludedTasks" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OpenedTasks" ADD COLUMN     "userId" TEXT NOT NULL;
