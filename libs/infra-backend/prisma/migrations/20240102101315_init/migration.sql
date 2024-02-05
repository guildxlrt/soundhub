/*
  Warnings:

  - You are about to drop the column `songs` on the `Release` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "songs",
ADD COLUMN     "songs_list" INTEGER[];
