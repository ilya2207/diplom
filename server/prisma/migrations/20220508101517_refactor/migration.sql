/*
  Warnings:

  - The `amount` column on the `Basket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `basketId` on the `Detail` table. All the data in the column will be lost.
  - Added the required column `detailId` to the `Basket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_basketId_fkey";

-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "detailId" INTEGER NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "basketId";

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
