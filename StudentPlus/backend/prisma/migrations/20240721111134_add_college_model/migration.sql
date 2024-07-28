/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `anonymousName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullCollegeName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortCollegeName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "anonymousName" TEXT NOT NULL,
ADD COLUMN     "fullCollegeName" TEXT NOT NULL,
ADD COLUMN     "shortCollegeName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_fullName_key" ON "College"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "College_shortName_key" ON "College"("shortName");
