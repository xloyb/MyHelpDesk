-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `settingsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sitename` VARCHAR(191) NOT NULL,
    `announcement` VARCHAR(191) NOT NULL,
    `offer` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NOT NULL,
    `discordLogs` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SettingsServices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SettingsServices_AB_unique`(`A`, `B`),
    INDEX `_SettingsServices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `Settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SettingsServices` ADD CONSTRAINT `_SettingsServices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SettingsServices` ADD CONSTRAINT `_SettingsServices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
