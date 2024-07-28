/*
  Warnings:

  - You are about to drop the column `commentCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "commentCount",
DROP COLUMN "likeCount";

-- DropTable
DROP TABLE "Comment";
