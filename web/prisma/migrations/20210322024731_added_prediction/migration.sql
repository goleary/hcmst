/*
  Warnings:

  - Added the required column `prediction` to the `Input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Input" ADD COLUMN     "prediction" TEXT NOT NULL;
