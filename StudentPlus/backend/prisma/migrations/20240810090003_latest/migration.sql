/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Comment` table. All the data in the column will be lost.
  - The `published` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likeCount",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "published" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
