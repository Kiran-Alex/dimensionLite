/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupToUser` DROP FOREIGN KEY `_GroupToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupToUser` DROP FOREIGN KEY `_GroupToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Group` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Todo` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `groupId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_GroupToUser` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;
