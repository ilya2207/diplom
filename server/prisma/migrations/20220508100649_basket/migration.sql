-- AlterTable
ALTER TABLE "Detail" ADD COLUMN     "basketId" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" JSONB;

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "amount" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
