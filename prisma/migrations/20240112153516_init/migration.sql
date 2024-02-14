/*
  Warnings:

  - A unique constraint covering the columns `[user_auth_id]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_user_auth_id_key" ON "Artist"("user_auth_id");
