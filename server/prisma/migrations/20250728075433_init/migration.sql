-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
