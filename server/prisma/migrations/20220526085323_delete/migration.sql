/*
  Warnings:

  - You are about to drop the column `options` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `star` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "options",
DROP COLUMN "star";

-- DropTable
DROP TABLE "Review";
