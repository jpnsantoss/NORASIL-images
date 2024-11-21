-- CreateTable
CREATE TABLE "Image" (
    "key" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "BuildImage" (
    "id" SERIAL NOT NULL,
    "buildId" TEXT NOT NULL,
    "imageKey" INTEGER NOT NULL,

    CONSTRAINT "BuildImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuildImage_imageKey_key" ON "BuildImage"("imageKey");

-- AddForeignKey
ALTER TABLE "BuildImage" ADD CONSTRAINT "BuildImage_imageKey_fkey" FOREIGN KEY ("imageKey") REFERENCES "Image"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
