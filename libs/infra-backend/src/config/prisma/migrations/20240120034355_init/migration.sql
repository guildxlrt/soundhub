/*
  Warnings:

  - You are about to drop the column `file` on the `Announce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "file",
ADD COLUMN     "fileUrl" TEXT;
