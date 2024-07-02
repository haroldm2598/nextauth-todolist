/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `todolistId` to the `Todolist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todolist" ADD COLUMN     "todolistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Todolist" ADD CONSTRAINT "Todolist_todolistId_fkey" FOREIGN KEY ("todolistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
