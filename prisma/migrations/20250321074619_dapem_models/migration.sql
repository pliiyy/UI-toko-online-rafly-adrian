-- CreateTable
CREATE TABLE `ProPem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `maxTenor` INTEGER NOT NULL,
    `maxPlafon` INTEGER NOT NULL,
    `maxAngsuran` DOUBLE NOT NULL,
    `byAdmin` DOUBLE NOT NULL,
    `byTabungan` DOUBLE NOT NULL,
    `byMaterai` DOUBLE NOT NULL,
    `byTatalaksana` DOUBLE NOT NULL,
    `unit` INTEGER NOT NULL,
    `margin` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JePem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `penalty` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dapem` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nik` VARCHAR(191) NOT NULL,
    `namaPemohon` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `gajiBersih` INTEGER NOT NULL,
    `tenor` INTEGER NOT NULL,
    `plafon` INTEGER NOT NULL,
    `angsuran` INTEGER NOT NULL,
    `byAdmin` DOUBLE NOT NULL,
    `byTabungan` DOUBLE NOT NULL,
    `byMaterai` INTEGER NOT NULL,
    `byTatalaksana` INTEGER NOT NULL,
    `blokir` INTEGER NOT NULL,
    `penalty` DOUBLE NOT NULL,
    `pelunasan` INTEGER NOT NULL,
    `margin` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proPemId` VARCHAR(191) NOT NULL,
    `jePemId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_proPemId_fkey` FOREIGN KEY (`proPemId`) REFERENCES `ProPem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_jePemId_fkey` FOREIGN KEY (`jePemId`) REFERENCES `JePem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dapem` ADD CONSTRAINT `Dapem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
