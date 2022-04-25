/*
  Warnings:

  - You are about to drop the column `imgId` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the column `imgId` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_imgId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_imgId_fkey";

-- DropIndex
DROP INDEX "CarModel_imgId_key";

-- DropIndex
DROP INDEX "Detail_imgId_key";

-- AlterTable
ALTER TABLE "CarModel" DROP COLUMN "imgId",
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "imgId",
ADD COLUMN     "img" TEXT,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "options" DROP NOT NULL,
ALTER COLUMN "star" SET DEFAULT 0;

-- DropTable
DROP TABLE "Image";

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
