/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Announce` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `feats` on the `Song` table. All the data in the column will be lost.
  - Added the required column `publisher_id` to the `Announce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher_id` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announce" DROP CONSTRAINT "Announce_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organisator_id_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_owner_id_fkey";

-- AlterTable
ALTER TABLE "Announce" DROP COLUMN "owner_id",
ADD COLUMN     "publisher_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "owner_id",
ADD COLUMN     "publisher_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "feats";

-- CreateTable
CREATE TABLE "PlayAtEvent" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "PlayAtEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongFeat" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "SongFeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseArtist" (
    "id" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "release_id" INTEGER NOT NULL,

    CONSTRAINT "ReleaseArtist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Announce" ADD CONSTRAINT "Announce_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "UserAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organisator_id_fkey" FOREIGN KEY ("organisator_id") REFERENCES "UserAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "UserAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayAtEvent" ADD CONSTRAINT "PlayAtEvent_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayAtEvent" ADD CONSTRAINT "PlayAtEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongFeat" ADD CONSTRAINT "SongFeat_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongFeat" ADD CONSTRAINT "SongFeat_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseArtist" ADD CONSTRAINT "ReleaseArtist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseArtist" ADD CONSTRAINT "ReleaseArtist_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
