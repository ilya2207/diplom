/*
  Warnings:

  - You are about to drop the `CarModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_brandId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_imgId_fkey";

-- DropForeignKey
ALTER TABLE "Categorie" DROP CONSTRAINT "Categorie_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_imgId_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_detailId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- DropTable
DROP TABLE "CarModel";

-- DropTable
DROP TABLE "Categorie";

-- DropTable
DROP TABLE "Detail";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "parentCategoryId" INTEGER,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Details" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "modelId" INTEGER,
    "options" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "star" INTEGER NOT NULL,
    "imgId" INTEGER,
    "vendorCode" TEXT,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModels" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "model" TEXT,
    "brandId" INTEGER,
    "imgId" INTEGER,

    CONSTRAINT "CarModels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Details" ADD CONSTRAINT "Details_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CarModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModels" ADD CONSTRAINT "CarModels_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModels" ADD CONSTRAINT "CarModels_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
