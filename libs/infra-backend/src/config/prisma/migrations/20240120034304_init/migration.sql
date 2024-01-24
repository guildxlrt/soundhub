/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Announce` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Announce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "imageUrl",
DROP COLUMN "videoUrl",
ADD COLUMN     "file" TEXT;
