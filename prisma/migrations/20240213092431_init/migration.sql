-- DropForeignKey
ALTER TABLE "ReleaseArtist" DROP CONSTRAINT "ReleaseArtist_release_id_fkey";

-- AddForeignKey
ALTER TABLE "ReleaseArtist" ADD CONSTRAINT "ReleaseArtist_release_id_fkey" FOREIGN KEY ("release_id") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
