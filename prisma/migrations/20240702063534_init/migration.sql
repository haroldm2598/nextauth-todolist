-- CreateTable
CREATE TABLE "Todolist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todolist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "list" TEXT NOT NULL,
    "listsId" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Todolist_slug_key" ON "Todolist"("slug");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_listsId_fkey" FOREIGN KEY ("listsId") REFERENCES "Todolist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
