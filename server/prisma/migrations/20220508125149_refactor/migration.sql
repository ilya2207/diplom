/*
  Warnings:

  - You are about to drop the column `amount` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `detailId` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_DetailToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_detailId_fkey";

-- DropForeignKey
ALTER TABLE "_DetailToOrder" DROP CONSTRAINT "_DetailToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_DetailToOrder" DROP CONSTRAINT "_DetailToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "amount",
DROP COLUMN "detailId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
DROP COLUMN "createdAt",
ADD COLUMN     "totalPrice" TEXT NOT NULL;

-- DropTable
DROP TABLE "_DetailToOrder";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "orderId" INTEGER NOT NULL,
    "detailId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasketItem" (
    "id" SERIAL NOT NULL,
    "basketId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "detailId" INTEGER NOT NULL,

    CONSTRAINT "BasketItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
