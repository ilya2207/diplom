/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "categoryId",
DROP COLUMN "modelId";

-- CreateTable
CREATE TABLE "_CategoryToDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CarModelToDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDetail_AB_unique" ON "_CategoryToDetail"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDetail_B_index" ON "_CategoryToDetail"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarModelToDetail_AB_unique" ON "_CarModelToDetail"("A", "B");

-- CreateIndex
CREATE INDEX "_CarModelToDetail_B_index" ON "_CarModelToDetail"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDetail" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDetail" ADD FOREIGN KEY ("B") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarModelToDetail" ADD FOREIGN KEY ("A") REFERENCES "CarModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarModelToDetail" ADD FOREIGN KEY ("B") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
