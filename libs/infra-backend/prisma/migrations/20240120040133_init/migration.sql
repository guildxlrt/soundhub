/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Announce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "fileUrl",
ADD COLUMN     "imageUrl" TEXT;
