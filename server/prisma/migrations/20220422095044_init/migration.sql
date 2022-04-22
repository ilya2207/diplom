-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "secondname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "imgId" INTEGER,
    "type" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "parentCategoryId" INTEGER,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail" (
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

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "detailId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "model" TEXT,
    "brandId" INTEGER,
    "imgId" INTEGER,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "detailId" INTEGER NOT NULL,
    "star" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categorie" ADD CONSTRAINT "Categorie_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Categorie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
