/*
  Warnings:

  - You are about to drop the column `coverPath` on the `Release` table. All the data in the column will be lost.
  - Added the required column `folderPath` to the `Release` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReadOnly` to the `Release` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReadOnly` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "coverPath",
ADD COLUMN     "folderPath" TEXT NOT NULL,
ADD COLUMN     "isReadOnly" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "isReadOnly" BOOLEAN NOT NULL;
