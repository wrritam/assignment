/*
  Warnings:

  - You are about to drop the `CryptoData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CryptoData";

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last" DOUBLE PRECISION NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL,
    "sell" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "baseUnit" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
