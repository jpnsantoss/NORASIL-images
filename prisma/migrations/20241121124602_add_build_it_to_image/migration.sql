/*
  Warnings:

  - You are about to drop the `BuildImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuildImage" DROP CONSTRAINT "BuildImage_imageKey_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "buildId" TEXT;

-- DropTable
DROP TABLE "BuildImage";
