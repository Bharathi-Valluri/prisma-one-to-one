-- CreateTable
CREATE TABLE "Roles" (
    "RoleID" SERIAL NOT NULL,
    "RoleName" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("RoleID")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "EmailID" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_RoleName_key" ON "Roles"("RoleName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_firstName_key" ON "Users"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_roleId_key" ON "Users"("roleId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("RoleID") ON DELETE RESTRICT ON UPDATE CASCADE;
