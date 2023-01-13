/*
  Warnings:

  - You are about to drop the column `userId` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `RoleName` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[RoleName]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `RoleName` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_userId_fkey";

-- DropIndex
DROP INDEX "Roles_userId_key";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "userId",
ADD COLUMN     "RoleName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "RoleName",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_RoleName_key" ON "Roles"("RoleName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_roleId_key" ON "Users"("roleId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("RoleID") ON DELETE RESTRICT ON UPDATE CASCADE;
