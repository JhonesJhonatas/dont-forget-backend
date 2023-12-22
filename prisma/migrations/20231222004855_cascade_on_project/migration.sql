-- DropForeignKey
ALTER TABLE "ConcludedTasks" DROP CONSTRAINT "ConcludedTasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "OpenedTasks" DROP CONSTRAINT "OpenedTasks_projectId_fkey";

-- AddForeignKey
ALTER TABLE "OpenedTasks" ADD CONSTRAINT "OpenedTasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcludedTasks" ADD CONSTRAINT "ConcludedTasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
