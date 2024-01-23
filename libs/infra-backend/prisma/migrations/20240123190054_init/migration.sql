/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Announce` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "imageUrl",
ADD COLUMN     "imagePath" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatarPath" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "imageUrl",
ADD COLUMN     "imagePath" TEXT;
