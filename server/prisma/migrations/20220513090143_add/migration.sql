-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'confirmed', 'rejected');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "rejectedReason" TEXT,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT E'created';
