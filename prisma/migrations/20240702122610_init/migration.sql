/*
  Warnings:

  - You are about to drop the column `listsId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `todolistId` on the `Todolist` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `todolistId` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Todolist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_listsId_fkey";

-- DropForeignKey
ALTER TABLE "Todolist" DROP CONSTRAINT "Todolist_todolistId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "listsId",
ADD COLUMN     "todolistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todolist" DROP COLUMN "todolistId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
DROP COLUMN "updateAt";

-- AddForeignKey
ALTER TABLE "Todolist" ADD CONSTRAINT "Todolist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_todolistId_fkey" FOREIGN KEY ("todolistId") REFERENCES "Todolist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
