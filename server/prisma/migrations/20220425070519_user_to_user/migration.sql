/*
  Warnings:

  - The values [User,Admin] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `detailId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `imgId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imgId]` on the table `CarModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imgId]` on the table `Detail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin');
ALTER TABLE "User" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "type" TYPE "Role_new" USING ("type"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'user';
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_detailId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "detailId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgId",
ALTER COLUMN "type" SET DEFAULT E'user';

-- CreateTable
CREATE TABLE "_DetailToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DetailToOrder_AB_unique" ON "_DetailToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_DetailToOrder_B_index" ON "_DetailToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CarModel_imgId_key" ON "CarModel"("imgId");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_imgId_key" ON "Detail"("imgId");

-- AddForeignKey
ALTER TABLE "_DetailToOrder" ADD FOREIGN KEY ("A") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetailToOrder" ADD FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
