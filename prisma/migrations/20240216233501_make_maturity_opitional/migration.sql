-- AlterTable
ALTER TABLE "ConcludedTasks" ALTER COLUMN "maturity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OpenedTasks" ALTER COLUMN "maturity" DROP NOT NULL;
