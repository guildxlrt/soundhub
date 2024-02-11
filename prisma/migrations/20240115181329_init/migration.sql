/*
  Warnings:

  - You are about to drop the column `artist_id` on the `Announce` table. All the data in the column will be lost.
  - You are about to drop the column `planner` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `artist_id` on the `Release` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Announce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announce" DROP CONSTRAINT "Announce_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_planner_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_artist_id_fkey";

-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "artist_id",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "planner",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "artist_id",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Announce" ADD CONSTRAINT "Announce_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
