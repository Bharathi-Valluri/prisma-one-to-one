/*
  Warnings:

  - You are about to drop the column `RoleName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `Password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "RoleName",
ADD COLUMN     "Password" TEXT NOT NULL;
