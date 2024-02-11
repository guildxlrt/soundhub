/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `featuring` on the `Song` table. All the data in the column will be lost.
  - Changed the type of `members` on the `Artist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organisator_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_owner_id_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "members",
ADD COLUMN     "members" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "owner_id",
ADD COLUMN     "organisator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "featuring",
ADD COLUMN     "feats" INTEGER[];

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organisator_id_fkey" FOREIGN KEY ("organisator_id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
