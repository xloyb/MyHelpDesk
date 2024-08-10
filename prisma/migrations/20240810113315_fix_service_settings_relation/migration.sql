/*
  Warnings:

  - You are about to drop the `_settingsservices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_settingsservices` DROP FOREIGN KEY `_SettingsServices_A_fkey`;

-- DropForeignKey
ALTER TABLE `_settingsservices` DROP FOREIGN KEY `_SettingsServices_B_fkey`;

-- DropTable
DROP TABLE `_settingsservices`;
