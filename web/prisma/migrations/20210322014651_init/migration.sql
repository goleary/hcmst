-- CreateTable
CREATE TABLE "Input" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "income" INTEGER NOT NULL,
    "ageBin" INTEGER NOT NULL,
    "education" INTEGER NOT NULL,
    "validated" BOOLEAN,

    PRIMARY KEY ("id")
);
