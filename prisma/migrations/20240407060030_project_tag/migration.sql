/*
  Warnings:

  - You are about to drop the column `project` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Todo` DROP COLUMN `project`,
    ADD COLUMN `projectTag` VARCHAR(191) NULL,
    ADD COLUMN `projectType` VARCHAR(191) NULL;
