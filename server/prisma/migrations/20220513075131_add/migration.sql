/*
  Warnings:

  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalPrice` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" TEXT NOT NULL,
DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
