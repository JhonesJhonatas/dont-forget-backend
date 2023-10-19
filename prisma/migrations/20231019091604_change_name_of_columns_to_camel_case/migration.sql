/*
  Warnings:

  - You are about to drop the column `created_at` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `completed_at` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("color", "description", "id", "title", "userId") SELECT "color", "description", "id", "title", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "maturity" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasks" ("description", "id", "maturity", "priority", "projectId", "status", "title") SELECT "description", "id", "maturity", "priority", "projectId", "status", "title" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
