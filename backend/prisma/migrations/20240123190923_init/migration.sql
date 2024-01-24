-- CreateTable
CREATE TABLE "CryptoData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last" DOUBLE PRECISION NOT NULL,
    "buy" DOUBLE PRECISION NOT NULL,
    "sell" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "baseUnit" TEXT NOT NULL,

    CONSTRAINT "CryptoData_pkey" PRIMARY KEY ("id")
);
